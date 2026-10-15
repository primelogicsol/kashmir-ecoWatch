'use client';

import React, { useState, useMemo } from 'react';
import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getBiodiversityData, BiodiversitySpecies } from '@/data/biodiversity';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Bird, ShieldAlert, Sparkles, MapPin, Activity, 
  Wind, Layers, Mountain, ShieldCheck, Compass, 
  AlertTriangle, CheckCircle2, ChevronRight, Info, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GEOGRAPHY } from '@/data/geography';

export default function BirdsPage() {
  const species: BiodiversitySpecies[] = getBiodiversityData.birds.all();

  const [activeTab, setActiveTab] = useState<'all' | 'threatened' | 'endemic' | 'pheasants' | 'raptors' | 'waterfowl' | 'passerines' | 'alpine'>('all');
  const [activeInsight, setActiveInsight] = useState<'pheasants' | 'flyway' | 'altitudinal'>('pheasants');

  // Exact deterministic calculations from the 601-species master avifaunal database
  const totalCount = species.length; // 601
  const threatenedCount = useMemo(() => species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, [species]);
  const crCount = useMemo(() => species.filter(s => s.conservationStatus === 'CR').length, [species]);
  const enCount = useMemo(() => species.filter(s => s.conservationStatus === 'EN').length, [species]);
  const vuCount = useMemo(() => species.filter(s => s.conservationStatus === 'VU').length, [species]);
  const endemicCount = useMemo(() => species.filter(s => s.endemismStatus && (s.endemismStatus.includes('endemic') || s.endemismStatus.includes('kashmir') || s.endemismStatus.includes('himalayan'))).length, [species]);
  const strictKashmirEndemics = useMemo(() => species.filter(s => s.endemismStatus === 'kashmir-endemic').length, [species]);
  
  // Category counts
  const pheasantsCount = useMemo(() => species.filter(s => s.category?.includes('Pheasant') || s.category?.includes('Galliformes')).length, [species]);
  const raptorsCount = useMemo(() => species.filter(s => s.category?.includes('Raptor') || s.category?.includes('Eagle') || s.category?.includes('Vulture') || s.category?.includes('Owl')).length, [species]);
  const waterfowlCount = useMemo(() => species.filter(s => s.category?.includes('Waterfowl') || s.category?.includes('Wetland') || s.habitats.some(h => h.includes('Wetland') || h.includes('Ramsar'))).length, [species]);
  const passerinesCount = useMemo(() => species.filter(s => s.category?.includes('Passerine') || s.category?.includes('Songbird') || s.category?.includes('Flycatcher')).length, [species]);
  const alpineCount = useMemo(() => species.filter(s => s.category?.includes('Alpine') || s.habitats.some(h => h.includes('Alpine') || h.includes('Scree'))).length, [species]);

  // Dynamic filter for active quick-tab
  const displayedSpecies = useMemo(() => {
    switch (activeTab) {
      case 'threatened':
        return species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus));
      case 'endemic':
        return species.filter(s => s.endemismStatus && (s.endemismStatus.includes('endemic') || s.endemismStatus.includes('kashmir') || s.endemismStatus.includes('himalayan')));
      case 'pheasants':
        return species.filter(s => s.category?.includes('Pheasant') || s.category?.includes('Galliformes'));
      case 'raptors':
        return species.filter(s => s.category?.includes('Raptor') || s.category?.includes('Eagle') || s.category?.includes('Vulture') || s.category?.includes('Owl'));
      case 'waterfowl':
        return species.filter(s => s.category?.includes('Waterfowl') || s.category?.includes('Wetland') || s.habitats.some(h => h.includes('Wetland') || h.includes('Ramsar')));
      case 'passerines':
        return species.filter(s => s.category?.includes('Passerine') || s.category?.includes('Songbird') || s.category?.includes('Flycatcher'));
      case 'alpine':
        return species.filter(s => s.category?.includes('Alpine') || s.habitats.some(h => h.includes('Alpine') || h.includes('Scree')));
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

  // Standardized Western Himalayan Avian Macro-Habitats
  const macroHabitats = [
    'Temperate & Subalpine Conifer Forests',
    'Wetlands, Lakes & Marshes (Ramsar Sites)',
    'Alpine Meadows & Scree (Treeline Ecotone)',
    'Braided Rivers & Torrential Streams',
    'Deciduous Broadleaf & Riverine Forests',
    'Cliffs, Gorges & High Rockfaces',
    'Agricultural Margins & Orchards'
  ];

  const metrics = [
    { label: 'Total Avifauna Tracked', value: totalCount, icon: 'Activity' },
    { label: 'Threatened Taxa', value: threatenedCount, icon: 'Shield' },
    { label: 'Himalayan Endemics', value: endemicCount, icon: 'MapPin' },
    { label: 'Strict Kashmir Endemics', value: strictKashmirEndemics, icon: 'CheckCircle' },
    { label: 'Critically Endangered / EN', value: crCount + enCount, icon: 'AlertTriangle' },
    { label: 'Winter Waterfowl & Waders', value: waterfowlCount, icon: 'Eye' },
    { label: 'Raptors & Owls', value: raptorsCount, icon: 'Compass' },
    { label: 'Districts Monitored', value: allDistricts.length, icon: 'Map' },
  ];

  const filters = {
    habitats: macroHabitats,
    districts: allDistricts,
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  // Curated spotlight datasets
  const flagshipPheasants = useMemo(() => {
    return species.filter(s => s.category === 'Pheasants & Galliformes').slice(0, 10);
  }, [species]);

  const flywayMigrants = useMemo(() => {
    return species.filter(s => s.category === 'Migratory Waterfowl & Wetland Birds' || s.habitats.includes('Wetlands, Lakes & Marshes (Ramsar Sites)')).slice(0, 10);
  }, [species]);

  return (
    <BiodiversityCategoryPage
      title="Western Himalayan Avifauna & Ornithology"
      subtitle="A comprehensive ornithological intelligence layer tracking 601 resident, altitudinal, and trans-Himalayan migratory bird taxa across Kashmir, Jammu, Ladakh, and extended valleys. Monitoring 152 IUCN Red List threatened species, Central Asian Flyway waterfowl, and royal galliform pheasants across all 25 districts."
      icon="Bird"
      color="from-sky-500 to-blue-600"
      species={displayedSpecies}
      metrics={metrics}
      filters={filters}
    >
      {/* ── Avian Focus Categories Filter Bar ───────────────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bird className="w-5 h-5 text-sky-400" />
              Avian Focus Categories & Guilds
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select an ecological guild, migration profile, or conservation status to filter the 601 bird species.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-sky-400">{displayedSpecies.length}</strong> of {totalCount} species
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-lg shadow-sky-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Avifauna ({totalCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'threatened' ? 'default' : 'outline'}
            onClick={() => setActiveTab('threatened')}
            className={activeTab === 'threatened' ? 'bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-950/40' : 'border-white/10 text-rose-300 hover:text-white'}
          >
            <ShieldAlert className="w-3.5 h-3.5 mr-1 text-rose-300" />
            Threatened Species ({threatenedCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'endemic' ? 'default' : 'outline'}
            onClick={() => setActiveTab('endemic')}
            className={activeTab === 'endemic' ? 'bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-950/40' : 'border-white/10 text-teal-300 hover:text-white'}
          >
            <MapPin className="w-3.5 h-3.5 mr-1 text-teal-300" />
            Himalayan Endemics ({endemicCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'pheasants' ? 'default' : 'outline'}
            onClick={() => setActiveTab('pheasants')}
            className={activeTab === 'pheasants' ? 'bg-amber-600 hover:bg-amber-500 text-white font-medium shadow-lg shadow-amber-950/40' : 'border-white/10 text-amber-300 hover:text-white'}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />
            Pheasants & Galliformes ({pheasantsCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'raptors' ? 'default' : 'outline'}
            onClick={() => setActiveTab('raptors')}
            className={activeTab === 'raptors' ? 'bg-red-700 hover:bg-red-600 text-white font-medium shadow-lg shadow-red-950/40' : 'border-white/10 text-red-300 hover:text-white'}
          >
            <Compass className="w-3.5 h-3.5 mr-1 text-red-300" />
            Raptors, Eagles & Owls ({raptorsCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'waterfowl' ? 'default' : 'outline'}
            onClick={() => setActiveTab('waterfowl')}
            className={activeTab === 'waterfowl' ? 'bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-950/40' : 'border-white/10 text-blue-300 hover:text-white'}
          >
            <Wind className="w-3.5 h-3.5 mr-1 text-blue-300" />
            Migratory Waterfowl & Wetlands ({waterfowlCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'passerines' ? 'default' : 'outline'}
            onClick={() => setActiveTab('passerines')}
            className={activeTab === 'passerines' ? 'bg-emerald-700 hover:bg-emerald-600 text-white font-medium shadow-lg shadow-emerald-950/40' : 'border-white/10 text-emerald-300 hover:text-white'}
          >
            <Activity className="w-3.5 h-3.5 mr-1 text-emerald-300" />
            Songbirds & Flycatchers ({passerinesCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'alpine' ? 'default' : 'outline'}
            onClick={() => setActiveTab('alpine')}
            className={activeTab === 'alpine' ? 'bg-indigo-700 hover:bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-950/40' : 'border-white/10 text-indigo-300 hover:text-white'}
          >
            <Mountain className="w-3.5 h-3.5 mr-1 text-indigo-300" />
            Alpine Specialists ({alpineCount})
          </Button>
        </div>
      </div>

      {/* ── Ornithological Intelligence Spotlight ───────────────────────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              Ornithological Intelligence Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Curated perspectives on flagship pheasants, Central Asian Flyway migrations, and vertical altitudinal belts.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveInsight('pheasants')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'pheasants'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Royal Pheasants (Galliformes)
            </button>
            <button
              onClick={() => setActiveInsight('flyway')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'flyway'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Central Asian Flyway
            </button>
            <button
              onClick={() => setActiveInsight('altitudinal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'altitudinal'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Altitudinal Migration
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeInsight === 'pheasants' && (
            <motion.div
              key="pheasants"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3"
            >
              {flagshipPheasants.map(sp => (
                <div 
                  key={sp.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-sky-500/30 transition-all group"
                >
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
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
                  <h5 className="font-semibold text-white text-sm group-hover:text-sky-300 transition-colors line-clamp-1">
                    {sp.commonName}
                  </h5>
                  {sp.localName && (
                    <div className="text-[11px] text-sky-400/90 font-medium truncate mt-0.5">
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

          {activeInsight === 'flyway' && (
            <motion.div
              key="flyway"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3"
            >
              {flywayMigrants.map(sp => (
                <div 
                  key={sp.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-blue-500/20 hover:border-blue-500/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                      <Wind className="w-2.5 h-2.5" />
                      Central Asian Migrant
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      sp.conservationStatus === 'VU' ? 'bg-amber-500/20 text-amber-400' :
                      sp.conservationStatus === 'NT' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {sp.conservationStatus}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-sm line-clamp-1">
                    {sp.commonName}
                  </h5>
                  {sp.localName && (
                    <div className="text-[11px] text-sky-300 font-medium truncate mt-0.5">
                      {sp.localName}
                    </div>
                  )}
                  <p className="text-[11px] italic text-slate-400 truncate mt-0.5">
                    {sp.scientificName}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {sp.description}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Elevation: {sp.elevationRange.min}-{sp.elevationRange.max}m</span>
                    <span className="text-blue-300 font-medium">{sp.districts.length} core wetlands</span>
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
              <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20">
                <span className="text-xs font-bold text-indigo-400 block mb-1">High-Alpine Scree & Crags</span>
                <h5 className="text-sm font-semibold text-white mb-2">3,600m – 6,000m</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Windswept snowfields and steep moraines. Year-round specialists include Himalayan and Tibetan Snowcock, Alpine Chough, Wallcreeper, and Golden Eagle.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Genera: <span className="text-slate-300">Tetraogallus, Pyrrhocorax, Tichodroma</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                <span className="text-xs font-bold text-sky-400 block mb-1">Subalpine Conifer Treeline</span>
                <h5 className="text-sm font-semibold text-white mb-2">2,600m – 3,600m</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Moist birch and fir canopies. Prime stronghold for Western Tragopan (Daangeer), Himalayan Monal, Koklass, Orange Bullfinch, and Spectacled Finch.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Genera: <span className="text-slate-300">Tragopan, Lophophorus, Pyrrhula</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Valley Mixed Forests & Orchards</span>
                <h5 className="text-sm font-semibold text-white mb-2">1,500m – 2,500m</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Deciduous woodlands, walnuts, and chinar groves. Exclusive breeding refuge for Kashmir Flycatcher, Kashmir Nuthatch, European Roller, and Golden Oriole.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Genera: <span className="text-slate-300">Ficedula, Sitta, Coracias, Oriolus</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">Valley Lakes & Ramsar Wetlands</span>
                <h5 className="text-sm font-semibold text-white mb-2">300m – 1,600m</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Central Asian Flyway winter haven (Wular, Dal, Hokersar, Haigam, Gharana). Millions of migratory waterfowl: Bar-headed Geese, Pintails, Teals, and Pochards.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Genera: <span className="text-slate-300">Anas, Aythya, Anser, Podiceps</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BiodiversityCategoryPage>
  );
}
