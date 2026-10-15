'use client';

import React, { useState, useMemo } from 'react';
import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getBiodiversityData, BiodiversitySpecies } from '@/data/biodiversity';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Mountain, ShieldAlert, Sparkles, MapPin, Activity, 
  Compass, Layers, ShieldCheck, AlertTriangle, 
  CheckCircle2, ChevronRight, Info, Eye, Trees
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GEOGRAPHY } from '@/data/geography';

export default function MammalsPage() {
  const species: BiodiversitySpecies[] = getBiodiversityData.mammals.all();

  const [activeTab, setActiveTab] = useState<'all' | 'threatened' | 'endemic' | 'ungulates' | 'carnivores' | 'primates' | 'rodents-bats'>('all');
  const [activeInsight, setActiveInsight] = useState<'ungulates' | 'carnivores' | 'altitudinal'>('ungulates');

  // Exact deterministic calculations from the 111-species master mammal database
  const totalCount = species.length; // 111
  const threatenedCount = useMemo(() => species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, [species]); // 14
  const crCount = useMemo(() => species.filter(s => s.conservationStatus === 'CR').length, [species]); // 2 (Hangul, Brown Bear)
  const enCount = useMemo(() => species.filter(s => s.conservationStatus === 'EN').length, [species]); // 6
  const vuCount = useMemo(() => species.filter(s => s.conservationStatus === 'VU').length, [species]); // 6
  const endemicCount = useMemo(() => species.filter(s => s.endemismStatus && (s.endemismStatus.includes('endemic') || s.endemismStatus.includes('kashmir') || s.endemismStatus.includes('himalayan'))).length, [species]); // 18
  const strictKashmirEndemics = useMemo(() => species.filter(s => s.endemismStatus === 'kashmir-endemic').length, [species]);

  // Category counts
  const ungulatesCount = useMemo(() => species.filter(s => s.category === 'Artiodactyla').length, [species]); // 13
  const carnivoresCount = useMemo(() => species.filter(s => s.category === 'Carnivora').length, [species]); // 23
  const primatesCount = useMemo(() => species.filter(s => s.category === 'Primates').length, [species]); // 3
  const rodentsBatsCount = useMemo(() => species.filter(s => ['Rodentia', 'Chiroptera', 'Lagomorpha', 'Eulipotyphla', 'Pholidota'].includes(s.category)).length, [species]);

  // Dynamic filter for active quick-tab
  const displayedSpecies = useMemo(() => {
    switch (activeTab) {
      case 'threatened':
        return species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus));
      case 'endemic':
        return species.filter(s => s.endemismStatus && (s.endemismStatus.includes('endemic') || s.endemismStatus.includes('kashmir') || s.endemismStatus.includes('himalayan')));
      case 'ungulates':
        return species.filter(s => s.category === 'Artiodactyla');
      case 'carnivores':
        return species.filter(s => s.category === 'Carnivora');
      case 'primates':
        return species.filter(s => s.category === 'Primates');
      case 'rodents-bats':
        return species.filter(s => ['Rodentia', 'Chiroptera', 'Lagomorpha', 'Eulipotyphla', 'Pholidota'].includes(s.category));
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

  // Standardized Western Himalayan Mammalian Macro-Habitats
  const macroHabitats = [
    'Temperate Mixed Conifer Forests',
    'Subalpine Birch & Fir Woodlands',
    'Alpine Meadows & Glacial Moraines',
    'Precipitous Cliffs & Rugged Crags',
    'High-Altitude Arid Plateaus (Ladakh)',
    'Riverine & Lacustrine Riparian Forests',
    'Lowland Shrublands & Agricultural Margins'
  ];

  const metrics = [
    { label: 'Total Mammals Tracked', value: totalCount, icon: 'Mountain' },
    { label: 'Threatened Species', value: threatenedCount, icon: 'Shield' },
    { label: 'Himalayan Endemics', value: endemicCount, icon: 'MapPin' },
    { label: 'Strict Kashmir Endemics', value: strictKashmirEndemics, icon: 'CheckCircle' },
    { label: 'Critically Endangered (CR)', value: crCount, icon: 'AlertTriangle' },
    { label: 'Wild Ungulates', value: ungulatesCount, icon: 'Trees' },
    { label: 'Apex Carnivores', value: carnivoresCount, icon: 'Compass' },
    { label: 'Districts Monitored', value: allDistricts.length, icon: 'Map' },
  ];

  const filters = {
    habitats: macroHabitats,
    districts: allDistricts,
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  // Curated spotlight datasets with priority sorting
  const flagshipUngulates = useMemo(() => {
    const priority: Record<string, number> = { CR: 1, EN: 2, VU: 3, NT: 4, LC: 5 };
    return [...species]
      .filter(s => s.category === 'Artiodactyla')
      .sort((a, b) => (priority[a.conservationStatus] || 9) - (priority[b.conservationStatus] || 9))
      .slice(0, 10);
  }, [species]);

  const apexCarnivores = useMemo(() => {
    const priority: Record<string, number> = { CR: 1, EN: 2, VU: 3, NT: 4, LC: 5 };
    return [...species]
      .filter(s => s.category === 'Carnivora' && (s.conservationStatus !== 'LC' || s.commonName.includes('Bear') || s.commonName.includes('Fox') || s.commonName.includes('Otter') || s.commonName.includes('Marten') || s.commonName.includes('Wolf')))
      .sort((a, b) => (priority[a.conservationStatus] || 9) - (priority[b.conservationStatus] || 9))
      .slice(0, 10);
  }, [species]);

  return (
    <BiodiversityCategoryPage
      title="Western Himalayan Mammalian Biodiversity"
      subtitle="An evidence-based mammalian intelligence database tracking 111 terrestrial and high-altitude mammal taxa across Jammu, Kashmir, Ladakh, and trans-Himalayan valleys. Mapping 14 IUCN Red List threatened species including the critically endangered Hangul stag, snow leopard, Himalayan brown bear, musk deer, and flare-horned markhor across 25 administrative districts."
      icon="Mountain"
      color="from-emerald-500 to-teal-600"
      species={displayedSpecies}
      metrics={metrics}
      filters={filters}
    >
      {/* ── Mammalian Focus Categories Filter Bar ────────────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Mountain className="w-5 h-5 text-emerald-400" />
              Mammalian Focus Categories & Guilds
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select an ecological guild, trophic niche, or conservation tier to filter the 111 mammal species.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-emerald-400">{displayedSpecies.length}</strong> of {totalCount} species
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Mammals ({totalCount})
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
            variant={activeTab === 'ungulates' ? 'default' : 'outline'}
            onClick={() => setActiveTab('ungulates')}
            className={activeTab === 'ungulates' ? 'bg-amber-600 hover:bg-amber-500 text-white font-medium shadow-lg shadow-amber-950/40' : 'border-white/10 text-amber-300 hover:text-white'}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />
            Wild Ungulates ({ungulatesCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'carnivores' ? 'default' : 'outline'}
            onClick={() => setActiveTab('carnivores')}
            className={activeTab === 'carnivores' ? 'bg-red-700 hover:bg-red-600 text-white font-medium shadow-lg shadow-red-950/40' : 'border-white/10 text-red-300 hover:text-white'}
          >
            <Compass className="w-3.5 h-3.5 mr-1 text-red-300" />
            Carnivores & Predators ({carnivoresCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'primates' ? 'default' : 'outline'}
            onClick={() => setActiveTab('primates')}
            className={activeTab === 'primates' ? 'bg-cyan-700 hover:bg-cyan-600 text-white font-medium shadow-lg shadow-cyan-950/40' : 'border-white/10 text-cyan-300 hover:text-white'}
          >
            <Trees className="w-3.5 h-3.5 mr-1 text-cyan-300" />
            Primates & Langurs ({primatesCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'rodents-bats' ? 'default' : 'outline'}
            onClick={() => setActiveTab('rodents-bats')}
            className={activeTab === 'rodents-bats' ? 'bg-slate-700 hover:bg-slate-600 text-white font-medium shadow-lg shadow-slate-950/40' : 'border-white/10 text-slate-300 hover:text-white'}
          >
            <Activity className="w-3.5 h-3.5 mr-1 text-slate-300" />
            Rodents, Pikas & Bats ({rodentsBatsCount})
          </Button>
        </div>
      </div>

      {/* ── Mammalian Intelligence Spotlight ─────────────────────────────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Mammalian Conservation Intelligence Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Curated perspectives on flagship high-altitude ungulates, apex carnivores, and vertical habitat refugia.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveInsight('ungulates')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'ungulates'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Royal Ungulates (Artiodactyla)
            </button>
            <button
              onClick={() => setActiveInsight('carnivores')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'carnivores'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Apex Carnivores & Predators
            </button>
            <button
              onClick={() => setActiveInsight('altitudinal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'altitudinal'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Altitudinal Strata
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeInsight === 'ungulates' && (
            <motion.div
              key="ungulates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3"
            >
              {flagshipUngulates.map(sp => (
                <div 
                  key={sp.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {sp.endemismStatus === 'kashmir-endemic' ? 'Valley Endemic' : 'Himalayan'}
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

          {activeInsight === 'carnivores' && (
            <motion.div
              key="carnivores"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3"
            >
              {apexCarnivores.map(sp => (
                <div 
                  key={sp.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-red-500/20 hover:border-red-500/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1">
                      <ShieldAlert className="w-2.5 h-2.5" />
                      {sp.conservationStatus === 'CR' ? 'CRITICALLY ENDANGERED' : sp.conservationStatus === 'EN' ? 'ENDANGERED' : sp.conservationStatus === 'VU' ? 'VULNERABLE' : 'PROTECTED'}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {sp.category}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-sm line-clamp-1">
                    {sp.commonName}
                  </h5>
                  {sp.localName && (
                    <div className="text-[11px] text-emerald-400 font-medium truncate mt-0.5">
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
                    <span>Range: {sp.elevationRange.min}-{sp.elevationRange.max}m</span>
                    <span className="text-red-400 font-medium">{sp.districts.length} core districts</span>
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
              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400 block mb-1">Cold Desert Arid Plateaus</span>
                <h5 className="text-sm font-semibold text-white mb-2">Ladakh & Karakoram (3,500m – 5,500m)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Extreme hypoxic adaptations. Primary stronghold for Snow Leopard (Shan), Tibetan Wolf, Kiang (Wild Ass), Himalayan Marmot, and Ladakh Pika.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Taxa: <span className="text-slate-300">Panthera uncia, Canis chanco, Marmota</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20">
                <span className="text-xs font-bold text-indigo-400 block mb-1">Alpine Scree & Precipices</span>
                <h5 className="text-sm font-semibold text-white mb-2">Pir Panjal & Great Himalayas (2,800m – 4,800m)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Sheer vertical cliffs and alpine meadows. Home to the Himalayan Brown Bear (Lal Haput), Flare-horned Markhor, Siberian Ibex, and Himalayan Tahr.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Taxa: <span className="text-slate-300">Ursus arctos, Capra falconeri, Capra sibirica</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-400 block mb-1">Temperate Conifer Forests</span>
                <h5 className="text-sm font-semibold text-white mb-2">Kashmir Core & Valley Rim (1,600m – 3,200m)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Dense deodar, pine, and fir canopies. Last surviving global sanctuary of the Critically Endangered Hangul (Kashmir Stag), Musk Deer, and Gray Langur.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Taxa: <span className="text-slate-300">Cervus hanglu, Moschus cupreus, Semnopithecus</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Sub-Himalayan Shrub & Foothills</span>
                <h5 className="text-sm font-semibold text-white mb-2">Jammu, Shivaliks, Foothills (300m – 1,500m)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Subtropical scrub and mixed deciduous valleys. Common Leopard, Wild Boar, Sambar, Rhesus Macaque, Indian Pangolin, and Nilgai.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Taxa: <span className="text-slate-300">Panthera pardus, Sus scrofa, Rusa unicolor</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BiodiversityCategoryPage>
  );
}
