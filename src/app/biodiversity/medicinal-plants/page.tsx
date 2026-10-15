'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, Shield, ShieldAlert, Sparkles, Activity, Search, Filter, Layers,
  CheckCircle2, AlertTriangle, HeartPulse, Mountain, FileText, BookOpen,
  Info, ExternalLink, X, ChevronRight, SlidersHorizontal, ArrowUpDown,
  ArrowRight, Pill, FlaskConical, Droplets, Sun, Sparkle, Tag, Eye,
  Table, Grid3X3, List, HelpCircle, MapPin, Compass, Thermometer,
  Flame, Beaker, Check, Share2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { medicinalPhase1, medicinalEthnoDetails, type MedicinalEthnoDetail } from '@/data/species/medicinal';
import { type BiodiversitySpecies } from '@/types/biodiversity';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';

export default function MedicinalPlantsPage() {
  // Master Dataset (127 species)
  const speciesList: BiodiversitySpecies[] = medicinalPhase1;

  // Active Pharmacopeia Tab
  const [activeMainTab, setActiveMainTab] = useState<'catalog' | 'traditions' | 'formulary' | 'phytochemistry'>('catalog');

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreset, setActivePreset] = useState<
    'all' | 'threatened' | 'endemic' | 'kashmir-endemic' | 'cr' | 'en' | 'vu' | 'banned' |
    'respiratory' | 'digestive' | 'rheumatic' | 'nervine' | 'wound' | 'cardio'
  >('all');
  const [selectedEndemism, setSelectedEndemism] = useState<string>('all');
  const [selectedSystem, setSelectedSystem] = useState<string>('all');
  const [selectedPart, setSelectedPart] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedAltitude, setSelectedAltitude] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedSpecies, setSelectedSpecies] = useState<BiodiversitySpecies | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(24);

  // Exact calculations for user focal metrics
  const totalTaxa = speciesList.length; // 127
  const threatenedList = speciesList.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)); // 25
  const endemicList = speciesList.filter(s => s.endemismStatus !== 'widely-distributed'); // 86
  const kashmirEndemicList = speciesList.filter(s => s.endemismStatus === 'kashmir-endemic'); // 12
  const crCount = speciesList.filter(s => s.conservationStatus === 'CR').length; // 6
  const enCount = speciesList.filter(s => s.conservationStatus === 'EN').length; // 9
  const vuCount = speciesList.filter(s => s.conservationStatus === 'VU').length; // 10
  const bannedCount = 14;

  // Quick preset definitions
  const presetFilters = [
    { id: 'all', label: 'All 127 Medicinal Taxa', icon: Leaf, count: totalTaxa, color: 'emerald' },
    { id: 'threatened', label: '25 Threatened Taxa (ALL)', icon: AlertTriangle, count: threatenedList.length, color: 'red' },
    { id: 'endemic', label: '86 Endemic Taxa (ALL)', icon: MapPin, count: endemicList.length, color: 'purple' },
    { id: 'kashmir-endemic', label: '12 Kashmir Valley Endemics', icon: Sparkles, count: kashmirEndemicList.length, color: 'amber' },
    { id: 'cr', label: '6 Critically Endangered (CR)', icon: ShieldAlert, count: crCount, color: 'rose' },
    { id: 'en', label: '9 Endangered (EN)', icon: AlertTriangle, count: enCount, color: 'orange' },
    { id: 'vu', label: '10 Vulnerable (VU)', icon: Activity, count: vuCount, color: 'yellow' },
    { id: 'banned', label: '14 CITES Banned / Protected', icon: Shield, count: bannedCount, color: 'cyan' },
    { id: 'respiratory', label: 'Respiratory & Asthma', icon: Droplets, count: 16, color: 'blue' },
    { id: 'digestive', label: 'Digestive & Hepatic', icon: Activity, count: 25, color: 'amber' },
    { id: 'rheumatic', label: 'Rheumatism & Joint Pain', icon: HeartPulse, count: 18, color: 'rose' },
    { id: 'nervine', label: 'Nervine & Mind', icon: Sparkles, count: 14, color: 'purple' },
    { id: 'wound', label: 'Wound Care & Skin', icon: Shield, count: 28, color: 'teal' },
    { id: 'cardio', label: 'Cardio & Vitality', icon: Sun, count: 14, color: 'orange' },
  ];

  // Core Phytochemical Profiles for Directory
  const phytochemicalCatalog = [
    {
      name: "Costunolide & Dehydrocostus Lactone",
      class: "Sesquiterpene Lactones",
      source: "Saussurea costus (Kuth)",
      kashmiri: "Kuth",
      speciesId: "medicinal-1",
      mechanism: "Potent inhibitor of NF-kappaB nuclear translocation, reducing pro-inflammatory cytokines (TNF-a, IL-1b); relaxes bronchial smooth muscle.",
      indications: "Bronchial asthma, chronic cough, gastric ulcers, and inflammatory polyarthritis.",
      conservation: "CITES Appendix I / WPA Schedule VI (Strictly Banned from Wild Extraction)"
    },
    {
      name: "Atisine & Heteratisine",
      class: "Non-toxic Diterpene Alkaloids",
      source: "Aconitum heterophyllum (Atis)",
      kashmiri: "Patis / Atis",
      speciesId: "medicinal-2",
      mechanism: "Modulates thermoregulatory hypothalamic center; antipyretic and febrifugal without cardiac sodium-channel toxicity seen in toxic aconites.",
      indications: "Pediatric fevers, malaria, acute dyspepsia, vomiting, and post-febrile convalescence.",
      conservation: "Critically Endangered in J&K / NMPB Top Priority"
    },
    {
      name: "Aconitine & Chasmaconitine",
      class: "Highly Potent Norditerpenoid Ester Alkaloids",
      source: "Aconitum chasmanthum (Mohra)",
      kashmiri: "Mohra / Mitha Zahar",
      speciesId: "medicinal-3",
      mechanism: "Binds voltage-gated sodium channels keeping them persistently open; lethal in raw state; Shodhana-purified extracts deliver extreme peripheral nerve analgesia.",
      indications: "Intractable sciatica, severe trigeminal neuralgia, and advanced rheumatoid arthritis.",
      conservation: "Critically Endangered / Toxic Flora Regulation"
    },
    {
      name: "Paclitaxel (Taxol) & 10-DAB",
      class: "Taxane Diterpenoids",
      source: "Taxus wallichiana (Himalayan Yew)",
      kashmiri: "Posthal",
      speciesId: "medicinal-9",
      mechanism: "Microtubule stabilizer; binds beta-tubulin subunit, preventing depolymerization and arresting eukaryotic cell cycle at G2/M phase.",
      indications: "Frontline oncology chemotherapy for metastatic ovarian, breast, and non-small cell lung carcinomas.",
      conservation: "Endangered / CITES Appendix II (Regulated Trade)"
    },
    {
      name: "Podophyllotoxin & 4'-Demethylpodophyllotoxin",
      class: "Aryltetralin Lignans",
      source: "Podophyllum hexandrum (Bankakri)",
      kashmiri: "Bankakri / Wan-vangun",
      speciesId: "medicinal-6",
      mechanism: "Binds colchicine site on tubulin, preventing microtubule assembly; chemical precursor for etoposide and teniposide.",
      indications: "Chemotherapy for refractory lymphomas, testicular tumors, and topical treatment of condylomata acuminata.",
      conservation: "Endangered / CITES Appendix II"
    },
    {
      name: "Picroside I & II (Kutkoside)",
      class: "Iridoid Glycosides",
      source: "Picrorhiza kurrooa (Kutki)",
      kashmiri: "Kour / Kutki",
      speciesId: "medicinal-7",
      mechanism: "Accelerates liver parenchymal regeneration, restores mitochondrial glutathione pools, and stabilizes hepatocyte membranes against viral/chemical insults.",
      indications: "Viral and toxic hepatitis, cirrhosis, chronic jaundice, and intermittent fever.",
      conservation: "Endangered in J&K / Alpine Scree Extraction Monitored"
    },
    {
      name: "Shikonin & Alkannin Esters",
      class: "Naphthoquinones (Intense Crimson Pigments)",
      source: "Arnebia benthamii & Onosma hispida",
      kashmiri: "Kahzaban & Ratanjot",
      speciesId: "medicinal-13",
      mechanism: "Promotes granulation tissue formation, collagen cross-linking, and potent antimicrobial membrane disruption.",
      indications: "Deep thermal burns, open lacerations, scalp alopecia, and respiratory catarrh.",
      conservation: "Endangered / High Commercial Root Mining Pressure"
    },
    {
      name: "Berberine & Berbamine",
      class: "Quaternary Isoquinoline Alkaloids",
      source: "Berberis lycium (Indian Barberry)",
      kashmiri: "Kawas / Darhald / Rasaunt",
      speciesId: "medicinal-79",
      mechanism: "Activates AMP-activated protein kinase (AMPK), downregulates gluconeogenesis, and displays broad-spectrum bactericidal/antiprotozoal efficacy.",
      indications: "Ophthalmic conjunctivitis, metabolic syndrome, non-alcoholic fatty liver, and diabetic dyslipidemia.",
      conservation: "Forest Minor Produce / Transit Permit Required"
    },
    {
      name: "Colchicine",
      class: "Tropolone Alkaloid",
      source: "Colchicum luteum (Yellow Autumn Crocus)",
      kashmiri: "Suranjan-e-Talkh",
      speciesId: "medicinal-22",
      mechanism: "Binds tubulin dimers to prevent microtubule elongation, halting neutrophil chemotaxis and degranulation in acute gout.",
      indications: "Acute gout flare-ups, familial Mediterranean fever, and pericarditis.",
      conservation: "Vulnerable / Regulated Pharmaceutical Intermediate"
    },
    {
      name: "Jatamansone & Valerenic Acid",
      class: "Sesquiterpenoid Ketones & Iridoids",
      source: "Nardostachys jatamansi & Valeriana jatamansi",
      kashmiri: "Bhut-kesh & Mushkbala",
      speciesId: "medicinal-8",
      mechanism: "Modulates GABA-A receptor complex and inhibits central GABA transaminase, producing physiological sedation and anxiolysis.",
      indications: "Severe insomnia, panic disorders, hysteria, tremors, and cardiac palpitations.",
      conservation: "Critically Endangered / CITES Appendix II"
    },
    {
      name: "Ephedrine & Pseudoephedrine",
      class: "Sympathomimetic Phenethylamines",
      source: "Ephedra gerardiana (Somlata)",
      kashmiri: "Asmani / Somlata",
      speciesId: "medicinal-23",
      mechanism: "Stimulates alpha- and beta-adrenergic receptors, inducing bronchial smooth muscle relaxation and vasoconstriction of nasal mucosa.",
      indications: "Acute bronchial asthma attacks, severe altitude hypotension, and allergic rhinitis.",
      conservation: "Near Threatened / Cold Desert Scree Specialist"
    },
    {
      name: "Harmine, Harmaline & Peganine",
      class: "beta-Carboline Alkaloids & Quinazolines",
      source: "Peganum harmala (Wild Rue)",
      kashmiri: "Isband",
      speciesId: "medicinal-127",
      mechanism: "Reversible monoamine oxidase A (MAO-A) inhibition; peganine produces bronchodilation; smoke aerosols sanitize airborne microbes.",
      indications: "Sacred Kashmiri antimicrobial fumigant ('Isband-soz'), asthma smoke inhalation, and neurological stimulation.",
      conservation: "Abundant Cultural Herb / Common Arid Flora"
    }
  ];

  // Distinct lists for dropdowns
  const allDistricts = useMemo(() => {
    const set = new Set<string>();
    speciesList.forEach(s => s.districts.forEach(d => set.add(d)));
    return Array.from(set).sort();
  }, [speciesList]);

  const allParts = useMemo(() => {
    const set = new Set<string>();
    Object.values(medicinalEthnoDetails).forEach(detail => {
      const p = detail.partUsed.split(' / ')[0].split(' & ')[0].trim();
      if (p) set.add(p);
    });
    return Array.from(set).sort();
  }, []);

  // Filter Logic
  const filteredSpecies = useMemo(() => {
    return speciesList.filter(sp => {
      const ethno = medicinalEthnoDetails[sp.id];
      const q = searchQuery.toLowerCase().trim();

      // Search matches commonName, scientificName, localName, activeConstituents, or therapeuticCategory
      if (q) {
        const matchesCommon = sp.commonName.toLowerCase().includes(q);
        const matchesLatin = sp.scientificName.toLowerCase().includes(q);
        const matchesLocal = (sp.localName || ethno?.localName || '').toLowerCase().includes(q);
        const matchesChem = (ethno?.activeConstituents || '').toLowerCase().includes(q);
        const matchesCat = (ethno?.therapeuticCategory || '').toLowerCase().includes(q);
        const matchesDist = sp.districts.some(d => d.toLowerCase().includes(q));
        if (!matchesCommon && !matchesLatin && !matchesLocal && !matchesChem && !matchesCat && !matchesDist) {
          return false;
        }
      }

      // Quick preset filters
      if (activePreset === 'threatened') {
        if (!['CR', 'EN', 'VU'].includes(sp.conservationStatus)) return false;
      } else if (activePreset === 'endemic') {
        if (sp.endemismStatus === 'widely-distributed') return false;
      } else if (activePreset === 'kashmir-endemic') {
        if (sp.endemismStatus !== 'kashmir-endemic') return false;
      } else if (activePreset === 'cr') {
        if (sp.conservationStatus !== 'CR') return false;
      } else if (activePreset === 'en') {
        if (sp.conservationStatus !== 'EN') return false;
      } else if (activePreset === 'vu') {
        if (sp.conservationStatus !== 'VU') return false;
      } else if (activePreset === 'banned') {
        const isBanned = (ethno?.harvestingStatus || '').toLowerCase().includes('banned') ||
                         (ethno?.harvestingStatus || '').toLowerCase().includes('cites') ||
                         (sp.conservationMeasures || []).some(m => m.toLowerCase().includes('banned') || m.toLowerCase().includes('cites'));
        if (!isBanned) return false;
      } else if (activePreset === 'respiratory') {
        if (!ethno || !ethno.therapeuticCategory.toLowerCase().includes('respiratory')) return false;
      } else if (activePreset === 'digestive') {
        if (!ethno || !ethno.therapeuticCategory.toLowerCase().includes('gastrointestinal')) return false;
      } else if (activePreset === 'rheumatic') {
        if (!ethno || !ethno.therapeuticCategory.toLowerCase().includes('rheumatism')) return false;
      } else if (activePreset === 'nervine') {
        if (!ethno || !ethno.therapeuticCategory.toLowerCase().includes('nervine')) return false;
      } else if (activePreset === 'wound') {
        if (!ethno || !ethno.therapeuticCategory.toLowerCase().includes('wound')) return false;
      } else if (activePreset === 'cardio') {
        if (!ethno || (!ethno.therapeuticCategory.toLowerCase().includes('cardio') && !ethno.therapeuticCategory.toLowerCase().includes('immuno-tonic'))) return false;
      }

      // Endemism Dropdown
      if (selectedEndemism === 'all-endemic') {
        if (sp.endemismStatus === 'widely-distributed') return false;
      } else if (selectedEndemism !== 'all') {
        if (sp.endemismStatus !== selectedEndemism) return false;
      }

      // Traditional System filter
      if (selectedSystem !== 'all') {
        if (!ethno || !ethno.traditionalSystems.some(sys => sys.toLowerCase().includes(selectedSystem.toLowerCase()))) {
          return false;
        }
      }

      // Part Used filter
      if (selectedPart !== 'all') {
        if (!ethno || !ethno.partUsed.toLowerCase().includes(selectedPart.toLowerCase())) {
          return false;
        }
      }

      // Conservation Status filter
      if (selectedStatus === 'threatened-all') {
        if (!['CR', 'EN', 'VU'].includes(sp.conservationStatus)) return false;
      } else if (selectedStatus !== 'all') {
        if (sp.conservationStatus !== selectedStatus) return false;
      }

      // Altitude Zone filter
      if (selectedAltitude === 'alpine') {
        if (sp.elevationRange.max < 3000) return false;
      } else if (selectedAltitude === 'subalpine') {
        if (sp.elevationRange.min > 3000 || sp.elevationRange.max < 2400) return false;
      } else if (selectedAltitude === 'temperate') {
        if (sp.elevationRange.min > 2400) return false;
      }

      // District filter
      if (selectedDistrict !== 'all') {
        if (!sp.districts.includes(selectedDistrict)) return false;
      }

      return true;
    });
  }, [speciesList, searchQuery, activePreset, selectedEndemism, selectedSystem, selectedPart, selectedStatus, selectedAltitude, selectedDistrict]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setActivePreset('all');
    setSelectedEndemism('all');
    setSelectedSystem('all');
    setSelectedPart('all');
    setSelectedStatus('all');
    setSelectedAltitude('all');
    setSelectedDistrict('all');
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredSpecies.length / itemsPerPage);
  const paginatedSpecies = useMemo(() => {
    if (itemsPerPage === 999) return filteredSpecies;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSpecies.slice(start, start + itemsPerPage);
  }, [filteredSpecies, currentPage, itemsPerPage]);

  const activeEthno = selectedSpecies ? medicinalEthnoDetails[selectedSpecies.id] : null;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200 pb-20">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* PLATFORM HERO SECTION WITH BACKGROUND CAROUSEL & BREADCRUMBS  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <Heading
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
                Medicinal Flora &amp; Pharmacopeia
              </span>
            </div>
          </div>
        }
        subtitle="Authoritative Himalayan Ethnobotanical Repository: Cataloging Kashmir's Indigenous Pharmacopeia, Active Phytochemistry, High-Altitude Cryospheric Alpines &amp; CITES Sustainable Conservation Safeguards."
        icon={<Leaf className="w-6 h-6 text-emerald-400" />}
        label="Biodiversity Intelligence · Botanical Pharmacopeia"
        breadcrumbs={[
          { label: 'Biodiversity', href: '/biodiversity/overview' },
          { label: 'Medicinal Flora Pharmacopeia' }
        ]}
        images={['/images/protected-network.png']}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className={`border-emerald-500/40 font-bold transition-all ${
                activePreset === 'all'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/30'
                  : 'text-emerald-300 hover:bg-emerald-500/10'
              }`}
              onClick={() => { setActiveMainTab('catalog'); setActivePreset('all'); setCurrentPage(1); }}
            >
              <Leaf className="w-4 h-4 mr-1.5" />
              ALL 127 Taxa
            </Button>
            <Button
              size="sm"
              className={`font-bold transition-all ${
                activePreset === 'threatened'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 ring-2 ring-rose-400'
                  : 'bg-gradient-to-r from-rose-600 to-red-500 text-white hover:from-rose-500 hover:to-red-400'
              }`}
              onClick={() => { setActiveMainTab('catalog'); setActivePreset('threatened'); setCurrentPage(1); }}
            >
              <AlertTriangle className="w-4 h-4 mr-1.5" />
              25 Threatened (ALL)
            </Button>
            <Button
              size="sm"
              className={`font-bold transition-all ${
                activePreset === 'endemic'
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30 ring-2 ring-purple-400'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-500 text-white hover:from-purple-500 hover:to-indigo-400'
              }`}
              onClick={() => { setActiveMainTab('catalog'); setActivePreset('endemic'); setCurrentPage(1); }}
            >
              <MapPin className="w-4 h-4 mr-1.5" />
              86 Endemic (ALL)
            </Button>
          </div>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K BIODIVERSITY MONITORING STRIP */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-6">
        <div className="bg-gradient-to-r from-slate-900/95 via-emerald-950/70 to-slate-900/95 border border-emerald-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-emerald-400">High-Altitude Extraction &amp; Pharmacopeia Corridor</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Monitoring 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Regulated Subalpine &amp; Alpine Transits: <strong className="text-white">Pir Panjal Pass</strong>, <strong className="text-white">Zojila Corridor</strong>, <strong className="text-white">Sinthan Top</strong>, <strong className="text-white">Razdan Pass</strong>, and <strong className="text-white">Dachigam Biosphere</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Classical Traditions</div>
              <div className="text-sm font-bold text-emerald-300">Unani · Ayurveda · Sowa-Rigpa</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>14 Banned CITES Taxa</span>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TELEMETRY METRIC KPI STRIP (6 CARDS)                          */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-4">
          {/* Card 1: ALL Medicinal Taxa */}
          <div
            onClick={() => { setActiveMainTab('catalog'); setActivePreset('all'); setCurrentPage(1); }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activePreset === 'all' && activeMainTab === 'catalog'
                ? 'bg-emerald-500/20 border-emerald-500/60 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Medicinal Taxa</span>
              <Leaf className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">127</div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">ALL Verified Taxa</div>
          </div>

          {/* Card 2: Threatened Taxa */}
          <div
            onClick={() => { setActiveMainTab('catalog'); setActivePreset('threatened'); setCurrentPage(1); }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activePreset === 'threatened' && activeMainTab === 'catalog'
                ? 'bg-rose-500/20 border-rose-500/60 shadow-lg shadow-rose-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Threatened Taxa</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-300">25</div>
            <div className="text-[11px] text-rose-400/90 font-mono mt-0.5">6 CR · 9 EN · 10 VU</div>
          </div>

          {/* Card 3: Endemic Taxa */}
          <div
            onClick={() => { setActiveMainTab('catalog'); setActivePreset('endemic'); setCurrentPage(1); }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activePreset === 'endemic' && activeMainTab === 'catalog'
                ? 'bg-purple-500/20 border-purple-500/60 shadow-lg shadow-purple-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Endemic Taxa</span>
              <MapPin className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">86</div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">12 Kashmir · 42 NW · 32 Him</div>
          </div>

          {/* Card 4: Strictly Banned CITES */}
          <div
            onClick={() => { setActiveMainTab('catalog'); setActivePreset('banned'); setCurrentPage(1); }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activePreset === 'banned' && activeMainTab === 'catalog'
                ? 'bg-amber-500/20 border-amber-500/60 shadow-lg shadow-amber-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Strictly Banned</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">14</div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">CITES &amp; Sched VI</div>
          </div>

          {/* Card 5: High Alpine Cryosphere */}
          <div
            onClick={() => { setActiveMainTab('catalog'); setSelectedAltitude('alpine'); setCurrentPage(1); }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedAltitude === 'alpine' && activeMainTab === 'catalog'
                ? 'bg-blue-500/20 border-blue-500/60 shadow-lg shadow-blue-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">High Alpine</span>
              <Mountain className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-300">48</div>
            <div className="text-[11px] text-blue-400/90 font-mono mt-0.5">&gt;2,800m Cryosphere</div>
          </div>

          {/* Card 6: Medical Traditions */}
          <div
            onClick={() => { setActiveMainTab('phytochemistry'); }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeMainTab === 'phytochemistry'
                ? 'bg-cyan-500/20 border-cyan-500/60 shadow-lg shadow-cyan-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Phytochemicals</span>
              <FlaskConical className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-cyan-300">127</div>
            <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">Active Molecules Mapped</div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* PHARMACOPEIA SUITE MASTER NAVIGATION TABS                     */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2 flex flex-wrap items-center justify-between gap-2 shadow-lg">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveMainTab('catalog')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeMainTab === 'catalog'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
                  : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Leaf className="w-4 h-4" />
              <span>Species Pharmacopeia Catalog</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                activeMainTab === 'catalog' ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-slate-800 text-emerald-400'
              }`}>
                127
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab('traditions')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeMainTab === 'traditions'
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/25'
                  : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Classical Traditions (Unani · Ayurveda · Sowa-Rigpa)</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                activeMainTab === 'traditions' ? 'bg-white/20 text-white font-black' : 'bg-slate-800 text-purple-300'
              }`}>
                4 Systems
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab('formulary')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeMainTab === 'formulary'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                  : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Formulary &amp; Preparation Laboratory</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                activeMainTab === 'formulary' ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-slate-800 text-amber-300'
              }`}>
                6 Modes
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab('phytochemistry')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeMainTab === 'phytochemistry'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>Phytochemical Directory &amp; Mechanisms</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                activeMainTab === 'phytochemistry' ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-slate-800 text-cyan-300'
              }`}>
                12 Key Bioactives
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 1: SPECIES CATALOG VIEW                                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeMainTab === 'catalog' && (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-2">
          {/* Preset Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
            {presetFilters.map(preset => {
              const Icon = preset.icon;
              const isActive = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setActivePreset(preset.id as any);
                    setCurrentPage(1);
                  }}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                      : 'bg-slate-900/90 hover:bg-slate-800/90 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />
                  {preset.label}
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {preset.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Faceted Filter Bar */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 mb-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5">
              {/* Search Bar */}
              <div className="lg:col-span-3 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="Search Kuth, Patis, Banafsha, Isband, chemical..."
                  className="w-full pl-10 pr-9 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Endemism Filter Dropdown */}
              <div className="lg:col-span-2">
                <select
                  value={selectedEndemism}
                  onChange={e => { setSelectedEndemism(e.target.value); setCurrentPage(1); }}
                  aria-label="Filter by Endemism Level"
                  className="w-full py-2 px-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">Endemism: All (127)</option>
                  <option value="all-endemic">All Endemic Taxa (86)</option>
                  <option value="kashmir-endemic">Kashmir Valley Endemic (12)</option>
                  <option value="northwest-himalayan">NW Himalayan Endemic (42)</option>
                  <option value="himalayan-endemic">Himalayan Endemic (32)</option>
                  <option value="widely-distributed">Widely Distributed (41)</option>
                </select>
              </div>

              {/* Conservation Status */}
              <div className="lg:col-span-2">
                <select
                  value={selectedStatus}
                  onChange={e => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                  aria-label="Filter by Conservation Status"
                  className="w-full py-2 px-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">Status: All (127)</option>
                  <option value="threatened-all">Threatened ALL (25: CR/EN/VU)</option>
                  <option value="CR">Critically Endangered (6 CR)</option>
                  <option value="EN">Endangered (9 EN)</option>
                  <option value="VU">Vulnerable (10 VU)</option>
                  <option value="NT">Near Threatened (1 NT)</option>
                  <option value="LC">Least Concern / Common (101 LC)</option>
                </select>
              </div>

              {/* Medical System */}
              <div className="lg:col-span-2">
                <select
                  value={selectedSystem}
                  onChange={e => { setSelectedSystem(e.target.value); setCurrentPage(1); }}
                  aria-label="Filter by Medical System"
                  className="w-full py-2 px-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">Medical System: All</option>
                  <option value="unani">Unani Tibb</option>
                  <option value="ayurveda">Ayurveda</option>
                  <option value="amchi">Amchi / Sowa-Rigpa</option>
                  <option value="ethnobotany">Kashmiri Ethnobotany</option>
                </select>
              </div>

              {/* Part Used */}
              <div className="lg:col-span-1.5">
                <select
                  value={selectedPart}
                  onChange={e => { setSelectedPart(e.target.value); setCurrentPage(1); }}
                  aria-label="Filter by Plant Part Used"
                  className="w-full py-2 px-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">Part: All</option>
                  {allParts.map(part => (
                    <option key={part} value={part}>{part}</option>
                  ))}
                </select>
              </div>

              {/* Altitude Zone */}
              <div className="lg:col-span-1.5">
                <select
                  value={selectedAltitude}
                  onChange={e => { setSelectedAltitude(e.target.value); setCurrentPage(1); }}
                  aria-label="Filter by Elevation Zone"
                  className="w-full py-2 px-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">Elevation: All</option>
                  <option value="alpine">Alpine (&gt;3,000m)</option>
                  <option value="subalpine">Subalpine (2,400-3,000m)</option>
                  <option value="temperate">Temperate (&lt;2,400m)</option>
                </select>
              </div>
            </div>

            {/* Sub-bar: Active Filter Chips & View Mode */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-slate-300">
                  Displaying <strong className="text-emerald-400">{filteredSpecies.length}</strong> of 127 species
                </span>

                {(searchQuery || activePreset !== 'all' || selectedEndemism !== 'all' || selectedSystem !== 'all' || selectedPart !== 'all' || selectedStatus !== 'all' || selectedAltitude !== 'all' || selectedDistrict !== 'all') && (
                  <button
                    onClick={handleResetFilters}
                    className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3 h-3 text-rose-400" />
                    Clear Filters
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Items per page selector */}
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span>Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    aria-label="Select items to display per page"
                    className="bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                    <option value={999}>All 127</option>
                  </select>
                </div>

                {/* View mode toggle */}
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-slate-800 text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                    title="Grid View"
                  >
                    <Grid3X3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-slate-800 text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                    title="Pharmacopeia Table View"
                  >
                    <Table className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Zero Results State */}
          {filteredSpecies.length === 0 && (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center my-8">
              <Leaf className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">No medicinal plants matched your filters</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-4">
                Try broadening your search query or reset the therapeutic category, endemism, and altitude presets.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* View Mode: Grid Cards */}
          {viewMode === 'grid' && filteredSpecies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedSpecies.map(species => {
                const ethno = medicinalEthnoDetails[species.id];
                const isCR = species.conservationStatus === 'CR';
                const isEN = species.conservationStatus === 'EN';
                const isVU = species.conservationStatus === 'VU';
                const isThreatened = isCR || isEN || isVU;

                const isKashmirEndemic = species.endemismStatus === 'kashmir-endemic';
                const isNWHimalayan = species.endemismStatus === 'northwest-himalayan';
                const isHimalayan = species.endemismStatus === 'himalayan-endemic';

                return (
                  <div
                    key={species.id}
                    className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-emerald-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-emerald-950/20 relative"
                  >
                    <div>
                      {/* Top Row: Local Kashmiri Badge & Status */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-serif italic font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            Kashmiri: {species.localName || ethno?.localName || 'Wan-booti'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {/* Endemism mini pill */}
                          {isKashmirEndemic && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              Kashmir Endemic
                            </span>
                          )}
                          {isNWHimalayan && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              NW Himalayan
                            </span>
                          )}
                          {isHimalayan && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                              Himalayan
                            </span>
                          )}

                          {/* Conservation Status badge */}
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono ${
                            isCR ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                            isEN ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' :
                            isVU ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                            'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {species.conservationStatus}
                          </span>
                        </div>
                      </div>

                      {/* Common & Scientific Names */}
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {species.commonName}
                      </h3>
                      <div className="text-xs italic text-emerald-400/90 font-mono mb-2.5">
                        {species.scientificName}
                      </div>

                      {/* Therapeutic Category Badge */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          {ethno?.therapeuticCategory || 'Holistic Remedy'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300">
                          Part: {ethno?.partUsed || 'Root/Herb'}
                        </span>
                      </div>

                      {/* Description preview */}
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                        {species.description}
                      </p>

                      {/* Active Phytochemical Chip */}
                      {ethno?.activeConstituents && (
                        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-3 text-[11px]">
                          <div className="text-slate-400 font-medium flex items-center gap-1.5 mb-0.5">
                            <FlaskConical className="w-3 h-3 text-cyan-400" />
                            Key Phytochemical:
                          </div>
                          <div className="text-slate-200 font-mono text-[10.5px] truncate">
                            {ethno.activeConstituents}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="text-slate-400 flex items-center gap-1">
                        <Mountain className="w-3.5 h-3.5 text-slate-500" />
                        <span>{species.elevationRange.min}-{species.elevationRange.max}m</span>
                      </div>

                      <button
                        onClick={() => setSelectedSpecies(species)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                      >
                        <span>Dossier</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* View Mode: Pharmacopeia Table */}
          {viewMode === 'table' && filteredSpecies.length > 0 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 uppercase tracking-wider font-mono text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">Local Kashmiri</th>
                      <th className="py-3.5 px-4">Common Name</th>
                      <th className="py-3.5 px-4">Scientific Binomial</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Endemism</th>
                      <th className="py-3.5 px-4">Part Used</th>
                      <th className="py-3.5 px-4">Therapeutic Domain</th>
                      <th className="py-3.5 px-4">Key Constituent</th>
                      <th className="py-3.5 px-4">Elevation</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {paginatedSpecies.map(sp => {
                      const ethno = medicinalEthnoDetails[sp.id];
                      return (
                        <tr key={sp.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="py-3 px-4 font-serif font-bold text-amber-300 italic whitespace-nowrap">
                            {sp.localName || ethno?.localName || 'Wan-booti'}
                          </td>
                          <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                            {sp.commonName}
                          </td>
                          <td className="py-3 px-4 italic text-emerald-400/90 font-mono whitespace-nowrap">
                            {sp.scientificName}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                              sp.conservationStatus === 'CR' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                              sp.conservationStatus === 'EN' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                              sp.conservationStatus === 'VU' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                              'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}>
                              {sp.conservationStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                              sp.endemismStatus === 'kashmir-endemic' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                              sp.endemismStatus === 'northwest-himalayan' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                              sp.endemismStatus === 'himalayan-endemic' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                              'bg-slate-800 text-slate-400'
                            }`}>
                              {sp.endemismStatus === 'kashmir-endemic' ? 'Kashmir Endemic' :
                               sp.endemismStatus === 'northwest-himalayan' ? 'NW Himalayan' :
                               sp.endemismStatus === 'himalayan-endemic' ? 'Himalayan' : 'Widespread'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                            {ethno?.partUsed.split(' / ')[0] || 'Herb'}
                          </td>
                          <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 text-[10.5px]">
                              {ethno?.therapeuticCategory || 'Medicinal'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-cyan-300 font-mono text-[10.5px] max-w-[180px] truncate" title={ethno?.activeConstituents}>
                            {ethno?.activeConstituents || 'Essential oils'}
                          </td>
                          <td className="py-3 px-4 text-slate-400 whitespace-nowrap font-mono">
                            {sp.elevationRange.min}-{sp.elevationRange.max}m
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => setSelectedSpecies(sp)}
                              className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination Bar */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-800 pt-6 mt-8">
              <div className="text-xs text-slate-400">
                Showing page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong> ({filteredSpecies.length} total taxa)
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-mono transition-colors ${
                      currentPage === page
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 2: CLASSICAL MEDICAL TRADITIONS COMPARATIVE MATRIX        */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeMainTab === 'traditions' && (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-purple-400" />
              Four Classical Medical Systems of Kashmir &amp; Ladakh
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              The high Himalayas represent the historic crossroads of Asia&apos;s greatest healing traditions. For over a millennium, Unani Hakims, Ayurvedic Vaidyas, and Tibetan Amchis harmonized indigenous Kashmiri mountain flora into codified medical pharmacopeias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* System 1: Unani Tibb */}
            <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-500/30">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Unani Tibb (Greco-Arabian in Kashmir)</h3>
                  <div className="text-xs text-purple-400 font-mono">Avicennian Humoral Medicine · Hakims of the Valley</div>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong>Theoretical Foundations:</strong> Built on the four humors (<em>Akhlat</em>: Dam/Blood, Balgham/Phlegm, Safra/Yellow Bile, Sauda/Black Bile) and balancing the body&apos;s innate temperament (<em>Mizaj</em>). Diseases are treated via opposites (<em>Ilaj-bil-Zid</em>).
                </p>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-purple-300 font-bold mb-1">Cornerstone Kashmiri Materia Medica:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li><strong className="text-slate-200">Kuth (Saussurea costus):</strong> Master lung carminative and warming stimulant.</li>
                    <li><strong className="text-slate-200">Banafsha (Viola odorata):</strong> Central flower in cooling febrifuge Joshanda infusions.</li>
                    <li><strong className="text-slate-200">Arq Kasni (Cichorium intybus):</strong> Hydro-distilled hepatic elixir cooling bilious liver heat.</li>
                    <li><strong className="text-slate-200">Suranjan-e-Talkh (Colchicum luteum):</strong> Unrivaled specific cure for agonizing acute gout attacks.</li>
                    <li><strong className="text-slate-200">Jadwar (Delphinium denudatum):</strong> The supreme universal antidote (<em>Tiryaq</em>) against toxic poisons.</li>
                  </ul>
                </div>
                <div className="text-[11px] text-slate-400">
                  <strong>Dosage Forms:</strong> Joshanda (Decoctions), Arq (Distillates), Majun/Khamira (Electuaries), Safuf (Powders), and Roghan (Infused oils).
                </div>
              </div>
            </div>

            {/* System 2: Ayurveda */}
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Ayurveda (Classical Vedic Pharmacopeia)</h3>
                  <div className="text-xs text-emerald-400 font-mono">Charaka &amp; Sushruta Samhitas · Rasayana Therapy</div>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong>Theoretical Foundations:</strong> Based on the Tridoshas (<em>Vata</em>, <em>Pitta</em>, <em>Kapha</em>) and five great elements (Pancha Mahabhuta). Herbs act through Taste (<em>Rasa</em>), Qualities (<em>Guna</em>), Potency (<em>Virya</em>), and Post-digestive effect (<em>Vipaka</em>).
                </p>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-emerald-300 font-bold mb-1">Cornerstone Himalayan Materia Medica:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li><strong className="text-slate-200">Atis / Patis (Aconitum heterophyllum):</strong> The non-toxic pediatric febrifuge and antidiarrheal.</li>
                    <li><strong className="text-slate-200">Kutki (Picrorhiza kurrooa):</strong> Bitter liver protector (Bhedana) balancing Pitta-Kapha fevers.</li>
                    <li><strong className="text-slate-200">Pushkarmool (Inula racemosa):</strong> Ayurveda&apos;s leading cardioprotective (Hridya) and bronchodilator.</li>
                    <li><strong className="text-slate-200">Pashanbhed (Bergenia ciliata):</strong> Sacred lithotriptic (Ashmarighna) herb that dissolves kidney stones.</li>
                    <li><strong className="text-slate-200">Talispatra (Abies pindrow):</strong> Needles formulate famous Talisadi Churna for chronic bronchial asthma.</li>
                  </ul>
                </div>
                <div className="text-[11px] text-slate-400">
                  <strong>Dosage Forms:</strong> Churna (Powders with honey/ghee), Kwath (Boiled decoctions), Asava/Arishta (Fermented elixirs), and Lepa (Herbal pastes).
                </div>
              </div>
            </div>

            {/* System 3: Sowa-Rigpa */}
            <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/20 text-blue-300 rounded-xl border border-blue-500/30">
                  <Mountain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Amchi / Sowa-Rigpa (High Himalayan &amp; Tibetan)</h3>
                  <div className="text-xs text-blue-400 font-mono">Gyud-Zhi (Four Tantras) · Trans-Himalayan Cold Adaptation</div>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong>Theoretical Foundations:</strong> Practiced across Ladakh, Zanskar, and high passes. Harmonizes the Three Humors (<em>Lung</em>/Wind, <em>Tripa</em>/Bile, <em>Beken</em>/Phlegm) against extreme freezing alpine environments and low atmospheric pressure.
                </p>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-blue-300 font-bold mb-1">Cornerstone Cryospheric Materia Medica:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li><strong className="text-slate-200">Bhut-kesh / Jatamansi:</strong> Calms agitated Lung (Wind) disorders, severe insomnia, and hysteria.</li>
                    <li><strong className="text-slate-200">Tsermang / Sea Buckthorn (Hippophae):</strong> High-altitude radiation barrier and revitalizing cold defense.</li>
                    <li><strong className="text-slate-200">Tazak-tsun (Rhododendron anthopogon):</strong> Aromatic subalpine tea dispelling lung congestion and altitude sickness.</li>
                    <li><strong className="text-slate-200">Sheethal / Pe-mu (Fritillaria roylei):</strong> Alpine twin-bulbs curing dry consumptive coughs and bloody sputum.</li>
                    <li><strong className="text-slate-200">Violet Aconite (Aconitum violaceum):</strong> Regulates renal and joint pains in glacial terrains.</li>
                  </ul>
                </div>
                <div className="text-[11px] text-slate-400">
                  <strong>Dosage Forms:</strong> Rilbu (Herbal multi-ingredient medicinal pearls), Men-mar (Medicinal medicated butters), and powdered decoctions.
                </div>
              </div>
            </div>

            {/* System 4: Kashmiri Folk Ethnobotany */}
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Kashmiri Folk Ethnobotany &amp; Household Lore</h3>
                  <div className="text-xs text-amber-400 font-mono">Centuries of Valley Wisdom · Forest Dwellers &amp; Nomads</div>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong>Theoretical Foundations:</strong> Practical, observational knowledge preserved by village elders, Gujjar-Bakerwal pastoralists, and Sufi shrine gardens. Highly tailored to Kashmir&apos;s severe winters (<em>Chillai Kalan</em>) and dietary shifts.
                </p>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-amber-300 font-bold mb-1">Iconic Household Folk Remedies:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li><strong className="text-slate-200">Haand (Taraxacum officinale):</strong> Steamed wild dandelion greens fed to new mothers to replenish blood and restore lactation.</li>
                    <li><strong className="text-slate-200">Soi (Urtica dioica):</strong> Controlled stinging nettle brushing (urtication) across knees to eradicate chronic arthritic stiffness.</li>
                    <li><strong className="text-slate-200">Abuj (Rumex nepalensis):</strong> Immediate juicy leaf rubbed to instantly neutralize stinging nettle burn.</li>
                    <li><strong className="text-slate-200">Dandasa (Juglans regia bark):</strong> Natural walnut bark rubbed on teeth for enamel whitening, gum bleeding, and cosmetic lip stain.</li>
                    <li><strong className="text-slate-200">Isband (Peganum harmala):</strong> Burned in silver braziers (<em>Isband-soz</em>) to ward off &apos;Nazar&apos; (evil eye) and sanitize domestic air.</li>
                  </ul>
                </div>
                <div className="text-[11px] text-slate-400">
                  <strong>Dosage Forms:</strong> Fresh culinary stews, poultices, mustard oil liniments, and charcoal smoke fumigation.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 3: FORMULARY & PREPARATION LABORATORY VIEW                */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeMainTab === 'formulary' && (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
              <Pill className="w-6 h-6 text-amber-400" />
              Traditional Formulary &amp; Preparation Laboratory
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Classical pharmaceutical methodologies utilized across Kashmir to extract, purify, and stabilize heat-sensitive active constituents from roots, barks, stigmas, and whole alpine herbs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Form 1: Joshanda */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Joshanda (Decoctions)</h4>
                  <div className="text-[11px] text-amber-400 font-mono">Boiled Aqueous Extraction</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Coarsely powdered roots, barks, or dry flowers are gently simmered in 4 to 16 parts mountain spring water until reduced to 1/4th of original volume. The concentrated liquid extracts water-soluble glycosides, mucilages, and polysaccharides.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
                <strong className="text-amber-300">Famous Kashmiri Formulation:</strong>
                <p className="text-slate-400 mt-0.5"><em>Joshanda-e-Banafsha</em> (Viola odorata, Glycyrrhiza, Ziziphus, Khatmi) drank hot with honey for winter influenza and chest catarrh.</p>
              </div>
            </div>

            {/* Form 2: Arq */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/40 transition-all">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Arq (Aromatic Distillates)</h4>
                  <div className="text-[11px] text-blue-400 font-mono">Hydro-Distilled Hydrosols</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Herbs are charged into traditional copper alembics (<em>Deg-o-Bapka</em>) with spring water and distilled at low temperature. The aromatic hydrosol captures fragile volatile terpenes and esters without thermal degradation.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
                <strong className="text-blue-300">Famous Kashmiri Formulation:</strong>
                <p className="text-slate-400 mt-0.5"><em>Arq Kasni</em> (Cichorium intybus) and <em>Arq Gaozaban</em> (Arnebia benthamii) cooling visceral inflammation and liver jaundice.</p>
              </div>
            </div>

            {/* Form 3: Safuf / Churna */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Beaker className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Safuf &amp; Churna (Micronized Powders)</h4>
                  <div className="text-[11px] text-emerald-400 font-mono">Fine Powdered Botanical Blends</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Cleaned roots and herbs are shade-dried and pulverized through fine silk cloth mesh (80–100 mesh size). Administered with appropriate vehicles (<em>Anupana</em>) like mountain honey, warm milk, or ghee to maximize bioavailability.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
                <strong className="text-emerald-300">Famous Kashmiri Formulation:</strong>
                <p className="text-slate-400 mt-0.5"><em>Talisadi Churna</em> (Abies pindrow needles, Piper longum, ginger, cardamom) for intractable asthma and throat catarrh.</p>
              </div>
            </div>

            {/* Form 4: Lepa / Compresses */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-teal-500/40 transition-all">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Lepa &amp; Hot Compresses</h4>
                  <div className="text-[11px] text-teal-400 font-mono">Topical Transdermal Pastes</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Fresh succulent leaves or pulverized roots are blended into a thick paste with mustard oil, warm vinegar, or water, then applied directly over injured tissues, bandaged with cotton, and left for 12–24 hours to draw out infection.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
                <strong className="text-teal-300">Famous Kashmiri Formulation:</strong>
                <p className="text-slate-400 mt-0.5"><em>Zakhm-e-hayat Lepa</em> (Bergenia ciliata) and <em>Pambchalan Paste</em> (Rheum australe) binding bone fractures and contusions.</p>
              </div>
            </div>

            {/* Form 5: Roghan */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-rose-500/40 transition-all">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Roghan (Medicinal Oils)</h4>
                  <div className="text-[11px] text-rose-400 font-mono">Lipid-Soluble Infusions</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Botanicals are slowly macerated or gently simmered in cold-pressed mustard, sesame, or wild apricot kernel (<em>Chuli</em>) oil until all aqueous moisture evaporates, leaving pure lipophilic compounds (quinones, terpenes, flavonoids) in oil.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
                <strong className="text-rose-300">Famous Kashmiri Formulation:</strong>
                <p className="text-slate-400 mt-0.5"><em>Roghan-e-Ratanjot</em> (Onosma hispida in mustard oil) curing third-degree thermal scalds and promoting rapid hair regrowth.</p>
              </div>
            </div>

            {/* Form 6: Shodhana */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-red-500/40 transition-all">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Shodhana (Alkaloid Detoxification)</h4>
                  <div className="text-[11px] text-red-400 font-mono">Pharmaceutical Neutralization Protocols</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Deadly poisonous aconites (<em>Mohra / Visha</em>) and henbane (<em>Bazarbhang</em>) are detoxified through prolonged boiling in cow milk or buttermilk (<em>Dolayantra</em>). Hydrolysis breaks toxic ester alkaloids into non-toxic, highly therapeutic bases.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
                <strong className="text-red-300">Famous Kashmiri Formulation:</strong>
                <p className="text-slate-400 mt-0.5"><em>Shodhita Mohra</em> (Aconitum chasmanthum) formulating <em>Hab-e-Shifa</em> for debilitating sciatic agony and chronic neuralgia.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 4: PHYTOCHEMICAL DIRECTORY & MOLECULAR MECHANISMS VIEW    */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeMainTab === 'phytochemistry' && (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
              <FlaskConical className="w-6 h-6 text-cyan-400" />
              Western Himalayan Phytochemical Directory &amp; Mechanisms
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Detailed pharmacological breakdown of key secondary metabolites biosynthesized by high-altitude Western Himalayan flora under extreme UV-B radiation, cold stress, and cryospheric pressures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {phytochemicalCatalog.map((chem, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 transition-all shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                        {chem.class}
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {chem.name}
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-serif font-bold italic bg-amber-500/15 text-amber-300 border border-amber-500/30 whitespace-nowrap">
                      {chem.kashmiri}
                    </span>
                  </div>

                  <div className="text-xs italic text-emerald-400 font-mono mb-3">
                    Primary Plant Source: {chem.source}
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300 mb-4">
                    <p className="leading-relaxed">
                      <strong className="text-slate-200">Molecular Mechanism:</strong> {chem.mechanism}
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-slate-200">Therapeutic Indications:</strong> {chem.indications}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono truncate max-w-[280px]">
                    {chem.conservation}
                  </span>
                  <button
                    onClick={() => {
                      const sp = speciesList.find(s => s.id === chem.speciesId);
                      if (sp) setSelectedSpecies(sp);
                    }}
                    className="px-3 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1 transition-all whitespace-nowrap"
                  >
                    <span>View Plant</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ANTI-BIOPIRACY & LEGAL HARVESTING FRAMEWORK ADVISORY          */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mt-12">
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-amber-950/30 border border-emerald-500/30 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                Sustainable Harvesting Protocol &amp; Anti-Biopiracy Mandate
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                The Western Himalayas and the Kashmir Valley host globally unique medicinal taxa under intense pressure from habitat loss, climate-induced snowpack retreat, and illegal commercial extraction. In accordance with the <strong>Jammu &amp; Kashmir Biodiversity Council</strong>, <strong>CITES Appendices</strong>, and the <strong>Biological Diversity Act</strong>:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="font-bold text-emerald-400 mb-1">CITES Schedule VI Taxa</div>
                  <div className="text-slate-400 leading-relaxed">
                    Commercial wild digging of <em>Saussurea costus</em> (Kuth), <em>Dactylorhiza hatagirea</em> (Salam Panja), and <em>Taxus wallichiana</em> (Posthal) is strictly prohibited. Sourced only via certified ex-situ cultivation nurseries.
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="font-bold text-amber-400 mb-1">Transit Permits &amp; PBRs</div>
                  <div className="text-slate-400 leading-relaxed">
                    Collection of non-timber forest produce (NTFP) requires transit permits issued by the Forest Department, validated against village-level People&apos;s Biodiversity Registers (PBRs).
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="font-bold text-blue-400 mb-1">Rotational Harvesting Quotas</div>
                  <div className="text-slate-400 leading-relaxed">
                    Underground root tubers (Picrorhiza, Aconitum, Bergenia) must only be gathered after seed maturation in late autumn, preserving a minimum 40% seed-bearing population in each watershed.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* INTERACTIVE DEEP-DIVE DOSSIER MODAL                           */}
      {/* ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedSpecies && activeEthno && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              {/* Modal Header */}
              <div className="relative p-6 border-b border-slate-800 bg-gradient-to-r from-emerald-950/60 to-slate-900">
                <button
                  onClick={() => setSelectedSpecies(null)}
                  className="absolute right-5 top-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-serif font-bold italic bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Kashmiri: {selectedSpecies.localName || activeEthno.localName}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                    selectedSpecies.conservationStatus === 'CR' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                    selectedSpecies.conservationStatus === 'EN' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' :
                    selectedSpecies.conservationStatus === 'VU' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {selectedSpecies.conservationStatus}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {selectedSpecies.endemismStatus === 'kashmir-endemic' ? 'Kashmir Endemic' :
                     selectedSpecies.endemismStatus === 'northwest-himalayan' ? 'NW Himalayan Endemic' :
                     selectedSpecies.endemismStatus === 'himalayan-endemic' ? 'Himalayan Endemic' : 'Widely Distributed'}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-1">
                  {selectedSpecies.commonName}
                </h2>
                <p className="text-sm italic font-mono text-emerald-400">
                  {selectedSpecies.scientificName}
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 text-sm">
                {/* Traditional Systems & Domain */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Traditional Medical Systems &amp; Therapeutic Domain
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {activeEthno.traditionalSystems.map(sys => (
                      <span key={sys} className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-medium">
                        {sys}
                      </span>
                    ))}
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                      {activeEthno.therapeuticCategory}
                    </span>
                  </div>
                </div>

                {/* Botanical & Ethnobotanical Dossier */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    Botanical Lore &amp; Ecobiology
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {selectedSpecies.description}
                  </p>
                </div>

                {/* Active Phytochemicals & Clinical Pharmacology */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center gap-2">
                      <FlaskConical className="w-3.5 h-3.5" />
                      Phytochemical Compounds
                    </h4>
                    <p className="text-xs font-mono text-slate-300 leading-relaxed">
                      {activeEthno.activeConstituents}
                    </p>
                    <div className="mt-2 text-[11px] text-slate-400">
                      <strong>Part Used:</strong> {activeEthno.partUsed}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-2">
                      <HeartPulse className="w-3.5 h-3.5" />
                      Clinical Pharmacology
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeEthno.clinicalPharmacology}
                    </p>
                  </div>
                </div>

                {/* Traditional Preparation & Administration */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-2">
                    <Pill className="w-3.5 h-3.5" />
                    Traditional Formulation &amp; Preparation
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeEthno.traditionalPreparation}
                  </p>
                </div>

                {/* Harvesting Regulation & Conservation Mandate */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-1.5 flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Harvesting &amp; Conservation Status
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    {activeEthno.harvestingStatus}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                    <span><strong>Altitude:</strong> {selectedSpecies.elevationRange.min} - {selectedSpecies.elevationRange.max}m</span>
                    <span>·</span>
                    <span><strong>Districts:</strong> {selectedSpecies.districts.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
                <Link
                  href={`/biodiversity/species/${selectedSpecies.slug}`}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                >
                  <span>Open Full Biodiversity Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <button
                  onClick={() => setSelectedSpecies(null)}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Advanced Footer */}
      <AdvancedFooter />
    </main>
  );
}
