// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — VOL. 01 / NO. 01 · FIELD REPORTS (WETLANDS)
// STORY 04: "Where the Wild Waters End"
// Ramsar Basins, Hydroperiod Governance & Central Asian Flyway Synthesis
// ─────────────────────────────────────────────────────────────────────────────

import { buildPreReleaseStage08GateLedger } from '@/lib/himalayan-dispatch-metrics';
import type { MagazineStory } from '@/types/himalayan-dispatch';

export const STORY_04_WILD_WATERS: MagazineStory = {
  id: 'hd-story-03',
  slug: 'where-the-wild-waters-end',
  editionSlug: 'vol-01-no-01',
  editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
  departmentId: 'field-reports',
  secondaryDepartmentIds: ['data-journalism'],
  departmentRubric: 'WETLANDS · DISPATCHES FROM THE FIELD',
  folioCode: '02A / FIELD DISPATCH',
  title: 'Where the Wild Waters End',
  subtitle:
    'Siltation plumes, needle-weir hydroperiods, and the narrowing suburban reedlines of Hokersar and Shallabugh along the Central Asian Flyway.',
  excerpt:
    'Every November, hundreds of thousands of Palearctic waterfowl descend across the Karakoram and Pir Panjal passes onto the floodplain marshes of central Kashmir—entering Ramsar reserves whose open-water mirrors are steadily compressed by tributary silt, agrochemical runoff, and peri-urban encirclement.',
  dateline: 'HOKERSAR & SHALLABUGH RAMSAR BASINS · JHELUM FLOODPLAIN',
  region: 'Srinagar, Budgam & Ganderbal · Central Kashmir',
  readingTimeMinutes: 11,
  wordCount: 2437,
  proseWordCount: 2076,
  publishedAt: '2026-11-25',
  updatedAt: '2026-11-27',
  heroImage: '/images/protected-network/protected-wetland-reserves-hokersar.jpg',
  heroCaption:
    'Representative shallow winter marsh channels and emergent Typha–Phragmites reedbeds characteristic of central Kashmir’s Jhelum floodplain wetland reserves (Illustrative archival plate).',
  heroCredit: 'Kashmir EcoWatch Visual Archive (Illustrative archival plate)',
  conceptualFolioDisclosure:
    'Inaugural Desk & Observatory Synthesis: Grounded in Ramsar Information Sheets (#1570, #2493) and peer-reviewed hydrochemical and ornithological literature; no firsthand eyewitness interviews are claimed.',
  journalistSlug: 'wetlands-forest-desk',
  bylineDisplay: 'Himalayan Dispatch · Wetlands & Forest Desk',
  bylineRole: 'Ramsar Basins & Avian Ecology Synthesis',
  factCheckedBy: 'Stage 04 Documentary & Citation Audit Completed · Himalayan Dispatch Desk',
  scientificReviewer:
    'Stage 05 Independent External Specialist Certification Pending (Pre-Release Stage 08)',
  workflowStage: 'editorial_approval',
  isPublished: true,
  hasCompletedIndependentReview: false,
  reportingBeatSlug: 'wetlands-lakes-migratory-flyways',
  reportingBeatLabel: 'Wetlands, Lakes & Migratory Flyways',
  publicationStatusNote:
    'Stage 08 · Pre-Release Edition Folio Awaiting Administrator Approval',
  publicationGates: buildPreReleaseStage08GateLedger({
    scientificReviewApplicable: true,
    evidenceSummary:
      'Ramsar Information Sheet (RIS) records for Hokersar (#1570) and Shallabugh (#2493), multi-decadal Earth-observation wetland change studies, and peer-reviewed contaminant and avian ecology literature verified at Stage 04.',
    scientificNote:
      'Internal wetland hydrology and ornithological synthesis completed; independent external specialist certification under Stage 05 remains pending prior to formal public release.',
    ethicsAndVisualNote:
      'Synthetic correspondent persona and unverified personal boatman quote removed; accompanying habitat plates credited transparently to the Kashmir EcoWatch Visual Archive.',
  }),
  editorialVerificationNote:
    'This dispatch is an institutional synthesis grounded in official Ramsar Information Sheets, J&K Department of Wildlife Protection conservation reserve baselines, and peer-reviewed remote-sensing, hydrochemical, and ornithological studies. No unverified personal interviews are presented; habitat imagery serves as representative landscape context.',
  chapters: [
    {
      numberRoman: 'I',
      title: 'The Shrinking Mirror of the Floodplain',
      subtitle:
        'How two internationally designated Ramsar basins register half a century of sediment accumulation and perimeter conversion.',
      dateline: 'HOKERSAR (34.083° N) & SHALLABUGH (34.157° N) · ~1,580–1,584 M',
      paragraphs: [
        'Viewed from a winter satellite pass after the first November frost clears the Srinagar bowl, the wetlands of the central Jhelum floodplain appear like remnants of an older, wider inland sea. Between the karewa bluffs of Budgam to the south and the braided alluvial fan of the Sindh River in Ganderbal to the north, shallow palustrine depressions still catch snowmelt, spring seepage, and flood-spill water before releasing it slowly toward Wular. Yet the geometry of those basins has tightened dramatically within a single human lifetime. Where contiguous reed labyrinths and open-water lagoons once cushioned the western approaches to Srinagar, earthen embankments, residential plots, vegetable islands, and highway corridors now press directly against statutory reserve pillars.',
        'Hokersar Wetland Conservation Reserve, designated as Ramsar Site No. 1570 in November 2005 at an elevation of roughly 1,584 meters, embodies both the ecological resilience and the spatial vulnerability of Kashmir’s valley marshes. Historical topographic surveys from 1969 documented Hokersar’s functional wetland expanse at approximately 18.75 square kilometers. Official Ramsar and wildlife reserve records today delimit the conservation reserve at roughly 13.0 to 13.75 square kilometers, and multi-temporal Earth-observation analyses reveal a far steeper internal transformation: open-water surfaces within the reserve have contracted to less than 2.0 to 3.5 square kilometers depending on seasonal gate retention, while emergent marsh, silt islands, and woody willow stands have colonized former diving-duck lagoons (Lolu et al., 2018; Alam et al., 2023).',
        'Twelve kilometers north across the floodplain in Ganderbal district, Shallabugh Wetland Conservation Reserve—notified as Ramsar Site No. 2493 in 2022 across 1,675 hectares (16.75 square kilometers)—displays a parallel trajectory of peripheral squeeze and seasonal desiccation. Analysing twenty-eight years of Landsat TM and LISS-IV satellite imagery across the Shallabugh complex, Bashir et al. (2022) documented an 86.8 percent expansion in surrounding built-up area and a 96.1 percent increase in cultivated vegetable plots, accompanied by measurable declines in open water and native macrophytic cover. Together with Hygam (Ramsar Site No. 2492) further downstream near Sopore, Hokersar and Shallabugh constitute the surviving hydraulic and biological core of central Kashmir’s wetland network—an ecological safety net asked to absorb urbanizing pressures from every side while sustaining a continental bird migration.',
        'Geomorphologically, these reserves are the surviving shallow backwater depressions of the ancient Pleistocene Karewa Lake, kept wet by the extraordinarily gentle longitudinal gradient of the Jhelum mainstem between Sangam and Shadipora. Historically, Hokersar, Shallabugh, Mirgund, Anchar, and Kranchu did not function as isolated fenced polygons; during spring snowmelt and autumn rains, sheetflow and natural distributary channels linked them across winter-fallow rice paddies into a continuous amphibious corridor. Reconciling older revenue-record acreages with modern differential satellite boundaries under official Ramsar Information Sheets exposed how severely piecemeal bunding, agricultural reclamation, and linear road embankments had severed those lateral hydrological connections long before formal conservation monitoring began.',
      ],
      fieldNote: {
        label: 'RAMSAR BASIN BASELINES',
        detail:
          'Hokersar (Ramsar #1570, designated 2005, ~13.75 km² statutory reserve) and Shallabugh (Ramsar #2493, designated 2022, 16.75 km²) anchor the central Jhelum–Sindh floodplain staging complex under the J&K Department of Wildlife Protection.',
        coordinates: '34.0833° N, 74.7167° E · 34.1567° N, 74.7194° E',
      },
    },
    {
      numberRoman: 'II',
      title: 'Silt Plumes, Willow Roots, and the Needle-Gate Dilemma',
      subtitle:
        'Why upstream catchment erosion and flood-routing infrastructure govern winter water depth to the centimeter.',
      paragraphs: [
        'Floodplain wetlands do not shallow by accident; they shallow because they sit at the receiving end of disturbed mountain watersheds. Hokersar draws its primary perennial inflow from the Doodhganga Flood Spill Channel—engineered to divert high-stage discharge away from central Srinagar—supplemented by fine-sediment-laden runoff from the Sukhnag catchment. Shallabugh, in turn, receives distributary branches from the Sindh River alongside nutrient-heavy outflow from the Anchar Lake drainage system. Whenever upper Pir Panjal or Sindh slopes lose forest litter, suffer unstabilized road cuts, or undergo riverbed disturbance, storm pulses carry thousands of tonnes of suspended clay, silt, and fine sand directly into the low-velocity reedbeds below, where current speed drops and sediment settles out of suspension.',
        'As mineral silt raises the benthic floor centimeter by centimeter, plant succession accelerates what hydrology begins. Exposed mudbars and shallowed margins are rapidly colonized by dense monocultures of common reed (Phragmites australis) and narrow-leaved cattail (Typha angustata and Typha latifolia), alongside expanding plantations of willow (Salix species) originally introduced for firewood and embankment stabilization. Across open summer channels, floating-leaved mats of water chestnut (Trapa natans) and crested floating-heart (Nymphoides peltata) produce heavy seasonal biomass that senesces each autumn, depositing organic detritus onto an already elevated bed. As Lolu et al. (2018) demonstrated in Hokersar, macrophytes sequester substantial seasonal carbon, yet without periodic hydraulic flushing their unharvested litter compounds vertical aggradation and accelerates terrestrialization.',
        'At the downstream throat of Hokersar near Sozeith, ecological fate hinges on a deceptively simple piece of hydraulic hardware: the outlet needle-weir gate structure regulating outflow back toward the Jhelum. Flood-control administration prioritizes rapid drainage capacity so the basin can absorb sudden rain-on-snow surges without backing water toward Zainakote and HMT suburbs. Avian conservation, however, demands retaining autumn inflow behind closed gates to hold stable winter hydroperiods from October through March. Too little retention leaves Shallabugh and outer Hokersar compartments bone-dry by December; excessive uniform impoundment above 1.2 meters drowns the 0.25-to-0.45-meter sedge and mudflat shallows where dabbling ducks upend to feed on submerged seeds and tubers, favouring only deeper-water diving guilds.',
        'Post-2014 flood-mitigation engineering sharpened this hydraulic contradiction. Following the extreme September 2014 Jhelum inundation (Parvaze et al., 2021; Romshoo & Yousuf, 2022), channel-widening and spill-routing works reinforced Hokersar’s role as an emergency bypass conduit for Doodhganga floodwaters, yet without constructing dedicated upstream desilting forebays at the eastern entry near Narbal and HMT. Consequently, every summer spate deposits fresh prograding sand fans across the inlet channels while fine colloidal clay blankets interior depressions, choking the sub-lacustrine groundwater springs that once moderated mid-winter water temperatures and prevented complete surface freeze during severe January cold waves.',
      ],
      pullQuote: {
        quote:
          'In a regulated floodplain marsh, thirty centimeters of water-level difference at the outlet weir determines whether ten thousand dabbling ducks find winter forage or an empty mudflat.',
        attribution: 'Himalayan Dispatch · Wetlands & Forest Desk',
        context: 'Hydroperiod & Avian Guild Synthesis',
      },
      plate: {
        imageUrl: '/images/publications/wular-ramsar-wetland-floodplain.jpg',
        caption:
          'Open-water floodplain storage and peripheral willow belts across the Jhelum lacustrine continuum, illustrating the delicate balance between marsh inundation and woody encroachment.',
        credit: 'Kashmir EcoWatch Visual Archive',
        aspect: 'wide',
      },
    },
    {
      numberRoman: 'III',
      title: 'Continental Travellers in a Compressed Bowl',
      subtitle:
        'Partitioning winter refuge among Palearctic ducks, geese, and rails along the Central Asian Flyway.',
      paragraphs: [
        'Despite decades of areal contraction, the autumn arrival along the Central Asian Flyway remains one of the great biometeorological spectacles of the Western Himalayas. As October freezes seal shallow steppe lakes across West Siberia, Kazakhstan, Mongolia, and the Xinjiang basins, waves of migratory Anatidae climb through the Indus, Shyok, and Gilgit-Jhelum mountain corridors to drop into the ice-free, spring-moderated marshes of the Kashmir Valley. Synchronized winter counts conducted by the J&K Department of Wildlife Protection alongside the Asian Waterbird Census routinely record several hundred thousand wintering and passage waterbirds concentrated within Hokersar, Shallabugh, Hygam, and Wular—turning a handful of square kilometers into an irreplaceable continental lifeboat.',
        'Close ecological observation reveals that a healthy wetland functions not as a uniform pond, but as a finely terraced mosaic of micro-habitats. Along shallow, frost-softened mud margins and flooded Carex–Eleocharis sedge flats, surface-feeding dabblers—Northern Pintail (Anas acuta), Gadwall (Mareca strepera), Eurasian Wigeon (Mareca penelope), Common Teal (Anas crecca), Northern Shoveler (Spatula clypeata), and Mallard (Anas platyrhynchos)—sift seeds, rhizomes, and chironomid larvae throughout the night. Further out, where dredged or scoured central lagoons preserve 0.9 to 1.5 meters of open water, Greylag Geese (Anser anser) loaf in watchful rafts alongside diving Common Pochards (Aythya ferina), Tufted Ducks (Aythya fuligula), and the Near-Threatened Ferruginous Duck (Aythya nyroca).',
        'Quantitative field baselines underscore how tightly these birds respond to both seasonal meteorology and vegetation architecture. Studying protected waterbird assemblages in Hokersar, Parsons and Kannan (2018) established statistically significant seasonal shifts in abundance, with maximum multi-species congregations peaking in late winter when surrounding agricultural fields and higher-elevation waters freeze solid. Conversely, when spring arrives and resident or semi-resident Mallards and Moorhens attempt to breed in the reedbeds, reproductive success depends directly on emergent cover integrity: Jan, Shah, and Jan (2017) demonstrated at Hokersar and Haigam that nest predation rates climb sharply wherever reed cutting, grazing, or desiccation thins average vegetation density, exposing clutches to corvids and free-ranging terrestrial predators.',
        'Spatial compression inside shrinking open-water bowls also carries physiological consequences that raw bird counts can mask. When dry autumns or unclosed outlet gates leave satellite marshes parched, hundreds of thousands of ducks and geese crowd into a few central hectares of stagnant water at Hokersar, intensifying competition for submerged Potamogeton and Ceratophyllum beds while elevating pathogen and parasite transmission; parasitological surveys by Mir, Dar, and Shah (2023) documented substantial helminth prevalence across migratory waterfowl in Hokersar, underscoring that flyway conservation requires maintaining dispersed, well-flushed foraging complexes across Shallabugh, Hygam, Mirgund, and Wular rather than relying on a single overcrowded sanctuary.',
      ],
      editorialTable: {
        kicker: 'TABLE I · CENTRAL KASHMIR RAMSAR COMPARATIVE LEDGER',
        caption:
          'Hydrological structure, avian guild niches, and documented anthropogenic pressures across Hokersar and Shallabugh Wetland Conservation Reserves',
        headers: ['Ecological & Statutory Parameter', 'Hokersar (#1570) & Shallabugh (#2493) Synthesis'],
        rows: [
          [
            'Statutory Ramsar Designation & Extent',
            'Hokersar: Ramsar #1570 (Nov 2005), ~13.75 km² reserve (down from ~18.75 km² in 1969); Shallabugh: Ramsar #2493 (Aug 2022), 16.75 km² (1,675 ha) in Ganderbal.',
          ],
          [
            'Primary Hydrological Inputs & Regulation',
            'Hokersar fed by Doodhganga Flood Spill Channel & Sukhnag runoff, regulated by Sozeith needle-weir gates; Shallabugh fed by Sindh River branches & Anchar Lake outflow.',
          ],
          [
            'Optimal Winter Foraging Bathymetry',
            '0.25–0.45 m inundated mudflats and sedge margins for dabbling Anatidae (Pintail, Teal, Gadwall, Wigeon); 0.90–1.50 m open lagoons for diving ducks (Pochard, Ferruginous Duck).',
          ],
          [
            'Vegetation & Geomorphic Trajectory',
            'High suspended-sediment deposition driving Phragmites–Typha expansion, Salix encroachment, and seasonal Trapa natans / Nymphoides biomass buildup (Lolu et al., 2018; Bashir et al., 2022).',
          ],
          [
            'Contaminant & Perimeter Stressors',
            'Orchard organochlorine/organophosphate pesticide residues (Irshad et al., 2026), unintercepted domestic sewage, trace-metal uptake in Trapa natans (Elbagory et al., 2026), and suburban road/lighting encroachment.',
          ],
        ],
        footnote:
          'Compiled from Ramsar Information Sheets (#1570, #2493), KEW Expanded Wetlands Database, Lolu et al. (2018), Bashir et al. (2022), Alam et al. (2023), and Irshad et al. (2026).',
      },
    },
    {
      numberRoman: 'IV',
      title: 'Agrochemical Plumes and the Hardening Suburban Edge',
      subtitle:
        'Invisible pesticide residues in the water column meet asphalt, streetlights, and domestic drains along the outer bund.',
      paragraphs: [
        'Not every threat to Kashmir’s wintering grounds is visible in satellite false-color composites. Upstream across Budgam and Ganderbal, the conversion of rain-fed karewa slopes and paddy terraces into high-density apple orchards and commercial vegetable farms has multiplied seasonal applications of fungicides, organophosphates, and persistent agrochemicals. Washed off foliage and soils by autumn rains and irrigation return flows, these compounds enter tributary drains feeding directly into floodplain marshes. In a landmark emerging-contaminant study of Hokersar, Irshad et al. (2026) documented measurable pesticide residues within the wetland’s aquatic environment, highlighting sub-lethal bioaccumulation pathways affecting benthic invertebrates, marsh fish, and waterbirds—and, by extension, human households harvesting wetland plants.',
        'Nutrient enrichment and trace-element contamination compound that chemical burden along the urbanizing eastern and southern rims. Across Zainakote, Lawaypora, Soibugh, and Narthua, unsewered residential colonies discharge greywater and domestic sewage into perimeter ditches, elevating orthophosphate and ammoniacal nitrogen loads while depressing benthic dissolved oxygen. Evaluating physicochemical soil characteristics across four Kashmir Valley wetlands, Mir et al. (2025) confirmed statistically significant degradation at anthropogenically disturbed perimeter sites compared to interior marsh zones, while Elbagory et al. (2026) traced accumulation of eight heavy metals in edible water chestnut (Trapa natans) across four major Jammu and Kashmir water bodies, underscoring that wetland pollution directly intersects local food safety.',
        'At night, physical and sensory fragmentation completes the encirclement. Multi-lane highway bypass corridors, brick-and-concrete compound walls, and high-intensity LED streetlamps along peripheral bunds erode the dark acoustic buffer that nocturnal-foraging ducks require to disperse safely from central daytime roosts into outer paddy stubble. Where municipal solid waste is dumped illegally along embankment toes or seasonal marsh edges dry prematurely, packs of free-ranging dogs penetrate deep into reed compartments, flushing roosting flocks repeatedly during sub-zero nights when every unnecessary flight burns scarce lipid reserves needed for the spring return across the Himalayas.',
        'Compounding this boundary hardening is the rapid real-estate filling of low-lying rice paddies across the Srinagar–Budgam–Ganderbal peri-urban belt (Tak et al., 2025). For centuries, post-harvest paddy terraces surrounding Hokersar and Shallabugh functioned as nocturnal spillover pastures where Pintails, Mallards, and Greylag Geese gleaned fallen grain and aquatic snails after dusk before retreating inside protected reedbeds at dawn. Every hectare of surrounding paddy raised with karewa earthfill and sealed behind concrete plinth walls permanently erases both supplementary flyway foraging acreage and floodplain detention storage, forcing floodwater and wintering birds alike into an ever tighter statutory core.',
      ],
    },
    {
      numberRoman: 'V',
      title: 'The Unfinished Mandate of Wise Use',
      subtitle:
        'Moving from episodic central dredging to catchment-scale Ramsar governance.',
      paragraphs: [
        'Under Article 3.1 of the Ramsar Convention on Wetlands—reinforced domestically by India’s Wetlands (Conservation and Management) Rules, 2017 framed under the Environment (Protection) Act, 1986—designation as a Wetland of International Importance carries an explicit legal obligation to maintain each site’s "ecological character" through wise use. In practice across Jammu and Kashmir, institutional restoration budgets have historically gravitated toward episodic civil-engineering interventions: excavating perimeter bunds, installing boundary pillars, or mechanically dredging isolated central pools inside Hokersar and Hygam. While targeted de-silting and selective willow removal can temporarily reopen loafing water, treating the marsh bowl in isolation from its feeder watershed guarantees that the next three flood seasons refill the dredged trench.',
        'Durable recovery of Hokersar and Shallabugh requires governing the floodplain as a connected hydrological and social system. Upstream on the Doodhganga, Sukhnag, and Sindh tributaries, check-dam sediment traps, riparian vegetated buffers, and strict enforcement against agrochemical spraying near feeder channels must intercept silt and pesticides before they cross reserve boundaries. Along the Zainakote–Soibugh–Ganderbal suburban interface, decentralized sewage interception, shielded low-glare perimeter lighting, zero-dumping enforcement, and formal conservation easements over adjacent winter-flooded paddy fields can restore functional buffer width without displacing established villages.',
        'Equally vital is activating the statutory teeth of Rule 4 and Rule 7 of the 2017 Wetlands Rules: notifying legally enforceable "zones of influence" around Hokersar and Shallabugh where landfilling, untreated effluent discharge, and solid-waste dumping face automatic regulatory interdiction, while involving surrounding village communities in regulated autumn harvesting of excess Typha reed and Trapa biomass so organic litter does not rot into winter anoxia. Transparent public publication of monthly needle-gate water-level logs, hydrochemical pesticide assays, and synchronized bird-count methodologies by the J&K Wetland Authority would turn international Ramsar status from a ceremonial plaque into a verifiable public covenant.',
        'Above all, outlet needle-gate operations must be codified through joint ecological-hydraulic protocols co-managed by flood-control engineers, wildlife biologists, and surrounding agrarian panchayats—calibrating autumn retention to preserve both shallow dabbling flats and deeper diving basins while retaining emergency spill capacity. Wild waters do not end merely where a concrete boundary pillar stands in the reeds; they end wherever governance forgets that a city’s flood safety and a pintail’s winter survival depend on the exact same living sponge.',
      ],
    },
  ],
  documentarySources: [
    {
      label: 'Ramsar Sites Information Service — Hokersar Wetland (#1570)',
      url: 'https://rsis.ramsar.org/ris/1570',
      relevance: 'Official Ramsar designation dossier, coordinates, and ecological baseline for Hokersar',
    },
    {
      label: 'Ramsar Sites Information Service — Shallabugh Wetland Conservation Reserve (#2493)',
      url: 'https://rsis.ramsar.org/ris/2493',
      relevance: 'Official 2022 Ramsar designation dossier confirming 1,675 ha (16.75 km²) reserve extent',
    },
    {
      label: 'Lolu et al. (2018) — Wetlands (Springer)',
      url: 'https://doi.org/10.1007/s13157-018-1092-8',
      relevance: 'Macrophyte carbon sequestration and seasonal detritus dynamics in Hokersar Wetland',
    },
    {
      label: 'Alam et al. (2023) — Environmental Monitoring and Assessment',
      url: 'https://doi.org/10.1007/s10661-023-12185-7',
      relevance: 'Earth-observation satellite assessment of multi-decadal wetland dynamics in Kashmir Himalaya',
    },
    {
      label: 'Bashir et al. (2022) — Current World Environment',
      url: 'https://doi.org/10.12944/cwe.17.3.6',
      relevance: '28-year Landsat TM and LISS-IV LULC change analysis of Shallabugh Wetland',
    },
    {
      label: 'Irshad et al. (2026) — Wetlands Ecology and Management',
      url: 'https://doi.org/10.1007/s11273-026-10188-y',
      relevance: 'Assessment of emerging pesticide contaminants in the aquatic environment of Hokersar',
    },
    {
      label: 'Mir et al. (2025) — Scientific Reports',
      url: 'https://doi.org/10.1038/s41598-025-20632-3',
      relevance: 'Anthropogenic impacts on physicochemical soil properties across four Kashmir Valley wetlands',
    },
    {
      label: 'Parsons & Kannan (2018) — BMC Research Notes',
      url: 'https://doi.org/10.1186/s13104-018-3334-5',
      relevance: 'Seasonal waterbird baseline and late-winter influx patterns at Hokersar',
    },
    {
      label: 'Elbagory et al. (2026) — Scientific Reports',
      url: 'https://doi.org/10.1038/s41598-026-39522-3',
      relevance: 'Heavy-metal bioaccumulation in Trapa natans across four J&K water bodies',
    },
  ],
  editorialMetadataTable: [
    { attribute: 'Publication', assignment: 'Himalayan Dispatch' },
    { attribute: 'Edition', assignment: 'Vol. 01 / No. 01 · The Inaugural Issue' },
    { attribute: 'Department', assignment: 'Field Reports (Dispatches from the Field)' },
    { attribute: 'Byline', assignment: 'Himalayan Dispatch · Wetlands & Forest Desk' },
    { attribute: 'Geographical Focus', assignment: 'Hokersar & Shallabugh Ramsar Basins, Central Kashmir' },
    { attribute: 'Publication Gate', assignment: 'Stage 08 · Pre-Release Folio Awaiting Administrator Approval' },
  ],
  corrections: [],
  relatedKewModule: {
    label: 'Inspect KEW Ramsar Wetland Intelligence',
    href: '/water-systems/wetlands',
    scientificContext:
      'Cross-referenced with KEW Expanded Wetlands GIS records for Hokersar (#1570), Shallabugh (#2493), and Hygam (#2492).',
  },
  seoTitle: 'Where the Wild Waters End: Hokersar, Shallabugh & Kashmir’s Ramsar Wetlands',
  seoKeywords: [
    'Where the Wild Waters End',
    'Hokersar Wetland Ramsar 1570',
    'Shallabugh Wetland Conservation Reserve 2493',
    'Central Asian Flyway Kashmir waterbirds',
    'Doodhganga siltation Hokersar hydroperiod',
    'Himalayan Dispatch wetlands field report',
  ],
};
