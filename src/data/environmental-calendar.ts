/**
 * Kashmir EcoWatch Environmental Calendar
 * 2026 Comprehensive Verification & Scientific Audit
 * 
 * Audit Standards Applied:
 * - United Nations General Assembly Observances & Specialized Agencies (FAO, UNEP, UNESCO, UNDRR)
 * - Government of India Official Schedules (MoEFCC, National Board for Wildlife, DST, AWBI)
 * - ICOMOS International Charter
 * - Western Himalayan Basin Hydrology, Ramsar Information Sheets, and Peer-Reviewed Atmospheric Physics
 * - Strict Archival Boundary: Historical organizational claims tagged as "Documentation Pending" until primary records are indexed.
 */

export interface StudentActionGuide {
  overview: string;
  classroomActivities: string[];
  fieldTripIdeas: string[];
  studentProjectTopics: string[];
  recommendedStudentLevels: string[];
}

export type ObservanceAuthority =
  | 'United Nations (UN GA)'
  | 'Government of India (MoEFCC / DST / AWBI)'
  | 'ICOMOS & UNESCO'
  | 'Regional Scientific Initiative';

export type DateRuleType =
  | 'Fixed Calendar Date'
  | 'Annual Date Range'
  | 'First Monday in October (Dynamic)';

export type VerificationStatusType =
  | 'Verified International Observance'
  | 'Verified National Observance'
  | 'Official Observance — Regional Historical Claim Pending Documentation';

export interface EnvironmentalEvent {
  id: string;
  month: string;
  monthNumber: number; // 1 - 12
  day: string; // e.g. "2", "14–30", "1–7", "2–8", "13"
  startDay: number;
  endDay: number;
  officialDate: string;
  dateRule: DateRuleType;
  observanceAuthority: ObservanceAuthority;
  officialSourceURL: string;
  verificationStatus: VerificationStatusType;
  kashmirFocus: string;
  historicalEvidence: string;
  lastReviewed: string;
  title: string;
  tagline: string;
  category: 'Biodiversity & Wildlife' | 'Water & Wetlands' | 'Climate & Atmosphere' | 'Forests & Heritage' | 'Civic & Disaster Preparedness';
  scope: 'Global & Regional' | 'Kashmir Specific' | 'Himalayan Focus';
  significance: string;
  historicalContext: string;
  studentActionGuide: StudentActionGuide;
  linkedPlatformRoute: string;
  linkedModuleLabel: string;
  iconName: string;
  accentGradient: string;
}

/**
 * Calculates the first Monday of October for any given year.
 * UN General Assembly Resolution 40/202 A (1985) establishes World Habitat Day
 * as the first Monday of October.
 */
export function getFirstMondayOfOctober(year: number = 2026): number {
  const oct1 = new Date(year, 9, 1); // 9 = October (0-indexed)
  const dayOfWeek = oct1.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const daysToAdd = (8 - dayOfWeek) % 7;
  return 1 + daysToAdd;
}

const HABITAT_DAY_2026 = getFirstMondayOfOctober(2026); // Returns 5 for 2026

export const environmentalCalendarEvents: EnvironmentalEvent[] = [
  {
    id: 'animal-welfare-fortnight',
    month: 'January',
    monthNumber: 1,
    day: '14–30',
    startDay: 14,
    endDay: 30,
    officialDate: 'January 14–30',
    dateRule: 'Annual Date Range',
    observanceAuthority: 'Government of India (MoEFCC / DST / AWBI)',
    officialSourceURL: 'http://awbi.gov.in',
    verificationStatus: 'Official Observance — Regional Historical Claim Pending Documentation',
    kashmirFocus: 'Humane winter assistance during Chillai Kalan freezes, migratory bird protection, feral animal welfare in snowbound districts, and equine health.',
    historicalEvidence: 'Historical claim; 2004–2007 CWPR activity logs pending primary archival indexing.',
    lastReviewed: 'November 2026 Audit',
    title: 'Animal Welfare Fortnight',
    tagline: 'Compassion, Winter Habitat Care & Native Himalayan Fauna Protection',
    category: 'Biodiversity & Wildlife',
    scope: 'Himalayan Focus',
    significance: 'Dedicated two-week national campaign instituted by the Animal Welfare Board of India (AWBI). In the Western Himalayas, it highlights compassionate coexistence, anti-poaching vigilance, and humane winter assistance for birds and working animals stranded during sub-zero Chillai Kalan freezes.',
    historicalContext: 'Formally recorded in organizational accounts as observed by the Council for Wildlife Protection & Research (CWPR / ESRO) since 2004, prioritizing winter feeding buffer zones in lower Dachigam. [Historical claim, documentation pending archival verification].',
    studentActionGuide: {
      overview: 'Students lead local wildlife care circles, install winter seed feeders for resident passerines, and document urban human-wildlife encounters during freezing spells.',
      classroomActivities: [
        'Organize an essay and poster exhibition on "Coexisting with Winter Fauna in Kashmir".',
        'Build recycled bird feeding stations using pine cones, suet, and millet.',
        'Study wildlife protection legislation (Schedule I taxa under Wildlife Protection Act).'
      ],
      fieldTripIdeas: [
        'Excursion to Dachigam National Park lower gates to observe wintering deer behavior.',
        'Visit a local veterinary dispensary to learn about winter care for domestic and working equines.'
      ],
      studentProjectTopics: [
        'Census of urban wintering birds around school campuses in Srinagar and district towns.',
        'Investigating feral dog pack dynamics around wildlife boundary buffer zones.'
      ],
      recommendedStudentLevels: ['Primary (Classes 1-5)', 'Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/biodiversity/mammals',
    linkedModuleLabel: 'Mammals Intelligence',
    iconName: 'PawPrint',
    accentGradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'world-wetlands-day',
    month: 'February',
    monthNumber: 2,
    day: '2',
    startDay: 2,
    endDay: 2,
    officialDate: 'February 2',
    dateRule: 'Fixed Calendar Date',
    observanceAuthority: 'United Nations (UN GA)',
    officialSourceURL: 'https://www.ramsar.org/world-wetlands-day',
    verificationStatus: 'Verified International Observance',
    kashmirFocus: 'Hokersar (Ramsar Site #1570, 1,354 ha), Wular (18,900 ha), Shallabugh, and Hygam reserves sustaining millions of Central Asian Flyway waterfowl.',
    historicalEvidence: 'Annual waterbird censuses documented in university and wildlife department records; early ESRO audit reports pending archival compilation.',
    lastReviewed: 'November 2026 Audit',
    title: 'World Wetlands Day',
    tagline: 'Ramsar Wetland Stewardship & Migratory Waterfowl Basins',
    category: 'Water & Wetlands',
    scope: 'Global & Regional',
    significance: 'Commemorates the 1971 Ramsar Convention on Wetlands (endorsed by UN GA Resolution 75/317). In Kashmir, it honors the officially designated Ramsar sites: Hokersar Wetland Reserve (1,354 hectares / 13.54 km² under Ramsar Information Sheet RIS #1570, with seasonal high-water inundation historically reaching up to 13.75 km²), Wular Lake (18,900 ha), Shallabugh, and Hygam, which sustain millions of migratory waterfowl along the Central Asian Flyway.',
    historicalContext: 'A cornerstone annual event in Kashmir environmental education since 2002. ESRO and local universities conducted annual waterbird censuses and wetland health audits. [Field reports pending unified archival cataloging].',
    studentActionGuide: {
      overview: 'Students explore the ecological sponges of the Valley that buffer catastrophic floods and support wintering geese, teal, and pintails.',
      classroomActivities: [
        'Map the Central Asian Flyway route from Siberia through Ladakh and Kashmir Valley.',
        'Laboratory session measuring dissolved oxygen and pH in school-collected pond water.',
        'Quiz on Ramsar convention criteria and migratory duck identification.'
      ],
      fieldTripIdeas: [
        'Birdwatching transect at Hokersar or Shallabugh Wetland Reserve with binoculars and spotting scopes.',
        'Wular Lake shoreline tour to understand siltation, willow plantation impacts, and de-weeding.'
      ],
      studentProjectTopics: [
        'Comparative study of water quality in natural marsh vs. urbanized drain inlets.',
        'Checklist of 20 common wintering waterfowl with local Kashmiri names (*Tech*, *Batekh*).'
      ],
      recommendedStudentLevels: ['Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/water-systems/wetlands',
    linkedModuleLabel: 'Wetlands Intelligence',
    iconName: 'Waves',
    accentGradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'national-science-day',
    month: 'February',
    monthNumber: 2,
    day: '28',
    startDay: 28,
    endDay: 28,
    officialDate: 'February 28',
    dateRule: 'Fixed Calendar Date',
    observanceAuthority: 'Government of India (MoEFCC / DST / AWBI)',
    officialSourceURL: 'https://dst.gov.in',
    verificationStatus: 'Verified National Observance',
    kashmirFocus: 'Himalayan cryospheric science, automated weather station networks, glacier ablation telemetry, and environmental chemistry.',
    historicalEvidence: 'Documented in Indian Department of Science and Technology records since 1986; eIEN Kashmir science fair archives indexed.',
    lastReviewed: 'November 2026 Audit',
    title: 'National Science Day',
    tagline: 'Empirical Ecological Inquiry, Climate Science & Remote Sensing',
    category: 'Civic & Disaster Preparedness',
    scope: 'Global & Regional',
    significance: 'Designated by the Government of India in 1986 to commemorate the discovery of the Raman Effect by Sir C.V. Raman. In Kashmir, it focuses student inquiry on Western Himalayan environmental physics, hydrology, satellite remote sensing, and cryosphere sciences.',
    historicalContext: 'Promoted by eIEN Kashmir Environmental Information System (EIS) to bridge empirical laboratory instrumentation with high-school student science fairs. [Science outreach archives indexed].',
    studentActionGuide: {
      overview: 'Transform student curiosity into scientific hypothesis testing using environmental data, weather station records, and soil testing kits.',
      classroomActivities: [
        'School Environmental Science Fair featuring solar cookers, rainwater harvesting models, and watershed dioramas.',
        'Hands-on demonstration of Secchi disk water transparency measurement.',
        'Data analysis session graphing historical snow cover records from Kashmir EcoWatch.'
      ],
      fieldTripIdeas: [
        'Visit to SKUAST-K Shalimar or University of Kashmir Environmental Science laboratories.',
        'Tour of IMD Srinagar Meteorological Centre automated weather radar.'
      ],
      studentProjectTopics: [
        'Investigating the thermal heat island effect in downtown Srinagar using infrared thermometers.',
        'Analyzing microplastic presence in bottled vs. municipal tap water samples.'
      ],
      recommendedStudentLevels: ['Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/library',
    linkedModuleLabel: 'Research Library & Science',
    iconName: 'FlaskConical',
    accentGradient: 'from-purple-500 to-violet-600'
  },
  {
    id: 'international-day-of-forests',
    month: 'March',
    monthNumber: 3,
    day: '21',
    startDay: 21,
    endDay: 21,
    officialDate: 'March 21',
    dateRule: 'Fixed Calendar Date',
    observanceAuthority: 'United Nations (UN GA)',
    officialSourceURL: 'https://www.fao.org/international-day-of-forests',
    verificationStatus: 'Verified International Observance',
    kashmirFocus: 'Temperate coniferous belts of Deodar (*Cedrus deodara*), Kail (*Pinus wallichiana*), Fir (*Abies pindrow*), and Birch (*Betula utilis*) stabilizing mountain slopes.',
    historicalEvidence: 'UN General Assembly Resolution 67/200; CFPR / ESRO seed-ball distribution claims pending register verification.',
    lastReviewed: 'November 2026 Audit',
    title: 'International Day of Forests',
    tagline: 'Temperate Conifers, Subalpine Birch & Ridge Stability',
    category: 'Forests & Heritage',
    scope: 'Global & Regional',
    significance: 'Officially proclaimed as the International Day of Forests by the UN General Assembly in 2012 (Resolution 67/200; historically observed as World Forestry Day by FAO since 1971). Celebrates the temperate coniferous belts of Deodar (*Cedrus deodara*), Kail (*Pinus wallichiana*), Fir (*Abies pindrow*), and Birch (*Betula utilis*) that protect fragile Himalayan watersheds from severe erosion.',
    historicalContext: 'Organized under the Council for Forest Protection & Research (CFPR / ESRO) with school-led seed-ball dispersal along degraded Pir Panjal slopes. [Historical claim, documentation pending archival verification].',
    studentActionGuide: {
      overview: 'Students investigate canopy density, tree ring dendrochronology, soil retention, and forest regeneration.',
      classroomActivities: [
        'Conifer cone collection, seed extraction, and seed-ball making workshop.',
        'Lecture and botanical drawing on the stratified layers of Kashmir temperate forests.',
        'School tree plantation drive focusing on native deodar and horse chestnut saplings.'
      ],
      fieldTripIdeas: [
        'Guided nature trail through Tangmarg coniferous forest or Shankracharya Reserve Forest.',
        'Field visit to a State Forest Research Institute nursery to observe sapling grafting.'
      ],
      studentProjectTopics: [
        'Survey of tree species diversity and canopy cover within 1 km radius of school campus.',
        'Documenting traditional Kashmiri forest products and their sustainable utilization.'
      ],
      recommendedStudentLevels: ['Primary (Classes 1-5)', 'Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/biodiversity/forest-ecosystems',
    linkedModuleLabel: 'Forest Ecosystems',
    iconName: 'Trees',
    accentGradient: 'from-emerald-500 to-green-600'
  },
  {
    id: 'world-water-day',
    month: 'March',
    monthNumber: 3,
    day: '22',
    startDay: 22,
    endDay: 22,
    officialDate: 'March 22',
    dateRule: 'Fixed Calendar Date',
    observanceAuthority: 'United Nations (UN GA)',
    officialSourceURL: 'https://www.worldwaterday.org',
    verificationStatus: 'Verified International Observance',
    kashmirFocus: 'River Jhelum basin hydrology, seasonal snowmelt, Greater Himalayan/Pir Panjal glacial replenishment (Kolahoi basin), and karst spring recharge.',
    historicalEvidence: 'UN GA Resolution 47/193; 2005–2007 audit of 150+ historic springs cited in eIEN bulletins pending primary dataset publication.',
    lastReviewed: 'November 2026 Audit',
    title: 'World Water Day',
    tagline: 'Springsheds, Glacial Runoff & Jhelum River Basin Health',
    category: 'Water & Wetlands',
    scope: 'Global & Regional',
    significance: 'Established by UN General Assembly Resolution 47/193 in 1993. Highlights the critical freshwater security of the Kashmir Valley. The River Jhelum basin is fed by precipitation, seasonal snowmelt, Greater Himalayan and Pir Panjal glaciers (including the Kolahoi glacier system), and thousands of perennial karst groundwater springs (*Naags*). Trans-Himalayan ranges like the Karakoram drain northward and eastward into the Indus and Shyok systems, rather than directly into the Kashmir Valley\'s Jhelum basin.',
    historicalContext: 'Core annual fixture in eIEN Kashmir and ESRO programs, including a reported survey of 150+ historic springs in Anantnag, Pulwama, and Srinagar between 2005 and 2007. [Historical claim, documentation pending archival verification].',
    studentActionGuide: {
      overview: 'Students audit community water taps, trace the source of drinking water from catchment to tap, and protect local natural springs from plastic dumping.',
      classroomActivities: [
        'Home water audit: Students calculate per capita daily household water consumption.',
        'Interactive filtration experiment comparing sand, charcoal, and gravel media.',
        'Creative poetry and debate competition on "Water: Kashmir\'s Greatest Ecological Heritage".'
      ],
      fieldTripIdeas: [
        'Field inspection of historic springs in Verinag, Mattan, or Achabal Mughal garden aqueducts.',
        'Visit to Harwan reservoir and intake filtration plant supplying Srinagar City.'
      ],
      studentProjectTopics: [
        'Chemical testing of nitrate and phosphate runoff in springs adjacent to apple orchards.',
        'Mapping abandoned or choked springs in rural hamlets and drafting restoration proposals.'
      ],
      recommendedStudentLevels: ['Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/water-systems/springs',
    linkedModuleLabel: 'Springs & Aquifers',
    iconName: 'Droplets',
    accentGradient: 'from-sky-500 to-cyan-600'
  },
  {
    id: 'world-heritage-day',
    month: 'April',
    monthNumber: 4,
    day: '18',
    startDay: 18,
    endDay: 18,
    officialDate: 'April 18',
    dateRule: 'Fixed Calendar Date',
    observanceAuthority: 'ICOMOS & UNESCO',
    officialSourceURL: 'https://www.icomos.org/en/what-we-do/disseminating-knowledge/international-day-for-monuments-and-sites',
    verificationStatus: 'Verified International Observance',
    kashmirFocus: 'Living bio-cultural heritage: centuries-old Oriental Plane (*Platanus orientalis* / *Booni*) trees, historic spring sanctums, and water architecture.',
    historicalEvidence: 'Approved by UNESCO 22nd General Conference (1983) upon ICOMOS 1982 proposal; CCN Chinar census registers pending archival digitization.',
    lastReviewed: 'November 2026 Audit',
    title: 'International Day for Monuments and Sites (World Heritage Day)',
    tagline: 'Heritage Chinar Trees (Booni), Karst Springs & Cultural Ecology',
    category: 'Forests & Heritage',
    scope: 'Kashmir Specific',
    significance: 'Proposed by the International Council on Monuments and Sites (ICOMOS) in 1982 and approved by the UNESCO General Conference in 1983. In Kashmir, it honors living bio-cultural heritage: centuries-old Oriental Plane (*Platanus orientalis* / *Booni*) trees planted during Sultanate and Mughal eras, sacred karst springs, historic Mughal water channels, and vernacular wooden architecture.',
    historicalContext: 'Marked the anniversary of the Chinar Conservation Network (CCN / ESRO) 2006 census of heritage trees and preservation advocacy against illicit felling. [Historical claim, documentation pending archival verification].',
    studentActionGuide: {
      overview: 'Students connect Kashmir\'s cultural poetry, architecture, and folklore with botanical giants and ancient hydraulic engineering.',
      classroomActivities: [
        'Adopt-a-Chinar campaign: Students measure tree girth, canopy diameter, and document hollows.',
        'Art exhibition featuring Chinar leaf watercolors and calligraphy of Lal Ded & Habba Khatoon.',
        'Historical reading of Jahangir\'s memoirs regarding Harwan and Shalimar irrigation channels.'
      ],
      fieldTripIdeas: [
        'Heritage walk through Char Chinar (Ropa Lank) on Dal Lake and Naseem Bagh ancient university campus.',
        'Visit to historic Chenar-e-Peer at Bijbehara, the oldest recorded Chinar tree in Kashmir.'
      ],
      studentProjectTopics: [
        'GPS tagging and health index scoring of 10 heritage Chinar trees in the local neighborhood.',
        'Investigating bacterial and fungal rot (*Anthracnose*) affecting urban Chinar canopies.'
      ],
      recommendedStudentLevels: ['Primary (Classes 1-5)', 'Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/protected-network/conservation-reserves',
    linkedModuleLabel: 'Heritage & Reserves',
    iconName: 'Shield',
    accentGradient: 'from-amber-600 to-yellow-600'
  },
  {
    id: 'world-earth-day',
    month: 'April',
    monthNumber: 4,
    day: '22',
    startDay: 22,
    endDay: 22,
    officialDate: 'April 22',
    dateRule: 'Fixed Calendar Date',
    observanceAuthority: 'United Nations (UN GA)',
    officialSourceURL: 'https://www.un.org/en/observances/earth-day',
    verificationStatus: 'Verified International Observance',
    kashmirFocus: 'Valley-wide anti-polythene student mobilization, riverbank cleanups, and waste audits in sensitive tourist hill stations.',
    historicalEvidence: 'UN GA Resolution 63/278 designating International Mother Earth Day; contemporary local press coverage of ESRO 2003 student rallies.',
    lastReviewed: 'November 2026 Audit',
    title: 'Earth Day / International Mother Earth Day',
    tagline: 'Valley-Wide Cleanups, Zero-Waste Living & Planet vs. Plastics',
    category: 'Civic & Disaster Preparedness',
    scope: 'Global & Regional',
    significance: 'Originating in 1970 and formally designated by the United Nations General Assembly in 2009 as International Mother Earth Day (Resolution 63/278). In Kashmir, it mobilizes hundreds of educational institutions to combat single-use non-biodegradable plastics and restore communal slopes.',
    historicalContext: 'Spearheaded by ESRO since 2003 with student rallies in Lal Chowk and Dal Lake shikara cleanup flotillas. [Archived press clippings indexed; full photographic register pending digitization].',
    studentActionGuide: {
      overview: 'Lead direct hands-on cleanup actions, institutional waste segregation, and community outreach on ending non-biodegradable waste accumulation.',
      classroomActivities: [
        'Campus-wide plastic audit: Weigh all single-use plastics discarded in school over one week.',
        'Setup of a school vermicomposting pit for organic cafeteria and dry-leaf waste.',
        'Pledge-signing drive committing student households to eliminate plastic shopping bags.'
      ],
      fieldTripIdeas: [
        'Dal Lake or Doodhganga stream cleanup drive equipped with gloves, biodegradable bags, and rakes.',
        'Visit to Srinagar Municipal Corporation Achan Landfill / waste-to-energy facility.'
      ],
      studentProjectTopics: [
        'Assessing the rate of organic degradation in subalpine soils compared to poly-laminate wrappers.',
        'Designing zero-waste school lunchbox models and encouraging reusable fabric packaging.'
      ],
      recommendedStudentLevels: ['Primary (Classes 1-5)', 'Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/environmental-monitoring/solid-waste',
    linkedModuleLabel: 'Waste Monitoring',
    iconName: 'Globe',
    accentGradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'biological-diversity-day',
    month: 'May',
    monthNumber: 5,
    day: '22',
    startDay: 22,
    endDay: 22,
    officialDate: 'May 22',
    dateRule: 'Fixed Calendar Date',
    observanceAuthority: 'United Nations (UN GA)',
    officialSourceURL: 'https://www.cbd.int/idb/',
    verificationStatus: 'Verified International Observance',
    kashmirFocus: 'Over 120 endemic medicinal plant taxa (*Saussurea*, *Arnebia*), Hangul deer calving season, and Palearctic-Oriental transition biodiversity.',
    historicalEvidence: 'UN GA Resolution 55/201 commemorating adoption of the text of the Convention on Biological Diversity (22 May 1992); eIEN BCN dossiers.',
    lastReviewed: 'November 2026 Audit',
    title: 'International Day for Biological Diversity',
    tagline: 'Endemic Species, Ethnobotany & Spring Montane Awakening',
    category: 'Biodiversity & Wildlife',
    scope: 'Global & Regional',
    significance: 'Officially designated by the United Nations General Assembly on May 22 (Resolution 55/201) to commemorate the adoption of the agreed text of the Convention on Biological Diversity (Nairobi, 22 May 1992). In Kashmir, late May marks peak spring emergence, montane wildflowers, and alpine ecosystem revitalization across Pir Panjal slopes.',
    historicalContext: 'Annual benchmark for eIEN Kashmir Biodiversity Conservation Network (BCN) publications and student biodiversity report cards. [Biodiversity working papers indexed].',
    studentActionGuide: {
      overview: 'Students celebrate Kashmir\'s unique biogeographic position at the crossroads of Palearctic and Oriental realms, with over 120 endemic medicinal herbs and iconic caprines.',
      classroomActivities: [
        'Creating an "Endangered Species Red List" bulletin board for the school corridor.',
        'Workshop on traditional Kashmiri ethnobotany: *Kuth*, *Banafsha*, *Patis*, and *Dhoop*.',
        'Spring bird nesting checklist synthesis: Documenting breeding plumage and territorial calls.'
      ],
      fieldTripIdeas: [
        'Spring botanical garden visit to study blossoming angiosperms and subalpine shrubs.',
        'Excursion to Dachigam or Overa-Aru sanctuary for spring wildlife telemetry.'
      ],
      studentProjectTopics: [
        'Documenting traditional herbal remedies used by village elders for wellness.',
        'School campus mini-bioblitz cataloging all flowering herbs and pollinator insects.'
      ],
      recommendedStudentLevels: ['Primary (Classes 1-5)', 'Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/biodiversity/threatened-species',
    linkedModuleLabel: 'Priority Biodiversity',
    iconName: 'Leaf',
    accentGradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'world-environment-day',
    month: 'June',
    monthNumber: 6,
    day: '5',
    startDay: 5,
    endDay: 5,
    officialDate: 'June 5',
    dateRule: 'Fixed Calendar Date',
    observanceAuthority: 'United Nations (UN GA)',
    officialSourceURL: 'https://www.worldenvironmentday.global',
    verificationStatus: 'Verified International Observance',
    kashmirFocus: 'Valley-wide school environmental summits, eco-club awards, and baseline state-of-environment evaluations.',
    historicalEvidence: 'UN GA Resolution 2994 (XXVII) of 1972 (Stockholm Conference opening day); university and school event registers documented.',
    lastReviewed: 'November 2026 Audit',
    title: 'World Environment Day',
    tagline: 'The Apex UN Environmental Observance Across All School Hubs',
    category: 'Civic & Disaster Preparedness',
    scope: 'Global & Regional',
    significance: 'Established by the UN General Assembly in 1972 on the first day of the Stockholm Conference on the Human Environment (Resolution 2994 (XXVII)). The premier global platform for public outreach, celebrated universally across educational institutes in Jammu & Kashmir in partnership with academic and governmental bodies.',
    historicalContext: 'Celebrated annually by ESRO, universities, and schools with Valley-wide environmental conclaves, awards for eco-clubs, and annual state-of-environment reporting. [Student awards registers archived].',
    studentActionGuide: {
      overview: 'The highlight of the academic environmental calendar, culminating in major school symposia, dramatic presentations, community pledges, and action marathons.',
      classroomActivities: [
        'Inter-school debate competition on "Climate Adaptation Strategies for Himalayan Valleys".',
        'Student drama and street theatre (*Nukkad Natak*) on water conservation and forest fires.',
        'Exhibition of student scientific models, eco-innovations, and wildlife photography.'
      ],
      fieldTripIdeas: [
        'Eco-rally through town centers carrying banners to spread environmental awareness.',
        'Joint university-school ecological workshop at Dachigam or Overa-Aru Sanctuary.'
      ],
      studentProjectTopics: [
        'Publishing a school "Eco-Gazette" or Wall Magazine compiling student environmental articles.',
        'School carbon footprint assessment: electricity, heating fuel, and transport emissions.'
      ],
      recommendedStudentLevels: ['Primary (Classes 1-5)', 'Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/ngo-impact',
    linkedModuleLabel: 'NGO Impact & Action',
    iconName: 'Leaf',
    accentGradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'world-combat-desertification',
    month: 'June',
    monthNumber: 6,
    day: '17',
    startDay: 17,
    endDay: 17,
    officialDate: 'June 17',
    dateRule: 'Fixed Calendar Date',
    observanceAuthority: 'United Nations (UN GA)',
    officialSourceURL: 'https://www.unccd.int/events/desertification-and-drought-day',
    verificationStatus: 'Verified International Observance',
    kashmirFocus: 'Protection of ancient Pleistocene Karewa (*Wudur*) plateaus from clay excavation, soil erosion, and saffron land conversion.',
    historicalEvidence: 'UN GA Resolution 49/115 of 1994; ESRO 2007 State Environmental Impact Assessment report pending document indexing.',
    lastReviewed: 'November 2026 Audit',
    title: 'Desertification and Drought Day',
    tagline: 'Karewa Terraces Protection, Soil Erosion & Watershed Stabilization',
    category: 'Forests & Heritage',
    scope: 'Himalayan Focus',
    significance: 'Proclaimed by the UN General Assembly in 1994 (Resolution 49/115) to mark the adoption of the UN Convention to Combat Desertification (UNCCD). Focuses on soil conservation and the protection of Kashmir\'s ancient Pleistocene Karewa (*Wudur*) plateaus from destructive clay excavation and uncontrolled topsoil loss.',
    historicalContext: 'Championed in the ESRO 2007 State Environmental Impact Assessment report to highlight karewa destruction in Budgam and Pulwama for construction fill. [Historical claim, documentation pending archival verification].',
    studentActionGuide: {
      overview: 'Students study soil chemistry, karewa sediment layers, saffron soil fertility, and slope stabilization through bio-engineering with vetiver and willow cuttings.',
      classroomActivities: [
        'Sediment jar test: Shake garden soil with water in a glass jar to observe sand, silt, and clay strata.',
        'Lecture on the geological history of the ancient lake that created the Kashmir Valley.',
        'Workshop on vegetative soil cover and its role in preventing hillside washouts.'
      ],
      fieldTripIdeas: [
        'Field observation of Karewa formations in Pampore, Pattan, or Charar-i-Sharief.',
        'Inspection of a degraded ravine stabilized by check-dams and contour planting.'
      ],
      studentProjectTopics: [
        'Comparative soil moisture and organic carbon measurement in natural vs. excavated karewa soils.',
        'Assessing the impact of topsoil loss on saffron corm productivity in Pulwama district.'
      ],
      recommendedStudentLevels: ['Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/hazard-intelligence',
    linkedModuleLabel: 'Landslide & Soil Risk',
    iconName: 'Mountain',
    accentGradient: 'from-amber-500 to-orange-700'
  },
  {
    id: 'vanmahotsava-week',
    month: 'July',
    monthNumber: 7,
    day: '1–7',
    startDay: 1,
    endDay: 7,
    officialDate: 'July 1–7',
    dateRule: 'Annual Date Range',
    observanceAuthority: 'Government of India (MoEFCC / DST / AWBI)',
    officialSourceURL: 'https://moef.gov.in',
    verificationStatus: 'Official Observance — Regional Historical Claim Pending Documentation',
    kashmirFocus: 'Temperate Western Himalayan tree planting; emphasizes aftercare survival over raw sapling totals; cautions against summer planting without irrigation.',
    historicalEvidence: 'Initiated nationally in 1950 by K.M. Munshi; claimed 20,000+ sapling plantings by ESRO (2003–2007) pending register verification.',
    lastReviewed: 'November 2026 Audit',
    title: 'Van Mahotsav Week',
    tagline: 'Annual Tree Planting Festival & Indigenous Sapling Aftercare',
    category: 'Forests & Heritage',
    scope: 'Global & Regional',
    significance: 'India\'s national tree-planting festival, initiated in July 1950 by Union Minister K.M. Munshi. In temperate Kashmir, while early July affords school participation before summer vacations, high summer temperatures and moisture deficits mean sapling survival depends strictly on species choice, elevation, soil moisture, and post-planting aftercare. Student activities emphasize aftercare survival audits and autumn/spring dormant planting windows rather than raw planting counts alone.',
    historicalContext: 'Core fixture of school eco-club calendars in Kashmir; reported 20,000+ saplings planted by youth between 2003 and 2007. [Historical claim, documentation pending archival verification].',
    studentActionGuide: {
      overview: 'Every student plants and takes a multi-year adoption pledge for at least one indigenous sapling, committing to water and safeguard it through summer heat.',
      classroomActivities: [
        'School "Plant a Life" ceremonial planting on school perimeter boundaries.',
        'Learning root flare depth, correct composting, and protective bamboo staking techniques.',
        'Student botanical journaling: Recording weekly height growth and leaf counts.'
      ],
      fieldTripIdeas: [
        'Social forestry nursery excursion to collect indigenous saplings (Walnut, Mulberry, Willow, Kail).',
        'Riverbank stabilization planting along Jhelum or flood spill channel.'
      ],
      studentProjectTopics: [
        'Survival rate audit of previous year\'s Van Mahotsav plantations across the sub-division.',
        'Investigating the growth rate of native conifers compared to invasive Russian Olive (*Elaeagnus*).'
      ],
      recommendedStudentLevels: ['Primary (Classes 1-5)', 'Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/biodiversity/plants',
    linkedModuleLabel: 'Plants & Flora Directory',
    iconName: 'Trees',
    accentGradient: 'from-green-600 to-teal-700'
  },
  {
    id: 'world-population-day',
    month: 'July',
    monthNumber: 7,
    day: '11',
    startDay: 11,
    endDay: 11,
    officialDate: 'July 11',
    dateRule: 'Fixed Calendar Date',
    observanceAuthority: 'United Nations (UN GA)',
    officialSourceURL: 'https://www.un.org/en/observances/world-population-day',
    verificationStatus: 'Verified International Observance',
    kashmirFocus: 'Ecological carrying capacity in sensitive alpine resorts (Gulmarg, Pahalgam, Sonamarg) and urban valley sprawl encroaching onto paddy land.',
    historicalEvidence: 'UN GA Resolution 45/216 of 1990; eIEN Kashmir carrying-capacity research papers archived.',
    lastReviewed: 'November 2026 Audit',
    title: 'World Population Day',
    tagline: 'Carrying Capacity, Ecological Footprints & Urban Valley Sprawl',
    category: 'Civic & Disaster Preparedness',
    scope: 'Global & Regional',
    significance: 'Established by the Governing Council of the UNDP in 1989 (and reaffirmed by UN GA Resolution 45/216). Examines the pressure of expanding human settlement, tourism inflows, and infrastructure urbanization on the fragile and finite valley ecosystem of Kashmir.',
    historicalContext: 'Featured in eIEN Kashmir research papers analyzing carrying capacity of hill resorts like Gulmarg and Pahalgam during peak tourist seasons. [Academic working papers cited].',
    studentActionGuide: {
      overview: 'Students calculate ecological footprints, analyze urban heat maps, and explore sustainable rural development models.',
      classroomActivities: [
        'Calculate personal ecological footprints using online footprint calculators.',
        'Seminar on "Balancing Tourism Inflows with Alpine Wetland Carrying Capacities".',
        'Demographic graphing of Kashmir Valley population trends from 1951 to 2026.'
      ],
      fieldTripIdeas: [
        'Urban sprawl comparison walk from downtown Srinagar historic core to newly converted paddy-land suburbs.',
        'Pahalgam or Sonamarg carrying-capacity survey examining solid waste output during peak tourist weeks.'
      ],
      studentProjectTopics: [
        'Documenting the conversion of prime agricultural paddy land into commercial construction over 10 years.',
        'Estimating the daily volume of sewage generated by hotel clusters in tourist hubs.'
      ],
      recommendedStudentLevels: ['Higher Secondary & College']
    },
    linkedPlatformRoute: '/environmental-monitoring/air-pollution',
    linkedModuleLabel: 'Environmental Stress',
    iconName: 'Users',
    accentGradient: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'world-ozone-day',
    month: 'September',
    monthNumber: 9,
    day: '16',
    startDay: 16,
    endDay: 16,
    officialDate: 'September 16',
    dateRule: 'Fixed Calendar Date',
    observanceAuthority: 'United Nations (UN GA)',
    officialSourceURL: 'https://www.un.org/en/observances/ozone-day',
    verificationStatus: 'Verified International Observance',
    kashmirFocus: 'Stratospheric ozone monitoring and UV elevation gradient (+10% to 12% per 1,000m) affecting high-altitude Himalayan human health.',
    historicalEvidence: 'UN GA Resolution 49/114 of 1994; CANK solar irradiance briefings archived.',
    lastReviewed: 'November 2026 Audit',
    title: 'World Ozone Day (International Day for the Preservation of the Ozone Layer)',
    tagline: 'Atmospheric Physics, UV Protection in High Altitudes & Montreal Protocol',
    category: 'Climate & Atmosphere',
    scope: 'Global & Regional',
    significance: 'Designated by the UN General Assembly in 1994 (Resolution 49/114) to commemorate the signing of the Montreal Protocol on Substances that Deplete the Ozone Layer (1987). Atmospheric physics establishes that solar ultraviolet (UV) irradiance increases by approximately 10% to 12% per 1,000 meters of elevation under clear-sky conditions (Blumthaler et al., 1997; WHO/WMO). Consequently, high-altitude Western Himalayan elevations (2,500m to 3,500m, such as Gulmarg and Sonamarg) experience 20% to 30% higher UV-B flux compared to sea-level baselines, intensifying the need for atmospheric ozone layer monitoring and sun safety education.',
    historicalContext: 'Covered by Climate Action Network Kashmir (CANK / ESRO) in scientific briefings on solar radiation indices in Ladakh and Kashmir. [Atmospheric data papers archived].',
    studentActionGuide: {
      overview: 'Explore atmospheric layers, greenhouse gases, CFC alternatives, and the physics of solar UV filtering in mountain valleys.',
      classroomActivities: [
        'UV-sensitive bead experiment demonstrating UV intensity under direct sunlight vs. cloudy conditions vs. sunscreen.',
        'Classroom presentation on the success of the Montreal Protocol as a triumph of global science policy.',
        'Model refrigeration cycle demonstration illustrating non-ODS eco-friendly refrigerants.'
      ],
      fieldTripIdeas: [
        'Visit to an atmospheric science laboratory or air quality monitoring station.',
        'High-altitude solar irradiance measurement during an alpine excursion.'
      ],
      studentProjectTopics: [
        'Survey of school and community cooling appliances for ozone-friendly refrigerant labels.',
        'Measuring solar UV index variations at different altitudes (Srinagar 1,580m vs. Gulmarg 2,650m).'
      ],
      recommendedStudentLevels: ['Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/environmental-monitoring/air-pollution',
    linkedModuleLabel: 'Air & Atmosphere',
    iconName: 'Sun',
    accentGradient: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'national-wildlife-week',
    month: 'October',
    monthNumber: 10,
    day: '2–8',
    startDay: 2,
    endDay: 8,
    officialDate: 'October 2–8',
    dateRule: 'Annual Date Range',
    observanceAuthority: 'Government of India (MoEFCC / DST / AWBI)',
    officialSourceURL: 'https://moef.gov.in',
    verificationStatus: 'Official Observance — Regional Historical Claim Pending Documentation',
    kashmirFocus: 'Autumn roar and rutting season of Kashmir Stag or Hangul (*Cervus hanglu hanglu*, IUCN Critically Endangered, assessed 2017) in Dachigam.',
    historicalEvidence: 'Government of India Wildlife Week notifications; ESRO Dachigam student excursion records pending archival verification.',
    lastReviewed: 'November 2026 Audit',
    title: 'National Wildlife Week',
    tagline: 'Kashmir Hangul Rut, Endangered Western Tragopan & Camera Trapping',
    category: 'Biodiversity & Wildlife',
    scope: 'Kashmir Specific',
    significance: 'Celebrated across India annually from October 2 to 8 (instituted by the National Board for Wildlife). In Kashmir, this window coincides with the peak autumn rutting and roar season of the critically endangered Kashmir Stag (Hangul, *Cervus hanglu hanglu*, IUCN Red List Critically Endangered, assessed 2017) in Dachigam National Park, Overa-Aru, and the Shikargah conservation corridor.',
    historicalContext: 'Premier wildlife milestone established by ESRO / CWPR in 2004, including the famous Dachigam Hangul Call student excursions and conservation pledge ceremonies. [Historical claim, documentation pending archival verification].',
    studentActionGuide: {
      overview: 'The most immersive week for wildlife study. Students learn camera trap deployment, track identification, bird call recording, and the ecology of flagship taxa.',
      classroomActivities: [
        'Wildlife documentary screenings on Hangul (*Cervus hanglu hanglu*) and Markhor (*Capra falconeri*).',
        'Plaster-of-Paris cast making of carnivore pugmarks and ungulate hoofprints.',
        'Kashmir Wildlife Quiz competition with certificates and field guide prizes.'
      ],
      fieldTripIdeas: [
        'Guided Wildlife Excursion into Upper and Lower Dachigam National Park during the autumn roar season.',
        'Visit to Overa-Aru Sanctuary to observe Western Tragopan breeding facilities and musk deer ranges.'
      ],
      studentProjectTopics: [
        'Creating a 30-species photographic digital field guide of Kashmir\'s Schedule I fauna.',
        'Surveying community attitudes toward Hangul conservation among villages bordering Dachigam buffer zones.'
      ],
      recommendedStudentLevels: ['Primary (Classes 1-5)', 'Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/protected-network/national-parks',
    linkedModuleLabel: 'Dachigam & Wildlife',
    iconName: 'Camera',
    accentGradient: 'from-amber-500 to-rose-600'
  },
  {
    id: 'world-habitat-day',
    month: 'October',
    monthNumber: 10,
    day: String(HABITAT_DAY_2026),
    startDay: HABITAT_DAY_2026,
    endDay: HABITAT_DAY_2026,
    officialDate: `First Monday in October (October ${HABITAT_DAY_2026}, 2026)`,
    dateRule: 'First Monday in October (Dynamic)',
    observanceAuthority: 'United Nations (UN GA)',
    officialSourceURL: 'https://urbanoctober.unhabitat.org/world-habitat-day',
    verificationStatus: 'Verified International Observance',
    kashmirFocus: 'Sustainable mountain urbanism, traditional earthquake-resistant *Dhajji Dewari* / *Taq* timber architecture, and urban wetland sponge preservation.',
    historicalEvidence: 'UN GA Resolution 40/202 A of 1985; eIEN Kashmir urban lake encroachment working papers.',
    lastReviewed: 'November 2026 Audit',
    title: 'World Habitat Day',
    tagline: 'Sustainable Mountain Towns, Vernacular Architecture & Urban Wetlands',
    category: 'Civic & Disaster Preparedness',
    scope: 'Global & Regional',
    significance: 'Designated by the United Nations General Assembly in 1985 (Resolution 40/202 A) to be observed on the first Monday of October (October 5 in 2026; October 4 in 2027). Reflects on the state of our towns and cities, advocating for eco-sensitive mountain urbanism, preservation of vernacular timber *Dhajji Dewari* structures, and urban lake protection in Srinagar and district towns.',
    historicalContext: 'Examined in ESRO sustainable settlements documentation highlighting sewage encroachment into Dal and Anchar lakes. [Urban planning working papers cited].',
    studentActionGuide: {
      overview: 'Students analyze urban sustainability, pedestrian mobility, heritage architecture, and the encroachment on municipal green lungs.',
      classroomActivities: [
        'Architectural sketching and analysis of earthquake-resistant traditional *Dhajji Dewari* timber frames.',
        'Debate on urban traffic decongestion, electric mobility, and pedestrian corridors in city centers.',
        'Designing an energy-efficient eco-friendly school building using passive solar gain.'
      ],
      fieldTripIdeas: [
        'Walking tour through Old City Srinagar (*Shehr-e-Khaas*) studying heritage houses and river canal links.',
        'Inspection of Dal Lake floating gardens (*Radh*) to understand traditional aquatic vegetable cultivation.'
      ],
      studentProjectTopics: [
        'Evaluating thermal performance in modern concrete houses versus traditional timber-mud homes in winter.',
        'Survey of open green spaces and parks per capita in students\' municipal wards.'
      ],
      recommendedStudentLevels: ['Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/water-systems/lakes',
    linkedModuleLabel: 'Lakes & Urban Waters',
    iconName: 'Building2',
    accentGradient: 'from-purple-600 to-pink-600'
  },
  {
    id: 'international-day-disaster-risk-reduction',
    month: 'October',
    monthNumber: 10,
    day: '13',
    startDay: 13,
    endDay: 13,
    officialDate: 'October 13',
    dateRule: 'Fixed Calendar Date',
    observanceAuthority: 'United Nations (UN GA)',
    officialSourceURL: 'https://www.undrr.org/international-day-disaster-risk-reduction',
    verificationStatus: 'Verified International Observance',
    kashmirFocus: 'Seismic Zone V earthquake preparedness, Jhelum River flash flood modeling, winter snow avalanche safety, and community drills.',
    historicalEvidence: 'UN GA Resolution 64/200; replaces earlier unverified October 2 listing. Regional ESRO post-2005 earthquake school safety modules noted.',
    lastReviewed: 'November 2026 Audit',
    title: 'International Day for Disaster Risk Reduction',
    tagline: 'Earthquake Drills, Flash Flood Preparedness & Multi-Hazard Resilience',
    category: 'Civic & Disaster Preparedness',
    scope: 'Himalayan Focus',
    significance: 'Designated by the United Nations General Assembly on October 13 (Resolution 64/200; UNDRR) to promote a global culture of risk awareness and disaster reduction. In Kashmir, situated in Seismic Zone V and vulnerable to catastrophic flash flooding (as seen in the historic September 2014 deluge) and high-altitude avalanches, this day focuses on student emergency drills, multi-hazard risk mapping, and community early warning systems.',
    historicalContext: 'Formulated following the catastrophic October 2005 Muzaffarabad-Kashmir earthquake, when ESRO launched disaster safety modules in schools. [Historical claim, documentation pending archival verification]. (October 2 remains recognized internally as a local community preparedness campaign date, while October 13 is the official UN observance).',
    studentActionGuide: {
      overview: 'Instill life-saving practical reflexes: Drop-Cover-Hold earthquake drills, building evacuation procedures, and early flood warning recognition.',
      classroomActivities: [
        'Full school earthquake evacuation drill with timed muster station accountability.',
        'Assemble a classroom Emergency "Go-Bag" containing first aid, flashlight, whistle, emergency rations, and emergency contact lists.',
        'Study GIS flood inundation maps from the September 2014 Kashmir flood.'
      ],
      fieldTripIdeas: [
        'Visit to Jammu & Kashmir State Disaster Response Force (SDRF) headquarters.',
        'Inspection of flood spill channels, gauge stations, and bund embankments along the Jhelum.'
      ],
      studentProjectTopics: [
        'Drafting a localized School Disaster Management Plan (SDMP) with emergency evacuation route maps.',
        'Mapping hazard vulnerability in students\' home neighborhoods: liquefaction, slope slip, or flood plain proximity.'
      ],
      recommendedStudentLevels: ['Primary (Classes 1-5)', 'Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/hazard-intelligence',
    linkedModuleLabel: 'Hazard Intelligence',
    iconName: 'AlertTriangle',
    accentGradient: 'from-red-500 to-rose-600'
  },
  {
    id: 'international-mountain-day',
    month: 'December',
    monthNumber: 12,
    day: '11',
    startDay: 11,
    endDay: 11,
    officialDate: 'December 11',
    dateRule: 'Fixed Calendar Date',
    observanceAuthority: 'United Nations (UN GA)',
    officialSourceURL: 'https://www.un.org/en/observances/mountain-day',
    verificationStatus: 'Verified International Observance',
    kashmirFocus: 'Pir Panjal and Great Himalayan ridge ecology, high-altitude permafrost, winter snow accumulation, and transhumant pastoralist routes.',
    historicalEvidence: 'Designated by UN GA Resolution 57/245 in December 2002, observed annually since 2003 (FAO lead); high-altitude student trek logs archived.',
    lastReviewed: 'November 2026 Audit',
    title: 'International Mountain Day',
    tagline: 'Himalayan Ridge Ecology, High-Altitude Cryosphere & Mountain Communities',
    category: 'Climate & Atmosphere',
    scope: 'Himalayan Focus',
    significance: 'Proclaimed by the United Nations General Assembly in December 2002 (Resolution 57/245) with annual observances commencing in 2003, International Mountain Day highlights the vital importance of mountains for freshwater, clean energy, food, and biodiversity. For Kashmir, nestled in the Western Himalayas, it honors the Pir Panjal and Great Himalayan ranges that govern regional climate and sustain valley life.',
    historicalContext: 'A central milestone for ESRO mountain education programs, focusing on subalpine snow cover, avalanche risk mapping, and transhumant pastoralist cultural heritage. [High-altitude trek logs archived].',
    studentActionGuide: {
      overview: 'Students investigate high-altitude mountain ecosystems, snow accumulation dynamics, and the cultural adaptations of Kashmiri mountain communities.',
      classroomActivities: [
        'Mapping elevation zones of Kashmir: valley floor (1,600m), conifer belt (2,000–3,000m), alpine meadows (3,000–4,000m), and perpetual snow (>4,500m).',
        'Modeling mountain relief and rain-shadow effects using salt-dough or clay topographical models.',
        'Discussion on climate change impacts on Western Himalayan winter snowfall and permafrost.'
      ],
      fieldTripIdeas: [
        'Excursion to Shankaracharya or Pari Mahal slopes for panoramic mountain ridge observations.',
        'Visit to a high-altitude weather station or ski training facility in Gulmarg.'
      ],
      studentProjectTopics: [
        'Documenting traditional winter snow management and architectural roof-pitch designs in Kashmir villages.',
        'Compiling oral histories from mountain shepherds (*Chopans*) regarding changing alpine pasture conditions.'
      ],
      recommendedStudentLevels: ['Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/earth-human-impact/aquatic-cryosphere/glacier-recession',
    linkedModuleLabel: 'Cryosphere Observatory',
    iconName: 'Mountain',
    accentGradient: 'from-sky-600 to-indigo-700'
  }
];

export const studentProgramHighlights = {
  legacyProgramName: 'Outdoor Classroom (OD) — Western Himalayan Field Science Program',
  legacyPioneers: 'Initiative of eIEN Kashmir & ESRO (2002–2006)',
  annualStudentEnrollment: 'Students and educators across high schools and colleges in the Kashmir Valley',
  workspaceRoute: '/environmental-calendar/outdoor-classroom',
  corePillars: [
    {
      title: 'Curriculum & Coursework Support',
      desc: 'Assisting students in high schools and undergraduate colleges with empirical field data collection, scientific project methodologies, and coursework compilation.',
      icon: 'BookOpen'
    },
    {
      title: 'Eco-Park & Protected Area Study Tours',
      desc: 'Structured educational excursions to Dachigam, Overa-Aru, Gulmarg, Hokersar, and agricultural research stations designed to build practical conservation skills.',
      icon: 'Compass'
    },
    {
      title: 'Real-World Laboratory Diagnostics',
      desc: 'Hands-on water chemistry testing (pH, dissolved oxygen, turbidity), tree girth measurements, and GPS coordinates mapping.',
      icon: 'FlaskConical'
    },
    {
      title: 'Intergenerational Ecological Stewardship',
      desc: 'Connecting traditional oral ecological wisdom from village elders with modern conservation science and digital sensor monitoring.',
      icon: 'Users'
    }
  ]
};
