'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import {
  GREEN_HEROES_MASTER_DATA,
  GREEN_HEROES_STATS,
  REGIONAL_HEROES_BREAKDOWN,
  GREEN_HERO_CATEGORIES_LIST,
  GreenHeroProfile,
  GreenHeroCategory,
  RecognitionTier,
  KEWRegion,
  DocumentedContribution,
  API_SOURCE_CONNECTORS,
  INSTITUTIONAL_REGISTRIES,
  POTENTIAL_ENVIRONMENTAL_PARTNERS,
  INGESTION_TELEMETRY,
  ApiConnectorRecord,
  InstitutionalRegistryRecord,
  PotentialEnvironmentalPartner,
  GREEN_MARTYRS_DOSSIERS,
  MARTYRS_REGISTRY_SUMMARY,
  COMMON_DOSSIER_LINKS,
  LADAKH_MARTYRS_RESEARCH_NOTE,
  GreenMartyrDossier,
  MartyrVerificationType,
  ENVIRONMENTAL_JOURNALISTS_DOSSIERS,
  JOURNALISTS_REGISTRY_TELEMETRY,
  EnvironmentalJournalistDossier,
  JournalismSpecialization,
  ENVIRONMENTAL_SCIENTISTS_DOSSIERS,
  SCIENTISTS_REGISTRY_TELEMETRY,
  LINKED_SCIENTIFIC_MODULES_MAP,
  EnvironmentalScientistDossier,
  ScientificField,
  UNIVERSITY_FACULTY_REGISTRY,
  UniversityFacultyRosterItem,
  CandidateTrack,
  ENVIRONMENTAL_ADVOCATES_DOSSIERS,
  LEGAL_ADVOCATES_REGISTRY_TELEMETRY,
  LEGAL_ROLES_FRAMEWORK,
  CROSS_REGIONAL_LEGAL_SPECIALISTS,
  EnvironmentalAdvocateDossier,
  LegalRole,
  CrossRegionalSpecialist,
  CREATIVE_ARTISTS_DOSSIERS,
  RESEARCH_LEAD_ARTISTS,
  CREATIVE_REGISTRY_TELEMETRY,
  CreativeArtistDossier,
  CreativeContributionType,
  ArtisticMedium,
  ResearchLeadArtist,
  getNormalizedSortName,
  SortOrderOption,
  compareGreenHeroesByName
} from '@/data/kew-green-heroes';
import {
  RELIGIOUS_LEADERS_DOSSIERS,
  RESEARCH_LEAD_RELIGIOUS,
  RELIGIOUS_LEADERS_TELEMETRY,
  ReligiousLeaderDossier,
  ReligiousContributionArchetype,
  ResearchLeadReligious
} from '@/data/kew-religious-leaders';
import {
  POLITICIANS_OFFICIALS_DOSSIERS,
  POLITICIANS_REGISTRY_TELEMETRY,
  PoliticianDossier
} from '@/data/kew-politicians-officials';
import {
  MANZOOR_WANGNOO_DOSSIER,
  ADDITIONAL_NGO_LEADERS,
  HISTORICAL_CROSS_REGIONAL_NGO_LEADERS,
  EXISTING_HEROES_NGO_CROSS_LINKS,
  AJK_NGO_VERIFICATION_QUEUE,
  NGOS_COMMUNITY_TELEMETRY,
  NgoLeaderDossier,
  NgoDocumentedWork
} from '@/data/kew-ngos-community';
import { GreenHeroesSubNav } from '@/components/green-heroes/GreenHeroesSubNav';
import {
  Sparkles,
  Users,
  Award,
  Search,
  Filter,
  MapPin,
  Compass,
  FileText,
  Send,
  Building2,
  Newspaper,
  Microscope,
  Scale,
  Music,
  Headphones,
  Palette,
  Film,
  Camera,
  Flame,
  GraduationCap,
  HeartHandshake,
  Database,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Info,
  Calendar,
  Layers,
  ArrowUpRight,
  XCircle,
  Clock,
  BookOpen,
  Activity,
  Server,
  RefreshCw,
  AlertTriangle,
  Link as LinkIcon,
  ShieldAlert
} from 'lucide-react';

function formatDisplayName(name: string, honorific?: string): string {
  if (!name) return '';
  const n = name.trim();
  if (!honorific) return n;
  const h = honorific.trim();
  if (!h) return n;

  // If the name already starts with the honorific (case-insensitive)
  if (n.toLowerCase().startsWith(h.toLowerCase())) {
    return n;
  }

  // If name already starts with any common title/honorific prefix
  if (/^(Dr\.|Prof\.|Prof\.\s+Dr\.|Adv\.|Advocate|Senior\s+Advocate|Engr\.|Maulana|Shri|Begum|Mr\.|Ms\.|Justice|Late|Shaheed|Uncle|Ustad|Chaudhary|Master)\b/i.test(n)) {
    return n;
  }

  return `${h} ${n}`;
}

interface ScientistDossierCardProps {
  scientist: EnvironmentalScientistDossier;
  onExamine: (s: EnvironmentalScientistDossier) => void;
}

function ScientistDossierCard({ scientist, onExamine }: ScientistDossierCardProps) {
  return (
    <Card
      key={scientist.id}
      className="green-hero-card p-5 bg-slate-900/80 border-slate-800 hover:border-indigo-700/60 transition-all rounded-lg flex flex-col justify-between space-y-4"
    >
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            {scientist.trackType === 'FIELD_PRACTITIONER' ? (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-emerald-950/70 border border-emerald-700/50 text-emerald-300 font-semibold">
                FIELD CONSERVATIONIST
              </span>
            ) : scientist.trackType === 'GOVERNMENT_SCIENTIST' ? (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 font-semibold">
                GOVERNMENT SCIENTIST
              </span>
            ) : (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-blue-950/70 border border-blue-700/50 text-blue-300 font-semibold">
                UNIVERSITY FACULTY
              </span>
            )}
            {scientist.fields.map((f, i) => (
              <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-indigo-950/60 border border-indigo-800/40 text-indigo-300">
                {f}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            {scientist.crossClassification && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-purple-950/70 border border-purple-800/50 text-purple-300" title={`Cross-classified: ${scientist.crossClassification}`}>
                Cross: {scientist.crossClassification.split(' ')[0]}
              </span>
            )}
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
              {scientist.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : scientist.region}
            </span>
          </div>
        </div>

        {/* Name & Title */}
        <div>
          <h4 className="text-lg font-bold text-white leading-tight">
            {formatDisplayName(scientist.name, scientist.honorific)}
          </h4>
          <p className="designation text-xs text-indigo-400 font-medium mt-0.5">{scientist.designation}</p>
          <p className="affiliation text-[11px] text-slate-400 italic mt-0.5">{scientist.institution}</p>
        </div>

        {/* Editorial Tribute Quotation */}
        <div className="p-3 rounded-[6px] bg-slate-950/90 border-l-2 border-indigo-500 text-xs italic text-slate-300">
          {scientist.editorialTribute}
        </div>

        {/* Biography & Key Impact */}
        <p className="contribution text-xs text-slate-300 leading-relaxed">{scientist.biography}</p>

        <div className="p-2.5 rounded-[4px] bg-indigo-950/20 border border-indigo-800/40 text-xs text-indigo-200">
          <strong>Key Impact:</strong> {scientist.keyImpact}
        </div>

        {/* Documented Contributions */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">
            Documented Contributions ({scientist.documentedContributions.length})
          </div>
          {scientist.documentedContributions.map((contrib, idx) => (
            <div key={idx} className="p-2 bg-slate-950/80 border border-slate-800/80 rounded-[4px] text-[11px] space-y-0.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-white">{contrib.year} · {contrib.title}</span>
                <span className="font-mono text-slate-400 text-[9px] px-1 rounded bg-slate-800">{contrib.evidenceTier}</span>
              </div>
              <p className="text-slate-300">{contrib.description}</p>
              <div className="text-[10px] text-emerald-400 font-medium pt-0.5">
                <strong>Outcome:</strong> {contrib.documentedOutcome}
              </div>
            </div>
          ))}
        </div>

        {/* Source Provenance */}
        <div className="space-y-1 pt-1 border-t border-slate-800/80 text-[11px]">
          <span className="text-[10px] uppercase font-bold text-slate-500">Source Provenance:</span>
          <div className="flex flex-col gap-1">
            {scientist.sourceProvenance.map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-300 hover:text-indigo-400 flex items-center gap-1.5"
              >
                <ExternalLink className="w-3 h-3 text-indigo-400 shrink-0" />
                <span>{src.title}</span>
                <span className="text-[10px] text-slate-500">({src.publicationType})</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer & Modal */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
        <span className="verification text-[10px] text-slate-400 leading-normal" title={scientist.researchStatus}>
          {scientist.researchStatus}
        </span>
        <button
          onClick={() => onExamine(scientist)}
          className="px-3 py-1.5 rounded-[6px] bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>Examine Scientific Dossier</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
}

function GreenHeroesPortalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams, activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tabId);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  // Directory Filters
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrderOption>('A_Z');

  // Selected Profile for Dossier Modal
  const [selectedProfile, setSelectedProfile] = useState<GreenHeroProfile | null>(null);

  // Nomination Form State
  const [nomName, setNomName] = useState('');
  const [nomCategory, setNomCategory] = useState<GreenHeroCategory>('Community Green Heroes');
  const [nomRegion, setNomRegion] = useState<KEWRegion>('Kashmir Valley');
  const [nomDistrict, setNomDistrict] = useState('');
  const [nomEvidence, setNomEvidence] = useState('');
  const [nomEvidenceUrl, setNomEvidenceUrl] = useState('');
  const [nomSubmitterType, setNomSubmitterType] = useState('Community Member');
  const [nomSuccess, setNomSuccess] = useState(false);

  // Filtered Heroes for General Directory (A-Z Default Sorting)
  const filteredHeroes = useMemo(() => {
    const list = GREEN_HEROES_MASTER_DATA.filter((hero) => {
      if (selectedRegion !== 'ALL' && hero.region !== selectedRegion) return false;
      if (
        selectedCategory !== 'ALL' &&
        hero.primaryCategory !== selectedCategory &&
        !hero.secondaryCategories.includes(selectedCategory as GreenHeroCategory)
      ) {
        return false;
      }
      if (selectedTier !== 'ALL' && hero.recognitionTier !== selectedTier) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = hero.name.toLowerCase().includes(q) || (hero.honorific ? `${hero.honorific} ${hero.name}`.toLowerCase().includes(q) : false);
        const matchesDistrict = hero.district.toLowerCase().includes(q);
        const matchesAffiliation = hero.affiliation.toLowerCase().includes(q);
        const matchesTagline = hero.tagline.toLowerCase().includes(q);
        const matchesBio = hero.biography.toLowerCase().includes(q);
        return matchesName || matchesDistrict || matchesAffiliation || matchesTagline || matchesBio;
      }
      return true;
    });

    return [...list].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder));
  }, [selectedRegion, selectedCategory, selectedTier, searchQuery, sortOrder]);

  // Contribution filter
  const [selectedContribType, setSelectedContribType] = useState<string>('ALL');
  const allContributions = useMemo(() => {
    const list: Array<{
      heroId: string;
      heroName: string;
      region: KEWRegion;
      district: string;
      contribution: DocumentedContribution;
    }> = [];

    GREEN_HEROES_MASTER_DATA.forEach((h) => {
      h.documentedContributions.forEach((c) => {
        list.push({
          heroId: h.id,
          heroName: h.name,
          region: h.region,
          district: h.district,
          contribution: c
        });
      });
    });

    return list.filter((item) => {
      if (selectedContribType !== 'ALL' && item.contribution.type !== selectedContribType) return false;
      return true;
    }).sort((a, b) => compareGreenHeroesByName(a, b, sortOrder));
  }, [selectedContribType, sortOrder]);

  // Martyrs Registry Filters & Selected Dossier
  const [martyrRegion, setMartyrRegion] = useState<string>('ALL');
  const [martyrType, setMartyrType] = useState<string>('ALL');
  const [martyrSearch, setMartyrSearch] = useState<string>('');
  const [selectedMartyr, setSelectedMartyr] = useState<GreenMartyrDossier | null>(null);

  const filteredMartyrs = useMemo(() => {
    const list = GREEN_MARTYRS_DOSSIERS.filter((m) => {
      if (martyrRegion !== 'ALL' && m.region !== martyrRegion) return false;
      if (martyrType !== 'ALL' && m.martyrType !== martyrType) return false;
      if (martyrSearch.trim()) {
        const q = martyrSearch.toLowerCase();
        const matchName = m.name.toLowerCase().includes(q);
        const matchDistrict = m.district.toLowerCase().includes(q);
        const matchDesignation = m.designation.toLowerCase().includes(q);
        const matchNarrative = m.narrative.toLowerCase().includes(q);
        const matchKeyImpact = m.keyImpact.toLowerCase().includes(q);
        if (!matchName && !matchDistrict && !matchDesignation && !matchNarrative && !matchKeyImpact) {
          return false;
        }
      }
      return true;
    });
    return [...list].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder));
  }, [martyrRegion, martyrType, martyrSearch, sortOrder]);

  // Environmental Journalists Tab State
  const [selectedJournoRegion, setSelectedJournoRegion] = useState<string>('ALL');
  const [selectedJournoSpec, setSelectedJournoSpec] = useState<string>('ALL');
  const [journoSearch, setJournoSearch] = useState<string>('');
  const [selectedJournalist, setSelectedJournalist] = useState<EnvironmentalJournalistDossier | null>(null);

  const filteredJournalists = useMemo(() => {
    const list = ENVIRONMENTAL_JOURNALISTS_DOSSIERS.filter((j) => {
      if (selectedJournoRegion !== 'ALL' && j.region !== selectedJournoRegion) return false;
      if (selectedJournoSpec !== 'ALL' && !j.specialization.includes(selectedJournoSpec as JournalismSpecialization)) {
        return false;
      }
      if (journoSearch.trim()) {
        const q = journoSearch.toLowerCase();
        const matchName = j.name.toLowerCase().includes(q);
        const matchDesignation = j.designation.toLowerCase().includes(q);
        const matchOutlet = j.outletOrAffiliation.toLowerCase().includes(q);
        const matchSummary = j.specializationSummary.toLowerCase().includes(q);
        const matchImpact = j.keyImpact.toLowerCase().includes(q);
        if (!matchName && !matchDesignation && !matchOutlet && !matchSummary && !matchImpact) {
          return false;
        }
      }
      return true;
    });
    return [...list].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder));
  }, [selectedJournoRegion, selectedJournoSpec, journoSearch, sortOrder]);

  // Environmental Scientists Tab State
  const [selectedSciRegion, setSelectedSciRegion] = useState<string>('ALL');
  const [selectedSciField, setSelectedSciField] = useState<string>('ALL');
  const [selectedSciTrack, setSelectedSciTrack] = useState<string>('ALL'); // 'ALL' | 'FIELD_PRACTITIONER' | 'ACADEMIC_FACULTY'
  const [sciSearch, setSciSearch] = useState<string>('');
  const [selectedScientist, setSelectedScientist] = useState<EnvironmentalScientistDossier | null>(null);

  // University Faculty Registry State
  const [selectedFacultyInst, setSelectedFacultyInst] = useState<string>('ALL');
  const [facultySearch, setFacultySearch] = useState<string>('');

  const filteredScientists = useMemo(() => {
    const list = ENVIRONMENTAL_SCIENTISTS_DOSSIERS.filter((s) => {
      if (selectedSciRegion !== 'ALL' && s.region !== selectedSciRegion) return false;
      if (selectedSciField !== 'ALL' && !s.fields.includes(selectedSciField as ScientificField)) {
        return false;
      }
      if (selectedSciTrack !== 'ALL' && s.trackType !== selectedSciTrack) {
        return false;
      }
      if (sciSearch.trim()) {
        const q = sciSearch.toLowerCase();
        const matchName = s.name.toLowerCase().includes(q) || (s.honorific ? `${s.honorific} ${s.name}`.toLowerCase().includes(q) : false);
        const matchDesignation = s.designation.toLowerCase().includes(q);
        const matchInstitution = s.institution.toLowerCase().includes(q);
        const matchSummary = s.fieldsSummary.toLowerCase().includes(q);
        const matchImpact = s.keyImpact.toLowerCase().includes(q);
        if (!matchName && !matchDesignation && !matchInstitution && !matchSummary && !matchImpact) {
          return false;
        }
      }
      return true;
    });
    return [...list].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder));
  }, [selectedSciRegion, selectedSciField, selectedSciTrack, sciSearch, sortOrder]);

  const filteredFaculty = useMemo(() => {
    const list = UNIVERSITY_FACULTY_REGISTRY.filter((f) => {
      if (selectedFacultyInst !== 'ALL' && f.institution !== selectedFacultyInst) return false;
      if (facultySearch.trim()) {
        const q = facultySearch.toLowerCase();
        return (
          f.scientistName.toLowerCase().includes(q) ||
          f.department.toLowerCase().includes(q) ||
          f.institution.toLowerCase().includes(q) ||
          f.scientificSpecialization.toLowerCase().includes(q)
        );
      }
      return true;
    });
    return [...list].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder));
  }, [selectedFacultyInst, facultySearch, sortOrder]);

  const fieldPractitionersCount = useMemo(
    () => ENVIRONMENTAL_SCIENTISTS_DOSSIERS.filter((s) => s.trackType === 'FIELD_PRACTITIONER').length,
    []
  );
  const academicFacultyCount = useMemo(
    () => ENVIRONMENTAL_SCIENTISTS_DOSSIERS.filter((s) => s.trackType === 'ACADEMIC_FACULTY').length,
    []
  );
  const governmentScientistsCount = useMemo(
    () => ENVIRONMENTAL_SCIENTISTS_DOSSIERS.filter((s) => s.trackType === 'GOVERNMENT_SCIENTIST').length,
    []
  );

  const sciRegionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ENVIRONMENTAL_SCIENTISTS_DOSSIERS.forEach((s) => {
      counts[s.region] = (counts[s.region] || 0) + 1;
    });
    return counts;
  }, []);

  // Environmental Advocates Tab State
  const [selectedAdvRegion, setSelectedAdvRegion] = useState<string>('ALL');
  const [selectedAdvRole, setSelectedAdvRole] = useState<string>('ALL');
  const [advSearch, setAdvSearch] = useState<string>('');
  const [selectedAdvocate, setSelectedAdvocate] = useState<EnvironmentalAdvocateDossier | null>(null);

  const filteredAdvocates = useMemo(() => {
    const list = ENVIRONMENTAL_ADVOCATES_DOSSIERS.filter((a) => {
      if (selectedAdvRegion !== 'ALL' && a.region !== selectedAdvRegion) return false;
      if (selectedAdvRole !== 'ALL' && a.legalRole !== selectedAdvRole) return false;
      if (advSearch.trim()) {
        const q = advSearch.toLowerCase();
        const matchName = a.name.toLowerCase().includes(q) || (a.honorific ? `${a.honorific} ${a.name}`.toLowerCase().includes(q) : false);
        const matchDesignation = a.primaryDesignation.toLowerCase().includes(q);
        const matchChamber = a.affiliationOrChamber.toLowerCase().includes(q);
        const matchSummary = a.specializationsSummary.toLowerCase().includes(q);
        const matchNarrative = a.narrative.toLowerCase().includes(q);
        const matchImpact = a.keyImpact.toLowerCase().includes(q);
        const matchCases = a.caseReferences.some((c) => c.toLowerCase().includes(q));
        if (!matchName && !matchDesignation && !matchChamber && !matchSummary && !matchNarrative && !matchImpact && !matchCases) {
          return false;
        }
      }
      return true;
    });
    return [...list].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder));
  }, [selectedAdvRegion, selectedAdvRole, advSearch, sortOrder]);

  const advRegionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ENVIRONMENTAL_ADVOCATES_DOSSIERS.forEach((a) => {
      counts[a.region] = (counts[a.region] || 0) + 1;
    });
    return counts;
  }, []);

  // Poets, Singers & Creative Artists Tab State
  const [selectedArtistRegion, setSelectedArtistRegion] = useState<string>('ALL');
  const [selectedArtistMedium, setSelectedArtistMedium] = useState<string>('ALL');
  const [selectedArtistType, setSelectedArtistType] = useState<string>('ALL');
  const [artistSearch, setArtistSearch] = useState<string>('');
  const [selectedArtist, setSelectedArtist] = useState<CreativeArtistDossier | null>(null);

  const filteredArtists = useMemo(() => {
    const list = CREATIVE_ARTISTS_DOSSIERS.filter((a) => {
      if (selectedArtistRegion !== 'ALL' && a.region !== selectedArtistRegion) return false;
      if (selectedArtistMedium !== 'ALL' && a.medium !== selectedArtistMedium && a.secondaryMedium !== selectedArtistMedium) return false;
      if (selectedArtistType !== 'ALL' && a.contributionType !== selectedArtistType) return false;
      if (artistSearch.trim()) {
        const q = artistSearch.toLowerCase();
        const matchName = a.name.toLowerCase().includes(q) || (a.honorific ? `${a.honorific} ${a.name}`.toLowerCase().includes(q) : false) || (a.personIdentity ? a.personIdentity.toLowerCase().includes(q) : false);
        const matchDesignation = a.designation.toLowerCase().includes(q);
        const matchSubject = a.geographicSubject.toLowerCase().includes(q);
        const matchBio = a.biography.toLowerCase().includes(q);
        const matchImpact = a.keyImpact.toLowerCase().includes(q);
        const matchWorks = a.documentedWorks.some((w) => w.title.toLowerCase().includes(q) || w.description.toLowerCase().includes(q));
        if (!matchName && !matchDesignation && !matchSubject && !matchBio && !matchImpact && !matchWorks) {
          return false;
        }
      }
      return true;
    });
    return [...list].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder));
  }, [selectedArtistRegion, selectedArtistMedium, selectedArtistType, artistSearch, sortOrder]);

  const artistRegionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CREATIVE_ARTISTS_DOSSIERS.forEach((a) => {
      counts[a.region] = (counts[a.region] || 0) + 1;
    });
    return counts;
  }, []);

  // Religious & Spiritual Leaders Tab State
  const [selectedRelRegion, setSelectedRelRegion] = useState<string>('ALL');
  const [selectedRelType, setSelectedRelType] = useState<string>('ALL');
  const [relSearch, setRelSearch] = useState<string>('');
  const [selectedReligiousLeader, setSelectedReligiousLeader] = useState<ReligiousLeaderDossier | null>(null);

  const filteredReligiousLeaders = useMemo(() => {
    const list = RELIGIOUS_LEADERS_DOSSIERS.filter((l) => {
      if (selectedRelRegion !== 'ALL' && l.region !== selectedRelRegion) return false;
      if (selectedRelType !== 'ALL' && l.contributionType !== selectedRelType) return false;
      if (relSearch.trim()) {
        const q = relSearch.toLowerCase();
        const matchName = l.name.toLowerCase().includes(q) || (l.honorific ? l.honorific.toLowerCase().includes(q) : false);
        const matchDesignation = l.designation.toLowerCase().includes(q);
        const matchAffiliation = l.affiliationOrShrine.toLowerCase().includes(q);
        const matchLocus = l.geographicLocus.toLowerCase().includes(q);
        const matchBio = l.biography.toLowerCase().includes(q);
        const matchImpact = l.keyImpact.toLowerCase().includes(q);
        const matchWorks = l.documentedWorks.some((w) => w.title.toLowerCase().includes(q) || w.description.toLowerCase().includes(q));
        if (!matchName && !matchDesignation && !matchAffiliation && !matchLocus && !matchBio && !matchImpact && !matchWorks) {
          return false;
        }
      }
      return true;
    });
    return [...list].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder));
  }, [selectedRelRegion, selectedRelType, relSearch, sortOrder]);

  const relRegionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    RELIGIOUS_LEADERS_DOSSIERS.forEach((l) => {
      counts[l.region] = (counts[l.region] || 0) + 1;
    });
    return counts;
  }, []);

  // Politicians & Public Officials Tab State
  const [polSearch, setPolSearch] = useState<string>('');
  const [selectedPolitician, setSelectedPolitician] = useState<PoliticianDossier | null>(null);

  const filteredPoliticians = useMemo(() => {
    const list = POLITICIANS_OFFICIALS_DOSSIERS.filter((p) => {
      if (polSearch.trim()) {
        const q = polSearch.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q) || (p.honorific ? p.honorific.toLowerCase().includes(q) : false);
        const matchDesignation = p.designation.toLowerCase().includes(q);
        const matchRole = p.currentRole.toLowerCase().includes(q);
        const matchLocus = p.geographicLocus.toLowerCase().includes(q);
        const matchBio = p.biography.toLowerCase().includes(q);
        const matchImpact = p.keyImpact.toLowerCase().includes(q);
        const matchTagline = p.tagline.toLowerCase().includes(q);
        const matchWorks = p.documentedWorks.some((w) => w.title.toLowerCase().includes(q) || w.description.toLowerCase().includes(q));
        if (!matchName && !matchDesignation && !matchRole && !matchLocus && !matchBio && !matchImpact && !matchTagline && !matchWorks) {
          return false;
        }
      }
      return true;
    });
    return [...list].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder));
  }, [polSearch, sortOrder]);

  // NGOs & Community Green Champions Tab State
  const [ngoSubgroup, setNgoSubgroup] = useState<'ALL' | 'NGO_FOUNDERS_HEADS' | 'HISTORICAL_CROSS_REGIONAL' | 'COMMUNITY_GUARDIANS'>('ALL');
  const [ngoSearch, setNgoSearch] = useState<string>('');
  const [selectedNgoLeader, setSelectedNgoLeader] = useState<NgoLeaderDossier | null>(null);

  const allNewNgoLeaders = useMemo<NgoLeaderDossier[]>(() => {
    return [MANZOOR_WANGNOO_DOSSIER, ...ADDITIONAL_NGO_LEADERS, ...HISTORICAL_CROSS_REGIONAL_NGO_LEADERS];
  }, []);

  const existingCommunityHeroes = useMemo(() => {
    const cats = ['Community Green Heroes', 'NGO & Civil Society Leaders', 'Water & Wetland Guardians', 'Traditional Knowledge Keepers'];
    return GREEN_HEROES_MASTER_DATA.filter((h) =>
      cats.includes(h.primaryCategory) || h.secondaryCategories.some((sc) => cats.includes(sc))
    );
  }, []);

  const filteredNewNgoLeaders = useMemo(() => {
    return allNewNgoLeaders.filter((l) => {
      if (ngoSubgroup === 'NGO_FOUNDERS_HEADS' && l.subgroup !== 'NGO_FOUNDERS_HEADS') return false;
      if (ngoSubgroup === 'HISTORICAL_CROSS_REGIONAL' && l.subgroup !== 'HISTORICAL_CROSS_REGIONAL') return false;
      if (ngoSubgroup === 'COMMUNITY_GUARDIANS') return false;
      if (ngoSearch.trim()) {
        const q = ngoSearch.toLowerCase();
        const matchName = l.name.toLowerCase().includes(q) || (l.honorific ? l.honorific.toLowerCase().includes(q) : false);
        const matchOrg = l.organization.toLowerCase().includes(q);
        const matchRole = l.role.toLowerCase().includes(q);
        const matchLocus = l.geographicLocus.toLowerCase().includes(q);
        const matchBio = l.biography.toLowerCase().includes(q);
        const matchImpact = l.keyImpact.toLowerCase().includes(q);
        const matchTagline = l.tagline.toLowerCase().includes(q);
        const matchWorks = l.documentedWorks.some((w) => w.title.toLowerCase().includes(q) || w.description.toLowerCase().includes(q));
        if (!matchName && !matchOrg && !matchRole && !matchLocus && !matchBio && !matchImpact && !matchTagline && !matchWorks) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => compareGreenHeroesByName(a, b, sortOrder));
  }, [allNewNgoLeaders, ngoSubgroup, ngoSearch, sortOrder]);

  const filteredExistingCommunityHeroes = useMemo(() => {
    if (ngoSubgroup === 'NGO_FOUNDERS_HEADS' || ngoSubgroup === 'HISTORICAL_CROSS_REGIONAL') {
      return [];
    }
    return existingCommunityHeroes.filter((h) => {
      if (ngoSearch.trim()) {
        const q = ngoSearch.toLowerCase();
        const matchName = h.name.toLowerCase().includes(q) || (h.honorific ? h.honorific.toLowerCase().includes(q) : false);
        const matchAff = h.affiliation.toLowerCase().includes(q);
        const matchTagline = h.tagline.toLowerCase().includes(q);
        const matchBio = h.biography.toLowerCase().includes(q);
        const matchDistrict = h.district.toLowerCase().includes(q);
        if (!matchName && !matchAff && !matchTagline && !matchBio && !matchDistrict) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => compareGreenHeroesByName(a, b, sortOrder));
  }, [existingCommunityHeroes, ngoSubgroup, ngoSearch, sortOrder]);

  type UnifiedNgoItem =
    | { type: 'new'; data: NgoLeaderDossier }
    | { type: 'existing'; data: GreenHeroProfile };

  const combinedNgoList = useMemo<UnifiedNgoItem[]>(() => {
    const items: UnifiedNgoItem[] = [
      ...filteredNewNgoLeaders.map((l) => ({ type: 'new' as const, data: l })),
      ...filteredExistingCommunityHeroes.map((h) => ({ type: 'existing' as const, data: h }))
    ];
    return items.sort((a, b) => compareGreenHeroesByName(a.data, b.data, sortOrder));
  }, [filteredNewNgoLeaders, filteredExistingCommunityHeroes, sortOrder]);

  const handleNominationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomName.trim() || !nomDistrict.trim() || !nomEvidence.trim()) {
      alert('Please fill in all required fields including documented evidence.');
      return;
    }
    setNomSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER ─── */}
      <Heading
        label="KEW · RESOURCES / ENVIRONMENTAL LEADERSHIP & ADVOCACY"
        images={[
          '/images/green-heroes/stewardship-action.jpg',
          '/images/green-heroes/legacy-heritage.jpg',
          '/images/governance-alamdar-hero.jpg'
        ]}
        overlayClassName="from-slate-950/90 via-slate-950/75 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/open-data' },
          { label: 'KEW Green Heroes' }
        ]}
        icon={<Sparkles className="w-6 h-6 text-emerald-400" />}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                PEOPLE &amp; NATURE
              </span>
              <span>KEW Green Heroes</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              People Protecting Nature, Inspiring Change
            </span>
          </>
        }
        subtitle="Universal recognition directory celebrating environmental contributors across Kashmir Valley, Jammu, Ladakh, AJ&K, and Gilgit-Baltistan—from grassroots spring volunteers, Sufi poets, and frontline foresters to pioneering glaciologists, public-interest litigators, and verifiable legislators."
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleTabChange('all-heroes')}
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Explore 24 Heroes</span>
            </button>
            <button
              onClick={() => handleTabChange('recognition-archives')}
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-yellow-400" />
              <span>Legacy Hall (1377–2026)</span>
            </button>
            <button
              onClick={() => handleTabChange('nominations')}
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nominate a Hero</span>
            </button>
          </div>
        }
      />

      {/* ── 2. SUBMODULE NAVIGATION BAR ─── */}
      <GreenHeroesSubNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* ── 3. MAIN WORKBENCH CONTENT CONTAINER ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 1: OVERVIEW HUB */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 4-Card Executive KPI Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs uppercase font-semibold tracking-wider">Total Recognized Profiles</span>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">{GREEN_HEROES_STATS.totalProfiles} Profiles</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  10 Green Heroes · 10 Verified · 4 Historical
                </p>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-[4px] border border-emerald-800/40 w-fit">
                  <span>Across 20 Distinct Disciplines</span>
                </div>
              </Card>

              <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs uppercase font-semibold tracking-wider">Five-Region Scope</span>
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">5 Himalayan Regions</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  14 Districts actively catalogued across Western Himalayas
                </p>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded-[4px] border border-blue-800/40 w-fit">
                  <span>Kashmir, Jammu, Ladakh, AJ&K, Gilgit</span>
                </div>
              </Card>

              <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs uppercase font-semibold tracking-wider">Documented Works &amp; Filings</span>
                  <FileText className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-amber-300 tracking-tight">{GREEN_HEROES_STATS.totalContributionsDocumented} Documented Works</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Scientific papers, PIL filings, legislative acts &amp; folk ballads
                </p>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-[4px] border border-amber-800/40 w-fit">
                  <span>100% Primary Evidence Verified</span>
                </div>
              </Card>

              <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs uppercase font-semibold tracking-wider">Environmental Legacy Hall</span>
                  <Award className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-yellow-300 tracking-tight">1377–2026 Archive</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Classical Sufi eco-philosophy to frontline conservation martyrs
                </p>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-yellow-400 bg-yellow-950/60 px-2 py-0.5 rounded-[4px] border border-yellow-800/40 w-fit">
                  <span>4 Decades + Historical Trailblazers</span>
                </div>
              </Card>
            </div>

            {/* Green Martyrs Memorial Highlight Banner */}
            <Card className="p-5 bg-slate-900 border-red-800/40 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-[6px] bg-red-950/80 border border-red-800/60 text-red-400 shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-red-950/80 text-red-300 border border-red-800/60 font-mono">
                      SPECIAL MEMORIAL REGISTRY
                    </span>
                    <span className="text-xs text-slate-400">21 Documented Martyrs Across 4 Regions</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Forest Protection Martyrs and Fallen Environmental Defenders</h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                    Dedicated evidentiary dossiers documenting frontline forest guards, daily-rated watchers, police personnel, and security officers lost in anti-timber-smuggling operations, forest fire suppression, and territorial patrols.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleTabChange('green-martyrs')}
                className="px-4 py-2 rounded-[6px] bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
              >
                <span>Open Martyrs Memorial</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </Card>

            {/* Spotlight Heroes Carousel / Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">Featured Green Heroes Spotlight</h3>
                  <p className="text-xs text-slate-400">Pioneering figures representing diverse regions and professional traditions</p>
                </div>
                <button
                  onClick={() => handleTabChange('all-heroes')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>View all 24 profiles</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...GREEN_HEROES_MASTER_DATA].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder)).slice(0, 4).map((hero) => (
                  <Card
                    key={hero.id}
                    className="green-hero-card p-4 bg-slate-900/80 border-slate-800 hover:border-emerald-700/60 transition-all rounded-lg flex flex-col justify-between space-y-3 cursor-pointer group"
                    onClick={() => setSelectedProfile(hero)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`verification text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] border ${
                            hero.recognitionTier === 'KEW_GREEN_HERO'
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                              : hero.recognitionTier === 'HISTORICAL_LEGACY'
                              ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
                              : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                          }`}
                        >
                          {hero.recognitionTier.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {hero.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : hero.region}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {hero.name}
                        </h4>
                        <p className="designation text-[11px] text-emerald-400/90 font-medium">{hero.primaryCategory}</p>
                        {hero.affiliation && (
                          <p className="affiliation text-[10px] text-slate-400 italic mt-0.5">{hero.affiliation}</p>
                        )}
                      </div>

                      <p className="contribution text-xs text-slate-300 leading-relaxed">
                        &ldquo;{hero.tagline}&rdquo;
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-500">
                        {hero.documentedContributions.length} Documented Work{hero.documentedContributions.length > 1 ? 's' : ''}
                      </span>
                      <span className="text-emerald-400 font-medium flex items-center gap-1 text-[11px]">
                        <span>Dossier</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Regional Coverage Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">Five-Region Geographic Distribution</h3>
                  <p className="text-xs text-slate-400">Documenting local environmental stewards in every Himalayan terrain</p>
                </div>
                <button
                  onClick={() => handleTabChange('regional-directory')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Regional directory</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                {(Object.keys(REGIONAL_HEROES_BREAKDOWN) as KEWRegion[]).map((reg) => {
                  const stat = REGIONAL_HEROES_BREAKDOWN[reg];
                  return (
                    <Card
                      key={reg}
                      className="p-3.5 bg-slate-900/80 border-slate-800 hover:border-slate-700 transition-colors rounded-lg cursor-pointer"
                      onClick={() => {
                        setSelectedRegion(reg);
                        handleTabChange('all-heroes');
                      }}
                    >
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="text-xs font-bold text-white truncate">
                          {reg === 'Azad Jammu & Kashmir' ? 'AJ&K' : reg}
                        </span>
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <div className="text-lg font-bold text-white mt-1">{stat.total} Profiles</div>
                      <div className="text-[10px] text-slate-400 mt-1 space-y-0.5">
                        <div>{stat.greenHeroes} Green Heroes</div>
                        <div>{stat.verified} Verified Contributors</div>
                        {stat.historical > 0 && <div className="text-yellow-400">{stat.historical} Historical Legacy</div>}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 2: ALL GREEN HEROES DIRECTORY */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'all-heroes' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-white">All Recognized Environmental Contributors</h3>
                <p className="text-xs text-slate-400">Searchable directory covering all 20 professional and community categories</p>
              </div>
              <button
                onClick={() => handleTabChange('nominations')}
                className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Nomination</span>
              </button>
            </div>

            {/* Filter Bar */}
            <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, district, affiliation, or keywords..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Region</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    <option value="ALL">All Regions (5)</option>
                    <option value="Kashmir Valley">Kashmir Valley</option>
                    <option value="Jammu">Jammu</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Azad Jammu & Kashmir">AJ&K</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    <option value="ALL">All Categories (20)</option>
                    {(GREEN_HERO_CATEGORIES_LIST || []).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Recognition Status</label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    <option value="ALL">All Tiers (24)</option>
                    <option value="KEW_GREEN_HERO">KEW Green Hero (10)</option>
                    <option value="VERIFIED_CONTRIBUTOR">Verified Contributor (10)</option>
                    <option value="HISTORICAL_LEGACY">Historical Legacy (4)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Sort Green Heroes</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrderOption)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    <option value="A_Z">Name: A–Z (Default)</option>
                    <option value="Z_A">Name: Z–A</option>
                    <option value="RECENT">Recently Added / Year</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>
                  Showing <strong className="text-white">{filteredHeroes.length}</strong> of {GREEN_HEROES_MASTER_DATA.length} profiles
                </span>
                {(selectedRegion !== 'ALL' || selectedCategory !== 'ALL' || selectedTier !== 'ALL' || searchQuery || sortOrder !== 'A_Z') && (
                  <button
                    onClick={() => {
                      setSelectedRegion('ALL');
                      setSelectedCategory('ALL');
                      setSelectedTier('ALL');
                      setSearchQuery('');
                      setSortOrder('A_Z');
                    }}
                    className="text-emerald-400 hover:underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            </Card>

            {/* Profile Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHeroes.map((hero) => (
                <Card
                  key={hero.id}
                  className="green-hero-card p-5 bg-slate-900/80 border-slate-800 hover:border-emerald-700/60 transition-all rounded-lg flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-1.5">
                      <span
                        className={`verification text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] border ${
                          hero.recognitionTier === 'KEW_GREEN_HERO'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : hero.recognitionTier === 'HISTORICAL_LEGACY'
                            ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
                            : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                        }`}
                      >
                        {hero.recognitionTier.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300 border border-slate-700">
                        {hero.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : hero.region} · {hero.district}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white leading-snug">
                        {formatDisplayName(hero.name, hero.honorific)}
                      </h4>
                      <p className="designation text-xs text-emerald-400 font-medium mt-0.5">{hero.primaryCategory}</p>
                      <p className="affiliation text-[11px] text-slate-400 italic mt-0.5">{hero.affiliation}</p>
                    </div>

                    <p className="contribution text-xs text-slate-300 leading-relaxed">
                      {hero.biography}
                    </p>

                    {hero.documentedContributions[0]?.impactMetric && (
                      <div className="p-2 rounded-[4px] bg-slate-950 border border-slate-800/80 text-[11px] text-emerald-300 font-medium">
                        <strong>Key Impact:</strong> {hero.documentedContributions[0].impactMetric}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-500">
                      {hero.documentedContributions.length} Documented Work{hero.documentedContributions.length > 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={() => setSelectedProfile(hero)}
                      className="px-3 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Examine Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              ))}

              {filteredHeroes.length === 0 && (
                <div className="col-span-full py-12 text-center bg-slate-900/50 rounded-lg border border-slate-800">
                  <Users className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <h4 className="text-sm font-semibold text-white">No environmental contributors match your criteria</h4>
                  <p className="text-xs text-slate-400 mt-1">Try resetting the category or regional filters.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB: FOREST PROTECTION MARTYRS & FALLEN DEFENDERS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'green-martyrs' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded-[4px] bg-red-950/80 text-red-300 border border-red-800/60">
                  KEW GREEN HERO · FALLEN DEFENDERS REGISTRY
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Research Review: {MARTYRS_REGISTRY_SUMMARY.reviewDate}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Forest Protection Martyrs and Fallen Environmental Defenders
              </h3>
            </div>

            {/* Executive Registry Telemetry & Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-slate-400">Profiles Drafted</div>
                <div className="text-2xl font-black text-white font-mono mt-0.5">{MARTYRS_REGISTRY_SUMMARY.profilesDrafted}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Comprehensive research dossiers</div>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-blue-400">Regions Represented</div>
                <div className="text-2xl font-black text-blue-400 font-mono mt-0.5">{MARTYRS_REGISTRY_SUMMARY.regionsRepresented}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Kashmir, Jammu, AJ&amp;K, GB</div>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-yellow-400">Editorially Approved</div>
                <div className="text-2xl font-black text-yellow-400 font-mono mt-0.5">{MARTYRS_REGISTRY_SUMMARY.editoriallyApproved}</div>
                <div className="text-[10px] text-yellow-400/80 mt-0.5">Under verification audits</div>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-red-400">Under Evidentiary Audit</div>
                <div className="text-2xl font-black text-red-400 font-mono mt-0.5">{MARTYRS_REGISTRY_SUMMARY.underVerificationAudit}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Court &amp; police records pending</div>
              </div>
            </div>

            {/* Filter Bar */}
            <Card className="p-4 bg-slate-900/90 border-slate-800 rounded-lg space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={martyrSearch}
                  onChange={(e) => setMartyrSearch(e.target.value)}
                  placeholder="Search martyrs by name, division (e.g. Ramban, Anantnag, Bandipora), beat, or incident keywords..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-[6px] pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Region</label>
                  <select
                    value={martyrRegion}
                    onChange={(e) => setMartyrRegion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-red-500 text-xs"
                  >
                    <option value="ALL">All Regions (21 Dossiers)</option>
                    <option value="Kashmir Valley">Kashmir Valley (16)</option>
                    <option value="Jammu">Jammu (3)</option>
                    <option value="Azad Jammu & Kashmir">AJ&amp;K (1)</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan (1)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Dossier Classification</label>
                  <select
                    value={martyrType}
                    onChange={(e) => setMartyrType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-red-500 text-xs"
                  >
                    <option value="ALL">All Classifications (5 Tiers)</option>
                    <option value="OFFICIAL_MEMORIAL">Official Memorial (11)</option>
                    <option value="DOCUMENTED_FATALITY">Documented Fatality (7)</option>
                    <option value="HISTORICAL_CASE">Historical Case (1)</option>
                    <option value="JUDICIAL_OUTCOME_REPORTED">Judicial Outcome Reported (1)</option>
                    <option value="IDENTITY_RECONCILIATION">Identity Reconciliation (1)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Sort Green Heroes</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrderOption)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-red-500 text-xs"
                  >
                    <option value="A_Z">Name: A–Z (Default)</option>
                    <option value="Z_A">Name: Z–A</option>
                    <option value="RECENT">Recently Added / Year</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Showing <strong>{filteredMartyrs.length}</strong> of 21 researched martyrs</span>
                {(martyrRegion !== 'ALL' || martyrType !== 'ALL' || martyrSearch.trim() || sortOrder !== 'A_Z') && (
                  <button
                    onClick={() => {
                      setMartyrRegion('ALL');
                      setMartyrType('ALL');
                      setMartyrSearch('');
                      setSortOrder('A_Z');
                    }}
                    className="text-xs text-red-400 hover:underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </Card>

            {/* Martyrs Dossier Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMartyrs.map((martyr) => {
                const badgeColor =
                  martyr.martyrType === 'DOCUMENTED_FATALITY'
                    ? 'bg-red-500/10 text-red-300 border-red-500/30'
                    : martyr.martyrType === 'OFFICIAL_MEMORIAL'
                    ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                    : martyr.martyrType === 'HISTORICAL_CASE'
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    : martyr.martyrType === 'IDENTITY_RECONCILIATION'
                    ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
                    : 'bg-purple-500/10 text-purple-300 border-purple-500/30';

                return (
                  <Card
                    key={martyr.id}
                    className="green-hero-card p-5 bg-slate-900/80 border-slate-800 hover:border-red-800/60 transition-all rounded-lg flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`verification text-[9px] font-bold font-mono uppercase px-2 py-0.5 rounded-[4px] border ${badgeColor}`}>
                            {martyr.martyrType.replace(/_/g, ' ')}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                            {martyr.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : martyr.region} · {martyr.district}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">Year: {martyr.year}</span>
                      </div>

                      {/* Name & Category */}
                      <div>
                        <h4 className="text-lg font-bold text-white leading-tight">
                          {martyr.name}
                        </h4>
                        <div className="affiliation text-xs text-red-400 font-medium mt-0.5">{martyr.category}</div>
                        <div className="designation text-[11px] text-slate-400 italic mt-0.5">{martyr.designation}</div>
                      </div>

                      {/* Editorial Tribute Quotation */}
                      <div className="p-3 rounded-[6px] bg-slate-950/90 border-l-2 border-red-500 text-xs italic text-slate-300">
                        {martyr.editorialTribute}
                      </div>

                      {/* Historical Narrative */}
                      <p className="contribution text-xs text-slate-300 leading-relaxed">
                        {martyr.narrative}
                      </p>

                      {/* Key Impact Bar */}
                      <div className="p-2.5 rounded-[4px] bg-red-950/20 border border-red-800/40 text-xs text-red-200">
                        <strong>Key Impact:</strong> {martyr.keyImpact}
                      </div>

                      {/* Resolved Details Note if present */}
                      {martyr.resolvedDetailsNote && (
                        <div className="p-2 rounded-[4px] bg-emerald-950/20 border border-emerald-800/40 text-[11px] text-emerald-300">
                          <strong>Resolved Historical Detail:</strong> {martyr.resolvedDetailsNote}
                        </div>
                      )}

                      {/* Identity Reconciliation Warning if present */}
                      {martyr.identityReconciliationNote && (
                        <div className="p-2 rounded-[4px] bg-yellow-950/30 border border-yellow-800/50 text-[11px] text-yellow-300 space-y-1">
                          <div className="flex items-center gap-1 font-bold">
                            <AlertTriangle className="w-3 h-3 text-yellow-400 shrink-0" />
                            <span>Identity Discrepancy Note</span>
                          </div>
                          <p>{martyr.identityReconciliationNote}</p>
                        </div>
                      )}

                      {/* Documented Contributions Preview */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[10px] uppercase font-bold text-slate-400">
                          Documented Contributions ({martyr.documentedContributions.length})
                        </div>
                        {martyr.documentedContributions.map((contrib, idx) => (
                          <div key={idx} className="p-2 bg-slate-950/80 border border-slate-800/80 rounded-[4px] text-[11px] space-y-0.5">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-bold text-white">{contrib.year} · {contrib.title}</span>
                              <span className="font-mono text-slate-400 text-[9px] px-1 rounded bg-slate-800">{contrib.evidenceTier}</span>
                            </div>
                            <p className="text-slate-300">{contrib.description}</p>
                            <div className="text-[10px] text-emerald-400 font-medium pt-0.5">
                              <strong>Outcome:</strong> {contrib.documentedOutcome}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Source Provenance */}
                      <div className="space-y-1 pt-1 border-t border-slate-800/80 text-[11px]">
                        <span className="text-[10px] uppercase font-bold text-slate-500">Source Provenance:</span>
                        <div className="flex flex-col gap-1">
                          {martyr.sourceProvenance.map((src, idx) => (
                            <a
                              key={idx}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-slate-300 hover:text-red-400 flex items-center gap-1.5"
                            >
                              <ExternalLink className="w-3 h-3 text-red-400 shrink-0" />
                              <span>{src.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status & Modal Trigger */}
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                      <span className="verification text-[10px] text-slate-400 leading-normal" title={martyr.researchStatus}>
                        {martyr.researchStatus}
                      </span>
                      <button
                        onClick={() => setSelectedMartyr(martyr)}
                        className="px-3 py-1.5 rounded-[6px] bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <span>Examine Dossier</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Card>
                );
              })}

              {filteredMartyrs.length === 0 && (
                <div className="col-span-full py-12 text-center bg-slate-900/50 rounded-lg border border-slate-800">
                  <ShieldAlert className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <h4 className="text-sm font-semibold text-white">No martyr records match your selected criteria</h4>
                  <p className="text-xs text-slate-400 mt-1">Try resetting the regional or classification filters.</p>
                </div>
              )}
            </div>

            {/* Dedicated Ladakh Research Status Card */}
            <Card className="p-5 bg-slate-900 border-slate-800 rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-[6px] bg-blue-950 border border-blue-800 text-blue-400 shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-blue-950 text-blue-300 border border-blue-800 font-mono">
                      LADAKH REGION RESEARCH STATUS
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Status: Active Archival Investigation</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{LADAKH_MARTYRS_RESEARCH_NOTE.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {LADAKH_MARTYRS_RESEARCH_NOTE.summary}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Ongoing Archival Investigative Sources:</div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                  {LADAKH_MARTYRS_RESEARCH_NOTE.ongoingInvestigativeSources.map((src, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{src}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Common Recommended Links Bar */}
            <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Recommended Platform Navigational Links for Every Martyr Dossier</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {COMMON_DOSSIER_LINKS.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url}
                    className="p-3 rounded-[6px] bg-slate-950 hover:bg-slate-800/80 border border-slate-800 transition-colors flex items-center justify-between text-xs text-slate-200 group"
                  >
                    <span className="font-medium group-hover:text-emerald-300">{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB: ENVIRONMENTAL JOURNALISTS & INVESTIGATIVE MEDIA */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'journalists-media' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded-[4px] bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                  KEW GREEN HERO · MEDIA INVESTIGATIONS &amp; SCIENTIFIC REPORTING
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Research Review: {JOURNALISTS_REGISTRY_TELEMETRY.reviewDate}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Environmental Journalists, Investigative Reporters &amp; Scientific Media
              </h3>
            </div>

            {/* Registry Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-slate-400">Candidate Dossiers</div>
                <div className="text-2xl font-black text-white font-mono mt-0.5">{JOURNALISTS_REGISTRY_TELEMETRY.candidateDossiers}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Expanded research directory</div>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-blue-400">Regions Represented</div>
                <div className="text-2xl font-black text-blue-400 font-mono mt-0.5">{JOURNALISTS_REGISTRY_TELEMETRY.regionsRepresented}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Kashmir, Jammu, Ladakh, AJ&amp;K, GB</div>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-yellow-400">Editorially Approved</div>
                <div className="text-2xl font-black text-yellow-400 font-mono mt-0.5">{JOURNALISTS_REGISTRY_TELEMETRY.editoriallyApproved}</div>
                <div className="text-[10px] text-yellow-400/80 mt-0.5">Audits in progress</div>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-cyan-400">Under Evidentiary Audit</div>
                <div className="text-2xl font-black text-cyan-400 font-mono mt-0.5">{JOURNALISTS_REGISTRY_TELEMETRY.underEvidentiaryAudit}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Byline catalogues compiling</div>
              </div>
            </div>

            {/* Filter Bar */}
            <Card className="p-4 bg-slate-900/90 border-slate-800 rounded-lg space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={journoSearch}
                  onChange={(e) => setJournoSearch(e.target.value)}
                  placeholder="Search journalists by name, outlet, coverage beat, or keywords..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-[6px] pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Region</label>
                  <select
                    value={selectedJournoRegion}
                    onChange={(e) => setSelectedJournoRegion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs"
                  >
                    <option value="ALL">All Five Regions (25 Candidates)</option>
                    <option value="Kashmir Valley">Kashmir Valley (14)</option>
                    <option value="Jammu">Jammu (2)</option>
                    <option value="Ladakh">Ladakh (2)</option>
                    <option value="Azad Jammu & Kashmir">AJ&amp;K (2)</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan (5)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Specialization</label>
                  <select
                    value={selectedJournoSpec}
                    onChange={(e) => setSelectedJournoSpec(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs"
                  >
                    <option value="ALL">All Specializations</option>
                    <option value="Media Investigations">Media Investigations</option>
                    <option value="Scientific Reporting">Scientific Reporting</option>
                    <option value="Climate Journalism">Climate Journalism</option>
                    <option value="Environmental Accountability">Environmental Accountability</option>
                    <option value="Water & Wetland Security">Water &amp; Wetland Security</option>
                    <option value="Disaster & Glacial Hazards">Disaster &amp; Glacial Hazards</option>
                    <option value="Biodiversity & Wildlife Crime">Biodiversity &amp; Wildlife Crime</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Sort Green Heroes</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrderOption)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs"
                  >
                    <option value="A_Z">Name: A–Z (Default)</option>
                    <option value="Z_A">Name: Z–A</option>
                    <option value="RECENT">Recently Added / Year</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Showing <strong>{filteredJournalists.length}</strong> of 25 environmental journalists</span>
                {(selectedJournoRegion !== 'ALL' || selectedJournoSpec !== 'ALL' || journoSearch.trim() || sortOrder !== 'A_Z') && (
                  <button
                    onClick={() => {
                      setSelectedJournoRegion('ALL');
                      setSelectedJournoSpec('ALL');
                      setJournoSearch('');
                      setSortOrder('A_Z');
                    }}
                    className="text-xs text-cyan-400 hover:underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </Card>

            {/* Journalists Dossier Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJournalists.map((j) => (
                <Card
                  key={j.id}
                  className="green-hero-card p-5 bg-slate-900/80 border-slate-800 hover:border-cyan-700/60 transition-all rounded-lg flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {j.specialization.map((spec, i) => (
                          <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-cyan-950/60 border border-cyan-800/40 text-cyan-300">
                            {spec}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {j.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : j.region}
                      </span>
                    </div>

                    {/* Name & Title */}
                    <div>
                      <h4 className="text-lg font-bold text-white leading-tight">{j.name}</h4>
                      <p className="designation text-xs text-cyan-400 font-medium mt-0.5">{j.designation}</p>
                      <p className="affiliation text-[11px] text-slate-400 italic mt-0.5">{j.outletOrAffiliation}</p>
                    </div>

                    {/* Editorial Tribute Quotation */}
                    <div className="p-3 rounded-[6px] bg-slate-950/90 border-l-2 border-cyan-500 text-xs italic text-slate-300">
                      {j.editorialTribute}
                    </div>

                    {/* Biography & Key Impact */}
                    <p className="contribution text-xs text-slate-300 leading-relaxed">{j.biography}</p>

                    <div className="p-2.5 rounded-[4px] bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200">
                      <strong>Key Impact:</strong> {j.keyImpact}
                    </div>

                    {/* Documented Contributions */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        Documented Contributions ({j.documentedContributions.length})
                      </div>
                      {j.documentedContributions.map((contrib, idx) => (
                        <div key={idx} className="p-2 bg-slate-950/80 border border-slate-800/80 rounded-[4px] text-[11px] space-y-0.5">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-bold text-white">{contrib.year} · {contrib.title}</span>
                            <span className="font-mono text-slate-400 text-[9px] px-1 rounded bg-slate-800">{contrib.evidenceTier}</span>
                          </div>
                          <p className="text-slate-300">{contrib.description}</p>
                          <div className="text-[10px] text-emerald-400 font-medium pt-0.5">
                            <strong>Outcome:</strong> {contrib.documentedOutcome}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Source Provenance */}
                    <div className="space-y-1 pt-1 border-t border-slate-800/80 text-[11px]">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Source Provenance:</span>
                      <div className="flex flex-col gap-1">
                        {j.sourceProvenance.map((src, idx) => (
                          <a
                            key={idx}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-slate-300 hover:text-cyan-400 flex items-center gap-1.5"
                          >
                            <ExternalLink className="w-3 h-3 text-cyan-400 shrink-0" />
                            <span>{src.title}</span>
                            <span className="text-[10px] text-slate-500">({src.outlet})</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer & Modal */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <span className="verification text-[10px] text-slate-400 leading-normal" title={j.researchStatus}>
                      {j.researchStatus}
                    </span>
                    <button
                      onClick={() => setSelectedJournalist(j)}
                      className="px-3 py-1.5 rounded-[6px] bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <span>Examine Reporting Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              ))}

              {filteredJournalists.length === 0 && (
                <div className="col-span-full py-12 text-center bg-slate-900/50 rounded-lg border border-slate-800">
                  <Newspaper className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <h4 className="text-sm font-semibold text-white">No environmental journalists match your criteria</h4>
                  <p className="text-xs text-slate-400 mt-1">Try resetting the regional or specialization filters.</p>
                </div>
              )}
            </div>

            {/* Media Investigations Matrix Table */}
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Environmental Media Investigations Registry (25 Candidates)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Searchable evidence resource linking each journalist to reporting focus, regional locus, and primary evidence source
                </p>
              </div>

              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-left text-xs bg-slate-900/60">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Journalist</th>
                      <th className="px-3 py-3">Region</th>
                      <th className="px-3 py-3">Specialization &amp; Beat</th>
                      <th className="px-3 py-3">Outlet / Affiliation</th>
                      <th className="px-4 py-3">Primary Evidence Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredJournalists.map((entry) => (
                      <tr key={entry.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">
                          {entry.name}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300 font-mono text-[10px]">
                            {entry.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : entry.region}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-slate-300 max-w-xs">{entry.specializationSummary}</td>
                        <td className="px-3 py-3 text-slate-400">{entry.outletOrAffiliation}</td>
                        <td className="px-4 py-3 text-[11px] text-cyan-300 truncate max-w-xs">
                          {entry.sourceProvenance[0]?.title || 'Documented bylines'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB: ENVIRONMENTAL SCIENTISTS & CONSERVATIONISTS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'scientists-conservationists' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded-[4px] bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
                  KEW GREEN HERO · SCIENTIFIC RESEARCH &amp; CONSERVATION LEADERSHIP
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Research Review: {SCIENTISTS_REGISTRY_TELEMETRY.reviewDate}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Environmental Scientists &amp; Conservationists
              </h3>
            </div>

            {/* Filter Bar with Track Selector */}
            <Card className="p-4 bg-slate-900/90 border-slate-800 rounded-lg space-y-4">
              {/* Track Selector Pills */}
              <div className="flex items-center gap-2 flex-wrap pb-3 border-b border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Candidate Track:</span>
                <button
                  onClick={() => setSelectedSciTrack('ALL')}
                  className={`px-3 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                    selectedSciTrack === 'ALL'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  All Candidates ({ENVIRONMENTAL_SCIENTISTS_DOSSIERS.length})
                </button>
                <button
                  onClick={() => setSelectedSciTrack('FIELD_PRACTITIONER')}
                  className={`px-3 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                    selectedSciTrack === 'FIELD_PRACTITIONER'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Field Practitioners &amp; Rescuers ({fieldPractitionersCount})
                </button>
                <button
                  onClick={() => setSelectedSciTrack('ACADEMIC_FACULTY')}
                  className={`px-3 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                    selectedSciTrack === 'ACADEMIC_FACULTY'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  University Faculty ({academicFacultyCount})
                </button>
                <button
                  onClick={() => setSelectedSciTrack('GOVERNMENT_SCIENTIST')}
                  className={`px-3 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                    selectedSciTrack === 'GOVERNMENT_SCIENTIST'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  DEERS &amp; Govt Scientists ({governmentScientistsCount})
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={sciSearch}
                  onChange={(e) => setSciSearch(e.target.value)}
                  placeholder={`Search ${ENVIRONMENTAL_SCIENTISTS_DOSSIERS.length} scientists by name, institution, research field, or keywords...`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-[6px] pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Region</label>
                  <select
                    value={selectedSciRegion}
                    onChange={(e) => setSelectedSciRegion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
                  >
                    <option value="ALL">All Five Regions ({ENVIRONMENTAL_SCIENTISTS_DOSSIERS.length} Candidates)</option>
                    <option value="Kashmir Valley">Kashmir Valley ({sciRegionCounts['Kashmir Valley'] || 0})</option>
                    <option value="Jammu">Jammu ({sciRegionCounts['Jammu'] || 0})</option>
                    <option value="Ladakh">Ladakh ({sciRegionCounts['Ladakh'] || 0})</option>
                    <option value="Azad Jammu & Kashmir">AJ&amp;K ({sciRegionCounts['Azad Jammu & Kashmir'] || 0})</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan ({sciRegionCounts['Gilgit-Baltistan'] || 0})</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Principal Field</label>
                  <select
                    value={selectedSciField}
                    onChange={(e) => setSelectedSciField(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
                  >
                    <option value="ALL">All Scientific Fields</option>
                    <option value="Glaciology & Cryosphere">Glaciology &amp; Cryosphere</option>
                    <option value="Wetland & Limnology">Wetland &amp; Limnology</option>
                    <option value="Wildlife Ecology & Carnivores">Wildlife Ecology &amp; Carnivores</option>
                    <option value="Forest & Terrestrial Ecology">Forest &amp; Terrestrial Ecology</option>
                    <option value="Environmental Chemistry & Pollution">Environmental Chemistry &amp; Pollution</option>
                    <option value="Geospatial & Remote Sensing">Geospatial &amp; Remote Sensing</option>
                    <option value="Botany & Mycology">Botany &amp; Mycology</option>
                    <option value="Conservation Education & Livelihoods">Conservation Education &amp; Livelihoods</option>
                    <option value="Ethnobotany & Traditional Ecology">Ethnobotany &amp; Traditional Ecology</option>
                    <option value="Wildlife Rescue & Anti-Poaching">Wildlife Rescue &amp; Anti-Poaching</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Sort Green Heroes</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrderOption)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
                  >
                    <option value="A_Z">Name: A–Z (Default)</option>
                    <option value="Z_A">Name: Z–A</option>
                    <option value="RECENT">Recently Added / Year</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Showing <strong>{filteredScientists.length}</strong> of {ENVIRONMENTAL_SCIENTISTS_DOSSIERS.length} environmental scientists &amp; conservationists</span>
                {(selectedSciRegion !== 'ALL' || selectedSciField !== 'ALL' || selectedSciTrack !== 'ALL' || sciSearch.trim() || sortOrder !== 'A_Z') && (
                  <button
                    onClick={() => {
                      setSelectedSciRegion('ALL');
                      setSelectedSciField('ALL');
                      setSelectedSciTrack('ALL');
                      setSciSearch('');
                      setSortOrder('A_Z');
                    }}
                    className="text-xs text-indigo-400 hover:underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </Card>

            {/* Historical Academic Hero Spotlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kashmir Valley: Prof. A. R. Yousuf */}
              <Card className="p-4 bg-slate-900/80 border-indigo-800/60 rounded-lg space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-1.5">
                  <span className="text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-[4px] bg-indigo-900/90 text-indigo-200 border border-indigo-700">
                    HISTORICAL ACADEMIC HERO · KASHMIR VALLEY
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">1948 – 2020</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Prof. A. R. Yousuf</h4>
                  <p className="text-[11px] text-indigo-400 font-medium">Former Director CORD | Former Head EVS | Former NGT Expert Member</p>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Pioneered scientific limnology across Dal Lake, Wular, and high-altitude Himalayan lakes. Established university EIA capacity at University of Kashmir and delivered precedent-setting judicial expert rulings on the NGT bench.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-slate-400">University of Kashmir / NGT</span>
                  <button
                    onClick={() => {
                      const y = ENVIRONMENTAL_SCIENTISTS_DOSSIERS.find((sci) => sci.id === 'sci-076');
                      if (y) setSelectedScientist(y);
                    }}
                    className="px-2.5 py-1 rounded-[6px] bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>Examine Dossier</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </Card>

              {/* Jammu Division: Prof. S. P. S. Dutta */}
              <Card className="p-4 bg-slate-900/80 border-amber-800/60 rounded-lg space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-1.5">
                  <span className="text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-[4px] bg-amber-900/90 text-amber-200 border border-amber-700">
                    HISTORICAL ACADEMIC HERO · JAMMU DIVISION
                  </span>
                  <span className="text-[10px] text-amber-400/90 font-mono">Research: 1982–2025</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">Prof. S. P. S. Dutta</h4>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-amber-950/80 text-amber-300 border border-amber-700/60 font-semibold">
                      TEACHER OF KEW FOUNDER
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-400 font-medium">Former Head, Environmental Sciences | UGC Emeritus Professor, University of Jammu</p>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Four decades documenting the freshwater fish biodiversity, river ecology, and water quality of the Tawi, Chenab, Ravi, and Basantar basins. Mentor to generations of Western Himalayan ecologists.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-slate-400">University of Jammu (Emeritus)</span>
                  <button
                    onClick={() => {
                      const d = ENVIRONMENTAL_SCIENTISTS_DOSSIERS.find((sci) => sci.id === 'sci-077');
                      if (d) setSelectedScientist(d);
                    }}
                    className="px-2.5 py-1 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>Examine Dossier</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </Card>
            </div>

            {/* Scientists Dossier Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredScientists.map((s) => (
                <ScientistDossierCard
                  key={s.id}
                  scientist={s}
                  onExamine={(sci) => setSelectedScientist(sci)}
                />
              ))}

              {filteredScientists.length === 0 && (
                <div className="col-span-full py-12 text-center bg-slate-900/50 rounded-lg border border-slate-800">
                  <Microscope className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <h4 className="text-sm font-semibold text-white">No environmental scientists match your criteria</h4>
                  <p className="text-xs text-slate-400 mt-1">Try resetting the candidate track, regional, or scientific field filters.</p>
                </div>
              )}
            </div>

            {/* University Faculty Registry Section */}
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-400" />
                    <span>University Environmental Faculty &amp; Researcher Registry</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Institutional directory of 14 Himalayan Universities &amp; Research Centers across all 5 regions. University faculty holding teaching or administrative chairs are indexed for scientific expertise, distinct from verified Green Hero conservation outcomes.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-slate-400 px-2.5 py-1 rounded-[4px] bg-slate-900 border border-slate-800 shrink-0">
                  {UNIVERSITY_FACULTY_REGISTRY.length} Documented Faculty Items
                </div>
              </div>

              {/* Faculty Filter Bar */}
              <Card className="p-3 bg-slate-900/90 border-slate-800 rounded-lg space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={facultySearch}
                      onChange={(e) => setFacultySearch(e.target.value)}
                      placeholder="Search faculty by name, department, or specialization..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-[6px] pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <select
                      value={selectedFacultyInst}
                      onChange={(e) => setSelectedFacultyInst(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
                    >
                      <option value="ALL">All 14 Regional Universities &amp; Research Centers</option>
                      <option value="University of Kashmir">University of Kashmir (CORD &amp; EVS)</option>
                      <option value="University of Jammu">University of Jammu (EVS)</option>
                      <option value="Central University of Jammu">Central University of Jammu</option>
                      <option value="Karakoram International University (KIU)">Karakoram International University (KIU Gilgit)</option>
                      <option value="University of Baltistan, Skardu">University of Baltistan (Skardu)</option>
                      <option value="University of Ladakh">University of Ladakh (Leh &amp; Kargil)</option>
                      <option value="University of Azad Jammu and Kashmir (UAJK)">University of Azad Jammu &amp; Kashmir (UAJK)</option>
                      <option value="University of Poonch Rawalakot">University of Poonch Rawalakot (UPR)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Showing <strong>{filteredFaculty.length}</strong> of {UNIVERSITY_FACULTY_REGISTRY.length} faculty items</span>
                  {(selectedFacultyInst !== 'ALL' || facultySearch.trim()) && (
                    <button
                      onClick={() => {
                        setSelectedFacultyInst('ALL');
                        setFacultySearch('');
                      }}
                      className="text-xs text-indigo-400 hover:underline cursor-pointer"
                    >
                      Reset faculty filter
                    </button>
                  )}
                </div>
              </Card>

              {/* Faculty Table */}
              <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/60">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Faculty Member &amp; Status</th>
                      <th className="py-2.5 px-3">Institution &amp; Department</th>
                      <th className="py-2.5 px-3">Region</th>
                      <th className="py-2.5 px-3">Specialization &amp; KEW Relevance</th>
                      <th className="py-2.5 px-3 text-right">Official Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {filteredFaculty.map((f) => (
                      <tr key={f.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3 space-y-0.5">
                          <div className="font-bold text-white text-xs">{f.scientistName}</div>
                          <div className="text-[11px] text-slate-400">{f.designation}</div>
                          <span className={`inline-block text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] font-medium ${
                            f.status === 'CURRENT_FACULTY'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                              : f.status === 'FORMER_HEAD' || f.status === 'EMERITUS'
                              ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-800/60'
                              : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                          }`}>
                            {f.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 space-y-0.5">
                          <div className="font-medium text-slate-200">{f.institution}</div>
                          <div className="text-[11px] text-slate-400">{f.department}</div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                            {f.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : f.region}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 space-y-0.5 max-w-sm">
                          <div className="text-slate-200 text-xs font-medium">{f.scientificSpecialization}</div>
                          <div className="text-[10px] text-indigo-300 italic">{f.kewResearchRelevance}</div>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <a
                            href={f.officialSourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline"
                          >
                            <span>Verify Faculty</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                    {filteredFaculty.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-500">
                          No faculty items match the filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Linked KEW Scientific Modules Matrix */}
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Linked KEW Scientific Modules Matrix</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Direct connections from research fields into KEW&apos;s live telemetry, monitoring scorecards, and atlas databases
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {LINKED_SCIENTIFIC_MODULES_MAP.map((mod, idx) => (
                  <Link
                    key={idx}
                    href={mod.link}
                    className="p-3.5 bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 rounded-lg transition-all flex flex-col justify-between space-y-2 group"
                  >
                    <div>
                      <div className="text-[10px] uppercase font-bold text-indigo-400">{mod.field}</div>
                      <div className="text-xs text-slate-200 font-medium mt-1 group-hover:text-white leading-snug">{mod.kewModule}</div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-indigo-300 font-medium pt-1">
                      <span>Open Scientific Module</span>
                      <ArrowUpRight className="w-3 h-3 text-indigo-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB: ADVOCATES & LEGAL PROFESSIONALS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'advocates-legal' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded-[4px] bg-amber-950/80 text-amber-300 border border-amber-800/60">
                  KEW GREEN HERO · ENVIRONMENTAL LAW, PILs &amp; JUDICIAL GOVERNANCE
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Research Review: {LEGAL_ADVOCATES_REGISTRY_TELEMETRY.reviewDate}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Advocates &amp; Legal Professionals
              </h3>
            </div>

            {/* Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-slate-400">Candidate Profiles</div>
                <div className="text-2xl font-black text-white font-mono mt-0.5">{LEGAL_ADVOCATES_REGISTRY_TELEMETRY.candidateDossiers}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">5 Regional Benches</div>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-amber-400">Petitioners &amp; Originators</div>
                <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">{LEGAL_ADVOCATES_REGISTRY_TELEMETRY.petitionersCount}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Standing &amp; PIL filings</div>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-indigo-400">Counsel &amp; Amicus</div>
                <div className="text-2xl font-black text-indigo-400 font-mono mt-0.5">{LEGAL_ADVOCATES_REGISTRY_TELEMETRY.counselAndAmicusCount}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Courtroom representation</div>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-emerald-400">Judicial Officers</div>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">{LEGAL_ADVOCATES_REGISTRY_TELEMETRY.judicialContributorsCount}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Binding court orders</div>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-cyan-400">Legal Educators &amp; Aid</div>
                <div className="text-2xl font-black text-cyan-400 font-mono mt-0.5">{LEGAL_ADVOCATES_REGISTRY_TELEMETRY.legalEducatorsCount}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Community legal clinics</div>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-yellow-400">Under Legal Audit</div>
                <div className="text-2xl font-black text-yellow-400 font-mono mt-0.5">{LEGAL_ADVOCATES_REGISTRY_TELEMETRY.underEvidentiaryAudit}</div>
                <div className="text-[10px] text-yellow-400/80 mt-0.5">0 Approved · Pending</div>
              </div>
            </div>

            {/* Strategic Question Callout: Exclusive Classification Standard */}
            <Card className="p-5 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-[6px] bg-amber-950/80 text-amber-400 border border-amber-800/40 shrink-0 mt-0.5">
                  <Scale className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    KEW Legal Jurisprudence &amp; Editorial Classification Mandate
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    Should KEW reserve the designation FOUNDING LEGAL PIONEER exclusively for M. C. Mehta, while using ordinary litigation-role classifications for the remaining environmental advocates?
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
                    Advocate Mahesh Chander Mehta belongs in the living Advocates &amp; Legal Professionals directory as a foundational figure, not in the deceased-only Environmental Legacy Hall. &ldquo;Founding legal pioneer&rdquo; is an editorial classification, not an officially conferred title. His landmark Supreme Court public-interest litigations established absolute liability, industrial pollution controls, and Taj Trapezium protections, alongside his J&amp;K High Court appointment to the Dal and Wular Lake Committees of Experts.
                  </p>
                </div>
              </div>
            </Card>

            {/* Filter Bar with Role Selector Pills */}
            <Card className="p-4 bg-slate-900/90 border-slate-800 rounded-lg space-y-4">
              {/* Role Selector Pills */}
              <div className="flex items-center gap-2 flex-wrap pb-3 border-b border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Legal Capacity:</span>
                <button
                  onClick={() => setSelectedAdvRole('ALL')}
                  className={`px-3 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                    selectedAdvRole === 'ALL'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  All Legal Profiles ({ENVIRONMENTAL_ADVOCATES_DOSSIERS.length})
                </button>
                <button
                  onClick={() => setSelectedAdvRole('FOUNDING_LEGAL_PIONEER')}
                  className={`px-3 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                    selectedAdvRole === 'FOUNDING_LEGAL_PIONEER'
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Founding Legal Pioneer ({ENVIRONMENTAL_ADVOCATES_DOSSIERS.filter(a => a.legalRole === 'FOUNDING_LEGAL_PIONEER').length})
                </button>
                <button
                  onClick={() => setSelectedAdvRole('PETITIONER_LITIGANT')}
                  className={`px-3 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                    selectedAdvRole === 'PETITIONER_LITIGANT'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Petitioners &amp; Originators ({ENVIRONMENTAL_ADVOCATES_DOSSIERS.filter(a => a.legalRole === 'PETITIONER_LITIGANT' || a.legalRole === 'PIL_ORIGINATOR').length})
                </button>
                <button
                  onClick={() => setSelectedAdvRole('COUNSEL_ADVOCATE')}
                  className={`px-3 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                    selectedAdvRole === 'COUNSEL_ADVOCATE'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Counsel &amp; Advocates ({ENVIRONMENTAL_ADVOCATES_DOSSIERS.filter(a => a.legalRole === 'COUNSEL_ADVOCATE').length})
                </button>
                <button
                  onClick={() => setSelectedAdvRole('AMICUS_CURIAE')}
                  className={`px-3 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                    selectedAdvRole === 'AMICUS_CURIAE'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Amicus Curiae ({ENVIRONMENTAL_ADVOCATES_DOSSIERS.filter(a => a.legalRole === 'AMICUS_CURIAE').length})
                </button>
                <button
                  onClick={() => setSelectedAdvRole('JUDICIAL_CONTRIBUTOR')}
                  className={`px-3 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                    selectedAdvRole === 'JUDICIAL_CONTRIBUTOR'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Judicial Contributors ({ENVIRONMENTAL_ADVOCATES_DOSSIERS.filter(a => a.legalRole === 'JUDICIAL_CONTRIBUTOR').length})
                </button>
                <button
                  onClick={() => setSelectedAdvRole('LEGAL_EDUCATOR')}
                  className={`px-3 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                    selectedAdvRole === 'LEGAL_EDUCATOR'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Legal Educators &amp; Aid ({ENVIRONMENTAL_ADVOCATES_DOSSIERS.filter(a => a.legalRole === 'LEGAL_EDUCATOR' || a.legalRole === 'GOVERNMENT_LEGAL_PROFESSIONAL').length})
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={advSearch}
                  onChange={(e) => setAdvSearch(e.target.value)}
                  placeholder="Search lawyers, judges, case numbers, or legal forums..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-[6px] pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Region</label>
                  <select
                    value={selectedAdvRegion}
                    onChange={(e) => setSelectedAdvRegion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500 text-xs"
                  >
                    <option value="ALL">All Five Regions ({ENVIRONMENTAL_ADVOCATES_DOSSIERS.length} Candidates)</option>
                    <option value="Kashmir Valley">Kashmir Valley ({advRegionCounts['Kashmir Valley'] || 0})</option>
                    <option value="Jammu">Jammu ({advRegionCounts['Jammu'] || 0})</option>
                    <option value="Ladakh">Ladakh ({advRegionCounts['Ladakh'] || 0})</option>
                    <option value="Azad Jammu & Kashmir">AJ&amp;K ({advRegionCounts['Azad Jammu & Kashmir'] || 0})</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan ({advRegionCounts['Gilgit-Baltistan'] || 0})</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Legal Role / Capacity</label>
                  <select
                    value={selectedAdvRole}
                    onChange={(e) => setSelectedAdvRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500 text-xs"
                  >
                    <option value="ALL">All Legal Capacities</option>
                    <option value="FOUNDING_LEGAL_PIONEER">Founding Legal Pioneer (M. C. Mehta)</option>
                    <option value="PETITIONER_LITIGANT">Petitioner / Public-Interest Litigant</option>
                    <option value="COUNSEL_ADVOCATE">Counsel / Advocate</option>
                    <option value="AMICUS_CURIAE">Amicus Curiae</option>
                    <option value="JUDICIAL_CONTRIBUTOR">Judicial Contributor</option>
                    <option value="LEGAL_EDUCATOR">Environmental Legal Educator</option>
                    <option value="GOVERNMENT_LEGAL_PROFESSIONAL">Government Legal Professional</option>
                    <option value="PIL_ORIGINATOR">Environmental PIL Originator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Sort Green Heroes</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrderOption)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500 text-xs"
                  >
                    <option value="A_Z">Name: A–Z (Default)</option>
                    <option value="Z_A">Name: Z–A</option>
                    <option value="RECENT">Recently Added / Year</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Showing <strong>{filteredAdvocates.length}</strong> of {ENVIRONMENTAL_ADVOCATES_DOSSIERS.length} legal professionals</span>
                {(selectedAdvRegion !== 'ALL' || selectedAdvRole !== 'ALL' || advSearch.trim() || sortOrder !== 'A_Z') && (
                  <button
                    onClick={() => {
                      setSelectedAdvRegion('ALL');
                      setSelectedAdvRole('ALL');
                      setAdvSearch('');
                      setSortOrder('A_Z');
                    }}
                    className="text-xs text-amber-400 hover:underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </Card>

            {/* Advocates Dossier Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAdvocates.map((a) => (
                <Card
                  key={a.id}
                  className="green-hero-card p-5 bg-slate-900/80 border-slate-800 hover:border-amber-700/60 transition-all rounded-lg flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] font-semibold border ${
                          a.legalRole === 'FOUNDING_LEGAL_PIONEER'
                            ? 'bg-amber-950 text-amber-300 border-amber-500 font-bold'
                            : a.legalRole === 'PETITIONER_LITIGANT' || a.legalRole === 'PIL_ORIGINATOR'
                            ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                            : a.legalRole === 'COUNSEL_ADVOCATE'
                            ? 'bg-indigo-950/80 text-indigo-300 border-indigo-800/60'
                            : a.legalRole === 'AMICUS_CURIAE'
                            ? 'bg-purple-950/80 text-purple-300 border-purple-800/60'
                            : a.legalRole === 'JUDICIAL_CONTRIBUTOR'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                            : 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60'
                        }`}>
                          {a.legalRole === 'FOUNDING_LEGAL_PIONEER' ? 'FOUNDING LEGAL PIONEER' : a.legalRole.replace(/_/g, ' ')}
                        </span>
                        {a.specializations.slice(0, 2).map((s, i) => (
                          <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                            {s}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {a.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : a.region}
                      </span>
                    </div>

                    {/* Name & Title */}
                    <div>
                      <h4 className="text-lg font-bold text-white leading-tight">
                        {formatDisplayName(a.name, a.honorific)}
                      </h4>
                      <p className="designation text-xs text-amber-400 font-medium mt-0.5">{a.primaryDesignation}</p>
                      <p className="affiliation text-[11px] text-slate-400 italic mt-0.5">{a.affiliationOrChamber}</p>
                    </div>

                    {/* Editorial Tribute Quotation */}
                    <div className="p-3 rounded-[6px] bg-slate-950/90 border-l-2 border-amber-500 text-xs italic text-slate-300">
                      {a.editorialTribute}
                    </div>

                    {/* Biography & Key Impact */}
                    <p className="contribution text-xs text-slate-300 leading-relaxed">{a.narrative}</p>

                    <div className="p-2.5 rounded-[4px] bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200">
                      <strong>Key Impact:</strong> {a.keyImpact}
                    </div>

                    {/* Conferred Recognition / Honors */}
                    {a.recognition && (
                      <div className="p-2.5 rounded-[4px] bg-amber-950/40 border border-amber-700/60 text-xs text-amber-200">
                        <strong className="text-amber-400">Recognition:</strong> {a.recognition}
                      </div>
                    )}

                    {/* Case References */}
                    {a.caseReferences.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                        <span className="text-[10px] uppercase font-bold text-slate-500">Dockets:</span>
                        {a.caseReferences.map((ref, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-950 border border-slate-800 text-slate-300">
                            {ref}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Documented Contributions */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        Documented Legal Proceedings ({a.documentedContributions.length})
                      </div>
                      {a.documentedContributions.map((contrib, idx) => (
                        <div key={idx} className="p-2 bg-slate-950/80 border border-slate-800/80 rounded-[4px] text-[11px] space-y-0.5">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-bold text-white">{contrib.year} · {contrib.title}</span>
                            <span className="font-mono text-amber-400 text-[9px] px-1 rounded bg-slate-800">{contrib.legalForum}</span>
                          </div>
                          <p className="text-slate-300">{contrib.description}</p>
                          <div className="text-[10px] text-emerald-400 font-medium pt-0.5">
                            <strong>Outcome:</strong> {contrib.documentedOutcome}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Source Provenance */}
                    <div className="space-y-1 pt-1 border-t border-slate-800/80 text-[11px]">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Source Provenance:</span>
                      <div className="flex flex-col gap-1">
                        {a.sourceProvenance.map((src, idx) => (
                          <a
                            key={idx}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-slate-300 hover:text-amber-400 flex items-center gap-1.5 truncate"
                          >
                            <ExternalLink className="w-3 h-3 text-amber-400 shrink-0" />
                            <span className="truncate">{src.title}</span>
                            <span className="text-[10px] text-slate-500">({src.recordType})</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer & Modal */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <span className="verification text-[10px] text-slate-400 leading-normal" title={a.legalStatus}>
                      {a.legalStatus}
                    </span>
                    <button
                      onClick={() => setSelectedAdvocate(a)}
                      className="px-3 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <span>Examine Legal Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              ))}

              {filteredAdvocates.length === 0 && (
                <div className="col-span-full py-12 text-center bg-slate-900/50 rounded-lg border border-slate-800">
                  <Scale className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <h4 className="text-sm font-semibold text-white">No legal professionals match your criteria</h4>
                  <p className="text-xs text-slate-400 mt-1">Try resetting the legal capacity or regional filters.</p>
                </div>
              )}
            </div>

            {/* Cross-Regional Environmental Law Specialists Table */}
            <div className="space-y-3 pt-6 border-t border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>Cross-Regional Environmental Law Specialists</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Specialists practicing before the Supreme Court of India, National Green Tribunal, and appellate benches whose counsel or advocacy directly shapes Western Himalayan environmental jurisprudence.
                </p>
              </div>

              <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/60">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Specialist &amp; Role</th>
                      <th className="py-2.5 px-3">Jurisdiction</th>
                      <th className="py-2.5 px-3">Documented Regional Contribution</th>
                      <th className="py-2.5 px-3 text-right">Source Provenance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {[...CROSS_REGIONAL_LEGAL_SPECIALISTS].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder)).map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3 space-y-0.5">
                          <div className="font-bold text-white text-xs">{s.name}</div>
                          <div className="text-[11px] text-amber-400">{s.role}</div>
                        </td>
                        <td className="py-2.5 px-3 text-slate-300 text-xs">
                          {s.jurisdiction}
                        </td>
                        <td className="py-2.5 px-3 text-slate-300 max-w-md text-xs leading-relaxed">
                          {s.documentedContribution}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <a
                            href={s.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 hover:underline"
                          >
                            <span>{s.sourceLabel}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Regional Environmental Legal Network Callout Banner */}
            <Card className="p-5 bg-slate-900 border-amber-800/50 rounded-lg space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-[4px] bg-amber-950 text-amber-300 border border-amber-800/60">
                  KEW REGIONAL ENVIRONMENTAL LEGAL NETWORK
                </span>
                <span className="text-xs text-slate-400 font-mono">Pro Bono &amp; Compliance Research Panel</span>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-white">Join the Regional Environmental Legal Roster</h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  Are you a practicing lawyer, researcher, or law faculty member across Kashmir Valley, Jammu, Ladakh, AJ&amp;K, or Gilgit-Baltistan? Register voluntarily to assist community public-interest litigants with environmental legal research, certified court docket verification, and ground-level compliance tracking.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <Link
                  href="/resources/environmental-pil"
                  className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Open Environmental PIL Portal</span>
                </Link>
                <Link
                  href="/get-involved/volunteer"
                  className="px-3.5 py-1.5 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                >
                  Register Legal Expertise
                </Link>
              </div>
            </Card>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB: POETS, SINGERS & CREATIVE ARTISTS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'poets-artists' && (
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[4px] bg-purple-950/70 text-purple-300 border border-purple-800/40">
                  Creative Arts &amp; Environmental Culture
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[4px] bg-emerald-950/70 text-emerald-300 border border-emerald-800/40">
                  All Five Himalayan Regions
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                  {CREATIVE_ARTISTS_DOSSIERS.length} Documented Dossiers · 7 Research Leads
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Poets, Singers &amp; Creative Artists</h3>
              <p className="text-xs text-purple-300 font-medium mt-0.5">
                Environmental Poetry · Ecological Songs · Conservation Art · Climate Filmmaking · Nature Photography · All Five Regions
              </p>
            </div>

            {/* Three Creative Contribution Archetypes Strip */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Three Distinct Types of Creative Environmental Contributions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                      1. Explicit Environmental Advocacy
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Creative work that explicitly campaigns for conservation, decries industrial pollution or wetland encroachment, and seeks direct behavioral or policy interventions (e.g. Zareef Ahmad Zareef&apos;s food-heritage verses, Mudasir Rehman Dar&apos;s polythene art, Padma Ladol&apos;s climate rap).
                  </p>
                </Card>

                <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wide">
                      2. Ecological Documentation
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Artistic and cinematic recording of changing mountain environments, pastoral adaptations, or water infrastructure impacts without partisan slogans (e.g. Jalal Ud Din Baba&apos;s Wular films, Saba Khan&apos;s Mangla Dam visual archive, Karamat Ali&apos;s Burushaski documentary).
                  </p>
                </Card>

                <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wide">
                      3. Nature Representation
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Art, folk lyrics, and imagery that celebrate natural landscapes, seasons, and mountain beauty as cultural heritage without necessarily advancing a specific conservation doctrine or regulatory critique (e.g. collaborative mountain residencies).
                  </p>
                </Card>
              </div>
            </div>

            {/* Telemetry & Editorial Safeguards Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Candidate Dossiers</span>
                <div className="text-2xl font-black text-white font-mono">{CREATIVE_ARTISTS_DOSSIERS.length}</div>
                <div className="text-[11px] text-slate-400">Spanning all 5 Himalayan regions</div>
              </Card>

              <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Research Leads</span>
                <div className="text-2xl font-black text-purple-400 font-mono">7 Leads</div>
                <div className="text-[11px] text-slate-400">Wakhi, Balti, Burushaski &amp; Kashmiri</div>
              </Card>

              <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Geographic Spread</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">5 Arenas</div>
                <div className="text-[11px] text-slate-400">Kashmir, Jammu, Ladakh, AJ&amp;K, GB</div>
              </Card>

              <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Primary Evidence Tier</span>
                <div className="text-2xl font-black text-indigo-400 font-mono">100%</div>
                <div className="text-[11px] text-slate-400">University, festival &amp; catalog records</div>
              </Card>
            </div>

            {/* Editorial Safeguards Notice */}
            <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">KEW Creative Arts Editorial Safeguards</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="p-2.5 rounded-[4px] bg-slate-950/70 border border-slate-800/80">
                  <strong className="text-white block mb-0.5">1. Performer vs. Author Discipline</strong>
                  A musician performing in a climate-awareness event is not automatically the author of environmental lyrics. Attribution separates performance from lyrical creation.
                </div>
                <div className="p-2.5 rounded-[4px] bg-slate-950/70 border border-slate-800/80">
                  <strong className="text-white block mb-0.5">2. Empirical Data Boundary</strong>
                  A film or painting depicting a glacier or river is not automatically empirical evidence of glacier retreat or water quality. Artistic impressions are classified as cultural records.
                </div>
                <div className="p-2.5 rounded-[4px] bg-slate-950/70 border border-slate-800/80">
                  <strong className="text-white block mb-0.5">3. Individual Provenance &amp; Rights</strong>
                  Every creative work maintains its own record containing title, creator, year, language, medium, geographic subject, and evidence of public presentation.
                </div>
              </div>
            </Card>

            {/* Initial Regional Directory Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Initial Regional Directory Matrix</h4>
                  <p className="text-xs text-slate-400">
                    Geographic placement records where the environmental work is situated, not necessarily the artist&apos;s place of birth or current residence.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-800 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Artist</th>
                      <th className="px-4 py-3">Region / Geographic Work</th>
                      <th className="px-4 py-3">Environmental Contribution</th>
                      <th className="px-4 py-3">Classification</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950/50">
                    {filteredArtists.map((art) => (
                      <tr key={art.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="px-4 py-2.5 font-bold text-white flex items-center gap-2">
                          <span className="p-1 rounded bg-purple-950/80 text-purple-400 border border-purple-800/40">
                            {art.medium === 'Poetry & Literature' ? <BookOpen className="w-3 h-3" /> :
                             art.medium === 'Songs & Music' ? <Music className="w-3 h-3" /> :
                             art.medium === 'Visual Arts & Installations' ? <Palette className="w-3 h-3" /> :
                             <Film className="w-3 h-3" />}
                          </span>
                          <span>{formatDisplayName(art.name, art.honorific)}</span>
                        </td>
                        <td className="px-4 py-2.5 text-slate-300 font-mono text-[11px]">
                          {art.geographicSubject}
                        </td>
                        <td className="px-4 py-2.5 text-slate-300 max-w-xs truncate" title={art.keyImpact}>
                          {art.keyImpact}
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-[4px] border ${
                            art.contributionType === 'EXPLICIT_ADVOCACY'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/40'
                              : art.contributionType === 'ECOLOGICAL_DOCUMENTATION'
                              ? 'bg-indigo-950/80 text-indigo-300 border-indigo-800/40'
                              : 'bg-purple-950/80 text-purple-300 border-purple-800/40'
                          }`}>
                            {art.contributionType === 'EXPLICIT_ADVOCACY' ? 'Advocacy' :
                             art.contributionType === 'ECOLOGICAL_DOCUMENTATION' ? 'Documentation' : 'Representation'}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <button
                            onClick={() => setSelectedArtist(art)}
                            className="px-2.5 py-1 rounded-[4px] bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-700/40 text-[11px] font-medium transition-colors cursor-pointer"
                          >
                            View Dossier
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Filter Bar */}
            <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={artistSearch}
                    onChange={(e) => setArtistSearch(e.target.value)}
                    placeholder={`Search ${CREATIVE_ARTISTS_DOSSIERS.length} creative artists by name, geographic subject, artwork title, or lyrics/cinema themes...`}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <label className="text-[10px] uppercase font-semibold text-slate-400">Sort Green Heroes:</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrderOption)}
                    className="bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-purple-500 text-xs"
                  >
                    <option value="A_Z">Name: A–Z (Default)</option>
                    <option value="Z_A">Name: Z–A</option>
                    <option value="RECENT">Recently Added / Year</option>
                  </select>
                </div>
              </div>

              {/* Region Filter */}
              <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-500">Filter by Geographic Region:</span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['ALL', 'Kashmir Valley', 'Jammu', 'Ladakh', 'Azad Jammu & Kashmir', 'Gilgit-Baltistan'].map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setSelectedArtistRegion(reg)}
                      className={`px-2.5 py-1 rounded-[6px] transition-all cursor-pointer text-xs ${
                        selectedArtistRegion === reg
                          ? 'bg-purple-600 text-white font-semibold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {reg === 'ALL' ? `All Regions (${CREATIVE_ARTISTS_DOSSIERS.length})` : reg === 'Azad Jammu & Kashmir' ? 'AJ&K' : reg}
                      {reg !== 'ALL' && artistRegionCounts[reg] ? ` (${artistRegionCounts[reg]})` : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Medium & Contribution Type Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 border-t border-slate-800/80 text-xs">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Creative Medium:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['ALL', 'Poetry & Literature', 'Songs & Music', 'Visual Arts & Installations', 'Filmmaking & Cinema', 'Animation & Illustration'].map((med) => (
                      <button
                        key={med}
                        onClick={() => setSelectedArtistMedium(med)}
                        className={`px-2 py-0.5 rounded-[4px] text-[11px] transition-all cursor-pointer ${
                          selectedArtistMedium === med
                            ? 'bg-indigo-600 text-white font-semibold'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {med === 'ALL' ? 'All Mediums' : med}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Contribution Archetype:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'ALL', label: 'All Types' },
                      { id: 'EXPLICIT_ADVOCACY', label: 'Explicit Advocacy' },
                      { id: 'ECOLOGICAL_DOCUMENTATION', label: 'Documentation' },
                      { id: 'NATURE_REPRESENTATION', label: 'Nature Representation' }
                    ].map((typ) => (
                      <button
                        key={typ.id}
                        onClick={() => setSelectedArtistType(typ.id)}
                        className={`px-2 py-0.5 rounded-[4px] text-[11px] transition-all cursor-pointer ${
                          selectedArtistType === typ.id
                            ? 'bg-emerald-600 text-white font-semibold'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {typ.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reset active filters */}
              {(selectedArtistRegion !== 'ALL' || selectedArtistMedium !== 'ALL' || selectedArtistType !== 'ALL' || artistSearch.trim() || sortOrder !== 'A_Z') && (
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Showing <strong className="text-white">{filteredArtists.length}</strong> of {CREATIVE_ARTISTS_DOSSIERS.length} creative artists
                  </span>
                  <button
                    onClick={() => {
                      setSelectedArtistRegion('ALL');
                      setSelectedArtistMedium('ALL');
                      setSelectedArtistType('ALL');
                      setArtistSearch('');
                      setSortOrder('A_Z');
                    }}
                    className="text-purple-400 hover:underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </Card>

            {/* Foundational Creative Spotlight: Dr. Zarf-e-Noori (Dr. Fayaz Ahmad Khan) */}
            <Card className="p-5 bg-slate-900/80 border border-purple-700/40 rounded-lg space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-purple-900/60 text-purple-200 border border-purple-700/50 uppercase tracking-wider font-bold">
                      Foundational EcoVoices Catalog
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                      Kashmir Valley · Diaspora
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                      5 Master Releases
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
                    <span>Dr. Zarf-e-Noori</span>
                    <span className="text-xs font-normal text-purple-300 font-mono bg-purple-950/80 border border-purple-800/60 px-2 py-0.5 rounded-[4px]">
                      Literary Identity of Dr. Fayaz Ahmad Khan
                    </span>
                  </h3>
                  <p className="text-xs text-purple-300 font-medium">
                    Sufi Poet, Lyricist, Environmental Scientist and Principal Literary Voice of SufiPulse USA
                  </p>
                  <p className="text-xs text-slate-300 italic max-w-3xl">
                    &ldquo;Giving Kashmir&apos;s rivers, lakes, landscapes and ecological heritage a voice through contemporary Sufi expression.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/environmental-calendar/ecovoices"
                    className="px-3 py-1.5 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-white text-xs font-medium border border-purple-800/40 flex items-center gap-1.5 transition-colors"
                  >
                    <Headphones className="w-3.5 h-3.5 text-purple-400" />
                    <span>Open EcoVoices Player</span>
                  </Link>
                  <button
                    onClick={() => {
                      const zarf = CREATIVE_ARTISTS_DOSSIERS.find((a) => a.id === 'art-019');
                      if (zarf) setSelectedArtist(zarf);
                    }}
                    className="px-3.5 py-1.5 rounded-[6px] bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Examine 5 Master Releases</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 5 Master Releases Quickstrip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 pt-2 border-t border-purple-800/30">
                {[
                  { code: 'SP-USA-ENV-001', title: 'PANI GAWAH HAI', theme: 'Water Bears Witness', dur: '27:52', yr: '2026' },
                  { code: 'SP-USA-ENV-002', title: 'Sheikh! Sheikh! Noorani (RA)', theme: 'Father of Sustainable Dev', dur: '8:26', yr: '2025' },
                  { code: 'SP-USA-ENV-003', title: 'Sufi Cry for a River', theme: 'A Cry for the Jhelum (Vyeth)', dur: '11:42', yr: '2025' },
                  { code: 'SP-USA-ENV-004', title: 'Mirror of Hazratbal, Wound of Dal', theme: 'Dal Lake & Hazratbal Basin', dur: '14:18', yr: '2025' },
                  { code: 'SP-USA-ENV-005', title: 'Cry of the Kashmir Valley', theme: 'Come Light the Mystic Lamp', dur: '12:35', yr: '2025' }
                ].map((track) => (
                  <div key={track.code} className="p-2.5 rounded-[6px] bg-slate-950/80 border border-slate-800 hover:border-purple-600/50 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-purple-400">
                      <span>{track.code}</span>
                      <span className="text-slate-400">{track.dur}</span>
                    </div>
                    <div className="font-bold text-white text-xs truncate" title={track.title}>{track.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">{track.theme}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Dossier Cards Grid ({CREATIVE_ARTISTS_DOSSIERS.length} Profiles) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredArtists.map((artist) => (
                <Card
                  key={artist.id}
                  className="green-hero-card p-5 bg-slate-900/80 border-slate-800 hover:border-purple-600/50 rounded-lg flex flex-col justify-between space-y-4 transition-all"
                >
                  <div className="space-y-3">
                    {/* Badges */}
                    <div className="flex items-center justify-between flex-wrap gap-1.5 text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-[4px] border ${
                          artist.contributionType === 'EXPLICIT_ADVOCACY'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/40'
                            : artist.contributionType === 'ECOLOGICAL_DOCUMENTATION'
                            ? 'bg-indigo-950/80 text-indigo-300 border-indigo-800/40'
                            : 'bg-purple-950/80 text-purple-300 border-purple-800/40'
                        }`}>
                          {artist.contributionTypeLabel}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                          {artist.medium}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {artist.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : artist.region}
                      </span>
                    </div>

                    {/* Name & Title */}
                    <div>
                      <h4 className="text-lg font-bold text-white leading-tight">
                        {formatDisplayName(artist.name, artist.honorific)}
                      </h4>
                      {artist.personIdentity && (
                        <div className="mt-1">
                          <span className="text-[10px] font-mono text-purple-300 bg-purple-950/70 border border-purple-800/50 px-2 py-0.5 rounded-[4px] inline-block">
                            Literary Identity of {artist.personIdentity}
                          </span>
                        </div>
                      )}
                      <p className="designation text-xs text-purple-300 font-medium mt-0.5">{artist.designation}</p>
                      <p className="affiliation text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>{artist.geographicSubject}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-500 font-mono">{artist.activePeriod}</span>
                      </p>
                    </div>

                    {/* Editorial Tribute Quotation */}
                    <div className="p-3 rounded-[6px] bg-slate-950/90 border-l-2 border-purple-500 text-xs italic text-slate-300">
                      {artist.editorialTribute}
                    </div>

                    {/* Biography & Key Impact */}
                    <p className="contribution text-xs text-slate-300 leading-relaxed">{artist.biography}</p>

                    <div className="p-2.5 rounded-[4px] bg-purple-950/20 border border-purple-800/40 text-xs text-purple-200">
                      <strong>Key Impact:</strong> {artist.keyImpact}
                    </div>

                    {/* Documented Contributions & Verifiable Works */}
                    <div className="space-y-2 pt-1 border-t border-slate-800/80">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Documented Contributions &amp; Verifiable Works ({artist.documentedWorks.length})
                      </span>
                      {artist.documentedWorks.map((work, idx) => (
                        <div key={idx} className="p-2.5 rounded-[6px] bg-slate-950/70 border border-slate-800/60 text-xs space-y-1">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="font-bold text-white text-xs">{work.title}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-purple-950/60 border border-purple-800/40 text-purple-300">
                              {work.evidenceTier}
                            </span>
                          </div>
                          <p className="text-slate-300 text-[11px]">{work.description}</p>
                          <div className="text-[10px] text-emerald-400 font-medium pt-0.5">
                            <strong>Documented Outcome:</strong> {work.documentedOutcome}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Source Provenance */}
                    <div className="space-y-1 pt-1 border-t border-slate-800/80 text-[11px]">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Source Provenance:</span>
                      <div className="flex flex-col gap-1">
                        {artist.sourceProvenance.map((src, idx) => (
                          <a
                            key={idx}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-slate-300 hover:text-purple-400 flex items-center gap-1.5 truncate"
                          >
                            <ExternalLink className="w-3 h-3 text-purple-400 shrink-0" />
                            <span className="truncate">{src.title}</span>
                            <span className="text-[10px] text-slate-500">({src.outletOrType})</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <span className="verification text-[10px] text-slate-400 leading-normal" title={artist.researchStatus}>
                      {artist.researchStatus}
                    </span>
                    <button
                      onClick={() => setSelectedArtist(artist)}
                      className="px-3 py-1.5 rounded-[6px] bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <span>Examine Creative Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              ))}

              {filteredArtists.length === 0 && (
                <div className="col-span-full p-8 text-center bg-slate-900/40 border border-slate-800 rounded-lg text-slate-400 space-y-2">
                  <p className="text-sm font-semibold text-white">No creative artists found matching filters.</p>
                  <p className="text-xs">Try resetting your region, medium, or search query parameters.</p>
                </div>
              )}
            </div>

            {/* Additional Artists for KEW Research (7 Research Leads) */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>Additional Artists for KEW Research &amp; Archival Tracing (7 Leads)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Prospective candidates under ongoing archival review across Hunza, Baltistan, and Kashmir Valley before full Green Hero approval
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[...RESEARCH_LEAD_ARTISTS].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder)).map((lead) => (
                  <Card key={lead.id} className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{lead.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {lead.geographicCoverage}
                      </span>
                    </div>
                    <div className="text-[10px] text-purple-400 font-mono font-medium">{lead.medium}</div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{lead.documentedWork}</p>
                    <div className="p-2 rounded-[4px] bg-slate-950/80 border border-slate-800 text-[10px] text-amber-300/90 leading-snug">
                      <strong>Verification Focus:</strong> {lead.verificationChallenge}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
                      <span>Source: {lead.sourceCitation}</span>
                      <a href={lead.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline flex items-center gap-1">
                        <span>Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Environmental Creative Works Registry (Ecological Voices Integration) */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Environmental Creative Works Registry (Ecological Voices Integration)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Recommended institutional architecture connecting Green Hero artists directly to KEW&apos;s Ecological Voices catalog
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Music className="w-5 h-5 text-purple-400" />
                    <h5 className="font-bold text-white text-xs">Environmental Songs &amp; Music</h5>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Songs, performers, composers, lyrics, audio recordings, dialects, and conservation themes across Pir Panjal to Karakoram.
                  </p>
                  <Link
                    href="/environmental-calendar/ecovoices"
                    className="text-xs text-purple-400 hover:underline flex items-center gap-1 pt-1 font-medium"
                  >
                    <span>Open Songs Registry</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>

                <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                    <h5 className="font-bold text-white text-xs">Environmental Poetry &amp; Verse</h5>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Original poems, published anthologies, ecological themes, recitations, English translations, and bibliographic gazettes.
                  </p>
                  <Link
                    href="/environmental-calendar/ecovoices"
                    className="text-xs text-indigo-400 hover:underline flex items-center gap-1 pt-1 font-medium"
                  >
                    <span>Open Poetry Library</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>

                <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Film className="w-5 h-5 text-cyan-400" />
                    <h5 className="font-bold text-white text-xs">Environmental Films &amp; Cinema</h5>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Filmographies, directors, crew credits, festival honors, geographical subjects, and verifiable environmental findings.
                  </p>
                  <Link
                    href="/environmental-calendar/ecovoices"
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1 pt-1 font-medium"
                  >
                    <span>Open Cinema Archive</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>

                <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-emerald-400" />
                    <h5 className="font-bold text-white text-xs">Environmental Visual Arts</h5>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Paintings, sculptures, waste-based installations, riverbank murals, gallery exhibitions, and ecological subjects.
                  </p>
                  <Link
                    href="/environmental-calendar/ecovoices"
                    className="text-xs text-emerald-400 hover:underline flex items-center gap-1 pt-1 font-medium"
                  >
                    <span>Open Art Gallery</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>
              </div>
            </div>

            {/* Strategic Question: Multilingual Archival Preservation Callout */}
            <Card className="p-5 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-[6px] bg-purple-950/80 text-purple-400 border border-purple-800/40 shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    KEW Strategic Research Question &amp; Archival Urgent Mandate
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    Should KEW prioritize locating historical environmental poetry and songs in Kashmiri, Dogri, Ladakhi, Balti, Shina, Burushaski, Wakhi, Pahari and Gojri, including works preserved by local radio stations and cultural academies, before that material disappears from public memory?
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
                    Centuries of ecological wisdom across the Western Himalayas and Karakoram remain stored exclusively in oral verses, radio broadcast tapes, and academy manuscripts. In AJ&amp;K (Pahari, Gojri, Kashmiri) and Gilgit-Baltistan (Shina, Burushaski, Balti, Wakhi), community bards and radio archives hold irreplaceable records of extinct glaciers, desiccated springs, and traditional forestry jurisprudence.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => handleTabChange('nominations')}
                      className="px-3.5 py-1.5 rounded-[6px] bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Submit Archival Candidate or Lead
                    </button>
                    <Link
                      href="/environmental-calendar/ecovoices"
                      className="px-3.5 py-1.5 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <span>Explore Ecological Voices Initiative</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB: RELIGIOUS & SPIRITUAL LEADERS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'religious-spiritual' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[4px] bg-amber-950/70 text-amber-300 border border-amber-800/40">
                  Environmental Spirituality · Faith-Based Conservation
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                  {RELIGIOUS_LEADERS_TELEMETRY.individualDossiers} Individual Dossiers · {RELIGIOUS_LEADERS_TELEMETRY.additionalLeads} Leads · {RELIGIOUS_LEADERS_TELEMETRY.regionsCovered} Regions
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  Review: {RELIGIOUS_LEADERS_TELEMETRY.reviewDate}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Religious &amp; Spiritual Leaders</h3>
              <p className="text-xs text-amber-300 font-medium mt-0.5">
                Environmental Spirituality · Faith-Based Conservation · Forest Stewardship · Water Protection · Ecological Ethics
              </p>
              <p className="text-xs text-slate-300 mt-2 max-w-4xl leading-relaxed">
                Religious and spiritual leaders have contributed to environmental thought in the Western Himalaya through centuries-old teachings, public sermons, conservation campaigns, tree planting, wildlife protection, and community education.
              </p>
            </div>

            {/* Search, Filter & Sort Bar */}
            <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={relSearch}
                    onChange={(e) => setRelSearch(e.target.value)}
                    placeholder={`Search ${RELIGIOUS_LEADERS_DOSSIERS.length} religious leaders by name, shrine/order, geographic locus, or spiritual teachings...`}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  {relSearch && (
                    <button
                      onClick={() => setRelSearch('')}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sort:</span>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrderOption)}
                    className="bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="A_Z">Name: A–Z (Default)</option>
                    <option value="Z_A">Name: Z–A</option>
                    <option value="RECENT">Recently Added / Modern</option>
                  </select>
                </div>
              </div>

              {/* Filters */}
              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                {/* Regional Pills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Geographic Region:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['ALL', 'Kashmir Valley', 'Jammu', 'Ladakh', 'Azad Jammu & Kashmir', 'Gilgit-Baltistan'].map((reg) => (
                      <button
                        key={reg}
                        onClick={() => setSelectedRelRegion(reg)}
                        className={`text-xs px-2.5 py-1 rounded-[6px] transition-colors cursor-pointer ${
                          selectedRelRegion === reg
                            ? 'bg-amber-600 text-white font-semibold'
                            : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {reg === 'ALL' ? `All Regions (${RELIGIOUS_LEADERS_DOSSIERS.length})` : reg === 'Azad Jammu & Kashmir' ? 'AJ&K' : reg}
                        {reg !== 'ALL' && relRegionCounts[reg] ? ` (${relRegionCounts[reg]})` : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Archetype Pills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Contribution Archetype:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { key: 'ALL', label: 'All Archetypes' },
                      { key: 'HISTORICAL_SPIRITUAL_LEGACY', label: 'Historical Spiritual Legacy' },
                      { key: 'PUBLIC_ENVIRONMENTAL_ADVOCACY', label: 'Public Environmental Advocacy' },
                      { key: 'FIELD_CONSERVATION_PROGRAM', label: 'Field Conservation Programs' },
                      { key: 'SPIRITUAL_EDUCATION_RESEARCH', label: 'Spiritual Education & TEK' },
                      { key: 'CIVIC_RELIGIOUS_INITIATIVE', label: 'Civic-Religious River Protection' },
                      { key: 'INSTITUTIONAL_DEVELOPMENT', label: 'Faith-Led Institutional Development' }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setSelectedRelType(item.key)}
                        className={`text-xs px-2.5 py-1 rounded-[6px] transition-colors cursor-pointer ${
                          selectedRelType === item.key
                            ? 'bg-amber-700 text-white font-semibold'
                            : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status readout */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>
                  Showing <strong className="text-white">{filteredReligiousLeaders.length}</strong> of {RELIGIOUS_LEADERS_DOSSIERS.length} religious &amp; spiritual leaders
                </span>
                {(selectedRelRegion !== 'ALL' || selectedRelType !== 'ALL' || relSearch) && (
                  <button
                    onClick={() => {
                      setSelectedRelRegion('ALL');
                      setSelectedRelType('ALL');
                      setRelSearch('');
                    }}
                    className="text-xs text-amber-400 hover:underline cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            </Card>

            {/* Dossier Cards Grid (14 Profiles) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReligiousLeaders.map((leader) => {
                const badgeColor =
                  leader.contributionType === 'HISTORICAL_SPIRITUAL_LEGACY'
                    ? 'bg-amber-950/70 text-amber-300 border-amber-800/40'
                    : leader.contributionType === 'PUBLIC_ENVIRONMENTAL_ADVOCACY'
                    ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800/40'
                    : leader.contributionType === 'FIELD_CONSERVATION_PROGRAM'
                    ? 'bg-cyan-950/70 text-cyan-300 border-cyan-800/40'
                    : leader.contributionType === 'SPIRITUAL_EDUCATION_RESEARCH'
                    ? 'bg-indigo-950/70 text-indigo-300 border-indigo-800/40'
                    : leader.contributionType === 'CIVIC_RELIGIOUS_INITIATIVE'
                    ? 'bg-purple-950/70 text-purple-300 border-purple-800/40'
                    : 'bg-blue-950/70 text-blue-300 border-blue-800/40';

                return (
                  <Card
                    key={leader.id}
                    className="green-hero-card p-5 bg-slate-900/80 border-slate-800 hover:border-amber-700/60 rounded-lg flex flex-col justify-between space-y-3.5 transition-all"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                          {leader.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : leader.region} · {leader.geographicLocus} · {leader.period}
                        </span>
                        <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-[4px] border ${badgeColor}`}>
                          {leader.contributionTypeLabel}
                        </span>
                      </div>

                      {/* Name & Epithets */}
                      <div>
                        <h4 className="text-base font-bold text-white tracking-tight">
                          {leader.name}
                        </h4>
                        {leader.honorific && (
                          <p className="text-[11px] font-mono text-amber-400 font-medium">
                            {leader.honorific}
                          </p>
                        )}
                        <p className="designation text-xs text-emerald-300 font-medium mt-0.5">
                          {leader.designation}
                        </p>
                        <p className="affiliation text-[11px] text-slate-400 italic">
                          {leader.affiliationOrShrine}
                        </p>
                      </div>

                      {/* Editorial Tribute / Sacred Shruk */}
                      <div className="p-3 rounded-[6px] bg-slate-950/90 border-l-2 border-amber-500 text-xs italic text-slate-200 leading-relaxed">
                        &ldquo;{leader.editorialTribute}&rdquo;
                      </div>

                      {/* Biography & Key Impact */}
                      <div className="space-y-1.5">
                        <p className="contribution text-xs text-slate-300 leading-relaxed">
                          {leader.biography}
                        </p>
                        <div className="p-2.5 rounded-[6px] bg-slate-950/70 border border-slate-800/80 text-[11px] text-emerald-300/90">
                          <strong className="text-white block mb-0.5">Key Ecological Impact:</strong>
                          {leader.keyImpact}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-slate-400">
                        {leader.documentedWorks.length} Documented Work{leader.documentedWorks.length !== 1 ? 's' : ''} &amp; Outcomes
                      </span>
                      <button
                        onClick={() => setSelectedReligiousLeader(leader)}
                        className="py-1.5 px-3 rounded-[6px] bg-slate-800 hover:bg-amber-600 text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Examine Spiritual Dossier</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:text-white" />
                      </button>
                    </div>
                  </Card>
                );
              })}

              {filteredReligiousLeaders.length === 0 && (
                <div className="col-span-full p-8 text-center bg-slate-900/40 border border-slate-800 rounded-lg text-slate-400 space-y-2">
                  <p className="text-sm font-semibold text-white">No religious or spiritual leaders found matching filters.</p>
                  <p className="text-xs">Try resetting your region, archetype, or search query parameters.</p>
                </div>
              )}
            </div>

            {/* Additional Religious Figures for Research (8 Leads Table) */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Additional Religious Figures for Ongoing Research (8 Active Leads)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Preachers, ulema, monastic abbots, and faith leaders currently documented in secondary media reports awaiting primary fieldwork verification
                </p>
              </div>

              <Card className="overflow-hidden bg-slate-900/80 border-slate-800 rounded-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[10px] uppercase">
                      <tr>
                        <th className="p-3">Figure &amp; Name</th>
                        <th className="p-3">Region / Locus</th>
                        <th className="p-3">Documented Connection &amp; Evidence Role</th>
                        <th className="p-3">Source Citation</th>
                        <th className="p-3 text-right">Research Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {[...RESEARCH_LEAD_RELIGIOUS].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder)).map((lead, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-3 font-semibold text-white whitespace-nowrap">
                            {lead.name}
                          </td>
                          <td className="p-3 whitespace-nowrap text-amber-300/90 font-mono text-[11px]">
                            {lead.region}
                          </td>
                          <td className="p-3 leading-relaxed max-w-md">
                            {lead.documentedConnection}
                          </td>
                          <td className="p-3 font-mono text-[10px] text-slate-400 whitespace-nowrap">
                            {lead.sourceCitation}
                          </td>
                          <td className="p-3 text-right whitespace-nowrap">
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-amber-300 border border-amber-800/40">
                              Active Lead
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Strategic Question: Sacred Ecology Registry Callout */}
            <Card className="p-5 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-[6px] bg-amber-950/80 text-amber-400 border border-amber-800/40 shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    KEW Strategic Research Question &amp; Institutional Registry Mandate
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    Should KEW go beyond honoring individual leaders and build a Sacred Ecology Registry documenting the environmental practices of mosques, Sufi shrines, Buddhist monasteries, temples, gurdwaras and other religious institutions across all five regions, including their actual waste, water, energy and biodiversity impacts?
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
                    Across the Western Himalaya, thousands of religious sites generate localized ecological pressures (pilgrimage plastic waste, floral offerings in rivers, heating emissions) while also possessing communal land reserves, sacred groves (deodar dev-vans), and ethical leverage over millions of believers. A systematic institutional registry would evaluate water conservation, solar adoption, waste management systems, and sacred grove preservation at places of worship across Kashmir Valley, Jammu, Ladakh, AJ&amp;K, and Gilgit-Baltistan.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => handleTabChange('nominations')}
                      className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Submit Sacred Site or Religious Lead
                    </button>
                    <Link
                      href="/environmental-calendar/ecovoices"
                      className="px-3.5 py-1.5 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <span>Explore Ecological Voices Initiative</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB: POLITICIANS & PUBLIC OFFICIALS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'politicians-officials' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[4px] bg-amber-950/70 text-amber-300 border border-amber-800/40">
                  Source-Documented Research Profiles · Environmental Politicians
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                  {POLITICIANS_REGISTRY_TELEMETRY.totalProfiles} Documented Profiles (Alphabetical A–Z)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  Review: {POLITICIANS_REGISTRY_TELEMETRY.reviewDate}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Politicians &amp; Public Officials</h3>
              <p className="text-xs text-amber-300 font-medium mt-0.5">
                Environmental Politicians · Legislative Oversight · Mineral Regulation · Wetland Protection · Compliance Directives
              </p>
            </div>

            {/* Search, Filter & Sort Bar */}
            <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={polSearch}
                    onChange={(e) => setPolSearch(e.target.value)}
                    placeholder="Search politicians by name, legislative committee, mining policy, or wetland review..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  {polSearch && (
                    <button
                      onClick={() => setPolSearch('')}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sort:</span>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrderOption)}
                    className="bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="A_Z">Name: A–Z (Default)</option>
                    <option value="Z_A">Name: Z–A</option>
                    <option value="RECENT">Recently Added / Modern</option>
                  </select>
                </div>
              </div>

              {/* Status readout */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>
                  Showing <strong className="text-white">{filteredPoliticians.length}</strong> of {POLITICIANS_OFFICIALS_DOSSIERS.length} environmental politicians
                </span>
                {polSearch && (
                  <button
                    onClick={() => setPolSearch('')}
                    className="text-xs text-amber-400 hover:underline cursor-pointer"
                  >
                    Reset Search Filter
                  </button>
                )}
              </div>
            </Card>

            {/* Directory Cards Grid (Strict Alphabetical Order A–Z: Ghulam Hassan Mir, Mohammad Yousuf Tarigami) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPoliticians.map((pol) => (
                <Card
                  key={pol.id}
                  className="green-hero-card p-5 bg-slate-900/80 border-slate-800 hover:border-amber-700/60 rounded-lg flex flex-col justify-between space-y-4 transition-all"
                >
                  <div className="space-y-3">
                    {/* Top Row Badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {pol.region} · {pol.district} · {pol.geographicLocus}
                      </span>
                      <span className="verification text-[9px] font-mono uppercase px-2 py-0.5 rounded-[4px] bg-amber-950/70 text-amber-300 border border-amber-800/40 font-bold">
                        {pol.verificationBadge}
                      </span>
                    </div>

                    {/* Name & Title */}
                    <div>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        {formatDisplayName(pol.name, pol.honorific)}
                      </h4>
                      <p className="text-xs font-semibold text-emerald-400 mt-0.5">
                        {pol.category}
                      </p>
                      <p className="designation text-xs text-slate-300 italic mt-0.5">
                        {pol.designation}
                      </p>
                    </div>

                    {/* Summary / Tagline */}
                    <p className="contribution text-xs text-slate-300 leading-relaxed">
                      {pol.tagline}
                    </p>

                    {/* Editorial Tribute Quote Box */}
                    <div className="p-3 rounded-[6px] bg-slate-950/90 border-l-2 border-amber-500 text-xs italic text-slate-200 leading-relaxed">
                      &ldquo;{pol.editorialTribute}&rdquo;
                    </div>

                    {/* Key Impact Box */}
                    <div className="p-2.5 rounded-[6px] bg-slate-950/70 border border-slate-800/80 text-[11px] text-emerald-300/90">
                      <strong className="text-white block mb-0.5">Key Documented Impact:</strong>
                      {pol.keyImpact}
                    </div>
                  </div>

                  {/* Footer Actions & Direct Media Links */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
                      <span>{pol.documentedWorks.length} Verifiable Works Documented</span>
                      <div className="flex items-center gap-1.5">
                        {pol.sourceProvenance.slice(0, 2).map((src, idx) => (
                          <a
                            key={idx}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors flex items-center gap-1"
                          >
                            <span>{src.outletOrType.split(',')[0]}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedPolitician(pol)}
                      className="w-full py-2 px-3 rounded-[6px] bg-slate-800 hover:bg-amber-600 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Examine Documented Works</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:text-white" />
                    </button>
                  </div>
                </Card>
              ))}

              {filteredPoliticians.length === 0 && (
                <div className="col-span-full p-8 text-center bg-slate-900/40 border border-slate-800 rounded-lg text-slate-400 space-y-2">
                  <p className="text-sm font-semibold text-white">No politicians found matching search filter.</p>
                  <p className="text-xs">Try resetting your search query.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB: NGOS & COMMUNITY GREEN CHAMPIONS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'ngos-community' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[4px] bg-teal-950/70 text-teal-300 border border-teal-800/40">
                  NGO Founders · Environmental Leaders · Community Guardians
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                  {NGOS_COMMUNITY_TELEMETRY.totalCombinedEntities} Documented Entities ({NGOS_COMMUNITY_TELEMETRY.existingRecords} Calibrated + {NGOS_COMMUNITY_TELEMETRY.newNgoCandidates} NGO Leaders)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  Review: {NGOS_COMMUNITY_TELEMETRY.reviewDate}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">NGOs &amp; Community Green Champions</h3>
              <p className="text-xs text-teal-300 font-medium mt-0.5">
                Wetland Restoration · Community Conservation · Mountain Stewardship · Spring Rejuvenation
              </p>
              <p className="text-xs text-slate-300 mt-2 max-w-4xl leading-relaxed">
                Recognizing grassroots environmental defenders, traditional knowledge keepers, and leaders of civil society organizations across the Western Himalaya. This directory integrates established grassroots guardians with an expanded registry of independently documented NGO founders and heads.
              </p>
            </div>

            {/* Subgroup Filters, Search & Sort Bar */}
            <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={ngoSearch}
                    onChange={(e) => setNgoSearch(e.target.value)}
                    placeholder="Search NGO founders, community guardians, organizations, or wetland restoration projects..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                  {ngoSearch && (
                    <button
                      onClick={() => setNgoSearch('')}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sort:</span>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrderOption)}
                    className="bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
                  >
                    <option value="A_Z">Name: A–Z (Default)</option>
                    <option value="Z_A">Name: Z–A</option>
                    <option value="RECENT">Recently Added / Modern</option>
                  </select>
                </div>
              </div>

              {/* Subgroup Tabs */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-500">Registry Subgroups:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { key: 'ALL', label: `All Contributors & Leaders (${allNewNgoLeaders.length + existingCommunityHeroes.length})` },
                    { key: 'NGO_FOUNDERS_HEADS', label: `NGO Founders & Environmental Leaders (${1 + ADDITIONAL_NGO_LEADERS.length})` },
                    { key: 'HISTORICAL_CROSS_REGIONAL', label: `Historical & Cross-Regional NGO Leadership (${HISTORICAL_CROSS_REGIONAL_NGO_LEADERS.length})` },
                    { key: 'COMMUNITY_GUARDIANS', label: `Grassroots & Community Guardians (${existingCommunityHeroes.length})` }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setNgoSubgroup(tab.key as any)}
                      className={`text-xs px-2.5 py-1 rounded-[6px] transition-colors cursor-pointer ${
                        ngoSubgroup === tab.key
                          ? 'bg-teal-600 text-white font-semibold'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results status */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>
                  Showing <strong className="text-white">{filteredNewNgoLeaders.length + filteredExistingCommunityHeroes.length}</strong> matching contributors
                </span>
                {(ngoSubgroup !== 'ALL' || ngoSearch) && (
                  <button
                    onClick={() => {
                      setNgoSubgroup('ALL');
                      setNgoSearch('');
                    }}
                    className="text-xs text-teal-400 hover:underline cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            </Card>

            {/* Featured NGO Spotlight: Manzoor Ahmad Wangnoo */}
            {(ngoSubgroup === 'ALL' || ngoSubgroup === 'NGO_FOUNDERS_HEADS') && !ngoSearch && (
              <Card className="p-5 bg-slate-900/90 border border-teal-700/50 rounded-lg space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-teal-950 text-teal-300 border border-teal-800/40">
                        FEATURED NGO FOUNDER &amp; RESTORATION LEADER
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        Kashmir Valley · Srinagar · 2021–2026
                      </span>
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-[4px] bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-bold">
                        INDEPENDENTLY DOCUMENTED
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white tracking-tight">Manzoor Ahmad Wangnoo</h4>
                    <p className="text-xs text-teal-300 font-medium">Founder and Chairman, Nigeen Lake Conservation Organisation (NLCO)</p>
                  </div>
                  <button
                    onClick={() => setSelectedNgoLeader(MANZOOR_WANGNOO_DOSSIER)}
                    className="px-3.5 py-1.5 rounded-[6px] bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer w-fit"
                  >
                    <span>Examine Full Dossier</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3.5 rounded-[6px] bg-slate-950/90 border-l-2 border-teal-500 text-xs italic text-slate-200">
                  &ldquo;{MANZOOR_WANGNOO_DOSSIER.editorialTribute}&rdquo;
                </div>

                <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
                  {MANZOOR_WANGNOO_DOSSIER.biography}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1 text-xs">
                  {MANZOOR_WANGNOO_DOSSIER.documentedWorks.map((work, idx) => (
                    <div key={idx} className="p-2.5 rounded-[6px] bg-slate-950/70 border border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-teal-400">
                        <span>{work.year}</span>
                        <span className="text-slate-400">{work.sourceOutlet}</span>
                      </div>
                      <div className="font-semibold text-white text-[11px]">{work.title}</div>
                      <p className="text-[10px] text-slate-300 line-clamp-2">{work.documentedOutcome}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Combined Directory Cards Grid */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-400" />
                <span>Documented Leaders &amp; Community Champions (Alphabetical A–Z)</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {combinedNgoList.map((item) => {
                  if (item.type === 'new') {
                    const leader = item.data;
                    return (
                      <Card
                        key={leader.id}
                        className="green-hero-card p-5 bg-slate-900/80 border-slate-800 hover:border-teal-700/60 rounded-lg flex flex-col justify-between space-y-3.5 transition-all"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                              {leader.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : leader.region} · {leader.district}
                            </span>
                            <span className={`verification text-[9px] font-mono uppercase px-2 py-0.5 rounded-[4px] border ${
                              leader.verificationTier === 'INDEPENDENTLY_DOCUMENTED'
                                ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800/40'
                                : leader.verificationTier === 'HISTORICAL_CONSERVATION_LEGACY'
                                ? 'bg-purple-950/70 text-purple-300 border-purple-800/40'
                                : 'bg-teal-950/70 text-teal-300 border-teal-800/40'
                            }`}>
                              {leader.verificationBadge}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-base font-bold text-white tracking-tight">
                              {formatDisplayName(leader.name, leader.honorific)}
                            </h4>
                            <p className="designation text-xs text-teal-300 font-medium mt-0.5">
                              {leader.role}
                            </p>
                            <p className="affiliation text-[11px] text-slate-400 italic">
                              {leader.organization}
                            </p>
                          </div>

                          <p className="contribution text-xs text-slate-300 leading-relaxed">
                            {leader.tagline}
                          </p>

                          <div className="p-2.5 rounded-[6px] bg-slate-950/70 border border-slate-800/80 text-[11px] text-teal-300/90">
                            <strong className="text-white block mb-0.5">Principal Documented Impact:</strong>
                            {leader.keyImpact}
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedNgoLeader(leader)}
                          className="w-full py-1.5 px-3 rounded-[6px] bg-slate-800 hover:bg-teal-600 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Examine Documented Works</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-teal-400 group-hover:text-white" />
                        </button>
                      </Card>
                    );
                  } else {
                    const hero = item.data;
                    return (
                      <Card
                        key={hero.id}
                        className="green-hero-card p-5 bg-slate-900/80 border-slate-800 hover:border-emerald-700/60 rounded-lg flex flex-col justify-between space-y-3.5 transition-all"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                              {hero.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : hero.region} · {hero.district}
                            </span>
                            <span className={`verification text-[9px] font-mono uppercase px-2 py-0.5 rounded-[4px] border ${
                              hero.recognitionTier === 'DOCUMENTED_CANDIDATE'
                                ? 'bg-amber-950/70 text-amber-300 border-amber-800/40'
                                : 'bg-emerald-950/70 text-emerald-300 border-emerald-800/40'
                            }`}>
                              {hero.recognitionTier.replace(/_/g, ' ')}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-base font-bold text-white tracking-tight">
                              {formatDisplayName(hero.name, hero.honorific)}
                            </h4>
                            <p className="designation text-xs text-emerald-300 font-medium mt-0.5">
                              {hero.primaryCategory}
                            </p>
                            {hero.affiliation && (
                              <p className="affiliation text-[11px] text-slate-400 italic">
                                {hero.affiliation}
                              </p>
                            )}
                          </div>

                          <p className="contribution text-xs text-slate-300 leading-relaxed">
                            {hero.tagline}
                          </p>

                          {hero.documentedContributions[0] && (
                            <div className="p-2.5 rounded-[6px] bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300">
                              <strong className="text-white block mb-0.5">Fieldwork Record:</strong>
                              {hero.documentedContributions[0].impactMetric || hero.documentedContributions[0].title}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedProfile(hero)}
                          className="w-full py-1.5 px-3 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Examine Documented Works</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                        </button>
                      </Card>
                    );
                  }
                })}

                {filteredNewNgoLeaders.length === 0 && filteredExistingCommunityHeroes.length === 0 && (
                  <div className="col-span-full p-8 text-center bg-slate-900/40 border border-slate-800 rounded-lg text-slate-400 space-y-2">
                    <p className="text-sm font-semibold text-white">No NGO leaders or community guardians found matching filters.</p>
                    <p className="text-xs">Try resetting your subgroup or search query parameters.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Existing Green Heroes Who Also Head NGOs (3 Cross-Links Section) */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-teal-400" />
                  <span>Existing Green Heroes Heading Registered NGOs (Non-Duplicate Cross-Links)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  KEW maintains single person records while linking their registered NGO directorships across directories
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[...EXISTING_HEROES_NGO_CROSS_LINKS].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder)).map((cross, idx) => (
                  <Card key={idx} className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {cross.originalCategory}
                      </span>
                      <span className="text-[9px] font-mono text-teal-400 font-bold uppercase">Cross-Linked</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">{cross.name}</h5>
                      <p className="text-xs text-teal-300 font-semibold">{cross.ngoLeadership}</p>
                      <p className="text-[11px] text-slate-400 italic">{cross.organization}</p>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800">
                      Source: {cross.sourceCitation}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* AJ&K Government-Registered NGO Verification Queue (2 Leads Table) */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>AJ&amp;K Department of Social Welfare Verification Queue (Official Focal Persons)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Government directory records these individuals as organizational focal persons; exact founder/head status is being verified
                </p>
              </div>

              <Card className="overflow-hidden bg-slate-900/80 border-slate-800 rounded-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[10px] uppercase">
                      <tr>
                        <th className="p-3">Focal Person Name</th>
                        <th className="p-3">Registered Organization &amp; Reg. No.</th>
                        <th className="p-3">Geographic Locus</th>
                        <th className="p-3">Documented Environmental Scope</th>
                        <th className="p-3 text-right">Verification Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {[...AJK_NGO_VERIFICATION_QUEUE].sort((a, b) => compareGreenHeroesByName(a, b, sortOrder)).map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-3 font-semibold text-white whitespace-nowrap">{item.name}</td>
                          <td className="p-3">
                            <div className="font-medium text-teal-300">{item.organization}</div>
                            <div className="text-[10px] font-mono text-slate-400">{item.registrationNo}</div>
                          </td>
                          <td className="p-3 whitespace-nowrap text-amber-300/90 font-mono text-[11px]">{item.locus}</td>
                          <td className="p-3 leading-relaxed">{item.environmentalScope}</td>
                          <td className="p-3 text-right whitespace-nowrap">
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-amber-300 border border-amber-800/40">
                              Verification Queue
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TABS: REMAINING CATEGORY BENCHES */}
        {/* ───────────────────────────────────────────────────────────── */}
        {[
          { tabId: 'youth-educators', title: 'Youth & Environmental Educators', categories: ['Youth & Student Leaders', 'Environmental Educators'] }
        ].map((bench) => {
          if (activeTab !== bench.tabId) return null;
          const heroesInBench = GREEN_HEROES_MASTER_DATA.filter((h) =>
            bench.categories.includes(h.primaryCategory) ||
            h.secondaryCategories.some((sc) => bench.categories.includes(sc))
          ).sort((a, b) => compareGreenHeroesByName(a, b, sortOrder));

          return (
            <div key={bench.tabId} className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-white">{bench.title}</h3>
                <p className="text-xs text-slate-400">
                  Dedicated discipline registry · {heroesInBench.length} documented environmental contributor{heroesInBench.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {heroesInBench.map((hero) => (
                  <Card
                    key={hero.id}
                    className="green-hero-card p-5 bg-slate-900/80 border-slate-800 hover:border-emerald-700/60 rounded-lg flex flex-col justify-between space-y-3 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                          {hero.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : hero.region} · {hero.district}
                        </span>
                        <span className="verification text-[10px] text-emerald-400 font-bold">
                          {hero.recognitionTier.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white">{formatDisplayName(hero.name, hero.honorific)}</h4>
                      <p className="designation text-xs text-emerald-300">{hero.primaryCategory}</p>
                      {hero.affiliation && <p className="affiliation text-[11px] text-slate-400 italic">{hero.affiliation}</p>}
                      <p className="contribution text-xs text-slate-300 leading-relaxed">{hero.tagline}</p>
                    </div>

                    <button
                      onClick={() => setSelectedProfile(hero)}
                      className="w-full py-1.5 px-3 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Examine Documented Works</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 11: REGIONAL & DISTRICT DIRECTORY */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'regional-directory' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-base font-semibold text-white">Five-Region &amp; District Coverage Atlas</h3>
              <p className="text-xs text-slate-400">Universal Western Himalayan regional representation with verified local contributors</p>
            </div>

            <div className="space-y-6">
              {(Object.keys(REGIONAL_HEROES_BREAKDOWN) as KEWRegion[]).map((reg) => {
                const heroes = GREEN_HEROES_MASTER_DATA.filter((h) => h.region === reg).sort((a, b) => compareGreenHeroesByName(a, b, sortOrder));
                const displayName = reg === 'Azad Jammu & Kashmir' ? 'AJ&K' : reg;

                return (
                  <Card key={reg} className="p-5 bg-slate-900/80 border-slate-800 rounded-lg space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div>
                        <h4 className="text-base font-bold text-white">{displayName}</h4>
                        <p className="text-xs text-slate-400">{heroes.length} Catalogued Environmental Contributors</p>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-[4px] bg-emerald-950 text-emerald-400 border border-emerald-800/40 w-fit">
                        {REGIONAL_HEROES_BREAKDOWN[reg].greenHeroes} Green Heroes · {REGIONAL_HEROES_BREAKDOWN[reg].verified} Verified Contributors
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {heroes.map((h) => (
                        <div
                          key={h.id}
                          onClick={() => setSelectedProfile(h)}
                          className="p-3 rounded-[6px] bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors cursor-pointer space-y-1"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-white">{h.name}</span>
                            <span className="text-slate-400 font-mono text-[10px]">{h.district}</span>
                          </div>
                          <p className="text-[11px] text-emerald-400">{h.primaryCategory}</p>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{h.tagline}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 12: GREEN HEROES GIS ATLAS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'gis-atlas' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-white">Green Heroes GIS Spatial Atlas</h3>
              <p className="text-xs text-slate-400">Geographically referenced conservation sites, restoration basins, and community watersheds</p>
            </div>

            <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-4">
              <div className="relative w-full h-80 rounded-[6px] bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="text-center space-y-2 relative z-10 max-w-lg">
                  <Compass className="w-10 h-10 text-emerald-400 mx-auto animate-pulse" />
                  <h4 className="text-sm font-bold text-white">Western Himalayan Green Heroes Geospatial Directory</h4>
                  <p className="text-xs text-slate-400">
                    Interactive coordinate layer plotting 24 verified field sites from Baltoro glaciers (35.29°N) to Samba Kandi talabs (32.56°N).
                  </p>
                </div>
              </div>

              {/* Coordinates Listing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {[...GREEN_HEROES_MASTER_DATA].filter((h) => h.lat && h.lng).sort((a, b) => compareGreenHeroesByName(a, b, sortOrder)).slice(0, 8).map((h) => (
                  <div key={h.id} className="p-2.5 rounded-[4px] bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-semibold text-white truncate">{h.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {h.district} ({h.lat?.toFixed(2)}°N, {h.lng?.toFixed(2)}°E)
                    </div>
                    <div className="text-[10px] text-emerald-400 truncate">{h.tagline}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 13: DOCUMENTED ENVIRONMENTAL CONTRIBUTIONS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'contributions' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold text-white">Documented Environmental Contributions &amp; Works</h3>
                <p className="text-xs text-slate-400">Articles, court filings, projects, scientific papers, and ecological literature</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded-[4px] bg-emerald-950 text-emerald-400 border border-emerald-800/40 w-fit">
                {allContributions.length} Indexed Works
              </span>
            </div>

            {/* Contribution Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {['ALL', 'PROJECT', 'JUDICIAL_FILING', 'SCIENTIFIC_PAPER', 'LEGISLATION', 'INVESTIGATION', 'LITERATURE_ART', 'COMMUNITY_INITIATIVE'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedContribType(t)}
                  className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold whitespace-nowrap border transition-colors cursor-pointer ${
                    selectedContribType === t
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {t.replace(/_/g, ' ')}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {allContributions.map((item, idx) => (
                <Card key={idx} className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-emerald-400 font-bold">{item.contribution.year}</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {item.contribution.type.replace(/_/g, ' ')}
                      </span>
                      <span className="font-semibold text-white">{item.heroName}</span>
                      <span className="text-slate-400 text-[11px]">({item.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : item.region} · {item.district})</span>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                      {item.contribution.evidenceTier.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{item.contribution.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.contribution.description}</p>

                  {item.contribution.impactMetric && (
                    <div className="text-[11px] text-emerald-400 pt-1 border-t border-slate-800/80">
                      <strong>Documented Outcome:</strong> {item.contribution.impactMetric}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 14: NOMINATIONS & VERIFICATION PORTAL */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'nominations' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-base font-semibold text-white">Public Nomination &amp; Verification Protocol</h3>
              <p className="text-xs text-slate-400">Propose an environmental contributor with verifiable evidence for independent editorial review</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Nomination Form */}
              <Card className="lg:col-span-2 p-6 bg-slate-900/90 border-slate-800 rounded-lg space-y-4">
                <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                  Nominate a Green Contributor
                </h4>

                {nomSuccess ? (
                  <div className="p-4 rounded-[6px] bg-emerald-950/60 border border-emerald-800/60 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <h5 className="text-sm font-bold text-white">Nomination Successfully Received</h5>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                      Thank you for contributing to the KEW Green Heroes registry. Your submission for <strong>{nomName}</strong> has been logged into our verification docket. Our editorial panel verifies documentary evidence before publishing.
                    </p>
                    <button
                      onClick={() => {
                        setNomSuccess(false);
                        setNomName('');
                        setNomDistrict('');
                        setNomEvidence('');
                        setNomEvidenceUrl('');
                      }}
                      className="mt-2 px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium cursor-pointer"
                    >
                      Submit Another Nomination
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleNominationSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Candidate Full Name *</label>
                        <input
                          type="text"
                          required
                          value={nomName}
                          onChange={(e) => setNomName(e.target.value)}
                          placeholder="e.g. Dr. Amina Begum"
                          className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Primary Discipline / Category *</label>
                        <select
                          value={nomCategory}
                          onChange={(e) => setNomCategory(e.target.value as GreenHeroCategory)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                        >
                          {(GREEN_HERO_CATEGORIES_LIST || []).map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Region *</label>
                        <select
                          value={nomRegion}
                          onChange={(e) => setNomRegion(e.target.value as KEWRegion)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                        >
                          <option value="Kashmir Valley">Kashmir Valley</option>
                          <option value="Jammu">Jammu</option>
                          <option value="Ladakh">Ladakh</option>
                          <option value="Azad Jammu & Kashmir">AJ&K</option>
                          <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">District *</label>
                        <input
                          type="text"
                          required
                          value={nomDistrict}
                          onChange={(e) => setNomDistrict(e.target.value)}
                          placeholder="e.g. Kupwara, Poonch, Leh, Skardu..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">
                        Documented Environmental Contribution &amp; Measurable Outcome *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={nomEvidence}
                        onChange={(e) => setNomEvidence(e.target.value)}
                        placeholder="Detail the specific environmental action, court filing, published scientific study, spring revival project, or verified policy outcome..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">
                        Supporting Evidence URL / Document Reference (Optional but Recommended)
                      </label>
                      <input
                        type="url"
                        value={nomEvidenceUrl}
                        onChange={(e) => setNomEvidenceUrl(e.target.value)}
                        placeholder="Link to court docket, published article, scientific DOI, or official gazette..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit for Verification Review</span>
                      </button>
                    </div>
                  </form>
                )}
              </Card>

              {/* Review Process Guidelines */}
              <Card className="p-5 bg-slate-900/80 border-slate-800 rounded-lg space-y-3 text-xs">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Editorial Verification Protocol</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  KEW does not automatically grant listing merely upon submission. Our research panel adheres to four core principles:
                </p>
                <ul className="space-y-2 text-slate-300 list-disc list-inside">
                  <li><strong>Evidence First:</strong> We require verifiable documentation (court records, published literature, satellite verification, or community audit).</li>
                  <li><strong>Zero Commercial Fees:</strong> No fee is ever charged for nomination, review, or recognition.</li>
                  <li><strong>Strict Neutrality:</strong> We evaluate environmental outcomes independent of political affiliation or religious doctrine.</li>
                  <li><strong>Right to Correction:</strong> Contributors or communities may request updates or factual corrections at any time.</li>
                </ul>
              </Card>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 15: RECOGNITION & ENVIRONMENTAL LEGACY HALL */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'recognition-archives' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-semibold text-white">Environmental Legacy Hall (1377–2026)</h3>
                <p className="text-xs text-slate-400">
                  Honoring deceased trailblazers, classical eco-philosophers, ornithological pioneers, and conservation martyrs across the Western Himalayas
                </p>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-[6px] bg-yellow-950/80 text-yellow-300 border border-yellow-800/60 self-start sm:self-auto">
                649-Year Archival Continuum
              </span>
            </div>

            {/* 4-Card Legacy Metric Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-1">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs uppercase font-semibold tracking-wider">Chronological Span</span>
                  <Clock className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-yellow-300 tracking-tight">1377–2026 CE</div>
                <p className="text-[11px] text-slate-400 mt-1">649 years of documented mountain ecological stewardship</p>
                <div className="mt-2 text-[10px] text-yellow-400 bg-yellow-950/60 px-2 py-0.5 rounded-[4px] border border-yellow-800/40 w-fit">
                  <span>Medieval Mysticism to Modern Martyrology</span>
                </div>
              </Card>

              <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-1">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs uppercase font-semibold tracking-wider">Four Mountain Arenas</span>
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">4 Himalayan Zones</div>
                <p className="text-[11px] text-slate-400 mt-1">Kashmir Valley, Pir Panjal, Karakoram &amp; Kishtwar Conifers</p>
                <div className="mt-2 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-[4px] border border-emerald-800/40 w-fit">
                  <span>Cross-Border Himalayan Biomes</span>
                </div>
              </Card>

              <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-1">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs uppercase font-semibold tracking-wider">Primary Evidence Standards</span>
                  <BookOpen className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-blue-300 tracking-tight">100% Primary Sources</div>
                <p className="text-[11px] text-slate-400 mt-1">Sufi Kashmiri shruks, forest gazettes &amp; BNHS survey papers</p>
                <div className="mt-2 text-[10px] text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded-[4px] border border-blue-800/40 w-fit">
                  <span>Zero Unverified Folklore</span>
                </div>
              </Card>

              <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-1">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs uppercase font-semibold tracking-wider">Canonical Traditions</span>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-amber-300 tracking-tight">4 Enduring Legacies</div>
                <p className="text-[11px] text-slate-400 mt-1">Forest jurisprudence, ornithology, alpine waste &amp; fallen rangers</p>
                <div className="mt-2 text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-[4px] border border-amber-800/40 w-fit">
                  <span>Permanent Himalayan Memorial</span>
                </div>
              </Card>
            </div>

            {/* Historical Canon & Evidentiary Banner */}
            <Card className="p-5 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-[6px] bg-amber-950 border border-amber-800 text-amber-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">KEW Historical Recognition &amp; Canon Protocol</h4>
                  <p className="text-xs text-slate-300">
                    Rigorous criteria distinguishing authenticated conservation outcomes from oral folklore
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
                The Environmental Legacy Hall memorializes deceased figures whose documented words, actions, scientific studies, or physical sacrifices permanently shaped Western Himalayan ecological protection. Candidates are admitted solely on verifiable primary documentary records: historical manuscripts (e.g. Nund Rishi&apos;s 15th-century forest conservation shruks), peer-reviewed taxonomic monographs (e.g. Dr. Sálim Ali&apos;s Dachigam avifaunal records), official government gazettes honoring fallen forest guards, and expedition waste-evacuation manifests.
              </p>
            </Card>

            {/* Legacy Profile Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {GREEN_HEROES_MASTER_DATA.filter((h) => h.isHistorical || h.recognitionTier === 'HISTORICAL_LEGACY').sort((a, b) => compareGreenHeroesByName(a, b, sortOrder)).map((legacy) => {
                // Styling based on legacy figure category
                const isMystic = legacy.id === 'kew-hero-003' || legacy.id === 'sheikh-noor-ud-din' || legacy.name.includes('Sheikh Noor-ud-Din') || legacy.name.includes('Nund Rishi');
                const isAlpine = legacy.id === 'ali-sadpara';
                const isMartyr = legacy.id === 'kew-hero-010' || legacy.primaryCategory === 'Forest & Wildlife Protectors';
                const isScientist = legacy.id === 'salim-ali';

                const badgeColor = isMystic
                  ? 'bg-amber-950/80 text-amber-300 border-amber-800/50'
                  : isAlpine
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/50'
                  : isMartyr
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/50'
                  : 'bg-blue-950/80 text-blue-300 border-blue-800/50';

                return (
                  <Card
                    key={legacy.id}
                    className="green-hero-card p-5 bg-slate-900/80 border-slate-800 hover:border-slate-700 rounded-lg space-y-4 shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-mono font-bold px-2.5 py-0.5 rounded-[4px] border ${badgeColor}`}>
                        HISTORICAL LEGACY
                      </span>
                      <span className="text-slate-300 font-mono text-xs font-semibold bg-slate-950/80 px-2.5 py-0.5 rounded border border-slate-800">
                        {legacy.lifespan}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        {formatDisplayName(legacy.name, legacy.honorific)}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="text-amber-300 font-medium">{legacy.primaryCategory}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-400">{legacy.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : legacy.region} ({legacy.district})</span>
                      </div>
                      <p className="text-[11px] text-slate-400 italic mt-0.5">{legacy.affiliation}</p>
                    </div>

                    {/* Tagline / Maxim block with subtle gradient */}
                    <div className="p-3 rounded-[6px] bg-slate-950/80 border border-slate-800/80 text-xs text-amber-200/90 italic leading-relaxed">
                      &ldquo;{legacy.tagline}&rdquo;
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{legacy.biography}</p>

                    {/* Documented Contribution */}
                    {legacy.documentedContributions[0] && (
                      <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                            Authenticated Record ({legacy.documentedContributions[0].year}):
                          </span>
                          <span className="text-[9px] font-mono text-emerald-400">
                            {legacy.documentedContributions[0].evidenceTier.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="font-semibold text-white text-xs">
                          {legacy.documentedContributions[0].title}
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {legacy.documentedContributions[0].description}
                        </p>
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono">
                        Archive Verified: 100% Primary Source
                      </span>
                      <button
                        onClick={() => setSelectedProfile(legacy)}
                        className="px-3 py-1.5 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-yellow-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Examine Full Dossier</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Historical Heritage & Archival Criteria Registry Strip */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Four Canonical Pillars of Himalayan Ecological History
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <Card className="p-3.5 bg-slate-900/80 border-slate-800 rounded-lg space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-400">Pillar I</span>
                  <h5 className="font-bold text-white text-xs">Sufi Eco-Jurisprudence</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Centuries of spiritual forestry codifying food security directly to Pir Panjal coniferous canopy preservation.
                  </p>
                </Card>

                <Card className="p-3.5 bg-slate-900/80 border-slate-800 rounded-lg space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">Pillar II</span>
                  <h5 className="font-bold text-white text-xs">Karakoram Cryosphere Stewardship</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Frontier high-altitude mountaineering campaigns purging toxic expedition debris from Baltoro glaciers.
                  </p>
                </Card>

                <Card className="p-3.5 bg-slate-900/80 border-slate-800 rounded-lg space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-400">Pillar III</span>
                  <h5 className="font-bold text-white text-xs">Frontline Ranger Martyrology</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Honoring brave forest guards who made the supreme sacrifice defending ancient old-growth deodar stands from armed syndicates.
                  </p>
                </Card>

                <Card className="p-3.5 bg-slate-900/80 border-slate-800 rounded-lg space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-blue-400">Pillar IV</span>
                  <h5 className="font-bold text-white text-xs">Pioneering Avian Naturalism</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Systematic multi-decade ornithological baselines establishing Dachigam and Hokersar on global conservation maps.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 16: DATA INTEGRATIONS & INGESTION ARCHITECTURE */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'data-integrations' && (
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h3 className="text-base font-semibold text-white">Cross-Module Integrations &amp; Automated Ingestion Architecture</h3>
              <p className="text-xs text-slate-400">
                9 Automated Public API Connectors, 5 Official Institutional Registries, Ingestion Telemetry, and Prospective Environmental Allies Registry
              </p>
            </div>

            {/* Ingestion Telemetry Strip */}
            <Card className="p-5 bg-slate-900/80 border-slate-800 rounded-lg space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Automated Ingestion Telemetry &amp; Verification Pipeline</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <RefreshCw className="w-3 h-3 text-slate-500" />
                  <span>Last Global Sync: <strong className="text-slate-200 font-mono">{INGESTION_TELEMETRY.lastGlobalSync}</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Total Candidates</div>
                  <div className="text-xl font-black text-white font-mono mt-0.5">{INGESTION_TELEMETRY.totalCandidatesDiscovered.toLocaleString()}</div>
                  <div className="text-[9px] text-slate-500 mt-1">Cross-API discovered</div>
                </div>

                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
                  <div className="text-[10px] uppercase font-bold text-blue-400">Identity Verified</div>
                  <div className="text-xl font-black text-blue-400 font-mono mt-0.5">{INGESTION_TELEMETRY.identityVerifiedCount.toLocaleString()}</div>
                  <div className="text-[9px] text-slate-500 mt-1">ORCID &amp; Wikidata matched</div>
                </div>

                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
                  <div className="text-[10px] uppercase font-bold text-emerald-400">Contribution Verified</div>
                  <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">{INGESTION_TELEMETRY.contributionVerifiedCount}</div>
                  <div className="text-[9px] text-slate-500 mt-1">Evidence dockets passed</div>
                </div>

                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
                  <div className="text-[10px] uppercase font-bold text-yellow-400">Docket Audit Queue</div>
                  <div className="text-xl font-black text-yellow-400 font-mono mt-0.5">{INGESTION_TELEMETRY.docketAwaitingReviewCount}</div>
                  <div className="text-[9px] text-slate-500 mt-1">Editorial panel review</div>
                </div>

                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
                  <div className="text-[10px] uppercase font-bold text-purple-400">Active Connectors</div>
                  <div className="text-xl font-black text-purple-400 font-mono mt-0.5">{INGESTION_TELEMETRY.activeApiConnectorsCount} / 9</div>
                  <div className="text-[9px] text-slate-500 mt-1">Public endpoints online</div>
                </div>

                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
                  <div className="text-[10px] uppercase font-bold text-emerald-400">Data Completeness</div>
                  <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">{INGESTION_TELEMETRY.dataCompletenessScore}%</div>
                  <div className="text-[9px] text-slate-500 mt-1">Provenance audit score</div>
                </div>
              </div>
            </Card>

            {/* Section 1: 9 Authorized Public API Connectors */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400" />
                    <span>Authorized Public API Connectors (9 Pipelines)</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Automated, rate-compliant metadata ingestion pipelines respecting API terms of service and CC licenses
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                  9 Active / Standby Connectors
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {API_SOURCE_CONNECTORS.map((connector) => (
                  <Card key={connector.connectorId} className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded-[4px] border ${
                          connector.operationalStatus === 'ACTIVE'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                        }`}>
                          {connector.operationalStatus} · {connector.priority}
                        </span>
                        <h5 className="text-sm font-bold text-white mt-1.5">{connector.providerName}</h5>
                        <p className="text-[11px] text-slate-400">{connector.categoryServed}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-[11px] pt-1 border-t border-slate-800/80">
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Access Mode:</span>
                        <span className="font-mono text-slate-200">{connector.accessMode.replace(/_/g, ' ')}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Sync Cadence:</span>
                        <span className="text-slate-200">{connector.syncSchedule}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Licensing:</span>
                        <span className="text-slate-200 text-right truncate max-w-[180px]">{connector.licensing}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Telemetry Yield:</span>
                        <span className="font-mono text-emerald-400 font-bold">
                          {connector.recordsDiscovered.toLocaleString()} found · {connector.verifiedContributors} verified
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="text-[9px] uppercase font-bold text-slate-500 mb-1">Sample Ingestion Query:</div>
                      <div className="bg-slate-950 p-2 rounded-[4px] border border-slate-800 font-mono text-[10px] text-emerald-300 break-all select-all">
                        {connector.proofOfConceptQuery}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Section 2: 5 Institutional Registries Matrix */}
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>Institutional Registries &amp; Official Feeds (5 Registries)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Government media rosters, legislative directories, and statutory biodiversity management records
                </p>
              </div>

              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-left text-xs bg-slate-900/60">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Institution &amp; Registry</th>
                      <th className="px-3 py-3">Jurisdiction</th>
                      <th className="px-3 py-3">Category</th>
                      <th className="px-3 py-3">Protocol</th>
                      <th className="px-3 py-3 text-right">Roster Count</th>
                      <th className="px-4 py-3">Consent &amp; Boundary Standards</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {INSTITUTIONAL_REGISTRIES.map((inst) => (
                      <tr key={inst.registryId} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3 font-semibold text-white">
                          <div>{inst.institutionName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{inst.registryId}</div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300 font-mono text-[10px]">
                            {inst.jurisdiction === 'Azad Jammu & Kashmir' ? 'AJ&K' : inst.jurisdiction}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-slate-300">{inst.categoryServed}</td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="px-1.5 py-0.5 rounded-[4px] bg-blue-950/60 border border-blue-800/50 text-blue-300 font-mono text-[10px]">
                            {inst.accessProtocol.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right font-mono text-emerald-400 font-bold">{inst.recordCount}</td>
                        <td className="px-4 py-3 text-[11px] text-slate-400 max-w-xs">{inst.consentBoundaryNotes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: Potential Environmental Partners & Allies Registry */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-purple-400" />
                  <span>Potential Environmental Partners &amp; Allies Registry</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Prospective collaborators, legal advisors, journalists, and spiritual leaders maintained for partnership outreach
                </p>
              </div>

              {/* Strict Separation Standards Banner */}
              <div className="p-4 rounded-lg bg-yellow-950/20 border border-yellow-800/50 text-xs space-y-2">
                <div className="flex items-center gap-2 text-yellow-300 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Strict Separation Standard: Partners vs. Demonstrated Green Heroes</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  KEW maintains an uncompromised evidentiary standard: holding public office, having media prominence, or expressing environmental sentiment does <strong>not</strong> qualify an individual as a KEW Green Hero. The directory below identifies valued prospective collaborators and institutional contacts for environmental networking and campaign outreach. They are <strong>never</strong> awarded Green Hero badges or historical citations without verified, documented conservation outcomes.
                </p>
              </div>

              {/* Partners Table */}
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-left text-xs bg-slate-900/60">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Partner Name</th>
                      <th className="px-3 py-3">Profession &amp; Affiliation</th>
                      <th className="px-3 py-3">Region &amp; District</th>
                      <th className="px-4 py-3">Collaborative Outreach Potential</th>
                      <th className="px-3 py-3">Source Roster</th>
                      <th className="px-3 py-3">Status Standard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {POTENTIAL_ENVIRONMENTAL_PARTNERS.map((partner) => (
                      <tr key={partner.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">
                          <div>{partner.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{partner.id}</div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="text-slate-200 font-medium">{partner.profession}</div>
                          <div className="text-[11px] text-slate-400">{partner.primaryAffiliation}</div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300 font-mono text-[10px]">
                            {partner.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : partner.region} · {partner.district}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[11px] text-slate-300 max-w-sm leading-relaxed">
                          {partner.engagementPotential}
                        </td>
                        <td className="px-3 py-3 text-[11px] text-slate-400 font-mono">
                          {partner.sourceRegistry}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-[4px] bg-purple-950/60 border border-purple-800/50 text-purple-300 font-mono text-[10px] font-bold">
                            ALLIES REGISTRY ONLY
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 4: Cross-Module Knowledge Integrations */}
            <div className="space-y-4 pt-2">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Platform-Wide Cross-Module Integrations</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Connecting verified environmental leadership directly to KEW&apos;s legal, hydrological, and biodiversity platforms
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-5 bg-slate-900/80 border-slate-800 hover:border-emerald-500/50 transition-colors rounded-lg space-y-3">
                  <Scale className="w-6 h-6 text-emerald-400" />
                  <h5 className="text-sm font-bold text-white">Environmental PIL Portal</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Links Green Hero advocates (such as Dr. Raja Muzaffar Bhat and Adv. Nadeem Qadri) directly to their underlying National Green Tribunal orders and High Court proceedings.
                  </p>
                  <Link
                    href="/resources/environmental-pil"
                    className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium pt-1"
                  >
                    <span>Open PIL Portal</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>

                <Card className="p-5 bg-slate-900/80 border-slate-800 hover:border-blue-500/50 transition-colors rounded-lg space-y-3">
                  <Microscope className="w-6 h-6 text-blue-400" />
                  <h5 className="text-sm font-bold text-white">Scientific Research Library</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Connects academic glaciologists and limnologists (such as Prof. Shakil Romshoo) directly to peer-reviewed datasets and cryospheric telemetry studies.
                  </p>
                  <Link
                    href="/research-library"
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-medium pt-1"
                  >
                    <span>Open Research Library</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>

                <Card className="p-5 bg-slate-900/80 border-slate-800 hover:border-purple-500/50 transition-colors rounded-lg space-y-3">
                  <Layers className="w-6 h-6 text-purple-400" />
                  <h5 className="text-sm font-bold text-white">Protected Network &amp; Biodiversity</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Links wildlife biologists and forest martyrs directly to protected national parks, Dachigam Hangul conservation, and Deosai brown bear sanctuaries.
                  </p>
                  <Link
                    href="/protected-network"
                    className="text-xs text-purple-400 hover:underline flex items-center gap-1 font-medium pt-1"
                  >
                    <span>Open Protected Network</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CASE DOSSIER / PROFILE INSPECTOR MODAL */}
      {/* ───────────────────────────────────────────────────────────── */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-3xl bg-slate-900 border-slate-700 shadow-2xl rounded-lg p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] border ${
                      selectedProfile.recognitionTier === 'KEW_GREEN_HERO'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : selectedProfile.recognitionTier === 'HISTORICAL_LEGACY'
                        ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
                        : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                    }`}
                  >
                    {selectedProfile.recognitionTier.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                    {selectedProfile.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : selectedProfile.region} · {selectedProfile.district}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Year: {selectedProfile.recognitionYear}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {formatDisplayName(selectedProfile.name, selectedProfile.honorific)}
                </h3>
                <p className="text-xs text-emerald-400 font-medium">{selectedProfile.primaryCategory}</p>
                <p className="text-xs text-slate-400 italic">{selectedProfile.affiliation}</p>
              </div>

              <button
                onClick={() => setSelectedProfile(null)}
                className="p-1 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Tagline & Biography */}
            <div className="space-y-2">
              <div className="p-3 rounded-[6px] bg-slate-950/80 border border-slate-800 text-xs italic text-emerald-300">
                &ldquo;{selectedProfile.tagline}&rdquo;
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedProfile.biography}</p>
            </div>

            {/* Documented Contributions */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Documented Contributions &amp; Verifiable Works ({selectedProfile.documentedContributions.length})
              </h4>
              <div className="space-y-2">
                {selectedProfile.documentedContributions.map((c, i) => (
                  <div key={i} className="p-3 rounded-[6px] bg-slate-950 border border-slate-800 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-[11px] flex-wrap gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-emerald-400 font-bold">{c.year}</span>
                        <span className="font-bold text-white">{c.title}</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {c.evidenceTier.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{c.description}</p>
                    {c.impactMetric && (
                      <div className="text-[10px] text-emerald-400 font-medium pt-1">
                        <strong>Documented Outcome:</strong> {c.impactMetric}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence Summary & Verification Provenance */}
            <div className="p-3 rounded-[6px] bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verification &amp; Source Provenance</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">{selectedProfile.evidenceSummary}</p>
              <div className="text-[10px] text-slate-500 pt-1">
                Last Audited by KEW Editorial Panel: {selectedProfile.lastAuditedDate} · Status: {selectedProfile.verificationStatus.replace(/_/g, ' ')}
              </div>
            </div>

            {/* Cross-Module Links */}
            {selectedProfile.crossModuleLinks.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Linked KEW Modules:</span>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  {selectedProfile.crossModuleLinks.map((l, idx) => (
                    <Link
                      key={idx}
                      href={l.url}
                      className="px-2.5 py-1 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1"
                    >
                      <span>{l.label}</span>
                      <ExternalLink className="w-3 h-3 text-emerald-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Close */}
            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedProfile(null)}
                className="px-4 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MARTYR RESEARCH DOSSIER INSPECTOR MODAL */}
      {/* ───────────────────────────────────────────────────────────── */}
      {selectedMartyr && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-3xl bg-slate-900 border-slate-700 shadow-2xl rounded-lg p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span
                    className={`text-[9px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-[4px] border ${
                      selectedMartyr.martyrType === 'DOCUMENTED_FATALITY'
                        ? 'bg-red-500/10 text-red-300 border-red-500/30'
                        : selectedMartyr.martyrType === 'OFFICIAL_MEMORIAL'
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        : selectedMartyr.martyrType === 'HISTORICAL_CASE'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : selectedMartyr.martyrType === 'IDENTITY_RECONCILIATION'
                        ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
                        : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                    }`}
                  >
                    {selectedMartyr.martyrType.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                    {selectedMartyr.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : selectedMartyr.region} · {selectedMartyr.district}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Year: {selectedMartyr.year}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {selectedMartyr.name}
                </h3>
                <p className="text-xs text-red-400 font-medium">{selectedMartyr.category}</p>
                <p className="text-xs text-slate-400 italic">{selectedMartyr.designation}</p>
              </div>

              <button
                onClick={() => setSelectedMartyr(null)}
                className="p-1 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Tribute Quotation */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/90 border-l-2 border-red-500 text-xs italic text-slate-200">
              {selectedMartyr.editorialTribute}
            </div>

            {/* Narrative & Key Impact */}
            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">{selectedMartyr.narrative}</p>

              <div className="p-3 rounded-[6px] bg-red-950/20 border border-red-800/40 text-xs text-red-200">
                <strong className="text-red-400">Key Environmental Impact:</strong> {selectedMartyr.keyImpact}
              </div>

              {selectedMartyr.resolvedDetailsNote && (
                <div className="p-3 rounded-[6px] bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-300">
                  <strong className="text-emerald-400">Resolved Historical Record:</strong> {selectedMartyr.resolvedDetailsNote}
                </div>
              )}

              {selectedMartyr.identityReconciliationNote && (
                <div className="p-3 rounded-[6px] bg-yellow-950/30 border border-yellow-800/50 text-xs text-yellow-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>Identity Discrepancy Standard Warning</span>
                  </div>
                  <p className="leading-relaxed">{selectedMartyr.identityReconciliationNote}</p>
                </div>
              )}
            </div>

            {/* Documented Contributions */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Documented Contributions &amp; Verifiable Works ({selectedMartyr.documentedContributions.length})
              </h4>
              <div className="space-y-2">
                {selectedMartyr.documentedContributions.map((c, i) => (
                  <div key={i} className="p-3 rounded-[6px] bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] flex-wrap gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-red-400 font-bold">{c.year}</span>
                        <span className="font-bold text-white">{c.title}</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {c.evidenceTier}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{c.description}</p>
                    <div className="text-[10px] text-emerald-400 font-medium pt-0.5">
                      <strong>Documented Outcome:</strong> {c.documentedOutcome}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Source Provenance */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/60 border border-slate-800/80 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-red-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verification &amp; Source Provenance</span>
              </div>
              <div className="space-y-1.5">
                {selectedMartyr.sourceProvenance.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-300 hover:text-red-400 flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span className="group-hover:underline">{s.title}</span>
                  </a>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                Research Status: {selectedMartyr.researchStatus}
              </div>
            </div>

            {/* Recommended Platform Links */}
            <div className="space-y-2 pt-1 border-t border-slate-800">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Recommended Common Links for this Dossier:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {COMMON_DOSSIER_LINKS.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url}
                    className="p-2 rounded-[4px] bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center justify-between text-slate-300 hover:text-emerald-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Close */}
            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedMartyr(null)}
                className="px-4 py-1.5 rounded-[6px] bg-red-600 hover:bg-red-500 text-white text-xs font-semibold cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ENVIRONMENTAL JOURNALIST RESEARCH DOSSIER MODAL */}
      {/* ───────────────────────────────────────────────────────────── */}
      {selectedJournalist && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-3xl bg-slate-900 border-slate-700 shadow-2xl rounded-lg p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  {selectedJournalist.specialization.map((spec, i) => (
                    <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-cyan-950/60 border border-cyan-800/40 text-cyan-300">
                      {spec}
                    </span>
                  ))}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                    {selectedJournalist.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : selectedJournalist.region}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {selectedJournalist.name}
                </h3>
                <p className="text-xs text-cyan-400 font-medium">{selectedJournalist.designation}</p>
                <p className="text-xs text-slate-400 italic">{selectedJournalist.outletOrAffiliation}</p>
              </div>

              <button
                onClick={() => setSelectedJournalist(null)}
                className="p-1 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Tribute Quotation */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/90 border-l-2 border-cyan-500 text-xs italic text-slate-200">
              {selectedJournalist.editorialTribute}
            </div>

            {/* Narrative & Key Impact */}
            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">{selectedJournalist.biography}</p>

              <div className="p-3 rounded-[6px] bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200">
                <strong className="text-cyan-400">Key Environmental Reporting Impact:</strong> {selectedJournalist.keyImpact}
              </div>
            </div>

            {/* Documented Contributions */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Documented Reporting Investigations ({selectedJournalist.documentedContributions.length})
              </h4>
              <div className="space-y-2">
                {selectedJournalist.documentedContributions.map((c, i) => (
                  <div key={i} className="p-3 rounded-[6px] bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] flex-wrap gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-cyan-400 font-bold">{c.year}</span>
                        <span className="font-bold text-white">{c.title}</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {c.evidenceTier}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{c.description}</p>
                    <div className="text-[10px] text-emerald-400 font-medium pt-0.5">
                      <strong>Documented Outcome:</strong> {c.documentedOutcome}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Source Provenance */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/60 border border-slate-800/80 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-cyan-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verification &amp; Source Provenance</span>
              </div>
              <div className="space-y-1.5">
                {selectedJournalist.sourceProvenance.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-300 hover:text-cyan-400 flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="group-hover:underline">{s.title}</span>
                    <span className="text-[10px] text-slate-500">({s.outlet})</span>
                  </a>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                Research Status: {selectedJournalist.researchStatus}
              </div>
            </div>

            {/* Linked KEW Modules */}
            {selectedJournalist.linkedModules.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Linked KEW Modules:</span>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  {selectedJournalist.linkedModules.map((l, idx) => (
                    <Link
                      key={idx}
                      href={l.url}
                      className="px-2.5 py-1 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1"
                    >
                      <span>{l.label}</span>
                      <ExternalLink className="w-3 h-3 text-cyan-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Close */}
            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedJournalist(null)}
                className="px-4 py-1.5 rounded-[6px] bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ENVIRONMENTAL SCIENTIST RESEARCH DOSSIER MODAL */}
      {/* ───────────────────────────────────────────────────────────── */}
      {selectedScientist && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-3xl bg-slate-900 border-slate-700 shadow-2xl rounded-lg p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  {selectedScientist.trackType === 'FIELD_PRACTITIONER' ? (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-emerald-950/70 border border-emerald-700/50 text-emerald-300 font-semibold">
                      FIELD CONSERVATIONIST
                    </span>
                  ) : selectedScientist.trackType === 'GOVERNMENT_SCIENTIST' ? (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 font-semibold">
                      GOVERNMENT SCIENTIST
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-blue-950/70 border border-blue-700/50 text-blue-300 font-semibold">
                      UNIVERSITY FACULTY
                    </span>
                  )}
                  {selectedScientist.fields.map((f, i) => (
                    <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-indigo-950/60 border border-indigo-800/40 text-indigo-300">
                      {f}
                    </span>
                  ))}
                  {selectedScientist.crossClassification && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-purple-950/70 border border-purple-800/50 text-purple-300">
                      Cross-Registered: {selectedScientist.crossClassification}
                    </span>
                  )}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                    {selectedScientist.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : selectedScientist.region}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {formatDisplayName(selectedScientist.name, selectedScientist.honorific)}
                </h3>
                <p className="text-xs text-indigo-400 font-medium">{selectedScientist.designation}</p>
                <p className="text-xs text-slate-400 italic">{selectedScientist.institution}</p>
              </div>

              <button
                onClick={() => setSelectedScientist(null)}
                className="p-1 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Tribute Quotation */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/90 border-l-2 border-indigo-500 text-xs italic text-slate-200">
              {selectedScientist.editorialTribute}
            </div>

            {/* Narrative & Key Impact */}
            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">{selectedScientist.biography}</p>

              <div className="p-3 rounded-[6px] bg-indigo-950/20 border border-indigo-800/40 text-xs text-indigo-200">
                <strong className="text-indigo-400">Key Scientific Impact:</strong> {selectedScientist.keyImpact}
              </div>
            </div>

            {/* Documented Contributions */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Peer-Reviewed Publications &amp; Scientific Works ({selectedScientist.documentedContributions.length})
              </h4>
              <div className="space-y-2">
                {selectedScientist.documentedContributions.map((c, i) => (
                  <div key={i} className="p-3 rounded-[6px] bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] flex-wrap gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-indigo-400 font-bold">{c.year}</span>
                        <span className="font-bold text-white">{c.title}</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {c.evidenceTier}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{c.description}</p>
                    <div className="text-[10px] text-emerald-400 font-medium pt-0.5">
                      <strong>Documented Outcome:</strong> {c.documentedOutcome}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Source Provenance */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/60 border border-slate-800/80 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-indigo-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verification &amp; Source Provenance</span>
              </div>
              <div className="space-y-1.5">
                {selectedScientist.sourceProvenance.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-300 hover:text-indigo-400 flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="group-hover:underline">{s.title}</span>
                    <span className="text-[10px] text-slate-500">({s.publicationType})</span>
                  </a>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                Research Status: {selectedScientist.researchStatus}
              </div>
            </div>

            {/* Linked KEW Modules */}
            {selectedScientist.linkedKewModules.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Linked KEW Scientific Modules:</span>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  {selectedScientist.linkedKewModules.map((l, idx) => (
                    <Link
                      key={idx}
                      href={l.url}
                      className="px-2.5 py-1 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1"
                    >
                      <span>{l.label}</span>
                      <ExternalLink className="w-3 h-3 text-indigo-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Close */}
            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedScientist(null)}
                className="px-4 py-1.5 rounded-[6px] bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ENVIRONMENTAL ADVOCATE LEGAL DOSSIER MODAL */}
      {/* ───────────────────────────────────────────────────────────── */}
      {selectedAdvocate && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-3xl bg-slate-900 border-slate-700 shadow-2xl rounded-lg p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] font-semibold border ${
                    selectedAdvocate.legalRole === 'FOUNDING_LEGAL_PIONEER'
                      ? 'bg-amber-950 text-amber-300 border-amber-500 font-bold'
                      : selectedAdvocate.legalRole === 'PETITIONER_LITIGANT' || selectedAdvocate.legalRole === 'PIL_ORIGINATOR'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                      : selectedAdvocate.legalRole === 'COUNSEL_ADVOCATE'
                      ? 'bg-indigo-950/80 text-indigo-300 border-indigo-800/60'
                      : selectedAdvocate.legalRole === 'AMICUS_CURIAE'
                      ? 'bg-purple-950/80 text-purple-300 border-purple-800/60'
                      : selectedAdvocate.legalRole === 'JUDICIAL_CONTRIBUTOR'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                      : 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60'
                  }`}>
                    {selectedAdvocate.legalRole === 'FOUNDING_LEGAL_PIONEER' ? 'FOUNDING LEGAL PIONEER' : selectedAdvocate.legalRole.replace(/_/g, ' ')}
                  </span>
                  {selectedAdvocate.specializations.map((s, i) => (
                    <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                      {s}
                    </span>
                  ))}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                    {selectedAdvocate.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : selectedAdvocate.region}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {formatDisplayName(selectedAdvocate.name, selectedAdvocate.honorific)}
                </h3>
                <p className="text-xs text-amber-400 font-medium">{selectedAdvocate.primaryDesignation}</p>
                <p className="text-xs text-slate-400 italic">{selectedAdvocate.affiliationOrChamber}</p>
              </div>

              <button
                onClick={() => setSelectedAdvocate(null)}
                className="p-1 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Tribute Quotation */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/90 border-l-2 border-amber-500 text-xs italic text-slate-200">
              {selectedAdvocate.editorialTribute}
            </div>

            {/* Legal Narrative & Key Impact */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Legal Background &amp; Standing</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedAdvocate.narrative}</p>

              <div className="p-3 rounded-[6px] bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200">
                <strong className="text-amber-400">Key Legal Impact:</strong> {selectedAdvocate.keyImpact}
              </div>

              {/* Conferred Recognition / Honors */}
              {selectedAdvocate.recognition && (
                <div className="p-3 rounded-[6px] bg-amber-950/40 border border-amber-700/60 text-xs text-amber-200">
                  <strong className="text-amber-400">Conferred Recognition &amp; Honors:</strong> {selectedAdvocate.recognition}
                </div>
              )}

              {/* Editorial Classification Standard Notice */}
              {selectedAdvocate.legalRole === 'FOUNDING_LEGAL_PIONEER' && (
                <div className="p-3 rounded-[6px] bg-slate-950 border border-amber-700/60 text-[11px] text-slate-300 space-y-1">
                  <div className="text-amber-400 font-semibold flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Editorial Classification Standard</span>
                  </div>
                  <p>
                    &ldquo;Founding legal pioneer&rdquo; is an editorial classification recognizing foundational public-interest environmental jurisprudence across the Western Himalaya and India, not an officially conferred state title. Advocate M. C. Mehta is actively catalogued within the living Advocates &amp; Legal Professionals directory.
                  </p>
                </div>
              )}
            </div>

            {/* Case References */}
            {selectedAdvocate.caseReferences.length > 0 && (
              <div className="p-3 rounded-[6px] bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Associated Court Dockets &amp; Citations:</div>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedAdvocate.caseReferences.map((ref, idx) => (
                    <span key={idx} className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-slate-900 border border-slate-700 text-amber-300">
                      {ref}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Documented Contributions */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Documented Legal Proceedings &amp; Judicial Mandates ({selectedAdvocate.documentedContributions.length})
              </h4>
              <div className="space-y-2">
                {selectedAdvocate.documentedContributions.map((c, i) => (
                  <div key={i} className="p-3 rounded-[6px] bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] flex-wrap gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold">{c.year}</span>
                        <span className="font-bold text-white">{c.title}</span>
                      </div>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {c.legalForum}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{c.description}</p>
                    <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80 text-[11px] space-y-0.5">
                      <div className="text-emerald-400 font-medium">
                        <strong>Documented Outcome:</strong> {c.documentedOutcome}
                      </div>
                      {c.courtOrderCitation && (
                        <div className="text-[10px] text-slate-400 font-mono">
                          Citation: {c.courtOrderCitation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification and Source Provenance */}
            <div className="space-y-2 p-3 rounded-[6px] bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verification &amp; Source Provenance</span>
              </div>
              <div className="space-y-1.5">
                {selectedAdvocate.sourceProvenance.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-300 hover:text-amber-400 flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="group-hover:underline">{s.title}</span>
                    <span className="text-[10px] text-slate-500">({s.recordType})</span>
                  </a>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                Evidentiary Audit: {selectedAdvocate.evidentiaryNotes}
              </div>
            </div>

            {/* Linked KEW Modules */}
            {selectedAdvocate.linkedKewModules.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Linked KEW Compliance Modules:</span>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  {selectedAdvocate.linkedKewModules.map((l, idx) => (
                    <Link
                      key={idx}
                      href={l.url}
                      className="px-2.5 py-1 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1"
                    >
                      <span>{l.label}</span>
                      <ExternalLink className="w-3 h-3 text-amber-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Close */}
            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedAdvocate(null)}
                className="px-4 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CREATIVE ARTIST DOSSIER & VERIFICATION MODAL */}
      {/* ───────────────────────────────────────────────────────────── */}
      {selectedArtist && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-3xl bg-slate-900 border-slate-700 shadow-2xl rounded-lg p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-[4px] border ${
                    selectedArtist.contributionType === 'EXPLICIT_ADVOCACY'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/40'
                      : selectedArtist.contributionType === 'ECOLOGICAL_DOCUMENTATION'
                      ? 'bg-indigo-950/80 text-indigo-300 border-indigo-800/40'
                      : 'bg-purple-950/80 text-purple-300 border-purple-800/40'
                  }`}>
                    {selectedArtist.contributionTypeLabel}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                    {selectedArtist.medium}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                    {selectedArtist.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : selectedArtist.region}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
                  <span>{formatDisplayName(selectedArtist.name, selectedArtist.honorific)}</span>
                  {selectedArtist.personIdentity && (
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-950/70 border border-purple-800/50 px-2 py-0.5 rounded-[4px]">
                      Literary Identity of {selectedArtist.personIdentity}
                    </span>
                  )}
                </h3>
                <p className="text-xs text-purple-300 font-medium">{selectedArtist.designation}</p>
                <p className="text-xs text-slate-400 italic">{selectedArtist.geographicSubject}</p>
              </div>

              <button
                onClick={() => setSelectedArtist(null)}
                className="p-1 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Tribute Quotation */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/90 border-l-2 border-purple-500 text-xs italic text-slate-200">
              {selectedArtist.editorialTribute}
            </div>

            {/* Governance Safeguard Notice if personIdentity */}
            {selectedArtist.personIdentity && (
              <div className="p-3 rounded-[6px] bg-amber-950/25 border border-amber-800/40 text-amber-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300 text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Governance Safeguard &amp; Institutional Transparency Standard</span>
                </div>
                <p className="text-[11px] text-amber-200/90 leading-relaxed">
                  {selectedArtist.evidenceAuditNotes}
                </p>
              </div>
            )}

            {/* Biography & Key Impact */}
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 leading-relaxed">{selectedArtist.biography}</p>
              <div className="p-3 rounded-[6px] bg-purple-950/20 border border-purple-800/40 text-purple-200">
                <strong className="text-white block mb-0.5">Key Environmental Impact:</strong>
                {selectedArtist.keyImpact}
              </div>
            </div>

            {/* Documented Contributions & Verifiable Works */}
            <div className="space-y-2.5 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Documented Contributions &amp; Verifiable Works ({selectedArtist.documentedWorks.length})
              </h4>
              <div className="space-y-2 text-xs">
                {selectedArtist.documentedWorks.map((w, idx) => (
                  <div key={idx} className="p-3 rounded-[6px] bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-purple-400 font-bold">{w.year}</span>
                        <span className="font-bold text-white">{w.title}</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {w.evidenceTier}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{w.description}</p>
                    <div className="text-[10px] text-emerald-400 font-medium pt-0.5">
                      <strong>Documented Outcome:</strong> {w.documentedOutcome}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Source Provenance */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/60 border border-slate-800/80 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-purple-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verification &amp; Source Provenance</span>
              </div>
              <div className="space-y-1.5">
                {selectedArtist.sourceProvenance.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-300 hover:text-purple-400 flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="group-hover:underline">{s.title}</span>
                    <span className="text-[10px] text-slate-500">({s.outletOrType})</span>
                  </a>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                Research Status: {selectedArtist.researchStatus}
              </div>
              <div className="text-[10px] text-slate-400">
                <strong>Audit Notes:</strong> {selectedArtist.evidenceAuditNotes}
              </div>
            </div>

            {/* Linked Modules */}
            {selectedArtist.linkedModules.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Linked KEW Modules:</span>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  {selectedArtist.linkedModules.map((l, idx) => (
                    <Link
                      key={idx}
                      href={l.url}
                      className="px-2.5 py-1 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1"
                    >
                      <span>{l.label}</span>
                      <ExternalLink className="w-3 h-3 text-purple-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Close */}
            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedArtist(null)}
                className="px-4 py-1.5 rounded-[6px] bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold cursor-pointer"
              >
                Close Creative Dossier
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* RELIGIOUS & SPIRITUAL LEADER DOSSIER & VERIFICATION MODAL */}
      {/* ───────────────────────────────────────────────────────────── */}
      {selectedReligiousLeader && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-3xl bg-slate-900 border-slate-700 shadow-2xl rounded-lg p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-[4px] border ${
                    selectedReligiousLeader.contributionType === 'HISTORICAL_SPIRITUAL_LEGACY'
                      ? 'bg-amber-950/70 text-amber-300 border-amber-800/40'
                      : selectedReligiousLeader.contributionType === 'PUBLIC_ENVIRONMENTAL_ADVOCACY'
                      ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800/40'
                      : selectedReligiousLeader.contributionType === 'FIELD_CONSERVATION_PROGRAM'
                      ? 'bg-cyan-950/70 text-cyan-300 border-cyan-800/40'
                      : selectedReligiousLeader.contributionType === 'SPIRITUAL_EDUCATION_RESEARCH'
                      ? 'bg-indigo-950/70 text-indigo-300 border-indigo-800/40'
                      : selectedReligiousLeader.contributionType === 'CIVIC_RELIGIOUS_INITIATIVE'
                      ? 'bg-purple-950/70 text-purple-300 border-purple-800/40'
                      : 'bg-blue-950/70 text-blue-300 border-blue-800/40'
                  }`}>
                    {selectedReligiousLeader.contributionTypeLabel}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                    {selectedReligiousLeader.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : selectedReligiousLeader.region}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                    {selectedReligiousLeader.geographicLocus} · {selectedReligiousLeader.period}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
                  <span>{selectedReligiousLeader.name}</span>
                </h3>
                {selectedReligiousLeader.honorific && (
                  <p className="text-xs font-mono text-amber-400 font-medium">{selectedReligiousLeader.honorific}</p>
                )}
                <p className="text-xs text-emerald-300 font-medium">{selectedReligiousLeader.designation}</p>
                <p className="text-xs text-slate-400 italic">{selectedReligiousLeader.affiliationOrShrine}</p>
              </div>

              <button
                onClick={() => setSelectedReligiousLeader(null)}
                className="p-1 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Sacred Quotation / Shruk / Ethical Saying */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/90 border-l-2 border-amber-500 text-xs italic text-slate-200">
              &ldquo;{selectedReligiousLeader.editorialTribute}&rdquo;
            </div>

            {/* Cold-Desert / Afforestation Safeguard Note for Ladakh / high-altitude plantations */}
            {selectedReligiousLeader.region === 'Ladakh' && selectedReligiousLeader.contributionType === 'FIELD_CONSERVATION_PROGRAM' && (
              <div className="p-3 rounded-[6px] bg-amber-950/30 border border-amber-800/50 text-amber-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Cold-Desert Ecological Verification Safeguard</span>
                </div>
                <p className="text-[11px] text-amber-200/90 leading-relaxed">
                  Afforestation claims in Ladakh are subject to independent scientific audit by KEW. Plantings in naturally open steppe ecosystems consume fragile meltwater and displace endemic species. Survival rates and net water diversion must be measured empirically.
                </p>
              </div>
            )}

            {/* Biography & Key Impact */}
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 leading-relaxed">{selectedReligiousLeader.biography}</p>
              <div className="p-3 rounded-[6px] bg-amber-950/20 border border-amber-800/40 text-amber-200">
                <strong className="text-white block mb-0.5">Key Ecological Impact:</strong>
                {selectedReligiousLeader.keyImpact}
              </div>
            </div>

            {/* Documented Contributions & Verifiable Works */}
            <div className="space-y-2.5 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Documented Contributions &amp; Verifiable Works ({selectedReligiousLeader.documentedWorks.length})
              </h4>
              <div className="space-y-2 text-xs">
                {selectedReligiousLeader.documentedWorks.map((w, idx) => (
                  <div key={idx} className="p-3 rounded-[6px] bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold">{w.year}</span>
                        <span className="font-bold text-white">{w.title}</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {w.evidenceTier}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{w.description}</p>
                    <div className="text-[10px] text-emerald-400 font-medium pt-0.5">
                      <strong>Documented Outcome:</strong> {w.documentedOutcome}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Source Provenance */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/60 border border-slate-800/80 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verification &amp; Source Provenance</span>
              </div>
              <div className="space-y-1.5">
                {selectedReligiousLeader.sourceProvenance.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-300 hover:text-amber-400 flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="group-hover:underline">{s.title}</span>
                    <span className="text-[10px] text-slate-500">({s.outletOrType})</span>
                  </a>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                Research Status: {selectedReligiousLeader.researchStatus}
              </div>
              <div className="text-[10px] text-slate-400">
                <strong>Audit Notes:</strong> {selectedReligiousLeader.evidenceAuditNotes}
              </div>
            </div>

            {/* Linked Modules */}
            {selectedReligiousLeader.linkedModules.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Linked KEW Modules:</span>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  {selectedReligiousLeader.linkedModules.map((l, idx) => (
                    <Link
                      key={idx}
                      href={l.url}
                      className="px-2.5 py-1 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1"
                    >
                      <span>{l.label}</span>
                      <ExternalLink className="w-3 h-3 text-amber-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Close */}
            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedReligiousLeader(null)}
                className="px-4 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer"
              >
                Close Spiritual Dossier
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* POLITICIAN & PUBLIC OFFICIAL DOSSIER & VERIFICATION MODAL */}
      {/* ───────────────────────────────────────────────────────────── */}
      {selectedPolitician && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-3xl bg-slate-900 border-slate-700 shadow-2xl rounded-lg p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-[4px] bg-amber-950/70 text-amber-300 border border-amber-800/40 font-bold">
                    {selectedPolitician.verificationBadge}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                    {selectedPolitician.region} · {selectedPolitician.district}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                    {selectedPolitician.period}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
                  <span>{formatDisplayName(selectedPolitician.name, selectedPolitician.honorific)}</span>
                </h3>
                <p className="text-xs font-semibold text-emerald-400 mt-0.5">{selectedPolitician.category}</p>
                <p className="text-xs text-slate-300 italic">{selectedPolitician.designation}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedPolitician.currentRole}</p>
              </div>

              <button
                onClick={() => setSelectedPolitician(null)}
                className="p-1 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Editorial Tribute Quote Box */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/90 border-l-2 border-amber-500 text-xs italic text-slate-200">
              &ldquo;{selectedPolitician.editorialTribute}&rdquo;
            </div>

            {/* PCB founding claim priority verification note */}
            {selectedPolitician.pcbClaimStatusNote && (
              <div className="p-3 rounded-[6px] bg-amber-950/30 border border-amber-800/50 text-amber-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Archival Verification Priority: PCB Founding Chairmanship</span>
                </div>
                <p className="text-[11px] text-amber-200/90 leading-relaxed">
                  {selectedPolitician.pcbClaimStatusNote}
                </p>
              </div>
            )}

            {/* Biography & Key Impact */}
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 leading-relaxed">{selectedPolitician.biography}</p>
              <div className="p-3 rounded-[6px] bg-emerald-950/20 border border-emerald-800/40 text-emerald-200">
                <strong className="text-white block mb-0.5">Key Documented Impact:</strong>
                {selectedPolitician.keyImpact}
              </div>
            </div>

            {/* Documented Contributions & Verifiable Works */}
            <div className="space-y-2.5 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Documented Contributions &amp; Verifiable Works ({selectedPolitician.documentedWorks.length})
              </h4>
              <div className="space-y-2 text-xs">
                {selectedPolitician.documentedWorks.map((w, idx) => (
                  <div key={idx} className="p-3 rounded-[6px] bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold">{w.year}</span>
                        <span className="font-bold text-white">{w.title}</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {w.evidenceTier}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{w.description}</p>
                    <div className="text-[10px] text-emerald-400 font-medium pt-0.5">
                      <strong>Documented Outcome:</strong> {w.documentedOutcome}
                    </div>
                    {w.sourceUrl && (
                      <div className="pt-1">
                        <a
                          href={w.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 font-mono"
                        >
                          <span>Source: {w.sourceOutlet}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Source Provenance */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/60 border border-slate-800/80 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verification &amp; Source Provenance</span>
              </div>
              <div className="space-y-1.5">
                {selectedPolitician.sourceProvenance.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-300 hover:text-amber-400 flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="group-hover:underline">{s.title}</span>
                    <span className="text-[10px] text-slate-500">({s.outletOrType})</span>
                  </a>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                Research Status: {selectedPolitician.researchStatus}
              </div>
              <div className="text-[10px] text-slate-400">
                <strong>Audit Notes:</strong> {selectedPolitician.evidenceAuditNotes}
              </div>
            </div>

            {/* Linked Modules */}
            {selectedPolitician.linkedModules.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Linked KEW Modules:</span>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  {selectedPolitician.linkedModules.map((l, idx) => (
                    <Link
                      key={idx}
                      href={l.url}
                      className="px-2.5 py-1 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1"
                    >
                      <span>{l.label}</span>
                      <ExternalLink className="w-3 h-3 text-amber-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Close */}
            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedPolitician(null)}
                className="px-4 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer"
              >
                Close Profile Dossier
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* NGO FOUNDER & LEADER DOSSIER & VERIFICATION MODAL */}
      {/* ───────────────────────────────────────────────────────────── */}
      {selectedNgoLeader && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-3xl bg-slate-900 border-slate-700 shadow-2xl rounded-lg p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-[4px] border font-bold ${
                    selectedNgoLeader.verificationTier === 'INDEPENDENTLY_DOCUMENTED'
                      ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800/40'
                      : selectedNgoLeader.verificationTier === 'HISTORICAL_CONSERVATION_LEGACY'
                      ? 'bg-purple-950/70 text-purple-300 border-purple-800/40'
                      : 'bg-teal-950/70 text-teal-300 border-teal-800/40'
                  }`}>
                    {selectedNgoLeader.verificationBadge}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                    {selectedNgoLeader.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : selectedNgoLeader.region} · {selectedNgoLeader.district}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                    {selectedNgoLeader.period}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
                  <span>{formatDisplayName(selectedNgoLeader.name, selectedNgoLeader.honorific)}</span>
                </h3>
                <p className="text-xs font-semibold text-teal-300 mt-0.5">{selectedNgoLeader.role}</p>
                <p className="text-xs text-slate-300 italic">{selectedNgoLeader.organization}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedNgoLeader.geographicLocus}</p>
              </div>

              <button
                onClick={() => setSelectedNgoLeader(null)}
                className="p-1 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Editorial Tribute Quote Box */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/90 border-l-2 border-teal-500 text-xs italic text-slate-200">
              &ldquo;{selectedNgoLeader.editorialTribute}&rdquo;
            </div>

            {/* Biography & Key Impact */}
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 leading-relaxed">{selectedNgoLeader.biography}</p>
              <div className="p-3 rounded-[6px] bg-teal-950/20 border border-teal-800/40 text-teal-200">
                <strong className="text-white block mb-0.5">Key Documented Impact:</strong>
                {selectedNgoLeader.keyImpact}
              </div>
            </div>

            {/* Documented Contributions & Verifiable Works */}
            <div className="space-y-2.5 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Documented Contributions &amp; Verifiable Works ({selectedNgoLeader.documentedWorks.length})
              </h4>
              <div className="space-y-2 text-xs">
                {selectedNgoLeader.documentedWorks.map((w, idx) => (
                  <div key={idx} className="p-3 rounded-[6px] bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-teal-400 font-bold">{w.year}</span>
                        <span className="font-bold text-white">{w.title}</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300">
                        {w.evidenceTier}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{w.description}</p>
                    <div className="text-[10px] text-emerald-400 font-medium pt-0.5">
                      <strong>Documented Outcome:</strong> {w.documentedOutcome}
                    </div>
                    {w.sourceOutlet && (
                      <div className="pt-0.5 text-[10px] text-slate-400 font-mono">
                        Source: {w.sourceOutlet}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Source Provenance */}
            <div className="p-3.5 rounded-[6px] bg-slate-950/60 border border-slate-800/80 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-teal-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verification &amp; Source Provenance</span>
              </div>
              <div className="space-y-1.5">
                {selectedNgoLeader.sourceProvenance.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-300 hover:text-teal-400 flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span className="group-hover:underline">{s.title}</span>
                    <span className="text-[10px] text-slate-500">({s.outletOrType})</span>
                  </a>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                Research Status: {selectedNgoLeader.researchStatus}
              </div>
              <div className="text-[10px] text-slate-400">
                <strong>Audit Notes:</strong> {selectedNgoLeader.evidenceAuditNotes}
              </div>
            </div>

            {/* Linked Modules */}
            {selectedNgoLeader.linkedModules.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Linked KEW Modules:</span>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  {selectedNgoLeader.linkedModules.map((l, idx) => (
                    <Link
                      key={idx}
                      href={l.url}
                      className="px-2.5 py-1 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1"
                    >
                      <span>{l.label}</span>
                      <ExternalLink className="w-3 h-3 text-teal-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Close */}
            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedNgoLeader(null)}
                className="px-4 py-1.5 rounded-[6px] bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold cursor-pointer"
              >
                Close Leader Dossier
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function KewGreenHeroesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
          <div className="text-center space-y-3">
            <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse mx-auto" />
            <p className="text-sm font-semibold text-slate-300">Loading KEW Green Heroes Directory...</p>
          </div>
        </div>
      }
    >
      <GreenHeroesPortalContent />
    </Suspense>
  );
}
