export interface EnvironmentalEvent {
  id: string;
  month: string;
  monthNumber: number; // 1 - 12
  day: string; // e.g. "2", "14-30", "1-7"
  startDay: number;
  endDay: number;
  title: string;
  tagline: string;
  category: 'Biodiversity & Wildlife' | 'Water & Wetlands' | 'Climate & Atmosphere' | 'Forests & Heritage' | 'Civic & Disaster Preparedness';
  scope: 'Global & Regional' | 'Kashmir Specific' | 'Himalayan Focus';
  significance: string;
  historicalContext: string;
  studentActionGuide: {
    overview: string;
    classroomActivities: string[];
    fieldTripIdeas: string[];
    studentProjectTopics: string[];
    recommendedStudentLevels: string[];
  };
  linkedPlatformRoute: string;
  linkedModuleLabel: string;
  iconName: string;
  accentGradient: string;
}

export const environmentalCalendarEvents: EnvironmentalEvent[] = [
  {
    id: 'animal-welfare-fortnight',
    month: 'January',
    monthNumber: 1,
    day: '14–30',
    startDay: 14,
    endDay: 30,
    title: 'Animal Welfare Fortnight',
    tagline: 'Compassion, Winter Habitat Care & Native Himalayan Fauna Protection',
    category: 'Biodiversity & Wildlife',
    scope: 'Himalayan Focus',
    significance: 'Dedicated two-week campaign highlighting compassionate coexistence, anti-poaching vigilance, and humane winter assistance for birds and wildlife stranded during sub-zero Chillai Kalan freezes.',
    historicalContext: 'Formally observed by the Council for Wildlife Protection & Research (CWPR / ESRO) since 2004, prioritizing winter feeding buffer zones in lower Dachigam and community canine rabies vaccination.',
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
    title: 'World Wetlands Day',
    tagline: 'Ramsar Wetland Stewardship & Migratory Waterfowl Basins',
    category: 'Water & Wetlands',
    scope: 'Global & Regional',
    significance: 'Commemorates the 1971 Ramsar Convention on Wetlands. In Kashmir, it honors the 13.75 km² Hokersar, 189 km² Wular, Shallabugh, and Hygam reserves sustaining millions of Central Asian Flyway migrants.',
    historicalContext: 'A cornerstone annual event in Kashmir environmental education since 2002. ESRO and local universities conducted annual waterbird censuses and wetland health audits.',
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
    title: 'National Science Day',
    tagline: 'Empirical Ecological Inquiry, Climate Science & Remote Sensing',
    category: 'Civic & Disaster Preparedness',
    scope: 'Global & Regional',
    significance: 'Commemorates the discovery of the Raman Effect. Focuses student curiosity on Himalayan environmental physics, hydrology, satellite remote sensing, and cryosphere sciences.',
    historicalContext: 'Promoted by eIEN Kashmir Environmental Information System (EIS) to bridge empirical laboratory instrumentation with high-school student science fairs.',
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
    id: 'world-forestry-day',
    month: 'March',
    monthNumber: 3,
    day: '21',
    startDay: 21,
    endDay: 21,
    title: 'World Forestry Day',
    tagline: 'Temperate Conifers, Subalpine Birch & Ridge Stability',
    category: 'Forests & Heritage',
    scope: 'Global & Regional',
    significance: 'Celebrates the temperate coniferous belts of Deodar (*Cedrus deodara*), Kail (*Pinus wallichiana*), Fir (*Abies pindrow*), and Birch (*Betula utilis*) that protect fragile Himalayan watersheds.',
    historicalContext: 'Organized under the Council for Forest Protection & Research (CFPR) with school-led seed-ball dispersal along degraded Pir Panjal slopes.',
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
    title: 'World Water Day',
    tagline: 'Springsheds, Glacial Runoff & Jhelum River Basin Health',
    category: 'Water & Wetlands',
    scope: 'Global & Regional',
    significance: 'Highlights the critical freshwater security of Kashmir, originating from Kolahoi and Karakoram glaciers and emerging through thousands of sacred perennial karst springs (*Naags*).',
    historicalContext: 'Core event in the eIEN Kashmir calendar. ESRO coordinated school audits of 150+ historic springs across Anantnag, Pulwama, and Srinagar in 2005-2007.',
    studentActionGuide: {
      overview: 'Students audit community water taps, trace the source of drinking water from catchment to tap, and protect local natural springs from plastic dumping.',
      classroomActivities: [
        'Home water audit: Students calculate per capita daily household water consumption.',
        'Interactive filtration experiment comparing sand, charcoal, and gravel gravel media.',
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
    id: 'world-earth-day',
    month: 'April',
    monthNumber: 4,
    day: '22',
    startDay: 22,
    endDay: 22,
    title: 'World Earth Day',
    tagline: 'Valley-Wide Cleanups, Zero-Waste Living & Planet vs. Plastics',
    category: 'Civic & Disaster Preparedness',
    scope: 'Global & Regional',
    significance: 'The world\'s largest environmental civic mobilization. In Kashmir, it mobilizes hundreds of educational institutions to combat single-use polythene and restore degraded communal slopes.',
    historicalContext: 'Spearheaded by ESRO since 2003 with student rallies in Lal Chowk and Dal Lake shikara cleanup flotillas.',
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
    id: 'world-heritage-day',
    month: 'April',
    monthNumber: 4,
    day: '28',
    startDay: 28,
    endDay: 28,
    title: 'World Heritage Day',
    tagline: 'Heritage Chinar Trees (Booni), Karst Springs & Cultural Ecology',
    category: 'Forests & Heritage',
    scope: 'Kashmir Specific',
    significance: 'Celebrates the living bio-cultural heritage of Kashmir, specifically the majestic Oriental Plane (*Platanus orientalis* / *Booni*) planted during Mughal and Sultanate eras, along with sacred springs.',
    historicalContext: 'Marked the anniversary of the Chinar Conservation Network (CCN / ESRO) 2006 census of heritage trees and preservation advocacy against illicit felling.',
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
    id: 'world-environment-day',
    month: 'June',
    monthNumber: 6,
    day: '5',
    startDay: 5,
    endDay: 5,
    title: 'World Environment Day',
    tagline: 'The Apex UN Environmental Observance Across All School Hubs',
    category: 'Civic & Disaster Preparedness',
    scope: 'Global & Regional',
    significance: 'The premier global event for environmental awareness. Celebrated universally across all Kashmiri government and private educational institutes with government department collaborations.',
    historicalContext: 'Celebrated annually by ESRO, universities, and schools with Valley-wide environmental conclaves, awards for eco-clubs, and releasing annual state-of-environment reports.',
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
    title: 'World Day to Combat Desertification & Drought',
    tagline: 'Karewa Terraces Protection, Soil Erosion & Watershed Stabilization',
    category: 'Forests & Heritage',
    scope: 'Himalayan Focus',
    significance: 'Focuses on soil conservation and the protection of Kashmir\'s ancient Pleistocene Karewa (*Wudur*) plateaus from destructive clay excavation and uncontrolled soil loss.',
    historicalContext: 'Championed in the ESRO 2007 State Environmental Impact Assessment report to highlight karewa destruction in Budgam and Pulwama for construction fill.',
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
    id: 'vanmahotsava-day',
    month: 'July',
    monthNumber: 7,
    day: '1',
    startDay: 1,
    endDay: 7,
    title: 'Vanmahotsava Week',
    tagline: 'Annual Monsoon Mass Tree Planting & Indigenous Sapling Care',
    category: 'Forests & Heritage',
    scope: 'Global & Regional',
    significance: 'India\'s historic tree-planting festival initiated in 1950. Utilizes summer rains to plant thousands of native saplings on degraded school grounds, roadsides, and river embankments.',
    historicalContext: 'Core fixture of school eco-club calendars in Kashmir, documented in ESRO bulletins with over 20,000 saplings planted by youth volunteers between 2003 and 2007.',
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
        'Survival rate audit of previous year\'s Vanmahotsava plantations across the sub-division.',
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
    title: 'World Population Day',
    tagline: 'Carrying Capacity, Ecological Footprints & Urban Valley Sprawl',
    category: 'Civic & Disaster Preparedness',
    scope: 'Global & Regional',
    significance: 'Examines the pressure of expanding human settlement, tourism inflows, and infrastructure urbanization on the fragile and finite valley ecosystem of Kashmir.',
    historicalContext: 'Featured in eIEN Kashmir research papers analyzing carrying capacity of hill resorts like Gulmarg and Pahalgam during peak tourist seasons.',
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
    title: 'World Ozone Day',
    tagline: 'Atmospheric Physics, UV Protection in High Altitudes & Montreal Protocol',
    category: 'Climate & Atmosphere',
    scope: 'Global & Regional',
    significance: 'Commemorates the Montreal Protocol. High-altitude mountain regions receive up to 25% higher UV radiation amplitudes, making stratospheric ozone awareness directly relevant to student health.',
    historicalContext: 'Covered extensively by Climate Action Network Kashmir (CANK / ESRO) in scientific briefings on solar radiation indices in Ladakh and Kashmir.',
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
    id: 'wildlife-week-esro-day',
    month: 'October',
    monthNumber: 10,
    day: '1–7',
    startDay: 1,
    endDay: 7,
    title: 'Wildlife Week & ESRO Environmental Day',
    tagline: 'Kashmir Hangul Rut, Endangered Western Tragopan & Camera Trapping',
    category: 'Biodiversity & Wildlife',
    scope: 'Kashmir Specific',
    significance: 'Celebrated across India during the first week of October. Coincides with the peak autumn rutting season of the critically endangered Kashmir Stag (Hangul) in Dachigam and ESRO\'s Annual Foundation Day.',
    historicalContext: 'The premier wildlife milestone established by ESRO / CWPR in 2004, including the famous Dachigam Hangul Call student excursions and conservation pledge ceremonies.',
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
    id: 'natural-disaster-prevention-day',
    month: 'October',
    monthNumber: 10,
    day: '2',
    startDay: 2,
    endDay: 2,
    title: 'Natural Disaster Prevention Day',
    tagline: 'Earthquake Drills, Flash Flood Preparedness & Multi-Hazard Resilience',
    category: 'Civic & Disaster Preparedness',
    scope: 'Himalayan Focus',
    significance: 'Kashmir sits in Seismic Zone V and is vulnerable to flash floods (as seen in the historic 2014 deluge) and winter snow avalanches. Focuses on youth disaster response preparedness.',
    historicalContext: 'Formulated following the catastrophic October 2005 Muzaffarabad-Kashmir earthquake, when ESRO launched disaster safety modules in schools.',
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
    id: 'world-habitat-day',
    month: 'October',
    monthNumber: 10,
    day: '5',
    startDay: 5,
    endDay: 5,
    title: 'World Habitat Day',
    tagline: 'Sustainable Mountain Towns, Vernacular Architecture & Urban Wetlands',
    category: 'Civic & Disaster Preparedness',
    scope: 'Global & Regional',
    significance: 'Reflects on the state of our towns and cities, advocating for eco-sensitive mountain urbanism, preservation of vernacular timber *Dhajji Dewari* structures, and urban lake protection.',
    historicalContext: 'Examined in ESRO sustainable settlements documentation highlighting sewage encroachment into Dal and Anchar lakes.',
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
    id: 'biological-diversity-day',
    month: 'December',
    monthNumber: 12,
    day: '29',
    startDay: 29,
    endDay: 29,
    title: 'International Day for Biological Diversity',
    tagline: 'Endemic Species, Ethnobotany & Winter Ecological Adaptations',
    category: 'Biodiversity & Wildlife',
    scope: 'Global & Regional',
    significance: 'Celebrates the original UN Convention on Biological Diversity entry-into-force date (Dec 29, 1993). In Kashmir, it provides a year-end milestone to review species conservation achievements and winter adaptations.',
    historicalContext: 'Annual benchmark for eIEN Kashmir Biodiversity Conservation Network (BCN) publications and annual biodiversity report cards.',
    studentActionGuide: {
      overview: 'Students celebrate Kashmir\'s unique biogeographic position at the crossroads of Palearctic and Oriental realms, with over 120 endemic medicinal herbs and iconic caprines.',
      classroomActivities: [
        'Creating an "Endangered Species Red List" bulletin board for the school corridor.',
        'Workshop on traditional Kashmiri ethnobotany: *Kuth*, *Banafsha*, *Patis*, and *Dhoop*.',
        'Winter bird checklist synthesis: Compiling records collected across the entire autumn and winter term.'
      ],
      fieldTripIdeas: [
        'Winter botanical garden visit to study evergreen gymnosperms and winter-hardy subalpine shrubs.',
        'Excursion to a snow leopard observation or camera trap telemetry exhibit.'
      ],
      studentProjectTopics: [
        'Documenting traditional herbal remedies used by village elders for winter ailments.',
        'Comprehensive ecological portfolio reviewing school environmental achievements over the calendar year.'
      ],
      recommendedStudentLevels: ['Primary (Classes 1-5)', 'Middle/High School (Classes 6-10)', 'Higher Secondary & College']
    },
    linkedPlatformRoute: '/biodiversity/threatened-species',
    linkedModuleLabel: 'Priority Biodiversity',
    iconName: 'Leaf',
    accentGradient: 'from-emerald-500 to-teal-600'
  }
];

export const studentProgramHighlights = {
  legacyProgramName: 'Outdoor Classroom (OD) — Learning Beyond the Classroom',
  legacyPioneers: 'Initiative of eIEN Kashmir & ESRO',
  annualStudentEnrollment: 'Students and educators across high schools and colleges in the Kashmir Valley',
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
