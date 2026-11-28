// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — VOL. 01 / NO. 01 · FIELD REPORTS (COMMUNITIES & FORESTS)
// STORY 05: "The People Who Guard the Forest"
// Montane Zonation, Forest Rights, Gendered Commons & Slope Wildfire Dossier
// ─────────────────────────────────────────────────────────────────────────────

import { buildPreReleaseStage08GateLedger } from '@/lib/himalayan-dispatch-metrics';
import type { MagazineStory } from '@/types/himalayan-dispatch';

export const STORY_05_FOREST_GUARDIANS: MagazineStory = {
  id: 'hd-story-04',
  slug: 'the-people-who-guard-the-forest',
  editionSlug: 'vol-01-no-01',
  editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
  departmentId: 'field-reports',
  secondaryDepartmentIds: ['longform-features'],
  departmentRubric: 'COMMUNITIES · DISPATCHES FROM THE FIELD',
  folioCode: '02B / FIELD DISPATCH',
  title: 'The People Who Guard the Forest',
  subtitle:
    'Altitudinal commons, Forest Rights Act transitions, women’s hearth labor, and manual autumn wildfire defense across the montane watersheds of Jammu and Kashmir.',
  excerpt:
    'Between blue-pine foothills at 1,800 meters and the Himalayan birch treeline at 3,600 meters, the survival of Kashmir’s temperate canopy depends on an uneasy partnership of customary village restraint, pastoral transhumance, under-equipped beat guards, and statutory reform.',
  dateline: 'DAKSUM · BRINGI · PIR PANJAL & KISHTWAR MONTANE BELTS',
  region: 'South Kashmir, Pir Panjal & Chenab Forest Divisions',
  readingTimeMinutes: 12,
  wordCount: 2647,
  proseWordCount: 2262,
  publishedAt: '2026-11-25',
  updatedAt: '2026-11-27',
  heroImage: '/images/protected-network/protected-wildlife-sanctuaries-overa.jpg',
  heroCaption:
    'Temperate conifer canopy and rugged subalpine limestone-shale ridges across southern Kashmir’s montane forest-sanctuary belt (Illustrative archival plate).',
  heroCredit: 'Kashmir EcoWatch Visual Archive (Illustrative archival plate)',
  conceptualFolioDisclosure:
    'Inaugural Desk & Statutory Forestry Dossier: Synthesizes Forest Survey of India baselines, Forest Rights Act (2006) frameworks, and peer-reviewed montane ecology without synthetic field interviews.',
  journalistSlug: 'wetlands-forest-desk',
  bylineDisplay: 'Himalayan Dispatch · Wetlands & Forest Desk',
  bylineRole: 'Montane Commons & Frontline Stewardship Dossier',
  factCheckedBy: 'Stage 04 Documentary & Citation Audit Completed · Himalayan Dispatch Desk',
  scientificReviewer:
    'Stage 05 Independent External Specialist Certification Pending (Pre-Release Stage 08)',
  workflowStage: 'editorial_approval',
  isPublished: true,
  hasCompletedIndependentReview: false,
  reportingBeatSlug: 'forests-biodiversity-mountain-commons',
  reportingBeatLabel: 'Forests, Biodiversity & Mountain Commons',
  publicationStatusNote:
    'Stage 08 · Pre-Release Edition Folio Awaiting Administrator Approval',
  publicationGates: buildPreReleaseStage08GateLedger({
    scientificReviewApplicable: true,
    evidenceSummary:
      'Forest Survey of India (ISFR) canopy baselines, statutory provisions of the Indian Forest Act (1927) and Forest Rights Act (2006), and peer-reviewed Himalayan treeline, silvicultural, and fire-aerosol studies verified at Stage 04.',
    scientificNote:
      'Internal forest ecology, silvicultural governance, and wildfire dynamics synthesis completed; independent external specialist certification under Stage 05 remains pending prior to formal public release.',
    ethicsAndVisualNote:
      'Synthetic correspondent attribution and unverified personal village-elder quote removed; forest plates serve as representative montane habitat context with zero claim of depicting specific named individuals.',
  }),
  editorialVerificationNote:
    'This dossier synthesizes peer-reviewed Western Himalayan forest ecology, Forest Survey of India (ISFR) assessments, statutory forestry and Forest Rights Act (2006) frameworks, and documented frontline stewardship practices across Jammu and Kashmir. No fabricated personal interviews or unverified quotes appear in this text.',
  chapters: [
    {
      numberRoman: 'I',
      title: 'The Vertical Architecture of the Montane Watershed',
      subtitle:
        'From lower blue-pine benches to the snow-bent Himalayan birch line at 3,600 meters.',
      dateline: 'DAKSUM–BRINGI TO PIR PANJAL & KISHTWAR · 1,800–3,800 M',
      paragraphs: [
        'Climb out of any cultivated paddy valley in southern Kashmir—up the Bringi gorge past Daksum, along the east flank of the Pir Panjal above Shopian, or across the steep phyllite ridges linking Anantnag toward Kishtwar—and the mountain reorganizes itself into distinct botanical storeys. Between 1,800 and 2,600 meters, sunlit south- and west-facing benches carry open stands of Himalayan blue pine (Pinus wallichiana) and columnar deodar cedar (Cedrus deodara), anchored underground by dense ectomycorrhizal fungal networks that bind skeletal mountain soils and mediate drought stress (Itoo & Reshi, 2013). Cooler, moister north-facing slopes between 2,400 and 3,200 meters pass into dark, multi-layered canopies of West Himalayan silver fir (Abies pindrow) and Morinda spruce (Picea smithiana), whose deep needle humus acts as a slow-release hydrological sponge.',
        'Higher still, between roughly 3,300 and 3,800 meters, tall conifers give way to the wind-sculpted subalpine ecotone of Himalayan birch (Betula utilis) and rhododendron krummholz—the living ceiling of the Western Himalayan forest (Wani, Kumar, & Islam, 2026). Across this upper boundary, trees survive extreme winter burial, short frost-free growing windows, and intense ultraviolet radiation through finely tuned physiological adaptations; field analyses by Singh et al. (2024) document significant seasonal osmotic adjustment in Betula utilis turgor relations across the western Himalayan treeline, while Kumar and Khanduri (2024) synthesize how regional warming is altering phenophases and regeneration dynamics along the alpine margin.',
        'For the hamlets tucked beneath these slopes, vertical forest zonation has never been an abstract botanical diagram. In Kashmiri cultural memory, Sheikh Noor-ud-Din Wali’s fourteenth-century ecological maxim—that food will endure only so long as the forest endures—expresses an uncompromising law of mountain physics. Intact Abies and Betula stands arrest winter slab avalanches, shade the spring snowpack so meltwater releases into perennial karst and fracture springs through July and August rather than roaring down in destructive March flash torrents, and hold colluvial slopes above wooden roofs and terraced orchards. According to Forest Survey of India (ISFR) biennial assessments and KEW landscape baselines, contiguous dense canopy covers roughly 4,380 square kilometers across the wider region—yet its survival depends daily on the human institutions inhabiting its lower edge.',
        'Beneath the visible timberline, the resilience of this vertical watershed rests on microscopic and faunal linkages easily disrupted by canopy opening. Molecular root analyses of Pinus wallichiana in the Kashmir Himalaya reveal complex root-associated fungal communities sensitive to soil disturbance and desiccation (Koukol, 2019), while DNA metabarcoding of threatened Himalayan forest ungulates—including alpine musk deer inhabiting upper fir-birch transitions—demonstrates sharp seasonal dietary specialization during autumn, when survival hinges on intact understory browse and lichen diversity (Javid et al., 2026). Protecting a forest compartment therefore safeguards an entire vertical web of soil fungi, endemic wildlife corridors, and downstream drinking water.',
      ],
      fieldNote: {
        label: 'ALTITUDINAL ECOTONE BASELINE',
        detail:
          'Temperate montane stands transition from Pinus wallichiana and Cedrus deodara (1,800–2,600 m) through Abies pindrow–Picea smithiana (2,400–3,200 m) to the Betula utilis treeline at 3,300–3,800 m.',
      },
    },
    {
      numberRoman: 'II',
      title: 'From Colonial Demarcation to the Forest Rights Act',
      subtitle:
        'Reconciling compartmental working plans with customary commons and transhumant routes.',
      paragraphs: [
        'For more than a century, formal forest governance in Jammu and Kashmir operated through an architecture of territorial demarcation designed primarily to secure commercial timber revenue and state monopoly over high-value deodar and kail compartments. Beginning with late-nineteenth-century Dogra forest settlements and codified through the Jammu and Kashmir Forest Act of 1987 Bikrami (1930 CE)—subsequently superseded following the 2019 constitutional reorganization by the central Indian Forest Act, 1927—mountain slopes were partitioned into demarcated forest compartments governed by decadal silvicultural Working Plans, timber-concession zones, and punitive offence registers.',
        'Yet alongside statutory boundary pillars, vernacular rules of local restraint persisted across snow-bound villages and seasonal pastoral corridors. Prior to the arrival of Joint Forest Management (JFM) resolutions and Village Forest Committees (VFCs), customary hamlet norms frequently distinguished between green standing timber—whose felling invited collective sanction as well as slope hazard—and fallen dry branchwood needed to survive sub-zero winters. Simultaneously, transhumant Gujjar and Bakarwal pastoralists maintained multi-generational seasonal migration corridors across the Pir Panjal passes toward high alpine dhok pastures (Bhat & Thirumurugan, 2026), rotating herd timing in ways intimately tied to snowmelt phenology and soil structural thresholds (Hussain et al., 2025).',
        'Since late 2020, the operationalization in Jammu and Kashmir of the Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006 (FRA) has opened the most consequential legal transition in regional forestry history. Beyond individual habitation and cultivation claims, Section 3(1)(i) of the FRA explicitly recognizes Community Forest Resource (CFR) rights—empowering Gram Sabhas and Forest Rights Committees to protect, regenerate, conserve, and manage customary forest landscapes for sustainable use. On the ground, however, implementation remains uneven: jurisdictional friction persists between Forest Department Working Plan prescriptions and Gram Sabha CFR authority, evidentiary hurdles complicate claims by seasonal pastoralists whose grazing circuits cross multiple administrative districts, and many VFCs formed under earlier executive orders have yet to be harmonized with statutory democratic forest-rights governance.',
        'That institutional overlap plays out concretely inside the three-tier FRA adjudication process—moving from village-level Gram Sabha Forest Rights Committees through Sub-Divisional Level Committees to District Level Committees. Where participatory Joint Forest Management earlier positioned villagers primarily as auxiliaries invited by a Range Officer to guard degraded closures in exchange for discretionary administrative shares, statutory CFR recognition places legal conservation authority in the community assembly itself. Harmonizing scientific silvicultural prescriptions for Cedrus deodara and Pinus wallichiana regeneration (Shrivastava & Siaguru, 1997) with democratically verified CFR management plans remains the central governance test across South Kashmir, Rajouri, Poonch, Doda, and Kishtwar.',
      ],
      pullQuote: {
        quote:
          'Durable Himalayan forestry begins when mountain communities and pastoralists are recognized in law not as tolerated concessionaires at the compartment gate, but as statutory co-custodians of the watershed.',
        attribution: 'Himalayan Dispatch · Wetlands & Forest Desk',
        context: 'Forest Rights & Commons Governance Synthesis',
      },
    },
    {
      numberRoman: 'III',
      title: 'The Gendered Ecology of the Forest Margin',
      subtitle:
        'Women’s daily labor in deadwood fuel collection, fodder lopping, medicinal flora, and springhead care.',
      paragraphs: [
        'Any honest accounting of who walks, observes, and stewards the lower forest boundary every day must reckon with gender. Across upland villages in Anantnag, Kulgam, Shopian, Kupwara, Poonch, Rajouri, and Kishtwar—where piped winter heating does not exist, liquefied petroleum gas cylinders face winter road closures and cost barriers, and grid electricity suffers load-shedding during peak frost—household thermal survival rests overwhelmingly on women’s headloads of dry fuelwood and pine litter gathered during October and November before snow seals the bridle paths.',
        'Far from indiscriminate extraction, experienced women’s gathering groups rely on granular ecological literacy: identifying wind-thrown limbs, snow-snapped tops, and dry lower branches while avoiding resin-rich live cambium, and timing rotational leaf-fodder lopping of broadleaved border trees (Ulmus, Celtis, Salix, and, on southern Pir Panjal slopes, Quercus species) so coppice vigour survives for subsequent winters. In spring, rural women and pastoral families are also primary collectors of high-value non-timber forest products (NTFPs)—most famously wild morel mushrooms (Morchella esculenta, known locally as guchhi or kanaguchh), which fruit fleetingly on humus-rich conifer floors after snowmelt, alongside threatened alpine and subalpine medicinal herbs such as Aconitum heterophyllum (Gillani et al., 2025).',
        'Because women traverse side-ravines and springheads (nags) almost daily across three seasons, they are routinely the first observers to notice fresh stump sawdust from illicit night-time timber felling, bark-beetle discolouration in stressed blue pine stands, landslide tension cracks above footpaths, or declining discharge at forest-fed drinking springs. Paradoxically, institutional forestry bodies—from formal VFC executive committees to departmental consultation camps—have historically under-represented women in formal decision-making and silvicultural benefit-sharing, separating those who possess the sharpest daily knowledge of the forest floor from the budgets meant to regenerate it.',
        'Economic inequity mirrors that institutional exclusion across the non-timber forest economy. Although dried Kashmir guchhi morels command premium prices across national and international culinary markets, primary women and pastoral gatherers selling small sun-dried strings at remote roadheads typically receive only a fraction of downstream wholesale value, while erratic spring snowmelt and autumn ground fires increasingly depress fungal fruiting yields. Similarly, when unregulated external contractors hire transient crews to uproot whole rhizomes of endangered medicinal taxa rather than leaving reproductive rootstock intact, local households lose both traditional pharmacopoeia and sustainable seasonal income.',
      ],
      plate: {
        imageUrl: '/images/publications/forestry-betula-treeline-lidar.jpg',
        caption:
          'High-elevation Himalayan birch (Betula utilis) and upper conifer transition zone, where snowpack retention and regeneration depend on protecting subalpine ecotones from fire and canopy severance.',
        credit: 'Kashmir EcoWatch Visual Archive',
        aspect: 'wide',
      },
    },
    {
      numberRoman: 'IV',
      title: 'Dry Autumns and the Anatomy of Slope Wildfires',
      subtitle:
        'How late-autumn precipitation deficits turn temperate pine and cedar duff into an unseasonal tinderbox.',
      paragraphs: [
        'Historically, forest fire management in the northwestern Himalayas treated wildfire primarily as a pre-monsoon (April–June) hazard concentrated in lower-elevation subtropical chir pine (Pinus roxburghii) belts of the Jammu foothills, while Kashmir’s higher temperate conifers remained buffered by autumn rains and early November snow. Over the past decade, erratic Western Disturbance arrival and prolonged October–December dry spells have rewritten that seasonal calendar. When sixty or seventy rainless autumn days coincide with above-normal daytime temperatures across south-facing slopes at 1,900 to 2,800 meters, accumulated Pinus wallichiana needle litter, dry grass tussocks, and resinous cones desiccate to critical ignition thresholds right in the middle of late autumn and early winter.',
        'Atmospheric monitoring across the Western Himalaya confirms the regional footprint of these shifting burn windows. Analysing seasonal fire-influenced aerosols over a Western Himalayan station, Bawari et al. (2026) documented sharp black-carbon enhancements linked to biomass burning episodes alongside wintertime boundary-layer trapping exceeding 4 micrograms per cubic meter—a double penalty in which slope fires simultaneously destroy forest-floor regeneration and deposit light-absorbing soot onto adjacent snowfields and glaciers. Ecologically, whereas mature thick-barked conifers may survive a fast, low-intensity surface burn, intense dry-autumn fires consume ectomycorrhizal humus, kill sapling cohorts of Cedrus deodara and Abies pindrow, and sterilize thin organic soils on steep limestone and shale scree.',
        'Topography turns every Himalayan Compartment fire into a three-dimensional physics problem. On forty-five-degree ravines, daytime upslope valley winds pre-heat fuel beds above the flame front, driving rapid uphill runs; after sunset, burning pine cones detach and roll hundreds of meters downslope across rocky gullies, igniting secondary spot fires behind containment lines and turning dark mountainsides into treacherous traps of smoke, loose talus, and unseen cliffs.',
        'Near-real-time satellite thermal detections from MODIS and Suomi-NPP VIIRS sensors relayed through the Forest Survey of India’s fire-alert system now register autumn and early-winter burn clusters at elevations that rarely burned a generation ago. Landscape fragmentation amplifies that climatic vulnerability: wherever widened hill roads, high-voltage transmission corridors, or unstabilized quarry cuts slice across contiguous conifer slopes, sunlit edges dry out faster and invite flammable invasive scrub, turning a single careless ember along a footpath or grazing camp into a multi-compartment crown threat.',
      ],
    },
    {
      numberRoman: 'V',
      title: 'Green Boughs, Soil Trenches, and Uninsured Labor',
      subtitle:
        'Inside the manual containment reality faced by beat guards, casual watchers, and hamlet volunteers.',
      paragraphs: [
        'When a smoke plume rises at dusk from a compartment three hours’ climb above the nearest motorable road in Verinag, Tral, Shopian, Kupwara, or Doda, neither municipal fire tenders nor aerial buckets can reach the ridge. Containment depends almost entirely on human legs and hand tools. Territorial beat guards, Forest Protection Force personnel, temporary daily-rated watchers, transhumant shepherds, and village youths ascend on foot—often carrying drinking water in plastic jerrycans, agricultural spades, iron rakes, and improvised beaters cut from green conifer boughs—to scrape bare mineral-soil firelines (counter-trenches) across the flank of the advancing litter fire before midnight gusts push flames into the crown.',
        'The human vulnerability of that frontline response is stark and documented. As recorded in the inaugural cover inquiry of this issue, December 2025 alone witnessed fatal line-of-duty tragedies during winter firefighting and slope patrol in Verinag and Doda. Across remote ranges, casual watchers and community volunteers frequently confront steep night-time fire fronts in ordinary rubber or canvas footwear without flame-resistant clothing, protective helmets, smoke respirators, or reliable VHF radio repeaters capable of bridging deep mountain gorges where cellular signals vanish.',
        'Institutional asymmetries deepen this exposure. Permanent officers, beat guards, contractual helpers, and unpaid village responders share the exact same physical peril of rolling boulders, carbon monoxide, and cliff falls on a burning slope, yet occupy vastly unequal tiers of medical coverage, risk allowance, and casualty compensation. Similarly, while Joint Forest Management guidelines promise Village Forest Committees an equitable share of usufructs and intermediate silvicultural yields in exchange for round-the-clock patrol and fire suppression, bureaucratic delays in working-plan disbursements and opaque accounting have repeatedly strained community trust.',
        'Outside fire season, the everyday arithmetic of beat staffing imposes equally heavy strain. A single territorial guard or daily-wage watcher is frequently assigned responsibility for fifteen hundred to three thousand hectares of steep, dissected terrain—expected simultaneously to deter organized nocturnal timber-smuggling syndicates operating motor vehicles and cordless saws, document encroachment, monitor wildlife movement along orchard boundaries, and maintain nursery closures. Without neighbourhood cooperation from surrounding villages and pastoral camps, no ranger roster could physically watch even a tenth of those ridges.',
      ],
      editorialTable: {
        kicker: 'TABLE I · MONTANE FOREST GOVERNANCE & STEWARDSHIP MATRIX',
        caption:
          'Altitudinal forest zones, dominant taxa, overlapping institutional regimes, and frontline stewardship vulnerabilities across Jammu and Kashmir',
        headers: ['Montane Zone / Governance Dimension', 'Ecological Structure & Institutional Reality'],
        rows: [
          [
            'Lower-to-Mid Temperate Belt (1,800–2,600 m)',
            'Pinus wallichiana & Cedrus deodara stands with ectomycorrhizal soil networks (Itoo & Reshi, 2013; Shrivastava & Siaguru, 1997); high exposure to October–December dry-spell litter fires.',
          ],
          [
            'Upper Temperate & Subalpine Belt (2,400–3,800 m)',
            'Abies pindrow, Picea smithiana, and Betula utilis treeline ecotone (Singh et al., 2024; Kumar & Khanduri, 2024); critical snowpack shading, avalanche baffling, and summer spring recharge.',
          ],
          [
            'Statutory & Customary Institutions',
            'Indian Forest Act (1927) compartmental Working Plans alongside JFM Village Forest Committees and post-2020 Individual & Community Forest Resource (CFR) claims under the Forest Rights Act, 2006.',
          ],
          [
            'Gendered Subsistence & NTFP Economy',
            'Women’s rotational deadwood fuel collection, regulated leaf-fodder lopping, Morchella esculenta (guchhi) and medicinal plant gathering (Gillani et al., 2025), and early ecological anomaly detection.',
          ],
          [
            'Frontline Fire & Patrol Deficits',
            'Manual containment via mineral-soil trenches and bough beaters hours from roadheads; acute deficits in protective boots, radio telemetry, accident insurance for casual watchers/volunteers, and timely VFC revenue sharing.',
          ],
        ],
        footnote:
          'Synthesized from ISFR canopy assessments, Forest Rights Act (2006) statutory provisions, Singh et al. (2024), Kumar & Khanduri (2024), Gillani et al. (2025), and Bawari et al. (2026).',
      },
    },
    {
      numberRoman: 'VI',
      title: 'Co-Custodianship Beyond Policing',
      subtitle:
        'Structural reforms to align statutory forest rights, frontline safety, and winter energy security.',
      paragraphs: [
        'Protecting the montane forests of the Western Himalayas through the coming decades of warmer autumns and intensifying infrastructure pressure requires retiring the nineteenth-century premise that conservation means fencing local residents out of state timber estates. Where communities hold secure tenure, transparent benefit-sharing, and legal standing to exclude commercial timber smuggling and unregulated slope excavation, village vigilance outperforms distant policing every day of the year.',
        'Four practical reforms stand out from the documentary and scientific record. First, Community Forest Resource (CFR) titles under the Forest Rights Act, 2006 should be transparently adjudicated and integrated with scientific Working Plans—explicitly safeguarding transhumant Gujjar-Bakarwal grazing corridors while mandating statutory representation for rural women on all Village Forest and CFR management committees. Second, every beat guard, daily-rated watcher, and registered village fire-response volunteer must be equipped prior to each autumn dry season with mountaineering-grade fire-resistant boots, headlamps, VHF/satellite emergency beacons, and automatic group accident and disability insurance.',
        'Third, transparent digital escrows should ensure that JFM rehabilitation grants, eco-restoration wages, and sustainable NTFP value-addition cooperatives return tangible economic dividends directly to forest-fringe households. Finally, relieving winter pressure on regenerating oak, birch, and conifer margins requires treating clean, affordable rural winter heating and domestic thermal insulation as core watershed-conservation policy. The people who guard the forest with spades in the November dark are defending the water supply of every downstream town in the Jhelum and Chenab basins; environmental governance owes them tools, legal dignity, and an equal seat at the table.',
        'Viewed through rigorous natural-capital accounting, investing in frontline human stewardship is the most cost-effective infrastructure expenditure available to a mountain state. Holding roughly 142.8 million tonnes of forest carbon stock while regulating snowmelt delivery to millions of irrigated hectares and municipal taps, Kashmir’s temperate conifers and subalpine birch belts perform hydrological engineering that no concrete dam could replicate; securing the rights, safety, and winter livelihoods of the mountain communities and beat staff who keep those slopes standing is the indispensable condition of regional survival.',
      ],
    },
  ],
  documentarySources: [
    {
      label: 'Singh et al. (2024) — Scientific Reports',
      url: 'https://doi.org/10.1038/s41598-024-66682-x',
      relevance: 'Water relations and phenological traits of Betula utilis in the western Himalayan treeline ecotone',
    },
    {
      label: 'Kumar & Khanduri (2024) — Heliyon',
      url: 'https://doi.org/10.1016/j.heliyon.2024.e40797',
      relevance: 'Synthesis of climate change impacts on Himalayan alpine treeline vegetation',
    },
    {
      label: 'Wani, Kumar & Islam (2026) — Phytotaxa (Zenodo Archive)',
      url: 'https://doi.org/10.5281/zenodo.24513944',
      relevance: 'Coniferous temperate Pinus wallichiana, Abies pindrow, and Betula utilis zonation in Kashmir Himalaya',
    },
    {
      label: 'Bawari et al. (2026) — Environmental Monitoring and Assessment',
      url: 'https://doi.org/10.1007/s10661-026-15709-z',
      relevance: 'Seasonal dynamics and radiative impact of fire-influenced aerosols in the Western Himalaya',
    },
    {
      label: 'Gillani et al. (2025) — BMC Plant Biology',
      url: 'https://doi.org/10.1186/s12870-025-07859-y',
      relevance: 'Montane habitat distribution and conservation of threatened medicinal flora (Aconitum heterophyllum)',
    },
    {
      label: 'Bhat & Thirumurugan (2026) — Historical Research Journal of History and Archaeology',
      url: 'https://doi.org/10.67860/hrjha.v4.i2.115',
      relevance: 'Historical and ecological patterns of Gujjar and Bakarwal pastoral migration across the Pir Panjal',
    },
    {
      label: 'Hussain et al. (2025) — AATCC Review',
      url: 'https://doi.org/10.21276/aatccreview.2025.13.04.502',
      relevance: 'Soil density–porosity stability gradients across Pir Panjal mountain land-use systems',
    },
    {
      label: 'Itoo & Reshi (2013) — Pakistan Journal of Biological Sciences',
      url: 'https://doi.org/10.3923/pjbs.2014.32.40',
      relevance: 'Ectomycorrhizal fungal diversity associated with Cedrus deodara and Pinus wallichiana in Kashmir',
    },
    {
      label: 'Forest Survey of India — India State of Forest Report (ISFR)',
      url: 'https://fsi.nic.in/',
      relevance: 'Statutory biennial canopy cover, forest carbon stock, and fire-alert monitoring baselines',
    },
  ],
  editorialMetadataTable: [
    { attribute: 'Publication', assignment: 'Himalayan Dispatch' },
    { attribute: 'Edition', assignment: 'Vol. 01 / No. 01 · The Inaugural Issue' },
    { attribute: 'Department', assignment: 'Field Reports (Dispatches from the Field)' },
    { attribute: 'Byline', assignment: 'Himalayan Dispatch · Wetlands & Forest Desk' },
    { attribute: 'Geographical Focus', assignment: 'Daksum, Bringi, Pir Panjal & Kishtwar Montane Divisions' },
    { attribute: 'Publication Gate', assignment: 'Stage 08 · Pre-Release Folio Awaiting Administrator Approval' },
  ],
  corrections: [],
  relatedKewModule: {
    label: 'Explore KEW Forest Ecosystems & Protected Corridors',
    href: '/biodiversity/forest-ecosystems',
    scientificContext:
      'Paired with KEW Biodiversity & Earth-Human Impact (EHII) temperate forest canopy and wildfire baselines.',
  },
  seoTitle: 'The People Who Guard the Forest: Montane Commons & Forest Rights in Kashmir',
  seoKeywords: [
    'The People Who Guard the Forest',
    'Forest Rights Act 2006 Jammu and Kashmir CFR',
    'Betula utilis Cedrus deodara Kashmir conservation',
    'Himalayan autumn forest fires community stewardship',
    'Village Forest Committees Kashmir women NTFP guchhi',
  ],
};
