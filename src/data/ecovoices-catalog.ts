/**
 * EcoVoices: Environmental Arts, Music & Creative Expression
 * Independent Top-Level Creative Platform of Kashmir EcoWatch
 * Founding Music Collaboration: SufiPulse USA × Kashmir EcoWatch
 *
 * Canonical Music Publisher & Rights Holder: SufiPulse USA (https://sufipulse.com)
 * Environmental Science, Education & Creative Curation Platform: Kashmir EcoWatch (https://kashmir-ecowatch.com)
 *
 * Rights & Governance Notice:
 * All musical recordings, compositions, audio masters, lyrics, and promotional artwork in the
 * SufiPulse series remain the sole intellectual property of SufiPulse USA and affiliated artists.
 * Kashmir EcoWatch presents curated releases strictly for non-commercial ecological consciousness,
 * environmental education, and community stewardship.
 * Published works are strictly distinguished from externally documented regional works and
 * forthcoming/proposed creative productions. Zero fabricated works, profiles, or statistics are displayed.
 */

export const ECOVOICES_MODULE_IDENTITY = {
  name: 'EcoVoices',
  spacedTitle: 'E C O V O I C E S',
  subtitle: 'Where Environmental Science, Spiritual Consciousness & Creative Expression Meet',
  eyebrow: 'A COLLABORATIVE ENVIRONMENTAL & CREATIVE INITIATIVE',
  motto: 'WHEN NATURE FINDS ITS VOICE',
  tagline: 'Music. Nature. Consciousness.',
  philosophy:
    'Science helps us understand nature. Art helps us feel it. Spirituality reminds us of our responsibility toward it.',
  canonicalRoute: '/ecovoices',
  legacyRoute: '/environmental-calendar/ecovoices',
  description:
    'A collaborative platform bringing together science, spirituality and artistic expression to communicate environmental consciousness through music, poetry, literature, visual arts, natural soundscapes and cinematic storytelling across the Western Himalayas and beyond.',
  featuredCompositionSlug: 'pani-gawah-hai',
} as const;

export interface CollaboratingInitiative {
  id: string;
  name: string;
  role: string;
  officialUrl: string;
  logoPath: string;
  logoAlt: string;
}

export const ECOVOICES_COLLABORATING_INITIATIVES: readonly CollaboratingInitiative[] = [
  {
    id: 'kashmir-ecowatch',
    name: 'Kashmir EcoWatch',
    role: 'Environmental Science & Intelligence',
    officialUrl: 'https://kashmir-ecowatch.com/',
    logoPath: '/kew_LOGO.png',
    logoAlt: 'Kashmir EcoWatch Official Logo',
  },
  {
    id: 'sufipulse-usa',
    name: 'SufiPulse USA',
    role: 'Music & Creative Expression',
    officialUrl: 'https://sufipulse.com/',
    logoPath: '/images/partners/sufipulse-logo-v5.png',
    logoAlt: 'SufiPulse USA Official Logo',
  },
  {
    id: 'sufitube-usa',
    name: 'SufiTube USA',
    role: 'Cinema & Visual Storytelling',
    officialUrl: 'https://sufipulse.com/sufitube',
    logoPath: '/images/partners/sufitube-circular-logo.png',
    logoAlt: 'SufiTube USA Official Logo',
  },
  {
    id: 'sufi-science-center-usa',
    name: 'Sufi Science Center USA',
    role: 'Science & Spiritual Consciousness',
    officialUrl: 'https://sufisciencecenter.info/',
    logoPath: '/images/partners/ssc-logo.png',
    logoAlt: 'Sufi Science Center USA Official Logo',
  },
] as const;

export interface CommunicationPlatformPillar {
  id: string;
  platform: string;
  medium: string;
  primaryContributors: string;
  href?: string;
  status: 'active_module' | 'editorial_pillar';
  statusLabel: string;
}

import { getKewToDispatchUrl } from '@/lib/himalayan-dispatch-routes';

export const KEW_COMMUNICATION_PLATFORMS: CommunicationPlatformPillar[] = [
  {
    id: 'himalayan-dispatch',
    platform: 'Himalayan Dispatch',
    medium: 'Journalism, articles and editorial reporting',
    primaryContributors: 'Journalists and environmental correspondents',
    href: getKewToDispatchUrl('/'),
    status: 'active_module',
    statusLabel: 'Independent Editorial Magazine',
  },
  {
    id: 'ecovoices',
    platform: 'EcoVoices',
    medium: 'Music, poetry, cinema, visual arts and natural soundscapes',
    primaryContributors: 'Musicians, poets, filmmakers and visual artists',
    href: '/ecovoices',
    status: 'active_module',
    statusLabel: 'Independent Creative Module',
  },
  {
    id: 'environmental-calendar',
    platform: 'Student Action Hub',
    medium: 'Environmental awareness, education, participation, observances and experiential field learning',
    primaryContributors: 'Teachers, students and academic institutions',
    href: '/environmental-calendar',
    status: 'active_module',
    statusLabel: 'Awareness, Education & Action Module',
  },
];

export type EcoVoicesDepartmentId =
  | 'music'
  | 'poetry'
  | 'cinema'
  | 'art'
  | 'soundscapes'
  | 'contributors';

export interface EcoVoicesDepartment {
  id: EcoVoicesDepartmentId;
  navLabel: string;
  hash: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'published' | 'expanding';
  statusLabel: string;
  governanceNote: string;
  artworkImage: string;
  artworkCaption: string;
  proposedFormats?: string[];
}

export const ECOVOICES_DEPARTMENTS: EcoVoicesDepartment[] = [
  {
    id: 'music',
    navLabel: 'Music',
    hash: 'music',
    title: 'Environmental Music',
    subtitle: 'Original environmental songs, Sufi kalam and ecological advocacy compositions through SufiPulse USA.',
    description:
      'Six published master compositions produced by SufiPulse USA and scientifically contextualized by Kashmir EcoWatch—bridging Kashmiri Sufiana kalam, santoor, rabab, and orchestral arrangements with empirical hydrology, wetland restoration, and forest conservation.',
    status: 'published',
    statusLabel: 'Confirmed & Published · 6 Master Releases',
    governanceNote:
      'All 6 curated tracks are published official releases hosted via SufiPulse USA master embeds, paired with verified Kashmir EcoWatch ecological dossiers and Outdoor Classroom fieldwork protocols.',
    artworkImage: '/images/environmental-calendar/calendar-hero-ecovoices-studio.jpg',
    artworkCaption: 'Acoustic studio production & Western Himalayan musical stewardship',
  },
  {
    id: 'poetry',
    navLabel: 'Poetry',
    hash: 'poetry',
    title: 'Environmental Poetry',
    subtitle: 'Poetry, mystical reflections and literary expressions of humanity’s relationship with nature.',
    description:
      'From the 14th-century ecological shruks of Sheikh Noor-ud-Din Wali (Nund Rishi) and vakhs of Lalleshwari to contemporary Kashmiri, Urdu, Dogri, and English environmental verse exploring sacred trust (Amaanat), cosmic balance (Meezan), and watershed memory.',
    status: 'published',
    statusLabel: 'Published Kalam Archive · Literary Expansion Open',
    governanceNote:
      'Features verified original poetic excerpts from published EcoVoices compositions alongside externally documented Western Himalayan literary works and open editorial intake via Ahl-e-Qalam and the SufiPulse Literary Journal.',
    artworkImage: '/images/green-heroes/legacy-heritage.jpg',
    artworkCaption: 'Kashmiri, Urdu & Himalayan ecological manuscripts and mystical verse',
    proposedFormats: [
      'Multilingual Ecological Verse Anthology (Kashmiri, Urdu, Dogri, Ladakhi, Burushaski, English)',
      'Annotated Translations of Classical Rishi-Sufi Nature Shruks & Vakhs',
      'Reflective Environmental Essays & Field Memoirs (1,000–3,500 words)',
    ],
  },
  {
    id: 'cinema',
    navLabel: 'Cinema',
    hash: 'cinema',
    title: 'Environmental Cinema',
    subtitle: 'Short films, documentaries, visual narratives and ecological awareness productions.',
    description:
      'Cinematic storytelling dedicated to receding glaciers, threatened wetlands, nomadic pastoral transitions, and frontline conservationists across Kashmir, Jammu, Ladakh, AJ&K, and Gilgit-Baltistan.',
    status: 'expanding',
    statusLabel: 'Proposed Expansion · External Film Reference Index',
    governanceNote:
      'Governance Disclosure: Native KEW Environmental Cinema productions are a proposed expansion currently open for filmmaker submissions. Documented regional films listed in this department are independently produced works indexed from public festival, university, and UNESCO records—not hosted or claimed as KEW productions.',
    artworkImage: '/images/publications/sheshnag-alpine-glacial-lake.jpg',
    artworkCaption: 'High-altitude glacial tarns and visual ecological storytelling',
    proposedFormats: [
      'Short Ecological Documentaries & Watershed Visual Essays (5–25 min)',
      'Cryosphere & Glacier-Grafting Oral History Chronicles',
      'Animated Environmental Storytelling for Youth & Schools',
      'Curated Environmental Film Screening Showcases',
    ],
  },
  {
    id: 'art',
    navLabel: 'Visual Arts',
    hash: 'visual-arts',
    title: 'Environmental Art',
    subtitle: 'Paintings, illustrations, digital art and creative ecological interpretations.',
    description:
      'Visual interpretations of wetland macrophytes, riverine transformations, circular waste-to-art installations, botanical illustration, and ecological cartography across the Western Himalayas.',
    status: 'expanding',
    statusLabel: 'Proposed Expansion · Documented Regional Practice',
    governanceNote:
      'Governance Disclosure: Curated KEW digital gallery exhibitions are a forthcoming expansion. Artist portfolios referenced below represent independently documented regional exhibitions and public installations verified in university, museum, and press archives.',
    artworkImage: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
    artworkCaption: 'Lacustrine reflections, botanical studies, and ecological installations',
    proposedFormats: [
      'Fine Art & Contemporary Landscape Exhibitions on Wetland & River Change',
      'Scientific Botanical & Endemic Wildlife Illustration Portfolios',
      'Waste-to-Art & Public Riverbank Sculpture Documentation',
      'Digital Ecological Art & Interpretive Visual Essays',
    ],
  },
  {
    id: 'soundscapes',
    navLabel: 'Soundscapes',
    hash: 'soundscapes',
    title: 'Sounds of Nature',
    subtitle: 'The Living Acoustic Heritage of the Western Himalayas',
    description:
      'An immersive exploration of the natural voices of the Western Himalayan landscape—documenting its wildlife, forests, rivers, wetlands, mountains, and atmospheric phenomena through environmental soundscapes and bioacoustic research.',
    status: 'published',
    statusLabel: 'Bioacoustic Archive · Biophony, Geophony & Anthrophony',
    governanceNote:
      'Governance Disclosure: Verified open-license recordings (Xeno-canto & Wikimedia Commons CC BY / CC BY-SA / Public Domain) carry full 18-field provenance, exact recording locality, and recordist attribution. Collection categories awaiting verified Western Himalayan field capture are marked "Field recording pending"—never substituted with synthesized wildlife calls or misattributed recordings.',
    artworkImage: '/images/publications/lidder-pahalgam-mountain-river.jpg',
    artworkCaption: 'Bioacoustic heritage across wildlife, rivers, forests, wetlands, and glaciers',
    proposedFormats: [
      'Biophony: Avian Dawn Choruses, Pheasant Call-Count Vouchers, Endemic Songbirds, Mammals, Amphibians & Insects',
      'Geophony: Himalayan Rivers, Karst Springs (Naags), Waterfalls, Deodar & Chinar Canopies, Rain, Thunder & Glaciers',
      'Anthrophony: Comparative Highway & Peri-Urban Acoustic Masking Baselines Linked to KEW Noise Monitoring',
    ],
  },
  {
    id: 'contributors',
    navLabel: 'Artists',
    hash: 'artists',
    title: 'Creative Contributors',
    subtitle: 'Musicians, poets, filmmakers, artists, composers and environmental storytellers.',
    description:
      'Uniting SufiPulse USA’s five established creative contributor pathways with 19 independently documented Western Himalayan artists and an open editorial intake gateway for original ecological works.',
    status: 'published',
    statusLabel: '5 SufiPulse Pathways · 19 Documented Artists · Open Intake',
    governanceNote:
      'Profiles distinguish founding SufiPulse USA × KEW creative contributors from externally documented regional artists researched across five Western Himalayan jurisdictions. No unverified or fabricated contributor statistics are shown.',
    artworkImage: '/images/publications/forestry-betula-treeline-lidar.jpg',
    artworkCaption: 'Collaborative network of Himalayan musicians, poets, filmmakers, and artists',
  },
];

export interface AcousticSoundscapePreview {
  id: string;
  title: string;
  kashmiriOrLocalTerm: string;
  biome: string;
  elevationBand: string;
  status: 'field_recording_pending';
  statusBadge: string;
  acousticProfile: string;
  noiseCharacter: 'glacial_stream' | 'river_riffle' | 'deodar_wind' | 'wetland_night';
  image: string;
  linkedModuleTitle: string;
  linkedModuleHref: string;
}

/**
 * Legacy preview array sanitized to remove arbitrary unmeasured frequency resonance claims.
 * Authoritative Department V data now resides in `src/data/ecovoices-bioacoustics.ts`.
 */
export const ECOVOICES_SOUNDSCAPE_PREVIEWS: AcousticSoundscapePreview[] = [];

export interface RelatedScientificModule {
  title: string;
  category: string;
  href: string;
  description: string;
}

export interface OutdoorClassroomActivity {
  activityTitle: string;
  recommendedTier: string;
  curriculumLink: string;
  duration: string;
  fieldHypothesis: string;
  materialsNeeded: string[];
  fieldworkMethod: string;
  measurableLearningOutcome: string;
}

export interface YouTubeStats {
  trackNumber: number;
  duration: string;
  views: string;
  uploadedAge: string;
  playlistUrl: string;
  channelName: string;
  originalTitle: string;
  videoId: string;
  thumbnailUrl: string;
}

export interface EcoVoiceRelease {
  id: string;
  slug: string;
  trackOrder: number;
  title: string;
  shortTitle?: string;
  subtitle: string;
  artistCredit: string;
  publicationStatus: 'published';
  catalogNumber: string;
  catalogCode: string;
  canonicalUrl: string;
  publisher: string;
  year: number;
  durationFormatted: string;
  duration: string;
  audioSampleUrl?: string;
  videoEmbedId: string;
  youtubeVideoId: string;
  thumbnailUrl: string;
  coverArtworkUrl: string;
  coverImage: string;
  language: string;
  primaryTheme: string;
  environmentalTheme: string;
  themeCategory: 'water_stewardship' | 'sustainable_development' | 'river_conservation' | 'lake_wetland_ecology' | 'forest_alpine' | 'sacred_springs';
  observances: string[];
  kalamPoetOrSource?: string;
  musicalStyle: string;
  instrumentsUsed: string[];
  poeticExcerptOriginal: string;
  poeticExcerptTranslation: string;
  ecologicalDossier: string;
  relatedScientificModules: RelatedScientificModule[];
  outdoorClassroomActivity: OutdoorClassroomActivity;
  verifiedSufiPulseRelease: boolean;
  youtubeStats: YouTubeStats;
}

export const ECOVOICES_THEME_CATEGORIES = [
  { id: 'all', label: 'All Published Releases', count: 6 },
  { id: 'water_stewardship', label: 'Water Stewardship', count: 1 },
  { id: 'sustainable_development', label: 'Sustainable Development & Ethics', count: 2 },
  { id: 'river_conservation', label: 'River Conservation (Jhelum)', count: 1 },
  { id: 'lake_wetland_ecology', label: 'Lakes & Wetlands (Dal)', count: 1 },
  { id: 'forest_alpine', label: 'Alpine Slopes & Springs', count: 1 }
] as const;

export const ECOVOICES_RELEASES: EcoVoiceRelease[] = [
  {
    id: 'pani-gawah-hai',
    slug: 'pani-gawah-hai',
    trackOrder: 1,
    title: 'PANI GAWAH HAI | Kashmir Water Bears Witness',
    shortTitle: 'PANI GAWAH HAI',
    subtitle: 'A Sufi Symphony on Kashmir\'s Freshwater Heritage & Riparian Memory',
    artistCredit: 'Dr. Zarf-e-Noori · SufiPulse USA',
    publicationStatus: 'published',
    catalogNumber: 'SP-USA-ENV-001',
    catalogCode: 'SP-USA-ENV-001',
    canonicalUrl: 'https://sufipulse.com/release-detail/pani-gawah-hai-kashmir-water-bears-witness-sufipulse-usa',
    publisher: 'SufiPulse USA',
    year: 2024,
    durationFormatted: '27:52',
    duration: '27:52',
    videoEmbedId: 'dXqkrpP-41I',
    youtubeVideoId: 'dXqkrpP-41I',
    thumbnailUrl: 'https://img.youtube.com/vi/dXqkrpP-41I/hqdefault.jpg',
    coverArtworkUrl: 'https://img.youtube.com/vi/dXqkrpP-41I/hqdefault.jpg',
    coverImage: 'https://img.youtube.com/vi/dXqkrpP-41I/hqdefault.jpg',
    language: 'Kashmiri & Urdu with English Poetic Gloss',
    primaryTheme: 'Water Stewardship & Freshwater Riparian Memory',
    environmentalTheme: 'Water Stewardship & Freshwater Riparian Memory',
    themeCategory: 'water_stewardship',
    observances: [
      'World Water Day (March 22)',
      'J&K Freshwater Basin Week (September 24)',
      'World Environment Day (June 5)'
    ],
    kalamPoetOrSource: 'Dr. Zarf-e-Noori · Traditional Kashmiri Mystical Idiom & Contemporary Sufi Ecology',
    musicalStyle: 'Spiritual Symphony with Traditional Kashmiri Santoor & Rabab',
    instrumentsUsed: ['Kashmiri Santoor', 'Afghan Rabab', 'Sarangi', 'Frame Drum (Daf)', 'Ambient Himalayan Soundscapes'],
    poeticExcerptOriginal: 'پانِ گواہ چُھ، سارسار درؠیاو گواہ چُھ،\nکوہِ ہِمالایہِ پؠٹھہٕ یِم آپ ژھَلَن چِھ۔\nامانت چھِ امۍ ژھیل، گژھہِ نہٕ زاہ زایہِ گژھُن۔',
    poeticExcerptTranslation: 'Water bears witness; every roaring mountain river bears witness,\nFlowing pure from the glacial crests of the Himalayas.\nThis crystalline flow is a sacred trust; let not its sanctity be squandered.',
    ecologicalDossier: 'In Kashmir\'s Western Himalayan hydrology, headwater streams provide drinking water, irrigation for terraced paddy and apple orchards, and crucial ecological replenishment for downstream valley wetlands. "PANI GAWAH HAI" translates hydrological accountability into an acoustic testament. It counters the commodification of water by invoking the ancient Himalayan concept of "Aab-e-Hayat" (the water of life) and the duty of custodianship over high-altitude glaciers, alpine tarns, and valley floodplains.',
    relatedScientificModules: [
      {
        title: 'Kashmir Water Systems Observatory',
        category: 'Hydrology',
        href: '/water-systems',
        description: 'Comprehensive hydrological basin monitoring, basin discharge rates, and watershed health metrics.'
      },
      {
        title: 'Drinking Water Aquifers & Springs',
        category: 'Groundwater',
        href: '/water-systems/drinking-water-sources',
        description: 'Geospatial mapping of pristine mountain aquifers, municipal intake channels, and community spring catchments.'
      },
      {
        title: 'Water Quality Laboratory Testing Layers',
        category: 'Ecotoxicology',
        href: '/water-systems/water-quality',
        description: 'Physicochemical testing metrics: Dissolved Oxygen, BOD5, Electrical Conductivity, and microbial indicators.'
      }
    ],
    outdoorClassroomActivity: {
      activityTitle: 'Sentinel Spring Transect & Hydrological Memory Audit',
      recommendedTier: 'Intermediate Tier (14–15 Years) & Advanced Tier (16–17 Years)',
      curriculumLink: '/environmental-calendar/outdoor-classroom/curriculum',
      duration: '3 Hours (1 Hour Preparation & Acoustic Listening + 2 Hours Catchment Sampling)',
      fieldHypothesis: 'Pristine mountain headwater springs exhibit neutral pH (7.2–7.6) and high Dissolved Oxygen (> 7.5 mg/L), whereas downstream canal outfalls exhibit dissolved oxygen depletion (< 4.0 mg/L) caused by unbuffered runoff.',
      materialsNeeded: [
        'Portable digital DO meter or chemical Winkler titration kit',
        'Calibrated handheld pH/EC multi-parameter probe',
        'Sterile 500 mL HDPE sampling bottles',
        'Audio player for listening to PANI GAWAH HAI at field station base',
        'EcoWatch Sentinel Spring Observation Sheet'
      ],
      fieldworkMethod: '1. Listen to the opening movement of "PANI GAWAH HAI" in the field classroom to establish thematic focus on water as a living legal and moral witness.\n2. Conduct a 3-point water quality transect along a local stream: Point A (Pristine spring head), Point B (Agricultural canal inflow), Point C (Downstream settlement egress).\n3. Record pH, DO, Temperature, and visual clarity.\n4. Interview two village elders regarding water discharge volumes and historical perennial permanence over the last 30 years.\n5. Log findings into the Kashmir EcoWatch Student Field Observation Registry.',
      measurableLearningOutcome: 'Students quantify the physicochemical degradation gradient along a catchment transect and synthesize oral environmental memory with empirical sensor data.'
    },
    verifiedSufiPulseRelease: true,
    youtubeStats: {
      trackNumber: 1,
      duration: '27:52',
      views: '116',
      uploadedAge: '3mo ago',
      playlistUrl: 'https://www.youtube.com/playlist?list=PLhu9NyNCTr7jRfvo6ktcYSayRtURCDVnM',
      channelName: 'SufiPulse USA',
      originalTitle: 'PANI GAWAH HAI | KASHMIR WATER BEARS WITNESS | SufiPulse USA',
      videoId: 'dXqkrpP-41I',
      thumbnailUrl: 'https://img.youtube.com/vi/dXqkrpP-41I/hqdefault.jpg'
    }
  },
  {
    id: 'sheikh-noorani-father-of-sustainable-development',
    slug: 'sheikh-noorani-father-of-sustainable-development',
    trackOrder: 2,
    title: 'Sheikh! Sheikh! Noorani (RA) | Father of Sustainable Development',
    shortTitle: 'SHEIKH! SHEIKH! NOORANI (RA)',
    subtitle: 'The Ecological Legacy of Alamdar-e-Kashmir & Western Himalayan Forest Guardianship',
    artistCredit: 'Dr. Zarf-e-Noori · SufiPulse USA',
    publicationStatus: 'published',
    catalogNumber: 'SP-USA-ENV-002',
    catalogCode: 'SP-USA-ENV-002',
    canonicalUrl: 'https://sufipulse.com/release-detail/sheikh-noorani-father-of-sustainable-development',
    publisher: 'SufiPulse USA',
    year: 2023,
    durationFormatted: '8:26',
    duration: '8:26',
    videoEmbedId: 'hXAJUFwEuGk',
    youtubeVideoId: 'hXAJUFwEuGk',
    thumbnailUrl: 'https://img.youtube.com/vi/hXAJUFwEuGk/hqdefault.jpg',
    coverArtworkUrl: 'https://img.youtube.com/vi/hXAJUFwEuGk/hqdefault.jpg',
    coverImage: 'https://img.youtube.com/vi/hXAJUFwEuGk/hqdefault.jpg',
    language: 'Kashmiri & Urdu with English Poetic Gloss',
    primaryTheme: 'Sustainable Development, Forest Guardianship & Ecological Forethought',
    environmentalTheme: 'Sustainable Development & Alpine Forest Canopies',
    themeCategory: 'sustainable_development',
    observances: [
      'World Environment Day (June 5)',
      'International Day of Forests (March 21)',
      'Kashmir Arbor & Heritage Tree Observance (September 12)'
    ],
    kalamPoetOrSource: 'Nund Rishi (Sheikh Noor-ud-Din Noorani RA / Alamdar-e-Kashmir, 1377–1440 CE) · Contemporary Kalam by Dr. Zarf-e-Noori',
    musicalStyle: 'Devotional Himalayan Choral Symphony with Santoor, Rabab & Resonant Drone',
    instrumentsUsed: ['Kashmiri Santoor', 'Afghan Rabab', 'Bansuri (Bamboo Flute)', 'Dumbak Percussion', 'Acoustic Cello'],
    poeticExcerptOriginal: 'اَن پوشِہ تَیلِہ یَلِہ وَن پوشِہ،\nیِم ہَنٛدِ کۄل ژھَنٛڈِو تِم ہَنٛدِ دارُن۔\nکوہَن مَنٛز چھُ رَب سُنٛد نُور چَمکان،\nکُنٛڈَن ہٕنٛز حِفاظَت کٔرِو زان۔',
    poeticExcerptTranslation: 'Food will thrive only as long as the forests thrive,\nSeek the springs that sustain life across the valleys.\nDivine light shines upon these towering mountain crests;\nGuard every sacred aquifer and woodland grove with your soul.',
    ecologicalDossier: 'Sheikh Noor-ud-Din Wali (RA), revered as Alamdar-e-Kashmir and the patron saint of Kashmir\'s cultural ethos, formulated what modern ecological economists recognize as the earliest vernacular manifesto of sustainable development: "Ann Poshi Teli Yeli Van Poshi" (Food will last only as long as forests thrive). This symphony translates his 14th-century ecological foresight into a Western Himalayan conservation call. It underscores the critical interdependence between catchment forest canopies (Cedrus deodara, Pinus wallichiana, Abies pindrow), soil erosion mitigation in the Pir Panjal range, and downstream food security across Kashmir\'s alluvial paddy plains.',
    relatedScientificModules: [
      {
        title: 'Kashmir Forest Canopy & Carbon Telemetry',
        category: 'Forest Ecology',
        href: '/protected-network',
        description: 'Western Himalayan forest crown density, deodar-fir subalpine reserves, and illegal timber felling defense.'
      },
      {
        title: 'Biodiversity & Protected Alpine Corridors',
        category: 'Conservation',
        href: '/biodiversity',
        description: 'Wildlife corridors linking Dachigam, Overa-Aru, and Gulmarg alpine preserves across the valley rim.'
      },
      {
        title: 'Agro-Ecological Sustainability & Soil Health',
        category: 'Agroforestry',
        href: '/environmental-calendar',
        description: 'Catchment soil organic carbon layers, terraced irrigation stability, and organic orchard conservation.'
      }
    ],
    outdoorClassroomActivity: {
      activityTitle: 'Forest Canopy Density, Soil Hydrology & Nund Rishi Woodland Quadrat Audit',
      recommendedTier: 'Foundation Tier (11–13 Years) & Intermediate Tier (14–16 Years)',
      curriculumLink: '/environmental-calendar/outdoor-classroom/curriculum',
      duration: '3.5 Hours Subalpine Forest Field Lab',
      fieldHypothesis: 'Soil organic layer depth and infiltration rates under intact multi-tiered deodar-pine canopies (>70% crown cover) are over 300% higher than compacted, deforested slope transects, confirming Sheikh Noorani\'s principle of forest-soil-water coupling.',
      materialsNeeded: [
        'Crown mirror densiometer or smartphone canopy cover analyzer',
        'Double-ring soil infiltrometer with graduated water cylinder',
        'Soil core probe and 100m metric field surveyor tape',
        'EcoWatch Forest Layer Classification Key',
        'Audio recording of "Sheikh! Sheikh! Noorani (RA) | Father of Sustainable Development"'
      ],
      fieldworkMethod: '1. Establish two 20m x 20m quadrats: Quadrat 1 in an undisturbed native deodar/pine grove; Quadrat 2 on a partially cleared or grazing-degraded adjacent hillside.\n2. Measure canopy closure percentage at four cardinal sub-points.\n3. Measure topsoil humus depth using soil core probe.\n4. Execute a 15-minute infiltration test measuring hydraulic intake rate (mm/hr).\n5. Recite and examine the ecological Shruks of Sheikh Noor-ud-Din Wali in the outdoor classroom shelter, drawing direct causal lines to modern hydrological science.',
      measurableLearningOutcome: 'Students empirically validate the "Van Poshi" principle by linking canopy cover directly to soil water retention and slope stability.'
    },
    verifiedSufiPulseRelease: true,
    youtubeStats: {
      trackNumber: 2,
      duration: '8:26',
      views: '554',
      uploadedAge: '1y ago',
      playlistUrl: 'https://www.youtube.com/playlist?list=PLhu9NyNCTr7jRfvo6ktcYSayRtURCDVnM',
      channelName: 'SufiPulse USA',
      originalTitle: 'Sheikh! Sheikh! Noorani (RA) | Father of Sustainable Development | SufiPulse USA',
      videoId: 'hXAJUFwEuGk',
      thumbnailUrl: 'https://img.youtube.com/vi/hXAJUFwEuGk/hqdefault.jpg'
    }
  },
  {
    id: 'sufi-cry-for-a-river',
    slug: 'sufi-cry-for-a-river',
    trackOrder: 3,
    title: 'Sufi Cry for a River | A Cry for the Jhelum (Vyeth)',
    shortTitle: 'SUFI CRY FOR A RIVER',
    subtitle: 'Elegy for Kashmir\'s Lifeline: The Hydrological & Cultural Trajectory of River Jhelum',
    artistCredit: 'Dr. Zarf-e-Noori · SufiPulse USA',
    publicationStatus: 'published',
    catalogNumber: 'SP-USA-ENV-003',
    catalogCode: 'SP-USA-ENV-003',
    canonicalUrl: 'https://sufipulse.com/release-detail/sufi-cry-for-a-river',
    publisher: 'SufiPulse USA',
    year: 2023,
    durationFormatted: '10:58',
    duration: '10:58',
    videoEmbedId: '8qyLuPGLx7w',
    youtubeVideoId: '8qyLuPGLx7w',
    thumbnailUrl: 'https://img.youtube.com/vi/8qyLuPGLx7w/hqdefault.jpg',
    coverArtworkUrl: 'https://img.youtube.com/vi/8qyLuPGLx7w/hqdefault.jpg',
    coverImage: 'https://img.youtube.com/vi/8qyLuPGLx7w/hqdefault.jpg',
    language: 'Kashmiri & Urdu',
    primaryTheme: 'River Conservation, Hydrological Integrity & Siltation Defense',
    environmentalTheme: 'River Conservation, Hydrological Integrity & Siltation Defense',
    themeCategory: 'river_conservation',
    observances: [
      'International Day of Action for Rivers (March 14)',
      'World River Day (Fourth Sunday of September)',
      'Kashmir Flood Remembrance Day (September 7)'
    ],
    kalamPoetOrSource: 'Dr. Zarf-e-Noori · Classical Kashmiri Kalam & Contemporary Riverine Lament',
    musicalStyle: 'Meditative Kashmiri Sufiana Qalam with Ney and Mournful Strings',
    instrumentsUsed: ['Persian Ney', 'Kashmiri Saaz', 'Acoustic Guitar', 'Clay Matka Percussion', 'Harmonium'],
    poeticExcerptOriginal: 'وؠتھ چھےٚ رَوان دَواں، سؠنہِ مَنٛز چھُ ژِٹھ پؠوان،\nکتھ کٔنۍ زِ اَمۍ سٕنٛدِ سٲرؠ کُنٛڈ گٔے مژھِ مَنٛز گُم؟\nیِتھ تَنہِ روٗد نہٕ کینہہ، صِرِف وؠتھ چھےٚ ژھۆپہِ پٲٹھۍ نالان۔',
    poeticExcerptTranslation: 'The Vyeth flows on, weeping in silence through her winding course,\nHow have her pristine springs been swallowed by encroaching silt and debris?\nHer ancient voice is suffocated, yet the river cries out in every eddy.',
    ecologicalDossier: 'The River Jhelum (known as Vyeth in Kashmiri, Hydaspes in ancient Greek) originates at the sacred limestone spring of Verinag and meanders across the Kashmir valley floor before passing through Wular Lake and exiting into the Baramulla gorge. The river has suffered from severe loss of carrying capacity (reduced from ~45,000 cusecs to under 28,000 cusecs in un-dredged stretches), widespread illegal riverbed sand mining, destruction of flood spill channels, and untreated municipal sewage outfalls. "Sufi Cry for a River" gives voice to this wounded artery, bridging hydraulic vulnerability with the valley\'s deep literary affection for the river.',
    relatedScientificModules: [
      {
        title: 'River Jhelum Hydrological Monitoring System',
        category: 'Rivers & Floods',
        href: '/water-systems/rivers',
        description: 'Flow velocities, gauge heights at Ram Munshi Bagh and Sangam, siltation indices, and flood spill channels.'
      },
      {
        title: 'Flood Hazard Intelligence & Drainage Modeling',
        category: 'Disaster Risk',
        href: '/water-systems/flood-risk',
        description: '100-year flood inundation zones, channel geometry profiling, and wetland absorption buffer modeling.'
      },
      {
        title: 'Benthic Macroinvertebrate & Fish Biodiversity',
        category: 'Aquatic Life',
        href: '/biodiversity/fish',
        description: 'Schizothorax (snow trout) migration corridors and ecological status of native coldwater ichthyofauna.'
      }
    ],
    outdoorClassroomActivity: {
      activityTitle: 'River Morphology, Bank Stability & Macroinvertebrate Bio-Assessment',
      recommendedTier: 'Advanced Tier (16–17 Years) & Undergraduate Tier (18–22 Years)',
      curriculumLink: '/environmental-calendar/outdoor-classroom/curriculum',
      duration: '4 Hours Field Expedition',
      fieldHypothesis: 'Riparian reaches with intact willow-reed root systems display significantly lower bank erosion and host pollution-sensitive Ephemeroptera-Plecoptera-Trichoptera (EPT) insect larvae compared to embanked urban reaches.',
      materialsNeeded: [
        'D-frame aquatic kick-net (500 μm mesh)',
        'White enamel sorting trays and fine forceps',
        'CPCB Macroinvertebrate Identification Key (Western Himalaya)',
        'Turbidity tube (120 cm graduated)',
        'GPS-enabled mobile device for field geotagging'
      ],
      fieldworkMethod: '1. Conduct five 1-minute kick-net sampling runs across a 100-meter riffle zone along the Jhelum or a tributary.\n2. Sort organisms into taxonomic orders and calculate the Family Biotic Index (FBI).\n3. Measure turbidity and estimate percentage bank vegetation cover.\n4. Correlate findings with the lyrical themes of ecological mourning in "Sufi Cry for a River".\n5. Generate an Environmental Action Sheet proposing riparian re-vegetation with native Salix (willow) and Phragmites.',
      measurableLearningOutcome: 'Students calculate biological water quality index using living indicator organisms and diagnose the hydrological impact of bank degradation.'
    },
    verifiedSufiPulseRelease: true,
    youtubeStats: {
      trackNumber: 3,
      duration: '10:58',
      views: '1.8K',
      uploadedAge: '1y ago',
      playlistUrl: 'https://www.youtube.com/playlist?list=PLhu9NyNCTr7jRfvo6ktcYSayRtURCDVnM',
      channelName: 'SufiPulse USA',
      originalTitle: 'Sufi Cry for a River | A Cry for the Jhelum | SufiPulse USA',
      videoId: '8qyLuPGLx7w',
      thumbnailUrl: 'https://img.youtube.com/vi/8qyLuPGLx7w/hqdefault.jpg'
    }
  },
  {
    id: 'mirror-of-hazratbal-wound-of-dal',
    slug: 'mirror-of-hazratbal-wound-of-dal',
    trackOrder: 4,
    title: 'Mirror of Hazratbal, Wound of Dal',
    shortTitle: 'MIRROR OF HAZRATBAL, WOUND OF DAL',
    subtitle: 'Sacred Reflections, Ecological Trauma & the Restoration of Dal Lake',
    artistCredit: 'Dr. Zarf-e-Noori · SufiPulse USA',
    publicationStatus: 'published',
    catalogNumber: 'SP-USA-ENV-004',
    catalogCode: 'SP-USA-ENV-004',
    canonicalUrl: 'https://sufipulse.com/release-detail/mirror-of-hazratbal-wound-of-dal',
    publisher: 'SufiPulse USA',
    year: 2023,
    durationFormatted: '7:40',
    duration: '7:40',
    videoEmbedId: 'nFAGGKia4aU',
    youtubeVideoId: 'nFAGGKia4aU',
    thumbnailUrl: 'https://img.youtube.com/vi/nFAGGKia4aU/hqdefault.jpg',
    coverArtworkUrl: 'https://img.youtube.com/vi/nFAGGKia4aU/hqdefault.jpg',
    coverImage: 'https://img.youtube.com/vi/nFAGGKia4aU/hqdefault.jpg',
    language: 'Kashmiri & Urdu',
    primaryTheme: 'Dal Lake & Wetland Ecological Healing',
    environmentalTheme: 'Dal Lake & Wetland Ecological Healing',
    themeCategory: 'lake_wetland_ecology',
    observances: [
      'World Wetlands Day (February 2)',
      'World Environment Day (June 5)',
      'Himalayan Biodiversity Day (May 22)'
    ],
    kalamPoetOrSource: 'Dr. Zarf-e-Noori · Mystical Eulogy on Hazratbal Sanctum & the Living Waters of Dal',
    musicalStyle: 'Soulful Qawwali / Sufi Chamber Orchestration with Santoor & Bamboo Flute',
    instrumentsUsed: ['Kashmiri Santoor', 'Bansuri (Bamboo Flute)', 'Harmonium', 'Tabla & Daf', 'Cellos and Viola'],
    poeticExcerptOriginal: 'حضرت بَلو پؠٹھہٕ وٕچھِو ڈَل کِتھ کٔنۍ چُھ رووان،\nآئی نہٕ زاہ صَفٲئی، صِرِف لالچ چھےٚ گۄڈنۍ وِتھان۔\nپَمپوش گٔے بیگان، ناگہٕ لۆسِ گٔے کَمزور۔',
    poeticExcerptTranslation: 'Gaze from Hazratbal upon how Dal Lake weeps in silent decline,\nPurity has slipped away as unchecked greed expands its borders.\nThe sacred lotus flowers grow rare; the living freshwater springs grow frail.',
    ecologicalDossier: 'Dal Lake is the ecological crown and cultural centerpiece of Srinagar, covering an open-water and marsh basin historically exceeding 25 sq km, now contracted to approximately 11.5 sq km of clear open water. Nutrient-rich inflows from agricultural runoff and domestic settlements around the Telbal catchment have accelerated cultural eutrophication, leading to explosive proliferation of invasive Azolla cristata, submerged weeds (Myriophyllum, Ceratophyllum), and progressive siltation of the lake bed. "Mirror of Hazratbal, Wound of Dal" invokes the sacred landscape of the Hazratbal shrine overlooking the lake, contrasting the divine reflection of the sanctum with the physical degradation of the waters below.',
    relatedScientificModules: [
      {
        title: 'Dal Lake Basin Ecosystem Observatory',
        category: 'Lakes & Basins',
        href: '/water-systems/lakes',
        description: 'Bathymetric maps, water volume calculations, floating vegetable garden dynamics, and water renewal rates.'
      },
      {
        title: 'Kashmir Ramsar Wetlands & Conservation Network',
        category: 'Wetlands',
        href: '/water-systems/wetlands',
        description: 'Hokersar, Mirgund, Shallabugh, and Wular: bird migration counts, weed harvesting telemetry, and buffer zone mapping.'
      },
      {
        title: 'Eutrophication & Macrophyte Intelligence Layer',
        category: 'Environmental Monitoring',
        href: '/environmental-monitoring/dashboards',
        description: 'Nitrate (NO3) and orthophosphate (PO4) concentrations, chlorophyll-a remote sensing, and trophic state indices.'
      }
    ],
    outdoorClassroomActivity: {
      activityTitle: 'Secchi Disk Transparency & Macrophyte Zone Mapping in Dal Lake',
      recommendedTier: 'Intermediate Tier (14–15 Years) & Foundation Tier (11–13 Years)',
      curriculumLink: '/environmental-calendar/outdoor-classroom/curriculum',
      duration: '2.5 Hours Shikara-Based Field Lab',
      fieldHypothesis: 'Open-water pelagic basins in Dal Lake display greater light penetration (Secchi depth > 1.8 m) and balanced native charophyte flora, whereas enclosed bays with heavy houseboat concentrations show Secchi depth < 0.9 m and high invasive weed density.',
      materialsNeeded: [
        'Standard 20 cm black-and-white Secchi disk with calibrated metric rope',
        'Water thermometer',
        'Plant specimen jars for macrophyte voucher pressing',
        'Field guide to Kashmir Wetland Macrophytes (EcoWatch Field Guide #4)',
        'Audio recording of "Mirror of Hazratbal, Wound of Dal"'
      ],
      fieldworkMethod: '1. Embark on a licensed field study tour from Hazratbal jetty to Nagin basin via Mirbehri.\n2. Lower Secchi disk on the shady side of the boat; record disappearance and reappearance depths.\n3. Sample surface water temperature and document macrophyte species composition (Nelumbo nucifera, Nymphaea alba, Potamogeton crispus, Azolla).\n4. Discuss the cultural and spiritual responsibility of keeping the lake mirror clear.\n5. Produce an illustrated "State of the Dal" field report comparing findings to Lake Conservation and Management Authority (LCMA) historical records.',
      measurableLearningOutcome: 'Students determine trophic state parameters through physical transparency measurement and link aquatic botany to cultural stewardship.'
    },
    verifiedSufiPulseRelease: true,
    youtubeStats: {
      trackNumber: 4,
      duration: '7:40',
      views: '263',
      uploadedAge: '1y ago',
      playlistUrl: 'https://www.youtube.com/playlist?list=PLhu9NyNCTr7jRfvo6ktcYSayRtURCDVnM',
      channelName: 'SufiPulse USA',
      originalTitle: 'Mirror of Hazratbal, Wound of Dal | SufiPulse USA',
      videoId: 'nFAGGKia4aU',
      thumbnailUrl: 'https://img.youtube.com/vi/nFAGGKia4aU/hqdefault.jpg'
    }
  },
  {
    id: 'cry-of-the-kashmir-valley',
    slug: 'cry-of-the-kashmir-valley',
    trackOrder: 5,
    title: 'Cry of the Kashmir Valley | Come Light the Mystic Lamp',
    shortTitle: 'CRY OF THE KASHMIR VALLEY',
    subtitle: 'A Lament for Degraded Slopes, Vanishing Springs & Ecological Awakening',
    artistCredit: 'Dr. Zarf-e-Noori · SufiPulse USA',
    publicationStatus: 'published',
    catalogNumber: 'SP-USA-ENV-005',
    catalogCode: 'SP-USA-ENV-005',
    canonicalUrl: 'https://sufipulse.com/release-detail/cry-of-the-kashmir-valley-come-light-the-mystic-lamp',
    publisher: 'SufiPulse USA',
    year: 2023,
    durationFormatted: '8:00',
    duration: '8:00',
    videoEmbedId: 'EtehDd3oUVc',
    youtubeVideoId: 'EtehDd3oUVc',
    thumbnailUrl: 'https://img.youtube.com/vi/EtehDd3oUVc/hqdefault.jpg',
    coverArtworkUrl: 'https://img.youtube.com/vi/EtehDd3oUVc/hqdefault.jpg',
    coverImage: 'https://img.youtube.com/vi/EtehDd3oUVc/hqdefault.jpg',
    language: 'Kashmiri & Urdu with English Poetic Gloss',
    primaryTheme: 'Sacred Springs, Slope Degradation & Ecological Awakening',
    environmentalTheme: 'Sacred Springs, Slope Degradation & Ecological Awakening',
    themeCategory: 'forest_alpine',
    observances: [
      'World Environment Day (June 5)',
      'Himalayan Ecology Day (September 9)',
      'International Mountain Day (December 11)'
    ],
    kalamPoetOrSource: 'Dr. Zarf-e-Noori · Mystic Valley Elegy & Contemporary Kashmiri Ecological Kalam',
    musicalStyle: 'Haunting Ambient Sufiana with Ney, Cello, Kashmiri Rabab and Chiming Bells',
    instrumentsUsed: ['Persian Ney', 'Afghan Rabab', 'Acoustic Cello', 'Tibetan Singing Bowls', 'Kashmiri Matka'],
    poeticExcerptOriginal: 'ژہٕ پَلِ کٔرِو فِکر، کَہہ گۆو اَمِس کٔشیٖرِ؟\nناگہٕ سٲرؠ سُکھِ گٔے، گاش گۆو اندھیرس مَنٛز گُم۔\nوَلِو تَنہِ لۆسِ دِیُو، عِشٖقُک دیٖوَل بالِو،\nزِندٕ کٔرِو بییہِ اَمِکۍ آبشار تَہِ وۆنہِ۔',
    poeticExcerptTranslation: 'Pause for a moment and reflect: what has become of Kashmir\'s pristine vale?\nHer sacred springs have fallen parched, the clarity swallowed by creeping shadows.\nCome, strike the mystic flame of awareness once more;\nRevive her crystal cascades and her sacred mountain groves before dusk falls.',
    ecologicalDossier: '"Cry of the Kashmir Valley" is an urgent call addressing the cumulative trauma inflicted upon the valley\'s vulnerable biomes: rapidly receding high-altitude glaciers (Kolhai, Thajwas), desiccation of perennial karst springs ("Naags") across the karewa formations, unregulated mountain quarrying, and fragmentation of fragile temperate and subalpine habitats. Anchoring the metaphor of lighting a mystic lamp to active citizen science, the work calls on every resident and diaspora supporter to replace ecological grief with empirical vigilance, community wetland custodianship, and watershed regeneration.',
    relatedScientificModules: [
      {
        title: 'Kashmir Karst Springs & Aquifer Mapping',
        category: 'Hydrogeology',
        href: '/water-systems/drinking-water-sources',
        description: 'Sentinel spring discharge telemetry, perennial flow permanence, and karst catchment vulnerabilities.'
      },
      {
        title: 'Himalayan Glaciology & Cryosphere Telemetry',
        category: 'Cryosphere',
        href: '/water-systems',
        description: 'Mass balance deficits, glacial retreat rates, and alpine moraine-dammed lake hazard tracking.'
      },
      {
        title: 'Karewa Geomorphology & Land Degradation',
        category: 'Soil Science',
        href: '/earth-human-impact/land-earth-systems',
        description: 'Quarrying impact on ancient lacustrine plateau terraces, saffron soil stability, and siltation runoffs.'
      }
    ],
    outdoorClassroomActivity: {
      activityTitle: 'High-Altitude Spring Discharge & Karewa Land Degradation Mapping',
      recommendedTier: 'Intermediate Tier (14–15 Years) & Advanced Tier (16–18 Years)',
      curriculumLink: '/environmental-calendar/outdoor-classroom/curriculum',
      duration: '3.5 Hours Field Geohydrology Lab',
      fieldHypothesis: 'Deforested and quarried Karewa slopes experience accelerated rill erosion and spring yield declines exceeding 50% during dry autumn months compared to stabilized forested catchments.',
      materialsNeeded: [
        'Stopwatch and calibrated 10L volumetric container for spring discharge measurement',
        'Digital soil penetrometer for compaction and shear resistance testing',
        'Handheld GPS tracker and geological clinometer',
        'Kashmir Springs Observatory Observation Log',
        'Audio recording of "Cry of the Kashmir Valley"'
      ],
      fieldworkMethod: '1. Locate a historic mountain spring ("Naag") on a karewa or foothill transect.\n2. Measure volumetric discharge (liters per minute) over three consecutive replicates.\n3. Assess upstream vegetative slope cover, documenting degree of anthropogenic excavation or deforestation within a 200m radius.\n4. Test topsoil compaction using penetrometer.\n5. Engage students in listening to "Cry of the Kashmir Valley" and drafting a community Spring Custodianship Charter to preserve perennial discharge.',
      measurableLearningOutcome: 'Students calculate volumetric discharge rates and evaluate the impact of uphill land use changes on perennial mountain groundwater supplies.'
    },
    verifiedSufiPulseRelease: true,
    youtubeStats: {
      trackNumber: 5,
      duration: '8:00',
      views: '104',
      uploadedAge: '1y ago',
      playlistUrl: 'https://www.youtube.com/playlist?list=PLhu9NyNCTr7jRfvo6ktcYSayRtURCDVnM',
      channelName: 'SufiPulse USA',
      originalTitle: 'Cry of the Kashmir Valley | Come Light the Mystic Lamp | SufiPulse USA',
      videoId: 'EtehDd3oUVc',
      thumbnailUrl: 'https://img.youtube.com/vi/EtehDd3oUVc/hqdefault.jpg'
    }
  },
  {
    id: 'kashmir-how-long-will-you-remain-silent',
    slug: 'kashmir-how-long-will-you-remain-silent',
    trackOrder: 6,
    title: 'Kashmir, How Long Will You Remain Silent? | Kab Tak Khamosh?',
    shortTitle: 'KAB TAK KHAMOSH?',
    subtitle: 'Kashmir\'s Environmental Awakening: An Original Mystical Sufi Kalam on Meezan, Amaanat & Ecological Conscience',
    artistCredit: 'Dr. Zarf-e-Noori · SufiPulse USA',
    publicationStatus: 'published',
    catalogNumber: 'SP-USA-ENV-006',
    catalogCode: 'SP-USA-ENV-006',
    canonicalUrl: 'https://sufipulse.com/releases',
    publisher: 'SufiPulse USA',
    year: 2026,
    durationFormatted: '14:53',
    duration: '14:53',
    videoEmbedId: 'wYFfuBS78ZI',
    youtubeVideoId: 'wYFfuBS78ZI',
    thumbnailUrl: 'https://img.youtube.com/vi/wYFfuBS78ZI/hqdefault.jpg',
    coverArtworkUrl: 'https://img.youtube.com/vi/wYFfuBS78ZI/hqdefault.jpg',
    coverImage: 'https://img.youtube.com/vi/wYFfuBS78ZI/hqdefault.jpg',
    language: 'Urdu (with Nastaliq, Roman Urdu & English Gloss)',
    primaryTheme: 'Meezan & Amaanat: Sacred Trust, Human Responsibility & Confronting Ecological Silence',
    environmentalTheme: 'Meezan & Amaanat: Sacred Trust, Human Responsibility & Confronting Ecological Silence',
    themeCategory: 'sustainable_development',
    observances: [
      'World Environment Day (June 5)',
      'Himalayan Ecology Day (September 9)',
      'World Water Day (March 22)'
    ],
    kalamPoetOrSource: 'Dr. Zarf-e-Noori (Original Mystical Sufi Kalam)',
    musicalStyle: 'Contemporary Mystical Sufi • Spiritual Ecology • Three-Part Cinematic Master',
    instrumentsUsed: ['Persian Ney', 'Afghan Rabab', 'Acoustic Cello', 'Meditative Ambient Strings', 'Traditional Percussion'],
    poeticExcerptOriginal: 'تم کب تک خاموش رہو گے؟\nدریاؤں کا گریہ ہے، پہاڑوں کی پکار ہے،\nمیزان کا امانت ہے، تخلیق کا وقار ہے۔\nکیا ذکر کرو گے جب گلزار نہ ہوں گے؟\nکیا سجدہ کرو گے جب آبشار نہ ہوں گے؟',
    poeticExcerptTranslation: 'How long will you remain silent?\nThe rivers weep, the mountains call out in grief;\nThe cosmic balance (Meezan) is a sacred trust (Amaanat), the dignity of all creation.\nWhat remembrance will you claim when the green gardens vanish?\nWhere will devotion stand when the living waterfalls are silenced?',
    ecologicalDossier: '"Kab Tak Khamosh?" is a cinematic three-part ecological kalam by Dr. Zarf-e-Noori that bridges classical Rishi-Sufi environmental consciousness with empirical crisis response. Through a mystical dialogue between the poet and Rabb, it directly addresses human negligence, pollution across Dal Lake, Wular Lake, and the Jhelum River, deforestation in mountain catchments, and desiccation of perennial springs. Invoking the foundational traditions of Lall Arifa, Sheikh Noorani (Nund Rishi), Shah-e-Hamadan, Zain-ud-Din Wali, and Baba Payam-ud-Din, it rejects passive grief and demands that silence be replaced by scientific vigilance, watershed custodianship, and generational accountability.',
    relatedScientificModules: [
      {
        title: 'Dal & Wular Lake Water Quality Telemetry',
        category: 'Limnology',
        href: '/water-systems/water-quality',
        description: 'Trophic status, dissolved oxygen saturation, and nutrient loading indices across regional freshwater bodies.'
      },
      {
        title: 'Jhelum River Basin & Riparian Conservation',
        category: 'Fluvial Hydrology',
        href: '/water-systems/rivers',
        description: 'Riverine discharge telemetry, flood channel stability, and riparian buffer zone degradation.'
      },
      {
        title: 'Forest Canopy & Deforestation Intelligence',
        category: 'Forest Ecology',
        href: '/biodiversity/forest-ecosystems',
        description: 'High-altitude canopy cover loss, soil erosion vulnerability, and mountain watershed protection.'
      }
    ],
    outdoorClassroomActivity: {
      activityTitle: 'Kashmir Environmental Silence vs. Action: Watershed Audit & Ecological Charter',
      recommendedTier: 'Senior Secondary & Youth Environmental Forums (15–20 Years)',
      curriculumLink: '/environmental-calendar/outdoor-classroom/curriculum',
      duration: '3.0 Hours Interactive Workshop & Field Audit',
      fieldHypothesis: 'Community environmental awareness and direct custodial stewardship increase when empirical water testing is paired with ethical responsibility toward the sacred trust (Amaanat) of creation.',
      materialsNeeded: [
        'Kashmir EcoWatch Water Quality Field Testing Kit (pH, Turbidity, DO)',
        'Riparian habitat degradation scorecards and GPS mapping devices',
        'Digital playback setup for "Kab Tak Khamosh?" (SufiPulse USA)',
        'Youth Amaanat Ecological Action Plan Worksheets'
      ],
      fieldworkMethod: '1. Conduct a physical and sensor-based audit of a local canal, riverbank, or wetland shoreline, documenting plastic accumulation and effluent points.\n2. Screen and listen to the three-part cinematic kalam "Kab Tak Khamosh?"\n3. Engage participants in structured reflection connecting empirical water quality with ethical responsibility.\n4. Formulate a local Youth Ecological Action Plan with measurable 90-day targets for riparian cleanup and community monitoring.',
      measurableLearningOutcome: 'Students quantify localized water quality impairment and translate ethical awareness into concrete community watershed conservation protocols.'
    },
    verifiedSufiPulseRelease: true,
    youtubeStats: {
      trackNumber: 6,
      duration: '14:53',
      views: '1K+',
      uploadedAge: '2026',
      playlistUrl: 'https://www.youtube.com/playlist?list=PLhu9NyNCTr7jRfvo6ktcYSayRtURCDVnM',
      channelName: 'SufiPulse USA',
      originalTitle: 'Kashmir, How Long Will You Remain Silent? | SufiPulse USA',
      videoId: 'wYFfuBS78ZI',
      thumbnailUrl: 'https://img.youtube.com/vi/wYFfuBS78ZI/hqdefault.jpg'
    }
  }
];

export const ECOVOICES_COLLABORATION_FRAMEWORK = {
  title: 'EcoVoices: Creative Expression Meets Scientific Stewardship',
  coFounders: ['Kashmir EcoWatch', 'SufiPulse USA'],
  sufiPulseRole: {
    title: 'Music Publisher & Cultural Arts Partner',
    description: 'SufiPulse USA (sufipulse.com) serves as the canonical publisher, composer, and rights holder for all musical works, lyrical arrangements, master recordings, and artistic media in the SufiPulse environmental music series. SufiPulse maintains absolute ownership and artistic autonomy over its musical releases.',
    responsibilities: [
      'Original music composition, studio production, and high-fidelity mastering',
      'Curation of authentic Sufi kalam, classical Kashmiri verses, and contemporary ecological lyrics',
      'Artisan and musical contributor rights management and digital licensing',
      'Publishing and hosting official audio/video media on sufipulse.com and international streaming platforms'
    ]
  },
  ecoWatchRole: {
    title: 'Environmental Arts Curation & Scientific Grounding Platform',
    description: 'Kashmir EcoWatch (kashmir-ecowatch.com) hosts EcoVoices as its independent creative expression platform, anchoring musical, poetic, visual, and cinematic works to verified Western Himalayan scientific data and field education.',
    responsibilities: [
      'Curating Environmental Music, Poetry, Cinema, Visual Arts, and Acoustic Heritage departments',
      'Scientific validation and pairing of creative works with hydrology, biodiversity, and cryosphere layers',
      'Bridging compositions with Outdoor Classroom field hypotheses and student worksheets',
      'Documenting regional creative practitioners with transparent evidence provenance',
      'Facilitating open, non-commercial creative submissions and youth ecological storytelling'
    ]
  },
  institutionalBoundary: 'Neither organization compromises its core mandate: SufiPulse USA remains an independent cultural music publisher, while Kashmir EcoWatch remains an uncompromised, non-commercial environmental intelligence and creative stewardship platform. No advertising, commercial promotion, or sponsored product placement compromises the integrity of either platform.'
};

export interface SufiPulseCreativePathway {
  id: string;
  name: string;
  title: string;
  canonicalUrl: string;
  roleType: 'contributor_application' | 'curated_publication';
  summary: string;
  detailedScope: string;
  primaryLanguages: string[];
  eligibleFormats: string[];
  sufiPulseRole: string;
  badgeLabel: string;
}

export const SUFIPULSE_CREATIVE_PATHWAYS: SufiPulseCreativePathway[] = [
  {
    id: 'writers',
    name: 'Ahl-e-Qalam',
    title: 'Writers & Poets',
    canonicalUrl: 'https://sufipulse.com/writers',
    roleType: 'contributor_application',
    badgeLabel: 'Application Open',
    summary: 'Develop original ecological songs, poetry, and lyrical compositions about glaciers, lakes, rivers, forests, and Western Himalayan stewardship.',
    detailedScope: 'Open to writers composing in Kashmiri, Urdu, English, Hindi, and regional dialects. Submissions can range from classical Kashmiri vakh/shruk idioms and Sufiana kalam to contemporary free verse and secular conservation anthems.',
    primaryLanguages: ['Kashmiri (Koshur)', 'Urdu', 'English', 'Hindi', 'Pahari / Shina / Balti'],
    eligibleFormats: ['Poem / Kalam', 'Song Lyrics', 'Choral Libretto', 'Spoken Word Script'],
    sufiPulseRole: 'Editorial review, lyrical refinement, composition commissioning, and rights agreements.'
  },
  {
    id: 'vocalists',
    name: 'Ahl-e-Sada',
    title: 'Vocalists & Singers',
    canonicalUrl: 'https://sufipulse.com/vocalists',
    roleType: 'contributor_application',
    badgeLabel: 'Auditions Open',
    summary: 'Interpret and record approved environmental compositions in contemporary, traditional, Sufiana, acoustic folk, and choral arrangements.',
    detailedScope: 'Vocal performers and soloists are invited to audition with a vocal sample or demo. Selected vocalists are matched with curated ecological poetry and recorded in studio for official release.',
    primaryLanguages: ['Kashmiri', 'Urdu', 'English', 'Multilingual'],
    eligibleFormats: ['Vocal Demo / Audio Sample', 'A cappella Recording', 'Studio Track'],
    sufiPulseRole: 'Vocal auditions, studio recording sessions, vocal production, and audio mastering.'
  },
  {
    id: 'producers',
    name: 'Ahl-e-Naghma',
    title: 'Producers & Composers',
    canonicalUrl: 'https://sufipulse.com/producers',
    roleType: 'contributor_application',
    badgeLabel: 'Commissioning Open',
    summary: 'Compose melodies, orchestrate instrumental arrangements, engineer soundscapes, and produce complete environmental musical works.',
    detailedScope: 'Open to music directors, studio arrangers, audio engineers, and sound designers skilled in blending Western Himalayan acoustic instruments with modern orchestral and ambient textures.',
    primaryLanguages: ['Universal Acoustic / Music'],
    eligibleFormats: ['Instrumental Demo', 'Full Arrangement Draft', 'Field Soundscape Composition'],
    sufiPulseRole: 'Studio infrastructure, master recording production, mixing, and digital distribution.'
  },
  {
    id: 'instrumentalists',
    name: 'Saaz-kaaran',
    title: 'Instrumentalists & Master Musicians',
    canonicalUrl: 'https://sufipulse.com/producers',
    roleType: 'contributor_application',
    badgeLabel: 'Performer Roster',
    summary: 'Distinct participation pathway for virtuosos of the Kashmiri Santoor, Rabab, Bansuri (bamboo flute), Saaz, Sarangi, percussion, and acoustic strings.',
    detailedScope: 'Inviting instrumental masters and emerging players to contribute acoustic tracks, organic meditative drones, and solo accompaniment for environmental songs.',
    primaryLanguages: ['Acoustic Instrumental'],
    eligibleFormats: ['Solo Instrumental Audio', 'Ensemble Recording', 'Acoustic Drone Sample'],
    sufiPulseRole: 'Session tracking, acoustic engineering, artist attribution, and performance licensing.'
  },
  {
    id: 'literary_contributors',
    name: 'Ahl-e-Tahreer',
    title: 'Literary Contributors & Essayists',
    canonicalUrl: 'https://sufipulse.com/literary-contributors',
    roleType: 'contributor_application',
    badgeLabel: 'Editorial Intake',
    summary: 'Author environmental essays, philosophical reflections on nature, indigenous ecological memory, and creative interpretations of science.',
    detailedScope: 'Connecting Western Himalayan field research with literary craft. Scholars, environmentalists, cultural historians, and thinkers write in-depth essays on valley ecology.',
    primaryLanguages: ['English', 'Urdu', 'Kashmiri'],
    eligibleFormats: ['Reflective Essay (1,000–3,500 words)', 'Ecological Memoir', 'Field Commentary'],
    sufiPulseRole: 'Literary editorial intake, peer critique, copyediting, and anthological curation.'
  },
  {
    id: 'literary_journal',
    name: 'Ahl-e-Tahreer Publication',
    title: 'Literary Journal & Ecological Archive',
    canonicalUrl: 'https://sufipulse.com/literary-journal',
    roleType: 'curated_publication',
    badgeLabel: 'Curated Publication Destination',
    summary: 'The official published journal showcasing selected poems, essays, and ecological critiques. (Note: A publishing destination, not an application role).',
    detailedScope: 'Once literary and poetic works complete editorial review, they are formally published in the SufiPulse Literary Journal with permanent archival attribution and educational citations.',
    primaryLanguages: ['Multilingual Edition'],
    eligibleFormats: ['Published Quarterly Volumes', 'Digital Archive Editions'],
    sufiPulseRole: 'Final volume design, ISBN/ISSN archival publication, and global reader distribution.'
  }
];

export interface EnvironmentalThemeRegistryItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  scopeSummary: string;
  scientificHref: string;
  kashmirContext: string;
  recommendedStyles: string[];
}

export const ECOVOICES_ENVIRONMENTAL_THEMES: EnvironmentalThemeRegistryItem[] = [
  {
    id: 'glaciers_snow',
    number: 'THEME-01',
    title: 'Glaciers, Cryosphere & Snowpack',
    subtitle: 'Headwaters of the Western Himalaya & Climate Sentinels',
    scopeSummary: 'Rapid ablation of Kolahoi and Machoi glaciers, retreating snowlines, and early spring melt runoff anomalies.',
    scientificHref: '/water-systems/glaciers',
    kashmirContext: 'Over 80% of Kashmir summer river flow originates from cryospheric melt. Poetic witness to vanishing snowfields.',
    recommendedStyles: ['Meditative Santoor Drones', 'Choral Requiem', 'Classical Kashmiri Lament']
  },
  {
    id: 'lakes_wetlands',
    number: 'THEME-02',
    title: 'Lakes & Wetlands (Dal, Wular, Nagin & Hokersar)',
    subtitle: 'Sacred Mirrors, Floating Gardens & Eutrophication Defense',
    scopeSummary: 'Nutrient loading (nitrate/phosphate), macrophyte choking, siltation of Wular, and houseboat untreated effluents.',
    scientificHref: '/water-systems/lakes',
    kashmirContext: 'Dal Lake is the cultural heart of Srinagar. Creative works evoke the sacred mirror of Hazratbal and riparian healing.',
    recommendedStyles: ['Sufiana Qalam', 'Acoustic Folk Anthems', 'Reflective Environmental Essays']
  },
  {
    id: 'rivers_springs',
    number: 'THEME-03',
    title: 'Rivers & Springs (Jhelum & Sacred Nagas)',
    subtitle: 'Kashmir Lifeline, Floodplain Memory & Karst Aquifers',
    scopeSummary: 'Reduced carrying capacity of the Jhelum (Vyeth), riverbed gravel mining, and degradation of village freshwater springs.',
    scientificHref: '/water-systems/rivers',
    kashmirContext: 'From Verinag spring through Srinagar to the Baramulla gorge, the Jhelum carries three millennia of literary memory.',
    recommendedStyles: ['Sufi River Laments', 'Rabab & Flute Ballads', 'Oral History Narratives']
  },
  {
    id: 'forests_trees',
    number: 'THEME-04',
    title: 'Forests & Heritage Trees (Fir, Deodar & Chinar)',
    subtitle: 'Old-Growth Subalpine Canopies & The Living Shrines of Kashmir',
    scopeSummary: 'Abies pindrow and Pinus wallichiana canopy density, treeline shifts, and legal protection of mature heritage Chinars.',
    scientificHref: '/protected-network',
    kashmirContext: 'Sheikh Noor-ud-Din declared "Ann Poshi Teli Yeli Van Poshi" (Food will thrive only while forests thrive).',
    recommendedStyles: ['Classical Kashmiri Shruks', 'Wind Harmonics', 'Contemporary Eco-Poetry']
  },
  {
    id: 'biodiversity_wildlife',
    number: 'THEME-05',
    title: 'Biodiversity & Endangered Wildlife',
    subtitle: 'Hangul Deer, Western Tragopan & Western Himalayan Ichthyofauna',
    scopeSummary: 'Critical winter habitat in Dachigam for Cervus hanglu hanglu, high-altitude pheasant nesting, and native snow trout.',
    scientificHref: '/biodiversity',
    kashmirContext: 'Hangul is the state animal and Western Himalayan icon, surviving under intensive habitat fragmentation.',
    recommendedStyles: ['Storytelling Songs', 'Youth Chants', 'Nature Ballads']
  },
  {
    id: 'climate_change',
    number: 'THEME-06',
    title: 'Climate Change & Alpine Vulnerability',
    subtitle: 'Shifting Precipitation, Warmer Winters & Mountain Risk',
    scopeSummary: 'Thermal satellite analysis of microclimates, winter drought spikes (Chilai Kalan disruptions), and erratic hail cycles.',
    scientificHref: '/hazard-intelligence',
    kashmirContext: 'Kashmir apple orchards and saffron terraces are already experiencing altered phenological flowering windows.',
    recommendedStyles: ['Contemporary Spoken Word', 'Modern Acoustic Song', 'Scientific Poetry']
  },
  {
    id: 'pollution_waste',
    number: 'THEME-07',
    title: 'Pollution, Toxic Effluents & Solid Waste',
    subtitle: 'Downtown Srinagar Drainage, Industrial Mordants & Plastic Litter',
    scopeSummary: 'Untreated municipal stormwater channels, chemical dye effluents in downtown canals, and single-use plastic clogging.',
    scientificHref: '/environmental-monitoring/plastic-pollution',
    kashmirContext: 'Urban tributaries like Doodh Ganga and Khushalsar suffer from heavy localized anthropogenic contamination.',
    recommendedStyles: ['Protest Poetry', 'Fast-Paced Percussive Songs', 'Youth Spoken Word']
  },
  {
    id: 'ecological_restoration',
    number: 'THEME-08',
    title: 'Ecological Restoration & Nature-Based Solutions',
    subtitle: 'Willow-Reed Root Enclosures, Wetland Dredging & Reforestation',
    scopeSummary: 'Community soil bio-engineering, native riparian planting (Salix, Phragmites), and spring recharge protection.',
    scientificHref: '/water-systems/restoration',
    kashmirContext: 'Restoring historic flood spill channels and wetland retention buffers to protect Srinagar from catastrophic floods.',
    recommendedStyles: ['Inspirational Anthem', 'Community Choir Songs', 'Educational Lyrics']
  },
  {
    id: 'environmental_ethics',
    number: 'THEME-09',
    title: 'Environmental Ethics, Mysticism & Sacred Custody',
    subtitle: 'Lalleshwari Vakhs, Sufi Ecological Principles & Universal Responsibility',
    scopeSummary: 'The moral imperatives of stewardship: water as a living legal witness ("Aab-e-Hayat") and intergenerational equity.',
    scientificHref: '/environmental-calendar',
    kashmirContext: 'Centuries of syncretic Kashmiri philosophy rooted in profound environmental reverence across all communities.',
    recommendedStyles: ['Sacred Kalam', 'Sufiana Symphony', 'Philosophical Essays']
  },
  {
    id: 'himalayan_heritage',
    number: 'THEME-10',
    title: 'Western Himalayan Living Heritage & Seasons',
    subtitle: 'Traditional Water Mills, Agrarian Seasons & Nomadic Pastoralism',
    scopeSummary: 'The seasonal rhythms of Kashmir: Navreh, Badamwari bloom, Harud harvest, Wandha winter, and pastoral high-altitude migrations.',
    scientificHref: '/protected-network/trails-and-sightings',
    kashmirContext: 'Gujjars, Bakarwals, and valley agrarians whose lives are intricately woven into mountain seasonal phenology.',
    recommendedStyles: ['Folk Songs (Wanwun)', 'Rabab & Daf Ballads', 'Cultural Memoirs']
  }
];

export const YOUTH_ECOVOICES_FRAMEWORK = {
  title: 'Youth EcoVoices: Schools, Colleges & Young Artists',
  tagline: 'Empowering the next generation of Western Himalayan environmental storytellers',
  ageGroups: [
    { tier: 'Junior Eco-Chant (Ages 8–12)', format: 'Classroom nature poems, school choir chants, riparian memory sketches' },
    { tier: 'Youth Anthems (Ages 13–18)', format: 'Original acoustic songs, spoken word poetry, river quality field memoirs' },
    { tier: 'University & Collegiate (Ages 18–25)', format: 'In-depth essays, short environmental films, full instrumental compositions' }
  ],
  guardianSafeguardPolicy: 'All submissions from participants under 18 years of age must be submitted under the supervision of a verified school teacher, academic principal, or legal guardian. Student contact details are kept strictly confidential and will never be published or shared commercially.',
  educationalIntegration: 'Selected youth works are featured on EcoVoices, highlighted during Kashmir Environmental Calendar observances, and paired with Outdoor Classroom field science lessons.'
};
