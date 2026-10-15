'use client';

import React, { useState, useMemo } from 'react';
import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getBiodiversityData, BiodiversitySpecies } from '@/data/biodiversity';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Waves, ShieldAlert, Sparkles, MapPin, Activity, 
  Droplet, Layers, Mountain, ShieldCheck, Compass, 
  AlertTriangle, CheckCircle2, ChevronRight, Info, Fish
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GEOGRAPHY } from '@/data/geography';

export default function FishPage() {
  const species: BiodiversitySpecies[] = getBiodiversityData.fish.all();

  const [activeTab, setActiveTab] = useState<'all' | 'threatened' | 'endemic' | 'snow-trout' | 'salmonids' | 'benthic' | 'wetlands'>('all');
  const [activeInsight, setActiveInsight] = useState<'snow-trout' | 'threatened' | 'zonation'>('snow-trout');

  // Exact deterministic calculations from the 66-species master aquatic database
  const totalCount = species.length; // 66
  const threatenedCount = useMemo(() => species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, [species]); // 13
  const crCount = useMemo(() => species.filter(s => s.conservationStatus === 'CR').length, [species]); // 2
  const enCount = useMemo(() => species.filter(s => s.conservationStatus === 'EN').length, [species]); // 5
  const vuCount = useMemo(() => species.filter(s => s.conservationStatus === 'VU').length, [species]); // 6
  const endemicCount = useMemo(() => species.filter(s => s.endemismStatus === 'kashmir-endemic' || s.endemismStatus === 'himalayan-endemic' || s.endemismStatus === 'northwest-himalayan').length, [species]); // 21
  const strictKashmirEndemics = useMemo(() => species.filter(s => s.endemismStatus === 'kashmir-endemic').length, [species]); // 10
  const snowTroutCount = useMemo(() => species.filter(s => s.category === 'Snow Trout' || s.scientificName.startsWith('Schizothorax') || s.scientificName.startsWith('Ptychobarbus') || s.scientificName.startsWith('Diptychus') || s.scientificName.startsWith('Schizopygopsis') || s.scientificName.startsWith('Gymnocypris')).length, [species]); // 14
  const salmonidsCount = useMemo(() => species.filter(s => s.category === 'Trout' || s.scientificName.startsWith('Salmo') || s.scientificName.startsWith('Oncorhynchus') || s.scientificName.startsWith('Salvelinus')).length, [species]); // 3
  const benthicCount = useMemo(() => species.filter(s => s.category?.includes('Loach') || s.category?.includes('Catfish')).length, [species]);

  // Dynamic filter for active quick-tab
  const displayedSpecies = useMemo(() => {
    switch (activeTab) {
      case 'threatened':
        return species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus));
      case 'endemic':
        return species.filter(s => s.endemismStatus === 'kashmir-endemic' || s.endemismStatus === 'himalayan-endemic' || s.endemismStatus === 'northwest-himalayan');
      case 'snow-trout':
        return species.filter(s => s.category === 'Snow Trout' || s.scientificName.startsWith('Schizothorax') || s.scientificName.startsWith('Ptychobarbus') || s.scientificName.startsWith('Diptychus') || s.scientificName.startsWith('Schizopygopsis') || s.scientificName.startsWith('Gymnocypris'));
      case 'salmonids':
        return species.filter(s => s.category === 'Trout' || s.scientificName.startsWith('Salmo') || s.scientificName.startsWith('Oncorhynchus') || s.scientificName.startsWith('Salvelinus'));
      case 'benthic':
        return species.filter(s => s.category?.includes('Loach') || s.category?.includes('Catfish'));
      case 'wetlands':
        return species.filter(s => s.habitats.some(h => h.includes('Wetland') || h.includes('Lake') || h.includes('Marsh')) || s.category?.includes('Macrophyte') || s.category?.includes('Snakehead') || s.category?.includes('Carp'));
      case 'all':
      default:
        return species;
    }
  }, [activeTab, species]);

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

  // Standardized Western Himalayan Aquatic Habitats
  const macroHabitats = [
    'Cold Mountain Rivers & Streams',
    'Glacial Torrents & High-Altitude Streams',
    'Valley Lakes (Dal, Wular, Manasbal)',
    'Wetlands, Marshes & Floodplains',
    'Karst Springs & Headwaters',
    'Lowland Rivers & Canals',
    'Alpine Lakes & High Tarns'
  ];

  const metrics = [
    { label: 'Aquatic Taxa Tracked', value: totalCount, icon: 'Fish' },
    { label: 'Threatened Taxa', value: threatenedCount, icon: 'Shield' },
    { label: 'Endemic Taxa', value: endemicCount, icon: 'MapPin' },
    { label: 'Strict Kashmir Endemics', value: strictKashmirEndemics, icon: 'CheckCircle' },
    { label: 'Indigenous Snow Trout', value: snowTroutCount, icon: 'Waves' },
    { label: 'Critically Endangered', value: crCount, icon: 'AlertTriangle' },
    { label: 'Endangered (EN)', value: enCount, icon: 'TrendingUp' },
    { label: 'River Basins Monitored', value: '7 Major', icon: 'Compass' },
  ];

  const filters = {
    habitats: macroHabitats,
    districts: allDistricts,
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  // Curated spotlight datasets
  const sacredSnowTrout = useMemo(() => {
    return species.filter(s => s.category === 'Snow Trout').slice(0, 10);
  }, [species]);

  const priorityThreatenedTaxa = useMemo(() => {
    return species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus));
  }, [species]);

  return (
    <BiodiversityCategoryPage
      title="Western Himalayan Aquatic Life & Freshwater Ecology"
      subtitle="An authoritative ichthyological and freshwater biodiversity matrix analyzing 66 indigenous and naturalized aquatic taxa across Kashmir's interconnected glacial, riverine, and lacustrine networks. Tracking 14 endemic Schizothoracine snow trouts, 13 IUCN Red List threatened taxa, coldwater salmonids, and torrent siluriformes across all 25 Western Himalayan districts."
      icon="Waves"
      color="from-cyan-500 to-blue-600"
      species={displayedSpecies}
      metrics={metrics}
      filters={filters}
    >
      {/* ── Aquatic Focus Categories Filter Bar ───────────────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Waves className="w-5 h-5 text-cyan-400" />
              Ichthyological & Aquatic Focus Categories
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select an ecological Guild or conservation status to filter freshwater and aquatic records.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-cyan-400">{displayedSpecies.length}</strong> of {totalCount} species
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Aquatic Life ({totalCount})
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
            Endemic Species ({endemicCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'snow-trout' ? 'default' : 'outline'}
            onClick={() => setActiveTab('snow-trout')}
            className={activeTab === 'snow-trout' ? 'bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-950/40' : 'border-white/10 text-blue-300 hover:text-white'}
          >
            <Fish className="w-3.5 h-3.5 mr-1 text-blue-300" />
            Indigenous Snow Trout ({snowTroutCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'salmonids' ? 'default' : 'outline'}
            onClick={() => setActiveTab('salmonids')}
            className={activeTab === 'salmonids' ? 'bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-950/40' : 'border-white/10 text-indigo-300 hover:text-white'}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-300" />
            Coldwater Salmonids ({salmonidsCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'benthic' ? 'default' : 'outline'}
            onClick={() => setActiveTab('benthic')}
            className={activeTab === 'benthic' ? 'bg-slate-700 hover:bg-slate-600 text-white font-medium shadow-lg shadow-slate-950/40' : 'border-white/10 text-slate-300 hover:text-white'}
          >
            <Mountain className="w-3.5 h-3.5 mr-1 text-cyan-300" />
            Loaches & Torrent Catfish ({benthicCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'wetlands' ? 'default' : 'outline'}
            onClick={() => setActiveTab('wetlands')}
            className={activeTab === 'wetlands' ? 'bg-emerald-700 hover:bg-emerald-600 text-white font-medium shadow-lg shadow-emerald-950/40' : 'border-white/10 text-emerald-300 hover:text-white'}
          >
            <Droplet className="w-3.5 h-3.5 mr-1 text-emerald-300" />
            Lakes & Wetland Communities
          </Button>
        </div>
      </div>

      {/* ── Freshwater Intelligence Spotlight ───────────────────────────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Freshwater Ecological Intelligence Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Deep biological analysis of evolutionary adaptations, threats from introduced carp, and altitudinal thermal zonation.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveInsight('snow-trout')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'snow-trout'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Indigenous Snow Trout (14)
            </button>
            <button
              onClick={() => setActiveInsight('threatened')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'threatened'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Red List Taxa ({threatenedCount})
            </button>
            <button
              onClick={() => setActiveInsight('zonation')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'zonation'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              River Zonation & Basins
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeInsight === 'snow-trout' && (
            <motion.div
              key="snow-trout"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3"
            >
              {sacredSnowTrout.map(sp => (
                <div 
                  key={sp.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {sp.endemismStatus === 'kashmir-endemic' ? 'Valley Endemic' : 'Himalayan'}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      sp.conservationStatus === 'CR' ? 'bg-red-500/20 text-red-400' :
                      sp.conservationStatus === 'EN' ? 'bg-orange-500/20 text-orange-400' :
                      sp.conservationStatus === 'VU' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {sp.conservationStatus}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-sm group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {sp.commonName}
                  </h5>
                  {sp.localName && (
                    <div className="text-[11px] text-cyan-400/90 font-medium truncate mt-0.5">
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

          {activeInsight === 'threatened' && (
            <motion.div
              key="threatened"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5"
            >
              {priorityThreatenedTaxa.map(sp => (
                <div 
                  key={sp.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20 hover:border-rose-500/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                      <ShieldAlert className="w-2.5 h-2.5" />
                      {sp.conservationStatus === 'CR' ? 'CRITICALLY ENDANGERED' : sp.conservationStatus === 'EN' ? 'ENDANGERED' : 'VULNERABLE'}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {sp.category}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-sm line-clamp-1">
                    {sp.commonName}
                  </h5>
                  {sp.localName && (
                    <div className="text-[11px] text-cyan-300 font-medium truncate mt-0.5">
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
                    <span className="text-rose-400 font-medium">{sp.districts.length} Core Basins</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeInsight === 'zonation' && (
            <motion.div
              key="zonation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400 block mb-1">Trans-Himalayan Cold Arid</span>
                <h5 className="text-sm font-semibold text-white mb-2">Indus & Shyok (3,000m – 4,800m)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Glacial meltwaters and high salinity lakes. Home to False Osman, Tibetan Snow Trout, and the critically endangered Biswas Osman in Pangong/Tso Moriri.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Genera: <span className="text-slate-300">Gymnocypris, Diptychus, Ptychobarbus</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">High Torrential Mountain Streams</span>
                <h5 className="text-sm font-semibold text-white mb-2">Lidder, Sindh, Kishanganga (1,600m – 3,200m)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Rushing, highly oxygenated pebble-riffles. Famous coldwater Brown and Rainbow trout beats, alongside torrential loaches and Chirruh Snow Trout.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Genera: <span className="text-slate-300">Salmo trutta, Triplophysa, Glyptothorax</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Valley Floor Lacustrine & Sinuosity</span>
                <h5 className="text-sm font-semibold text-white mb-2">Jhelum, Dal, Wular (1,500m – 1,800m)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Slow-moving waters with rich macrophyte beds. Endemic Kashmir Snow Trout (Ale Gad) and Sattar Gad battling heavy competition from introduced Common Carp.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Genera: <span className="text-slate-300">Schizothorax niger, Cyprinus, Nelumbo</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-400 block mb-1">Sub-Himalayan Warmwater Rivers</span>
                <h5 className="text-sm font-semibold text-white mb-2">Chenab, Tawi, Poonch (300m – 1,200m)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Warm, braided channels supporting the endangered Golden Mahseer (Tor putitora), Indian Major Carps (Rohu, Mrigal), Snakeheads, and predatory Catfishes.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Genera: <span className="text-slate-300">Tor, Wallago, Labeo, Channa</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BiodiversityCategoryPage>
  );
}
