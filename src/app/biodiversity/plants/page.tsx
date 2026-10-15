'use client';

import React, { useState, useMemo } from 'react';
import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { plantsData, BiodiversitySpecies } from '@/data/biodiversity';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Flower2, ShieldAlert, Sparkles, MapPin, Activity, 
  Layers, Mountain, Trees, Droplets, AlertTriangle, 
  CheckCircle2, Compass, ArrowRight, ShieldCheck,
  ChevronRight, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GEOGRAPHY } from '@/data/geography';

export default function PlantsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'threatened' | 'endemic' | 'medicinal' | 'trees' | 'alpine' | 'aquatic'>('all');
  const [activeInsight, setActiveInsight] = useState<'iconic' | 'endemics' | 'altitudinal'>('iconic');

  // Exact dynamic calculations from the 1,834-species master inventory
  const totalCount = plantsData.length; // 1,834
  const threatenedCount = useMemo(() => plantsData.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, []); // 145
  const endemicCount = useMemo(() => plantsData.filter(s => s.endemismStatus === 'kashmir-endemic' || s.endemismStatus === 'northwest-himalayan').length, []); // 62
  const crCount = useMemo(() => plantsData.filter(s => s.conservationStatus === 'CR').length, []); // 46
  const enCount = useMemo(() => plantsData.filter(s => s.conservationStatus === 'EN').length, []); // 64
  const vuCount = useMemo(() => plantsData.filter(s => s.conservationStatus === 'VU').length, []); // 35
  const medicinalCount = useMemo(() => plantsData.filter(s => s.category?.toLowerCase().includes('medicinal') || s.habitats.some(h => h.toLowerCase().includes('medicinal')) || s.description.toLowerCase().includes('medicinal')).length, []); // 127
  const treesCount = useMemo(() => plantsData.filter(s => s.category?.includes('Tree') || s.category?.includes('Conifer')).length, []);

  // Filtered dataset according to active quick-tab
  const displayedSpecies = useMemo(() => {
    switch (activeTab) {
      case 'threatened':
        return plantsData.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus));
      case 'endemic':
        return plantsData.filter(s => s.endemismStatus === 'kashmir-endemic' || s.endemismStatus === 'northwest-himalayan');
      case 'medicinal':
        return plantsData.filter(s => s.category?.toLowerCase().includes('medicinal') || s.description.toLowerCase().includes('medicinal') || s.ecologicalRole?.toLowerCase().includes('medicinal'));
      case 'trees':
        return plantsData.filter(s => s.category?.includes('Tree') || s.category?.includes('Conifer'));
      case 'alpine':
        return plantsData.filter(s => s.category?.includes('Alpine') || s.habitats.some(h => h.includes('Alpine') || h.includes('Meadow')));
      case 'aquatic':
        return plantsData.filter(s => s.category?.includes('Aquatic') || s.habitats.some(h => h.includes('Wetland') || h.includes('Riverine')));
      case 'all':
      default:
        return plantsData;
    }
  }, [activeTab]);

  // Full multi-scope administrative units covering Kashmir Core, Jammu, Ladakh, AJK, and Gilgit-Baltistan
  const allDistricts = useMemo(() => {
    return Array.from(new Set([
      ...GEOGRAPHY.units['Kashmir Core'],
      ...GEOGRAPHY.units['Jammu'],
      ...GEOGRAPHY.units['Ladakh'],
      ...GEOGRAPHY.units['AJK'],
      ...GEOGRAPHY.units['Gilgit-Baltistan'],
    ])).sort();
  }, []);

  // Distinct verified habitats from the full plants database
  const allHabitats = useMemo(() => {
    return Array.from(new Set(plantsData.flatMap(s => s.habitats))).sort();
  }, []);

  const metrics = [
    { label: 'Total Flora Tracked', value: totalCount.toLocaleString(), icon: 'Leaf' },
    { label: 'Threatened Taxa', value: threatenedCount, icon: 'Shield' },
    { label: 'Endemic Species', value: endemicCount, icon: 'MapPin' },
    { label: 'Critically Endangered', value: crCount, icon: 'AlertTriangle' },
    { label: 'Endangered (EN)', value: enCount, icon: 'TrendingUp' },
    { label: 'Medicinal Flora', value: medicinalCount, icon: 'Sparkles' },
    { label: 'Botanical Habitats', value: allHabitats.length, icon: 'Layers' },
    { label: 'Districts Monitored', value: allDistricts.length, icon: 'Compass' },
  ];

  const filters = {
    habitats: allHabitats,
    districts: allDistricts,
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  // Iconic cultural and heritage flora of Kashmir
  const iconicFlora = useMemo(() => plantsData.slice(0, 10), []);

  // Micro-refugia strictly endemic species
  const strictEndemics = useMemo(() => {
    return plantsData.filter(s => s.endemismStatus === 'kashmir-endemic' || s.endemismStatus === 'northwest-himalayan').slice(0, 8);
  }, []);

  return (
    <BiodiversityCategoryPage
      title="Western Himalayan Flora & Plants"
      subtitle="Comprehensive botanical repository indexing 1,834 vascular plants across Kashmir's varied ecological gradients. Systematically tracking 145 threatened taxa (CR, EN, VU), 62 strict endemic species, high-value medicinal herbs, and canopy-building conifers across all 25 districts of the Western Himalayas."
      icon="Flower2"
      color="from-emerald-500 to-teal-600"
      species={displayedSpecies}
      metrics={metrics}
      filters={filters}
    >
      {/* ── Botanical Category Quick Filter Bar ───────────────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Flower2 className="w-5 h-5 text-emerald-400" />
              Botanical Focus Categories
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select a conservation or ecological focus to instantly filter the 1,834 botanical records.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-emerald-400">{displayedSpecies.length.toLocaleString()}</strong> of {totalCount.toLocaleString()} species
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Flora ({totalCount.toLocaleString()})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'threatened' ? 'default' : 'outline'}
            onClick={() => setActiveTab('threatened')}
            className={activeTab === 'threatened' ? 'bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-950/40' : 'border-white/10 text-rose-300 hover:text-white'}
          >
            <ShieldAlert className="w-3.5 h-3.5 mr-1 text-rose-300" />
            Threatened Taxa ({threatenedCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'endemic' ? 'default' : 'outline'}
            onClick={() => setActiveTab('endemic')}
            className={activeTab === 'endemic' ? 'bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-950/40' : 'border-white/10 text-teal-300 hover:text-white'}
          >
            <MapPin className="w-3.5 h-3.5 mr-1 text-teal-300" />
            Endemic to Kashmir & NW Himalayas ({endemicCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'medicinal' ? 'default' : 'outline'}
            onClick={() => setActiveTab('medicinal')}
            className={activeTab === 'medicinal' ? 'bg-amber-600 hover:bg-amber-500 text-white font-medium shadow-lg shadow-amber-950/40' : 'border-white/10 text-amber-300 hover:text-white'}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />
            Medicinal & Aromatic ({medicinalCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'trees' ? 'default' : 'outline'}
            onClick={() => setActiveTab('trees')}
            className={activeTab === 'trees' ? 'bg-emerald-700 hover:bg-emerald-600 text-white font-medium shadow-lg shadow-emerald-950/40' : 'border-white/10 text-slate-300 hover:text-white'}
          >
            <Trees className="w-3.5 h-3.5 mr-1 text-emerald-300" />
            Canopy Trees & Conifers ({treesCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'alpine' ? 'default' : 'outline'}
            onClick={() => setActiveTab('alpine')}
            className={activeTab === 'alpine' ? 'bg-cyan-700 hover:bg-cyan-600 text-white font-medium shadow-lg shadow-cyan-950/40' : 'border-white/10 text-slate-300 hover:text-white'}
          >
            <Mountain className="w-3.5 h-3.5 mr-1 text-cyan-300" />
            Alpine & Scree Flora
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'aquatic' ? 'default' : 'outline'}
            onClick={() => setActiveTab('aquatic')}
            className={activeTab === 'aquatic' ? 'bg-blue-700 hover:bg-blue-600 text-white font-medium shadow-lg shadow-blue-950/40' : 'border-white/10 text-slate-300 hover:text-white'}
          >
            <Droplets className="w-3.5 h-3.5 mr-1 text-blue-300" />
            Wetlands & Aquatic Plants
          </Button>
        </div>
      </div>

      {/* ── Botanical Intelligence Spotlight ─────────────────────────────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Botanical Intelligence Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Curated perspectives on heritage canopy trees, micro-refugia endemics, and vertical ecological belts.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveInsight('iconic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'iconic'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Iconic Heritage Flora
            </button>
            <button
              onClick={() => setActiveInsight('endemics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'endemics'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Endemic Refugia (62)
            </button>
            <button
              onClick={() => setActiveInsight('altitudinal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'altitudinal'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Altitudinal Zonation
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeInsight === 'iconic' && (
            <motion.div
              key="iconic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3"
            >
              {iconicFlora.map(sp => (
                <div 
                  key={sp.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {sp.category}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      sp.conservationStatus === 'CR' ? 'bg-red-500/20 text-red-400' :
                      sp.conservationStatus === 'EN' ? 'bg-orange-500/20 text-orange-400' :
                      sp.conservationStatus === 'VU' ? 'bg-amber-500/20 text-amber-400' :
                      sp.conservationStatus === 'NT' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {sp.conservationStatus}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-sm group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {sp.commonName}
                  </h5>
                  {sp.localName && (
                    <div className="text-[11px] text-emerald-400/90 font-medium truncate mt-0.5">
                      {sp.localName}
                    </div>
                  )}
                  <p className="text-[11px] italic text-slate-400 truncate mt-0.5">
                    {sp.scientificName}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {sp.description}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                    <span>{sp.elevationRange.min}-{sp.elevationRange.max}m</span>
                    <span>{sp.districts.length} districts</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeInsight === 'endemics' && (
            <motion.div
              key="endemics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
            >
              {strictEndemics.map(sp => (
                <div 
                  key={sp.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20 hover:border-teal-500/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" />
                      {sp.endemismStatus === 'kashmir-endemic' ? 'Kashmir Endemic' : 'NW Himalayan'}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">
                      {sp.conservationStatus}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-sm line-clamp-1">
                    {sp.commonName}
                  </h5>
                  {sp.localName && (
                    <div className="text-[11px] text-teal-300 font-medium truncate mt-0.5">
                      {sp.localName}
                    </div>
                  )}
                  <p className="text-[11px] italic text-slate-400 truncate mt-0.5">
                    {sp.scientificName}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {sp.description}
                  </p>
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Range: {sp.elevationRange.min}-{sp.elevationRange.max}m</span>
                    <span className="text-teal-400 font-medium">Verified Core Refugia</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeInsight === 'altitudinal' && (
            <motion.div
              key="altitudinal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-400 block mb-1">Colline / Valley Floor</span>
                <h5 className="text-sm font-semibold text-white mb-2">500m – 1,800m</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Dominated by Oriental Plane (Chinar), Himalayan Elm, Willows, Poplars, and wetland marshes (Lotus, Typha). High anthropogenic pressure.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Genera: <span className="text-slate-300">Platanus, Salix, Ulmus, Nelumbo</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Montane Temperate</span>
                <h5 className="text-sm font-semibold text-white mb-2">1,800m – 2,800m</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Dominant conifer belts: Blue Pine (Kail), Deodar, Spruce, and Walnut. Rich understory with medicinal herbs (Arisaema, Podophyllum, Atropa).
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Genera: <span className="text-slate-300">Pinus, Cedrus, Juglans, Taxus</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400 block mb-1">Subalpine Forest</span>
                <h5 className="text-sm font-semibold text-white mb-2">2,800m – 3,600m</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  West Himalayan Fir (Budlu) and Himalayan Birch (Burza) treeline ecotone. High endemism micro-refugia for critically endangered medicinal herbs.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Genera: <span className="text-slate-300">Abies, Betula, Rhododendron, Aconitum</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">Alpine Scree & Meadow</span>
                <h5 className="text-sm font-semibold text-white mb-2">3,600m – 5,200m</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Dwarf cushion plants, scree forbs, Brahma Kamal, Blue Poppy, and Kuth. Extreme cold-tolerant adaptations, highly vulnerable to warming.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Genera: <span className="text-slate-300">Saussurea, Meconopsis, Arnebia, Primula</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BiodiversityCategoryPage>
  );
}
