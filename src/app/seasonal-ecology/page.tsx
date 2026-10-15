'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  getSeasonalEcologyData,
  seasonalEcologyMetrics,
  seasonalEcologyNavigationCards,
  kashmirDistrictSeasons
} from '@/data/seasonal-ecology';
import { motion, AnimatePresence } from 'framer-motion';

function formatLabel(value: string) {
  if (!value) return '';
  return value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

const HABITAT_CONFIGS: Record<string, {
  label: string;
  icon: keyof typeof Icons;
  tag: string;
  elevation: string;
  dominantFlora: string[];
  indicatorFauna: string[];
  keyDivisions: string[];
  description: string;
  seasons: {
    spring: { title: string; phenology: string; fauna: string; cue: string };
    summer: { title: string; phenology: string; fauna: string; cue: string };
    autumn: { title: string; phenology: string; fauna: string; cue: string };
    winter: { title: string; phenology: string; fauna: string; cue: string };
  };
}> = {
  'temperate-forest': {
    label: 'Temperate Coniferous & Broadleaf Forest',
    icon: 'Trees',
    tag: 'Montane Forest Biome',
    elevation: '1,600m – 3,200m ASL',
    dominantFlora: [
      'Pinus wallichiana (Kail / Blue Pine)',
      'Cedrus deodara (Deodar / Himalayan Cedar)',
      'Abies pindrow (Silver Fir)',
      'Aesculus indica (Himalayan Horse Chestnut)',
      'Quercus semecarpifolia (Brown Oak)',
      'Rhododendron campanulatum',
      'Juglans regia (Wild Walnut)'
    ],
    indicatorFauna: [
      'Cervus hanglu hanglu (Kashmir Stag / Hangul)',
      'Ursus thibetanus (Himalayan Black Bear)',
      'Panthera pardus (Common Leopard)',
      'Lophophorus impejanus (Himalayan Monal)',
      'Tragopan melanocephalus (Western Tragopan)',
      'Terpsiphone paradisi (Asian Paradise Flycatcher)'
    ],
    keyDivisions: [
      'Dachigam National Park & Biosphere',
      'Overa-Aru Wildlife Sanctuary',
      'Kazinag National Park',
      'Lolab & Rajwar Forest Divisions',
      'Chenab Valley Conifer Belts',
      'Sindh Valley Mixed Forests'
    ],
    description: 'Western Himalayan temperate conifer and broadleaf forests form Kashmir’s ecological spine, buffering catchment watersheds, harboring critically endangered Hangul herds, and displaying dramatic four-season phenological shifts.',
    seasons: {
      spring: {
        title: 'Snowmelt & Understory Flush',
        phenology: 'Snowmelt triggers rapid sprouting of spring geophytes (Trillium, Podophyllum, Fritillaria roylei). Conifer sap ascends; fresh needle flush emerges on Pinus wallichiana and Cedrus deodara.',
        fauna: 'Hangul herds disperse upward from winter riverbeds into mid-elevation forest glades (2,000–2,400m). Himalayan Monals commence vibrant courtship calling along forest margins.',
        cue: 'Mean soil temp > 7°C & southern slope thaw'
      },
      summer: {
        title: 'Dense Canopy Closure & Reproduction',
        phenology: 'Dense conifer needles and broadleaf canopies intercept 70% of incident radiation. Female conifer cones swell; understory ferns and Viburnum shrubs enter peak vegetative vigor.',
        fauna: 'Himalayan Black Bears forage on forest-floor herbs and wild berries. Female Hangul birth solitary fawns in secluded conifer thickets. Intense insectivore breeding activity.',
        cue: 'Peak photoperiod (14.2h) & monsoon cloud interception'
      },
      autumn: {
        title: 'Deciduous Senescence & Hangul Rutting Roar',
        phenology: 'Deciduous trees (Horse Chestnut, Maple, Oak) ignite in deep gold and bronze. Oak acorn mast fall and wild hazelnut ripening provide vital high-caloric food stores.',
        fauna: 'The world-famous Hangul Rutting Season: mature stags descend to lower Dachigam forest floors (1,700–1,900m) with resonant mating roars. Black bears actively hyperphagize before winter.',
        cue: 'First sub-zero night frost & day length < 11h'
      },
      winter: {
        title: 'Thermal Shelter & Deep Snowpack Refugium',
        phenology: 'Deciduous trees enter complete dormancy. Conifer canopies intercept 40% of snowfall, reducing snowpack depth on forest floors to provide protected movement corridors.',
        fauna: 'Hangul concentrate on south-facing oak and riverine slopes (1,600–2,000m) with reduced snow accumulation. Black bears den in limestone caves. Mixed winter bird flocks forage in conifer bark.',
        cue: 'Sub-zero temperatures (-2°C to -12°C) & deep snowpack'
      }
    }
  },
  'alpine-meadow': {
    label: 'High Alpine & Subalpine Meadows (Margs)',
    icon: 'Mountain',
    tag: 'Cryospheric Highland Belt',
    elevation: '3,000m – 4,500m ASL',
    dominantFlora: ['Primula denticulata', 'Saussurea costus', 'Gentiana kurroo', 'Juniperus squamata', 'Aconitum heterophyllum'],
    indicatorFauna: ['Ursus arctos isabellinus (Brown Bear)', 'Capra falconeri (Markhor)', 'Marmota himalayana (Marmot)', 'Panthera uncia (Snow Leopard)'],
    keyDivisions: ['Gulmarg / Aphrawat Meadows', 'Sonamarg & Thajiwas Range', 'Gurez & Tulail High Glades', 'Tosamaidan Alpine Plateau'],
    description: 'High-altitude subalpine and alpine pastures emerge from deep snow cover between June and September, exploding into carpeted wildflower displays and serving as crucial summer grazing grounds for transhumant pastoralists and high-altitude wildlife.',
    seasons: {
      spring: {
        title: 'Late Snowmelt Emergence',
        phenology: 'Late May to June thaw exposes alpine herb cushions; pioneer Primulas sprout directly through retreating snowbanks.',
        fauna: 'Himalayan Marmots emerge from 7-month winter hibernation burrows; Brown Bears patrol ridge margins.',
        cue: 'Persistent snowpack retreat & solar altitude > 65°'
      },
      summer: {
        title: 'Hyper-Accelerated Wildflower Bloom',
        phenology: 'Ultra-compressed 8-week vegetative lifecycle. Saussurea, Gentians, and alpine Asters bloom in synchronized saturation.',
        fauna: 'Markhor and Ibex graze on nutritious alpine graminoids. High bumblebee pollination synchrony across steep gradients.',
        cue: 'Peak summer thermal window (12°C–18°C day temps)'
      },
      autumn: {
        title: 'Early Frost & Alpine Senescence',
        phenology: 'Mid-September frosts turn alpine turf from green to burnt rust. Seeds disperse on strong mountain winds.',
        fauna: 'Ungulates descend below the treeline (subalpine birch zone). Marmots plug burrows for winter torpor.',
        cue: 'First sub-zero freeze & high-altitude squalls'
      },
      winter: {
        title: 'Total Cryospheric Inundation',
        phenology: 'Complete vegetative dormancy under 2 to 5 meters of persistent snow and avalanche debris.',
        fauna: 'Fauna entirely absent or confined to subterranean hibernacula and windswept rocky wind-blown ridges.',
        cue: 'Continuous sub-zero freeze (-10°C to -25°C)'
      }
    }
  },
  'wetland': {
    label: 'Valley Wetlands, Ramsar Sites & Lakes',
    icon: 'Droplets',
    tag: 'Aquatic & Palustrine Biome',
    elevation: '1,560m – 1,600m ASL',
    dominantFlora: ['Nelumbo nucifera (Lotus)', 'Trapa natans (Water Chestnut)', 'Phragmites australis', 'Typha angustifolia'],
    indicatorFauna: ['Anas crecca (Common Teal)', 'Aythya ferina (Common Pochard)', 'Anser anser (Greylag Goose)', 'Alcedo atthis (Kingfisher)'],
    keyDivisions: ['Hokersar Ramsar Reserve', 'Wular Lake Basin', 'Dal & Nigeen Lake Complex', 'Shallabugh & Mirgund Wetland Reserves'],
    description: 'The vast lacustrine and palustrine wetland network of the Jhelum basin acts as Kashmir’s natural flood basin, supporting millions of winter migratory waterfowl traveling along the Central Asian Flyway.',
    seasons: {
      spring: {
        title: 'Spring Snowmelt Flush & Spawning',
        phenology: 'Rising water levels from mountain snowmelt flush silt into reed beds. Typha and Phragmites shoots emerge vigorously.',
        fauna: 'Wintering waterfowl depart northward for Siberian breeding grounds; local resident birds begin reed-nesting.',
        cue: 'Jhelum basin river discharge increase & water temp > 12°C'
      },
      summer: {
        title: 'Lotus Bloom & Aquatic Biomass Peak',
        phenology: 'Extensive Nelumbo nucifera (Lotus) and Trapa natans canopy covers open waters. Floating gardens (Radh) at peak harvest.',
        fauna: 'High density of dragonflies, amphibians, and resident waterbirds (Moorhens, Little Grebes, Whiskered Terns).',
        cue: 'Maximum water surface temperature (22°C–26°C)'
      },
      autumn: {
        title: 'Macrophyte Decay & Flyway Arrival',
        phenology: 'Lotus leaves and water lilies senesce and collapse, depositing nutrient-rich organic detritus to lake beds.',
        fauna: 'The Great Autumn Migration: Hundreds of thousands of trans-Himalayan waterfowl arrive from Siberia and Central Asia.',
        cue: 'Northern freeze-up & dropping valley ambient temperatures'
      },
      winter: {
        title: 'Peak Waterfowl Aggregation & Partial Freeze',
        phenology: 'Marsh grasses desiccate into insulating yellow thatch. Surface waters periodically freeze during Chilai Kalan.',
        fauna: 'Over 1 million migratory ducks, geese, and waders pack open water leads in Hokersar, Shallabugh, and Wular.',
        cue: 'Sub-zero freezing of peripheral shallow marshes'
      }
    }
  },
  'orchard-belt': {
    label: 'Cultivated Valley Orchard Belts',
    icon: 'Apple',
    tag: 'Horticultural Agro-Ecology',
    elevation: '1,580m – 1,850m ASL',
    dominantFlora: ['Malus domestica (Apple)', 'Prunus dulcis (Almond)', 'Prunus avium (Cherry)', 'Pyrus communis (Pear)'],
    indicatorFauna: ['Apis cerana indica (Honeybee)', 'Bombus species (Bumblebees)', 'Kashmir Flycatcher', 'House Sparrow'],
    keyDivisions: ['Shopian Apple Core Belt', 'Sopore / Baramulla Plateau', 'Pulwama & Pampore Slopes', 'Badamwari Historic Orchard'],
    description: 'Extensive horticultural orchard belts blanket the Karewa terraces and valley slopes, creating man-made ecological bloom corridors essential for insect pollination, fruit production, and local rural livelihood.',
    seasons: {
      spring: {
        title: 'The Great Spring Bloom Synchrony',
        phenology: 'Sequential flowering: Almonds bloom first (March), followed by Apricot, Cherry, Pear, and finally Apple (April–May).',
        fauna: 'Intense pollinator activity: Native Apis cerana and wild solitary bees swarm blossoms in synchronization with sunny windows.',
        cue: 'Accumulated chilling hours fulfilled & spring warming'
      },
      summer: {
        title: 'Fruit Swelling & Foliage Development',
        phenology: 'Petals fall and fruitlets set. Dense orchard leaf canopies buffer humidity and soil moisture.',
        fauna: 'Insectivorous songbirds patrol fruit trees, controlling lepidopteran and aphid pests naturally.',
        cue: 'High solar radiation & active irrigation'
      },
      autumn: {
        title: 'The Harvest & Karewa Color Transition',
        phenology: 'Apples reach full color and sugar maturity. Golden harvest blankets the valley; leaves senesce to russet red.',
        fauna: 'Wasp and butterfly swarms forage on fallen, overripe fruit sugars before winter dormancy.',
        cue: 'Cool autumn nights with high diurnal temperature variation'
      },
      winter: {
        title: 'Dormancy & Winter Pruning Architecture',
        phenology: 'Complete vegetative dormancy. Snow accumulates on pruned branches, providing winter moisture upon melting.',
        fauna: 'Overwintering bird flocks (Chaffinches, Bramblings, Tits) glean overwintering insect pupae from bark crevices.',
        cue: 'Chilai Kalan winter chill period'
      }
    }
  },
  'river-valley': {
    label: 'Riparian & Fluvial River Corridors',
    icon: 'Waves',
    tag: 'Fluvial Hydrological Corridor',
    elevation: '1,560m – 2,400m ASL',
    dominantFlora: ['Salix alba (White Willow)', 'Populus deltoides (Poplar)', 'Platanus orientalis (Chinar)', 'Alnus nitida (Himalayan Alder)'],
    indicatorFauna: ['Schizothorax (Snow Trout)', 'Triplophysa kashmirensis', 'Halcyon smyrnensis (White-throated Kingfisher)', 'Cinclus pallasii (Brown Dipper)'],
    keyDivisions: ['Jhelum Main Stem Corridor', 'Lidder River Watershed', 'Sindh River Valley', 'Rambiara & Romshi Streams'],
    description: 'Riverine riparian corridors connect mountain headwaters to valley lakes, providing dynamic hydrological pulses, critical coldwater fish spawning grounds, and structural connectivity for terrestrial wildlife.',
    seasons: {
      spring: {
        title: 'Spring Snowmelt Discharge Peak',
        phenology: 'Riparian willows and poplars burst into catkins. Shoreline herbaceous vegetation flushes along riverbanks.',
        fauna: 'Indigenous snow trout (Schizothorax) begin upstream spawning migrations against swollen meltwater currents.',
        cue: 'Rising mountain temperatures causing rapid catchment snowmelt'
      },
      summer: {
        title: 'High Turbidity & Glacial Runoff',
        phenology: 'Chinar and Alder trees achieve maximum leaf surface area, shading riverbanks and cooling water temperatures.',
        fauna: 'High macroinvertebrate drift (Mayflies, Stoneflies, Caddisflies) supporting thriving coldwater fisheries.',
        cue: 'Glacial melt contributing peak suspended sediment loads'
      },
      autumn: {
        title: 'Crystal Clear Base Flow & Golden Canopies',
        phenology: 'Spectacular reflection of crimson and golden Chinar canopies in crystal-clear autumn base-flow waters.',
        fauna: 'Adult snow trout return to deeper overwintering river pools in the lower Jhelum and valley lakes.',
        cue: 'Receding river discharge and clearing water transparency'
      },
      winter: {
        title: 'Minimum Low Flow & Shoreline Ice Fringes',
        phenology: 'Riparian broadleaf trees stand bare; riverbanks develop delicate morning needle-ice and frozen margins.',
        fauna: 'Brown Dippers and White-throated Kingfishers forage actively in open gravel riffles where water does not freeze.',
        cue: 'Catchment precipitation locked entirely as high-altitude snow'
      }
    }
  }
};

function SeasonalEcologyHubContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const habitatParam = searchParams.get('habitat');

  const [selectedHabitat, setSelectedHabitat] = useState<string>(
    habitatParam && HABITAT_CONFIGS[habitatParam] ? habitatParam : (habitatParam === 'all' ? 'all' : (habitatParam || 'all'))
  );

  const [activeSeasonTab, setActiveSeasonTab] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('spring');

  // Handle URL sync
  const handleSelectHabitat = (key: string) => {
    setSelectedHabitat(key);
    if (key === 'all') {
      router.push('/seasonal-ecology');
    } else {
      router.push(`/seasonal-ecology?habitat=${key}`);
    }
  };

  const currentMonth = new Date().getMonth() + 1;
  const getCurrentSeason = () => {
    if (currentMonth >= 3 && currentMonth <= 5) return 'spring';
    if (currentMonth >= 6 && currentMonth <= 8) return 'summer';
    if (currentMonth >= 9 && currentMonth <= 11) return 'autumn';
    return 'winter';
  };
  const currentSeason = getCurrentSeason();

  const allLandscapes = getSeasonalEcologyData.landscapes.all();
  const allBlooms = getSeasonalEcologyData.blooms.all();
  const allMigrations = getSeasonalEcologyData.migration.all();

  // Filter landscapes by habitat
  const filteredLandscapes = useMemo(() => {
    if (selectedHabitat === 'all') return allLandscapes;
    return allLandscapes.filter(landscape => {
      const cat = landscape.category.toLowerCase();
      const slug = landscape.slug.toLowerCase();
      const name = landscape.name.toLowerCase();
      const desc = landscape.description.toLowerCase();

      if (selectedHabitat === 'temperate-forest') {
        return cat.includes('forest') || slug.includes('forest') || slug.includes('temperate') || name.includes('forest') || desc.includes('forest') || slug.includes('ajkmoist') || slug.includes('autumn');
      }
      if (selectedHabitat === 'alpine-meadow') {
        return cat.includes('alpine') || slug.includes('alpine') || name.includes('alpine') || desc.includes('alpine') || slug.includes('pastures');
      }
      if (selectedHabitat === 'wetland') {
        return cat.includes('wetland') || slug.includes('wetland') || slug.includes('winter') || desc.includes('wetland');
      }
      if (selectedHabitat === 'orchard-belt') {
        return cat.includes('orchard') || slug.includes('orchard') || desc.includes('orchard');
      }
      if (selectedHabitat === 'river-valley') {
        return cat.includes('river') || slug.includes('river') || slug.includes('indus') || desc.includes('river');
      }
      return true;
    });
  }, [selectedHabitat, allLandscapes]);

  // Filter blooms by habitat
  const filteredBlooms = useMemo(() => {
    if (selectedHabitat === 'all') return allBlooms;
    return allBlooms.filter(bloom => {
      const desc = (bloom.description || '').toLowerCase();
      const name = (bloom.name || '').toLowerCase();

      if (selectedHabitat === 'temperate-forest') {
        return desc.includes('forest') || name.includes('rhododendron') || desc.includes('chestnut') || desc.includes('conifer') || desc.includes('understory') || name.includes('spring');
      }
      if (selectedHabitat === 'alpine-meadow') {
        return desc.includes('alpine') || name.includes('alpine') || desc.includes('meadow') || (bloom.elevationMin && bloom.elevationMin >= 2800);
      }
      if (selectedHabitat === 'wetland') {
        return desc.includes('water') || desc.includes('lake') || name.includes('lotus') || desc.includes('wetland');
      }
      if (selectedHabitat === 'orchard-belt') {
        return desc.includes('orchard') || name.includes('almond') || name.includes('tulip') || name.includes('apple') || desc.includes('bloom');
      }
      return true;
    });
  }, [selectedHabitat, allBlooms]);

  // Active habitat config if selected
  const activeHabitatConfig = HABITAT_CONFIGS[selectedHabitat];

  // Right Content Showcase Card
  const seasonalHeroShowcase = (
    <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl shadow-emerald-950/60 bg-slate-900/80 backdrop-blur-md p-3">
      <div className="flex items-center justify-between px-1 py-1 mb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">
            {activeHabitatConfig ? activeHabitatConfig.tag : 'Kashmir Phenology Sentinel'}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold">
          {currentSeason.toUpperCase()} 2026
        </span>
      </div>

      <div className="relative h-52 sm:h-56 w-full rounded-xl overflow-hidden border border-white/10 group">
        <img
          src={
            selectedHabitat === 'temperate-forest'
              ? '/images/bear.png'
              : selectedHabitat === 'alpine-meadow'
              ? '/images/markhor.png'
              : selectedHabitat === 'orchard-belt'
              ? '/images/protected-network.png'
              : '/images/tiger.png'
          }
          alt="Habitat Visual"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-2.5 left-3 right-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-sm font-bold text-white drop-shadow-md">
              {activeHabitatConfig ? activeHabitatConfig.label : 'Western Himalayan Ecosystems'}
            </h4>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold flex-shrink-0">
              Active Monitored
            </span>
          </div>
          <div className="text-[11px] text-slate-300 flex items-center justify-between">
            <span className="text-emerald-300">
              {activeHabitatConfig ? activeHabitatConfig.elevation : '1,560m – 4,500m ASL'}
            </span>
            <span className="text-slate-400 text-[10px]">
              {selectedHabitat === 'all' ? 'All Kashmir Basins' : '10 Districts Monitored'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Habitat Switcher Buttons */}
      <div className="grid grid-cols-3 gap-1.5 mt-2.5">
        {[
          { key: 'temperate-forest', label: 'Forests', icon: 'Trees' },
          { key: 'alpine-meadow', label: 'Alpine Margs', icon: 'Mountain' },
          { key: 'all', label: 'All Habitats', icon: 'Layers' },
        ].map(btn => {
          const IconComp = (Icons as any)[btn.icon] || Icons.Trees;
          return (
            <button
              key={btn.key}
              type="button"
              onClick={() => handleSelectHabitat(btn.key)}
              className={`p-1.5 rounded-lg border text-center text-[10px] font-medium transition-all flex items-center justify-center gap-1 ${
                selectedHabitat === btn.key
                  ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold'
                  : 'border-white/10 bg-slate-800/60 text-slate-400 hover:border-emerald-500/30 hover:text-white'
              }`}
            >
              <IconComp className="w-3 h-3" />
              <span>{btn.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <Heading
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Seasonal Ecology', href: '/seasonal-ecology' },
          ...(selectedHabitat !== 'all' ? [{ label: formatLabel(selectedHabitat) }] : [])
        ]}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                KEW
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
                Seasonal Ecology &amp; Phenology Hub
              </span>
            </div>
          </div>
        }
        subtitle={
          selectedHabitat === 'temperate-forest'
            ? 'Authoritative seasonal phenology, canopy dynamics, understory flush, and faunal migration rhythms across Kashmir’s temperate coniferous and broadleaf forests.'
            : "Kashmir-wide phenology, seasonality, migration, habitat-transition, and ecological-timing intelligence system. Track bloom cycles, migration windows, pollinator activity, and seasonal shifts across the valley."
        }
        icon={<Icons.Sun className="w-6 h-6 text-emerald-400" />}
        label={`Current Season: ${formatLabel(currentSeason)} · ${selectedHabitat === 'all' ? 'All Habitats' : formatLabel(selectedHabitat)}`}
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={seasonalHeroShowcase}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Link href="/seasonal-ecology/bloom-mapping">
              <Button variant="primary" size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500 font-bold shadow-lg">
                <Icons.Flower2 className="w-5 h-5 mr-2" />
                Explore Bloom Mapping
              </Button>
            </Link>
            <Link href="/seasonal-ecology/migration-windows">
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 font-bold">
                <Icons.Bird className="w-5 h-5 mr-2" />
                Migration Windows
              </Button>
            </Link>
            <Link href="/biodiversity/pollinator-activity">
              <Button variant="outline" size="lg" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 font-bold">
                <Icons.Activity className="w-5 h-5 mr-2" />
                Pollinator Watch
              </Button>
            </Link>
          </div>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* INTERACTIVE HABITAT FILTER BAR                                */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-8">
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-3 sm:p-4 backdrop-blur-md shadow-2xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icons.Filter className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Filter by Ecological Habitat:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'All Habitats', icon: Icons.Layers },
              { id: 'temperate-forest', label: 'Temperate Forest', icon: Icons.Trees },
              { id: 'alpine-meadow', label: 'Alpine Meadows', icon: Icons.Mountain },
              { id: 'wetland', label: 'Wetlands & Lakes', icon: Icons.Droplets },
              { id: 'orchard-belt', label: 'Orchard Belts', icon: Icons.Apple },
              { id: 'river-valley', label: 'River Valleys', icon: Icons.Waves },
            ].map(tab => {
              const TabIcon = tab.icon;
              const isActive = selectedHabitat === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectHabitat(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-white/5'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* DEDICATED TEMPERATE FOREST / HABITAT SENTINEL BANNER          */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeHabitatConfig && (
        <section className="container mx-auto px-4 lg:px-6 mb-12">
          <Card className="glass-intense border-emerald-500/40 p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-slate-950">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                  <Icons.Trees className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase tracking-widest font-black text-emerald-400">
                      {activeHabitatConfig.tag}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                      Active Habitat Layer
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {activeHabitatConfig.label}
                  </h2>
                  <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                    {activeHabitatConfig.description}
                  </p>
                </div>
              </div>

              <div className="flex lg:flex-col items-center lg:items-end gap-3 flex-shrink-0">
                <div className="text-right">
                  <span className="text-xs text-slate-400">Elevation Range</span>
                  <div className="text-base font-bold text-emerald-300 font-mono">
                    {activeHabitatConfig.elevation}
                  </div>
                </div>
                <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Icons.Shield className="w-3.5 h-3.5" />
                  <span>WPA Schedule I Refugium</span>
                </div>
              </div>
            </div>

            {/* Biodiversity Matrix for Habitat */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-1.5">
                  <Icons.Leaf className="w-3.5 h-3.5" />
                  Dominant Canopy & Flora
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeHabitatConfig.dominantFlora.map((flora, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70"></span>
                      <span className="font-mono text-[11px]">{flora}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2.5 flex items-center gap-1.5">
                  <Icons.Activity className="w-3.5 h-3.5" />
                  Key Indicator Wildlife
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeHabitatConfig.indicatorFauna.map((fauna, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400/70"></span>
                      <span className="font-mono text-[11px]">{fauna}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2.5 flex items-center gap-1.5">
                  <Icons.MapPin className="w-3.5 h-3.5" />
                  Key Regional Corridors
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeHabitatConfig.keyDivisions.map((div, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400/70"></span>
                      <span>{div}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4-Season Chronology Tab Ribbon */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Icons.Calendar className="w-4 h-4 text-emerald-400" />
                  Four-Season Ecological Dynamics for {activeHabitatConfig.label}
                </h3>

                <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-white/10">
                  {(['spring', 'summer', 'autumn', 'winter'] as const).map(season => (
                    <button
                      key={season}
                      onClick={() => setActiveSeasonTab(season)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                        activeSeasonTab === season
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Season Detail Card */}
              {activeHabitatConfig.seasons[activeSeasonTab] && (
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                      Phase Focus ({activeSeasonTab.toUpperCase()})
                    </span>
                    <h4 className="text-base font-bold text-white mt-1 mb-2">
                      {activeHabitatConfig.seasons[activeSeasonTab].title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeHabitatConfig.seasons[activeSeasonTab].phenology}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      Faunal Dynamics
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">
                      {activeHabitatConfig.seasons[activeSeasonTab].fauna}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                        Environmental Trigger
                      </span>
                      <p className="text-xs text-sky-200 mt-2 font-mono">
                        {activeHabitatConfig.seasons[activeSeasonTab].cue}
                      </p>
                    </div>

                    <div className="pt-3">
                      <span className="text-[10px] text-slate-400">Habitat Monitoring System 2026</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </section>
      )}

      {/* Metrics Ribbon */}
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Card className="glass-intense border-slate-700/50">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 p-4">
            {[
              {
                label: selectedHabitat === 'all' ? 'Total Landscapes' : `${formatLabel(selectedHabitat)} Landscapes`,
                value: filteredLandscapes.length,
                icon: 'Mountain',
              },
              {
                label: selectedHabitat === 'all' ? 'Bloom Records' : `${formatLabel(selectedHabitat)} Blooms`,
                value: filteredBlooms.length,
                icon: 'Flower2',
              },
              {
                label: 'Migration Windows',
                value: allMigrations.length,
                icon: 'Bird',
              },
              {
                label: 'Active Season',
                value: formatLabel(currentSeason),
                icon: 'Sun',
              },
              {
                label: 'Districts Monitored',
                value: '10',
                icon: 'MapPin',
              },
              {
                label: 'Habitat Biomes',
                value: '6',
                icon: 'Layers',
              },
              {
                label: 'PA Forest Coverage',
                value: '16 PAs',
                icon: 'Shield',
              },
              {
                label: 'Live Telemetry',
                value: 'Active',
                icon: 'Activity',
              },
            ].map((metric, idx) => {
              const MetricIcon = (Icons as any)[metric.icon] || Icons.Mountain;
              return (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                      <MetricIcon className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                  <p className="text-xl font-bold text-white">{metric.value}</p>
                  <p className="text-[11px] text-slate-400 truncate">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* FILTERED SEASONAL LANDSCAPES                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-widest font-black text-emerald-400">
                {selectedHabitat === 'all' ? 'All Regional Ecosystems' : `${formatLabel(selectedHabitat)} Category`}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs">
                {filteredLandscapes.length} Landscapes
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {selectedHabitat === 'temperate-forest'
                ? 'Temperate Forest Landscapes of Kashmir'
                : 'Seasonal Landscapes of Kashmir'}
            </h2>
            <p className="text-slate-400 text-sm">
              {selectedHabitat === 'temperate-forest'
                ? 'Coniferous mountain corridors, temperate broadleaf belts, and biosphere transition zones'
                : 'Iconic landscape-scale seasonal patterns across the Kashmir region'}
            </p>
          </div>
          <Link href="/seasonal-ecology/seasonal-landscapes">
            <Button variant="outline" size="md">
              View All Landscapes
              <Icons.ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLandscapes.slice(0, 6).map((landscape) => (
            <Link
              key={landscape.id}
              href={`/seasonal-ecology/seasonal-landscapes/${landscape.slug}`}
              className="group"
            >
              <Card className="glass-intense border-slate-700/50 hover:border-emerald-500/40 transition-all h-full overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 overflow-hidden">
                    <img
                      src={
                        landscape.name.toLowerCase().includes('forest') || landscape.slug.includes('forest')
                          ? '/images/bear.png'
                          : '/images/protected-network.png'
                      }
                      alt={landscape.name}
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge variant="default" size="sm" className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {formatLabel(landscape.category)}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2 line-clamp-1">
                      {landscape.name}
                    </h3>
                    <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                      {landscape.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5 truncate">
                      <Icons.MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="truncate">{landscape.districts.slice(0, 3).map(formatLabel).join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px] flex-shrink-0">
                      <Icons.Mountain className="w-3.5 h-3.5 text-slate-400" />
                      <span>{landscape.elevationRange ? `${landscape.elevationRange.min}-${landscape.elevationRange.max}m` : formatLabel(landscape.elevationZone)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* FILTERED BLOOM & PHENOLOGY RECORDS                            */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-widest font-black text-pink-400">
                Phenological Transitions
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs">
                {filteredBlooms.length} Bloom Windows
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {selectedHabitat === 'temperate-forest'
                ? 'Temperate Forest Flowering & Phenology'
                : 'Current Seasonal Signals & Bloom Cycles'}
            </h2>
            <p className="text-slate-400 text-sm">
              Active ecological transitions, bud break, peak bloom, and seed set across microclimates
            </p>
          </div>
          <Link href="/seasonal-ecology/bloom-mapping">
            <Button variant="outline" size="md">
              View All Blooms
              <Icons.ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredBlooms.slice(0, 4).map((bloom) => (
            <Link
              key={bloom.id}
              href={`/seasonal-ecology/bloom-mapping/${bloom.slug}`}
              className="group"
            >
              <Card className="glass-intense border-slate-700/50 hover:border-pink-500/40 transition-all h-full flex flex-col justify-between">
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-pink-500/20 border border-pink-500/30 flex-shrink-0">
                      <Icons.Flower2 className="w-5 h-5 text-pink-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors line-clamp-1">
                        {bloom.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {bloom.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Icons.Calendar className="w-3.5 h-3.5 text-pink-400" />
                      <span className="truncate">{bloom.peakBloomPeriod}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {bloom.districts && bloom.districts.length > 0 ? formatLabel(bloom.districts[0]) : 'Kashmir'}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* NAVIGATION MODULES GRID                                       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Seasonal Ecology Submodules &amp; Analytics
          </h2>
          <p className="text-slate-400 text-sm">
            Explore dedicated intelligence layers for migration, bloom mapping, pollinator dynamics, and climate signals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seasonalEcologyNavigationCards.map((card) => {
            const CardIcon = (Icons as any)[card.icon] || Icons.Mountain;
            return (
              <Link key={card.id} href={card.link} className="group">
                <Card className={`glass-intense border-slate-700/50 hover:border-emerald-500/40 transition-all h-full overflow-hidden ${card.featured ? 'ring-1 ring-emerald-500/30' : ''}`}>
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} border border-white/10`}>
                        <CardIcon className="w-6 h-6 text-white" />
                      </div>
                      {card.featured && (
                        <Badge variant="success" size="sm">Featured Module</Badge>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">
                      {card.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Icons.Database className="w-3.5 h-3.5" />
                        <span>{card.count} {card.countLabel || 'entities'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Explore</span>
                        <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* DISTRICT SEASON HIGHLIGHTS                                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Kashmir District Seasonal Highlights
          </h2>
          <p className="text-slate-400 text-sm">
            Seasonal ecological profiles across Kashmir Valley’s districts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kashmirDistrictSeasons.slice(0, 8).map((districtSeason) => (
            <Card key={districtSeason.district} className="glass-intense border-slate-700/50 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <Icons.MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {formatLabel(districtSeason.district)}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {districtSeason.primarySeasons.length} Distinct Seasons
                  </p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Key Habitats:</span>
                  <span className="font-medium text-white">{districtSeason.keyLandscapes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Bloom Zones:</span>
                  <span className="font-medium text-white">{districtSeason.bloomZones}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Migration Windows:</span>
                  <span className="font-medium text-white">{districtSeason.migrationWindows}</span>
                </div>
              </div>
              {districtSeason.highlights && districtSeason.highlights.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-emerald-400 line-clamp-2">
                  {districtSeason.highlights.join(' · ')}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function SeasonalEcologyHubPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Icons.Sun className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-2" />
          <p className="text-slate-400 text-sm">Loading seasonal ecology intelligence...</p>
        </div>
      </div>
    }>
      <SeasonalEcologyHubContent />
    </Suspense>
  );
}
