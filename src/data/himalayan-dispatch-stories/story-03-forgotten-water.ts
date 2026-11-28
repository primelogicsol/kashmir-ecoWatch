// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — VOL. 01 / NO. 01 · 01 / THE BIG READ (LONGFORM FEATURE)
// "THE WATER WE HAVE FORGOTTEN"
// Historical hydrology & urban systems investigation into Srinagar's lost
// canals, severed detention wetlands, September 2014 inundation mechanics,
// and realistic pathways for lacustrine reconnection.
// ─────────────────────────────────────────────────────────────────────────────

import { buildPreReleaseStage08GateLedger } from '@/lib/himalayan-dispatch-metrics';
import { MagazineStory } from '@/types/himalayan-dispatch';

export const STORY_03_FORGOTTEN_WATER: MagazineStory = {
  id: 'hd-story-02',
  slug: 'the-water-we-have-forgotten',
  editionSlug: 'vol-01-no-01',
  editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
  departmentId: 'longform-features',
  secondaryDepartmentIds: ['investigative-journalism', 'data-journalism'],
  departmentRubric: '01 / THE BIG READ',
  folioCode: '01 / THE BIG READ',
  title: 'The Water We Have Forgotten',
  subtitle:
    'A longform environmental feature on Srinagar’s lost canals, drowned ghats, and hydraulic memory.',
  excerpt:
    'Beneath Marplan’s asphalt corridor and culverted drains lies an amphibious capital engineered over centuries to breathe with seasonal floodwaters—a connected lacustrine network severed within two generations and remembered in every storm.',
  dateline: 'SHEHR-E-KHAS (SRINAGAR) · BRARI NAMBAL, MARPLAN & KHUSHALSAR',
  region: 'Kashmir Valley · Jhelum Urban Basin',
  readingTimeMinutes: 21,
  wordCount: 4524,
  proseWordCount: 3952,
  publishedAt: '2026-11-25',
  updatedAt: '2026-11-27',
  heroImage: '/images/himalayan-dispatch/big-read-forgotten-water.jpg',
  heroCaption:
    'Morning mist over carved limestone steps and autumn chinar reflections along a surviving backwater channel in Srinagar (Illustrative archival plate).',
  heroCredit: 'Himalayan Dispatch Visual Editions Desk (Illustrative archival plate)',
  conceptualFolioDisclosure:
    'Inaugural Desk & Historical Hydrology Dossier: Synthesizes archival chronicles, post-2014 CWC/NRSC flood reconstructions, and peer-reviewed Kashmir wetland scholarship; zero synthetic personal interviews are presented.',
  journalistSlug: 'investigations-urban-water-desk',
  bylineDisplay: 'Himalayan Dispatch · Investigations & Urban Water Desk',
  bylineRole: 'Historical Hydrology & Urban Systems Dossier',
  photographyByline: undefined,
  factCheckedBy: 'Stage 04 Documentary & Citation Audit Completed · Himalayan Dispatch Desk',
  scientificReviewer:
    'Stage 05 Independent External Specialist Certification Pending (Pre-Release Stage 08)',
  workflowStage: 'editorial_approval',
  isPublished: true,
  isBigRead: true,
  reportingBeatSlug: 'urban-hydrology-wetlands-floodplain-governance',
  reportingBeatLabel: 'Urban Hydrology, Wetlands & Floodplain Governance',
  seoTitle: 'The Water We Have Forgotten · Nallah Mar & Srinagar Urban Hydrology',
  publicationStatusNote:
    'Stage 08 · Pre-Release Edition Folio Awaiting Administrator Approval',
  publicationGates: buildPreReleaseStage08GateLedger({
    scientificReviewApplicable: true,
    evidenceSummary:
      'Verified against Kalhana’s Rajatarangini (Stein trans., 1900), Walter R. Lawrence’s The Valley of Kashmir (1895), CWC/NRSC September 2014 Jhelum flood records, and peer-reviewed Kashmir wetland/hydrology studies (Lolu et al. 2018; Parvaze et al. 2021; Romshoo & Yousuf 2022; Alam et al. 2023; Sultan et al. 2024; Attar et al. 2025; Mir et al. 2025; Shah 2026).',
    scientificNote:
      'Hydrological capacities, wetland land-cover contractions, and water-quality metrics cross-checked internally; independent external Stage 05 urban-hydrology specialist certification pending.',
    ethicsAndVisualNote:
      'All unverified personal interviews and synthetic personas excluded. Colonial Survey of India cartographic baselines are cited explicitly via secondary historical and remote-sensing scholarship rather than claimed primary sheet custody; visual plates carry institutional credits.',
    adminHoldNote:
      'Stage 08 Pre-Release Edition Folio awaiting Founding Administrator release approval.',
  }),
  chapters: [
    {
      numberRoman: 'I',
      title: 'Beneath the Asphalt Ribbon of Marplan',
      subtitle:
        'How an amphibious river-and-lagoon capital became a paved, pump-dependent flood bowl.',
      dateline: 'BOHRI KADAL TO SARAF KADAL · DOWNTOWN SRINAGAR',
      paragraphs: [
        'Walk along the tightly packed brick-and-timber shopfronts of Srinagar’s *Shehr-e-Khas* shortly after daybreak, before commercial shutters lift and two-wheelers fill the carriageway, and the streetscape betrays an older topography. Every few hundred paces along Marplan Road, municipal bus stops and neighbourhood signboards announce bridges where no water flows: *Saraf Kadal*, *Kani Kadal*, *Razdan Kadal*, *Bohri Kadal*, *Nawa Kadal* approaches, and *Tarabal*—literally the place of the ferry crossing. Look closer at the plinths of older shrines and masonry tenements set back from the kerb, and truncated flights of grey Devri limestone steps still angle downward, only to vanish abruptly into compacted macadam and concrete drain slabs.',
        'Those buried landings—known in Kashmiri as *yarbals*—were not ornamental embankments. For more than five hundred years, they formed the living threshold between domestic architecture and an intricate urban waterway: the *Nallah Mar*, a stone-lined navigable canal that threaded westward from the lagoon of Brari Nambal through the artisanal heart of downtown Srinagar toward Khushalsar and Anchar Lake. Until living memory, grain barges (*doongas*), market-garden skiffs (*shikaras*), timber rafts and brick boats glided beneath arched stone and cedar bridges along the exact alignment now occupied by bumper-to-bumper motor traffic.',
        'Geologically, Srinagar was never meant to be a dry-land metropolis. Occupying the central trough of a tectonic intermontane valley at roughly 1,580 to 1,585 metres above sea level, the city rests upon fine Quaternary lacustrine silts, clays and alluvial levees left behind by the prehistoric *Satisar* palaeolake, flanked on the east by the steep Zabarwan–Mahadev foothills and elsewhere by elevated Pleistocene *karewa* tablelands. Across this remarkably flat valley floor, the Jhelum River (*Vyeth*) loses gradient dramatically as it winds northwestward toward Wular Lake, meandering through natural backswamps (*nambals*) and oxbow depressions.',
        'Pre-modern builders understood that a city seated inside an active alluvial floodplain could endure spring snowmelt and late-monsoon cloudbursts only by remaining amphibious. Rather than erecting rigid walls to confine every cubic metre of discharge within a single river slot, vernacular urbanism surrounded the Jhelum with interconnected relief rooms—distributary canals, inner-city lagoons, floating reed marshes, and stepped *yarbal* riverfronts designed to absorb, detain and slowly release excess head.',
        'Within barely five decades, that amphibious covenant was inverted. Canals were filled into roads; marshes were reclassified in municipal ledgers as buildable land banks; and gravity-fed circulation loops were replaced by culverted drains and diesel dewatering pumps. Today, thirty minutes of intense convective rain leaves Srinagar’s low-lying wards ankle-deep in stagnant stormwater—not because the sky has become unrecognizable, but because the city paved over its own lungs.',
        'That physical erasure also dismantled an architectural intelligence tuned to saturated ground. Along historic Jhelum levees and *Nallah Mar* embankments, builders paired stepped Devri stone *yarbal* foundations—capable of accommodating three-to-four-metre seasonal water-level swings—with flexible timber-laced masonry (*taq* and *dhajji-dewari*) and projecting cedar latticework (*pinjrakari*) that caught evaporative summer breezes off the water while riding out alluvial settlement and Himalayan earthquakes. Replacing breathable riverfront thresholds with rigid concrete retaining walls and sealed asphalt corridors severed architecture from basin hydrology.',
      ],
      pullQuote: {
        quote:
          'Every bridge name stranded above dry asphalt in Shehr-e-Khas is a topographic witness: Srinagar was built not to wall water out, but to give seasonal floodwaters rooms in which to rest and pass.',
        attribution: 'Himalayan Dispatch · Urban Hydrology Dossier',
        context: 'Inaugural Big Read Inquiry',
      },
      fieldNote: {
        label: 'TOPOGRAPHIC & TOPONYMIC DATUM',
        detail:
          'Srinagar’s historic core (~1,580–1,585 m ASL) sits across low-gradient Jhelum alluvial levees and lacustrine *nambal* depressions; surviving *kadal* (bridge), *yarbal* (landing), and *nambal* (marsh) toponyms trace buried or severed channels across the Old City.',
      },
    },
    {
      numberRoman: 'II',
      title: 'Zain-ul-Abidin’s Canal and Five Centuries of Amphibious Urbanism',
      subtitle:
        'From Suyya’s ninth-century Jhelum engineering and Budshah’s Nallah Mar to nineteenth-century survey baselines.',
      paragraphs: [
        'Long before modern hydrology coined terms like "detention routing" or "sponge cities," Kashmiri statecraft treated floodplain hydraulics as the foundation of political survival. In Book V of the twelfth-century Sanskrit chronicle *Rajatarangini* (annotated English translation by M. Aurel Stein, 1900), the historian Kalhana recorded the ninth-century engineering works of Suyya during the reign of King Avantivarman (r. 855–883 CE). Recognizing that chronic inundation across the Kashmir Valley stemmed from boulder-choked constriction in the Jhelum gorge near Baramulla (*Varahamula*) and unstable confluences upstream, Suyya directed systematic dredging of the rocky outfall, realigned the meeting of the Jhelum and the Sindh near Shadipur (*Shadpur*), and ring-embanked low marshes while cutting regulated irrigation and flood-relief channels calibrated to soil percolation and flood duration.',
        'Six centuries later, Sultan Zain-ul-Abidin—remembered across Kashmir as *Budshah* (r. 1420–1470)—extended that basin-scale hydraulic logic directly into the urban fabric of Srinagar. To drain waterlogged marshes east of the Old City while creating an all-weather inland water highway between Dal Lake and the western wetlands, Zain-ul-Abidin commissioned the excavation and masonry embanking of *Nallah Mar*. Drawing sweet surplus water from Dal Lake through the intermediate basin of Brari Nambal (*Babademb*), the canal coursed roughly five kilometres through dense residential and craft quarters, spanned by seven celebrated stone and timber bridges before discharging toward Khushalsar, Gilsar and the Anchar–Sindh corridor.',
        'Around that navigable spine crystallized an entire lacustrine-to-urban craft and provisioning economy. Market gardeners cultivating Dal’s floating gardens (*radh*—whose historical ecology and agrarian organisation are examined in modern monographs on Kashmir’s *Floating Economies*, DOI: 10.1515/9781800730304-006; DOI: 10.2307/j.ctv2tsxknp.11) paddled dawn loads of turnips, gourds, lotus stems and *singhara* directly through Brari Nambal into *Shehr-e-Khas* landings, passing copper-beating ateliers near Saraf Kadal, wool-washing and *kani* shawl workshops, and grain granaries without a single pack animal or wheeled cart.',
        'During the sixteenth and seventeenth centuries, Mughal landscape engineers further refined the eastern rim of this system. Terraced *baghs*—Shalimar, Nishat, Chashma Shahi and Naseem—were aligned along Zabarwan piedmont springs and mountain streams such as Telbal (Dachigam) Nallah, routing clarified spring and snowmelt inflows across Dal’s basins while relying on downstream outlets—both southward via *Tsunt Kul* to the Jhelum and northwestward via *Nallah Mar* and *Nallah Amir Khan*—to prevent silt trapping and stagnation.',
        'By the late nineteenth century, British Settlement Commissioner Sir Walter R. Lawrence, writing in *The Valley of Kashmir* (1895) in the wake of the destructive July 1893 Jhelum flood, could still describe Srinagar as an unmistakably aquatic city—often compared by European travellers to Venice, though governed by Himalayan snowmelt physics rather than marine tides. In Lawrence’s account, internal canals carried grain, *singhara* (water chestnut), lotus rhizomes (*nadru*), firewood, building stone and floating-garden produce right to neighbourhood *yarbals*, while surrounding *nambals* absorbed river backwater whenever the Jhelum rose.',
        'Published historical geography and multi-temporal Earth-observation studies citing late-nineteenth and early-twentieth-century Survey of India Kashmir Valley topographic sheets (1893–1924 series, referenced here through secondary scholarly reconstructions such as Alam et al., 2023 rather than direct folio custody) confirm the continuity of that blue-green matrix prior to mid-twentieth-century motorization. Dal, Nigeen, Brari Nambal, Gilsar, Khushalsar, Anchar, Hokersar and Bemina were not isolated ponds scattered across dry land; they functioned as hydraulically linked chambers of a single valley-floor pressure-relief engine.',
      ],
    },
    {
      numberRoman: 'III',
      title: 'Anatomy of a Connected Lacustrine Network',
      subtitle:
        'Gravity gradients, inter-basin spillways, and the post-1903 Flood Spill Channel.',
      paragraphs: [
        'To grasp why severing even one urban canal destabilizes an entire city, one must trace the gravity mechanics of Srinagar’s dual lacustrine–riverine circuit. Under historical operating conditions, runoff entering the Dal–Nigeen basin from the 300-square-kilometre Dachigam–Telbal catchment and Zabarwan sub-lacustrine springs possessed two distinct evacuation pathways. Southward, water passed through the Dal Gate weir into *Tsunt Kul* ("Apple Canal"), meeting the Jhelum opposite Shergarhi—a junction equipped with gated regulation so that when the Jhelum ran high in flood, muddy river water could be prevented from backing violently into Dal.',
        'Simultaneously, when southern lock gates closed during high Jhelum stages or during normal summer circulation, Dal and Nigeen breathed northward and westward. Through *Brari Nambal* into *Nallah Mar*—and further north from Nigeen through *Nallah Amir Khan*—oxygenated lake water flowed along a gentle northwestward hydraulic gradient into *Gilsar* and *Khushalsar*, spilled into the broad reed-marsh basin of *Anchar Lake*, and exited near Shadipur where the Sindh joins the Jhelum downstream of Srinagar’s urban constriction. That northern bypass acted as both a summer flushing siphon and a crucial high-stage safety valve.',
        'Parallel relief operated along the Jhelum mainstem itself. Just upstream of the Old City’s tightest seven-bridge meanders, *Kutakul* branched off the left bank near Tankipora/Shergarhi and rejoined near Safa Kadal, sharing urban discharge and relieving scour against timber-cribbed bridge piers. Following the catastrophic flood of July 1903—which submerged vast tracts of Srinagar even deeper than the 1893 deluge—Dogra state engineers excavated a far larger bypass west of the city: the *Flood Spill Channel* (FSC), taking off from the Jhelum at Padshahi Bagh and curving past Rambagh, Bemina and Narkara toward the Hokersar–Mirgund–Wular wetland depression.',
        'Engineered originally to divert roughly 17,000 cubic feet per second (cusecs) away from the ~32,000–35,000-cusec urban Jhelum channel through Srinagar, the Flood Spill Channel relied explicitly on western floodplain marshes—Bemina, Narkara, Hokersar, Mirgund and Shallabugh—to spread, slow and attenuate diverted flood peaks before water rejoined the lower Jhelum and Wular. Hydraulic conveyance and wetland storage were inseparable halves of a single design.',
        'Over the late twentieth and early twenty-first centuries, almost every link in this multi-path circuit was constricted, silted or severed outright. Siltation, willow plantations inside floodways, solid-waste dumping and unauthorized bunding reduced effective Flood Spill Channel capacity prior to 2014 to less than half its original design rating, while road embankments, housing colonies and commercial infill choked the inter-lake throats connecting Brari Nambal, Gilsar, Khushalsar and Anchar.',
        'Crucially, Srinagar’s urban hydraulics cannot be separated from the terminal base level of Wular Lake (*Mahapadmasar*) thirty-five kilometres downstream. Because the Jhelum drops scarcely a few metres between Ram Munshi Bagh and Banyari, Srinagar’s canals and floodways evacuate only as efficiently as the lower Jhelum–Shallabugh–Wular wetland complex can absorb incoming volume. Multi-temporal remote-sensing and hydrochemical investigations of Wular and its catchment document extensive land-cover conversion, agricultural nutrient runoff and progressive lake-bed aggradation (Mushtaq & Pandey, 2013, DOI: 10.1007/s12517-013-1092-1; Hassan et al., 2015, DOI: 10.1186/s13717-015-0035-z; Ganaie, Jamal & Ahmad, 2020, DOI: 10.1007/s10708-020-10146-y)—diminishing the valley’s master flood-attenuation reservoir and raising backwater profiles right back to Srinagar’s gates.',
      ],
      plate: {
        imageUrl: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
        caption:
          'Lacustrine channels and traditional timber craft on Dal Lake, whose water clarity and flood resilience historically depended on continuous outflow connectivity westward to Brari Nambal, Khushalsar, and Anchar.',
        credit: 'Kashmir EcoWatch Visual Archive',
        aspect: 'wide',
      },
      editorialTable: {
        kicker: 'HISTORICAL VS. PRESENT HYDRAULIC LEDGER · SRINAGAR BASIN',
        caption:
          'Structural and hydrological transformation of Srinagar’s principal canals, distributaries, and detention basins',
        headers: ['Hydraulic conduit or basin', 'Historical function vs. present structural condition'],
        rows: [
          [
            'Nallah Mar (15th-century Budshah canal)',
            'Historic: ~5 km stone-embanked navigable & flushing artery linking Brari Nambal/Dal to Khushalsar–Anchar. Present: Buried in the 1970s beneath Marplan Road; gravity circulation permanently severed, replaced by undersized sewage-prone conduits.',
          ],
          [
            'Brari Nambal (Babademb lagoon)',
            'Historic: Primary inner-city flow-equalizing lagoon flushing westward into Nallah Mar. Present: Reduced to a contracted, hemmed-in basin stripped of western gravity outflow; reliant on culverted Jhelum links and mechanical aeration.',
          ],
          [
            'Nallah Amir Khan → Gilsar → Khushalsar → Anchar chain',
            'Historic: Continuous northern lacustrine spillway carrying Nigeen/Dal surplus to the Sindh–Jhelum confluence at Shadipur. Present: Severely constricted by encroachments, road culverts, solid waste, and untreated urban/institutional sewage.',
          ],
          [
            'Tsunt Kul & Kutakul urban distributaries',
            'Historic: Regulated southern Dal outlet (Tsunt Kul) and left-bank Jhelum bypass (Kutakul) sharing peak urban discharge. Present: Narrowed banks, heavy siltation, and combined storm/greywater inflows degrading conveyance and water quality.',
          ],
          [
            'Padshahi Bagh Flood Spill Channel (post-1903)',
            'Historic: Designed to divert ~17,000 cusecs around western Srinagar into floodplain wetlands. Present: Degraded to a fraction of design capacity before 2014 by siltation and encroachments; post-2014 dredging gains remain vulnerable without wetland buffers.',
          ],
          [
            'Bemina, Narkara & Hokersar floodplain sponges',
            'Historic: Vast seasonal *nambal* detention basins absorbing FSC and Doodhganga spillwaters. Present: Bemina and Narkara heavily urbanized; Hokersar Ramsar reserve compressed by tributary siltation, bunding, and perimeter conversion.',
          ],
        ],
        footnote:
          'Compiled from historical accounts (Kalhana/Stein 1900; Lawrence 1895), CWC/Irrigation & Flood Control records, and peer-reviewed Kashmir wetland/hydrology studies.',
      },
    },
    {
      numberRoman: 'IV',
      title: 'The Closure of Nallah Mar (1970s)',
      subtitle:
        'How mid-twentieth-century road-modernization orthodoxy mistook a neglected artery for an obsolete one.',
      paragraphs: [
        'Few urban engineering decisions in modern Himalayan history illustrate path-dependent ecological amnesia more starkly than the burial of *Nallah Mar* in the 1970s. By the 1950s and 1960s, downtown Srinagar faced genuine sanitation and mobility strains. Population density inside *Shehr-e-Khas* had risen sharply without a comprehensive underground sewerage network; domestic latrines and neighbourhood drains discharged directly into the canal; routine desilting had lapsed; and reduced summer flushing inflows from Brari Nambal left shallow reaches malodorous during low-water months. Meanwhile, subsidized motor transport had eclipsed slow *doonga* boat freight in administrative prestige.',
        'Presented with a degraded waterway, mid-century municipal planners misdiagnosed a reversible failure of sewage interception and maintenance as proof that urban canals themselves belonged to an archaic past. Across post-colonial South Asia—and indeed across mid-twentieth-century cities worldwide—automobile carriageways symbolized hygienic modernity, whereas inner-city lagoons and *ghats* were stigmatized as disease vectors. Instead of laying interceptor sewers along the canal’s embankments, dredging accumulated organic sludge, and restoring clean gravity flushing from Dal and Brari Nambal, authorities opted to fill *Nallah Mar* with earth and rubble, demolish its historic arched bridges, lay subsurface trunk pipes, and pave Marplan Road across its corpse.',
        'Hydrologically, the closure acted like ligating a major vein inside a living organism. Deprived of its historic western exit, Brari Nambal immediately ceased to be a flow-through lagoon and turned into a stagnant backwater trap. Dissolved oxygen plummeted, thick mats of invasive macrophytes and algal scum colonized the surface, and heavy metals and organic sludge settled into anoxic bottom sediments—forcing subsequent administrations to spend decades installing artificial fountains, dredging foul muck, and cutting narrow, pump-assisted culverts southward toward the Jhelum that could never replicate broad-channel gravity exchange.',
        'At the opposite end of the severed conduit, Khushalsar, Gilsar and Anchar suffered the mirror-image pathology: hydrological starvation paired with unremitting pollution. Cut off from the substantial volume of cleaner water that once arrived down *Nallah Mar*, the western lake chain lost the flushing velocity needed to scour fine sediment and dilute nutrient loads, even as expanding northern neighbourhoods and institutional complexes discharged untreated wastewater into their shrinking perimeters.',
        'Socially, replacing *yarbals* and boat landings with asphalt kerbs altered civic behaviour overnight. Along an open stone *ghat* where households washed vessels, drew water and crossed by skiff, fouling the channel drew immediate neighbourhood censure. Once water vanished beneath tarmac and concrete manholes, an out-of-sight, out-of-mind reflex took hold: backwaters became dumping trenches, and generations grew up inside *Shehr-e-Khas* knowing *Saraf Kadal* and *Razdan Kadal* only as congested traffic bottlenecks.',
        'Even on narrow civil-engineering grounds, the Marplan infill failed its own sanitation promise. Replacing a wide, free-surface masonry canal with buried sewer pipes laid through flat, waterlogged lacustrine clays produced chronic hydraulic surcharging, grease-and-silt blockages, and corrosive hydrogen-sulphide buildup, while eliminating the open channel that had previously drained shallow phreatic groundwater away from surrounding brick foundations—leaving ground-floor rooms across adjoining Old City lanes chronically damp and prone to foul backflow during winter rains.',
      ],
      pullQuote: {
        quote:
          'Planners in the 1970s misdiagnosed a reversible failure of sewage interception as proof that canals were obsolete—ligating a five-hundred-year gravity vein to build a two-lane road.',
        attribution: 'Himalayan Dispatch · Urban Hydrology Dossier',
      },
    },
    {
      numberRoman: 'V',
      title: 'Forty Years of Wetland Contraction & Impervious Sprawl',
      subtitle:
        'Satellite land-cover ledgers, heavy-metal sediment sinks, and the paving of Srinagar’s flood sponges.',
      paragraphs: [
        'What began in the 1970s with the burial of *Nallah Mar* accelerated between 1980 and the mid-2020s into a basin-wide conversion of permeable wetlands and paddy floodplains into impervious concrete. Multi-temporal Earth-observation assessments across the Kashmir Himalaya document pervasive contraction, fragmentation and siltation of valley wetlands driven by urban encroachment and catchment land-use change (Alam et al., 2023, DOI: 10.1007/s10661-023-12185-7). Even around protected wetland complexes such as Shallabugh on the lower Sindh–Jhelum deltaic plain, 28-year Landsat and LISS-IV satellite analyses record an 86.8 percent surge in built-up footprints alongside measurable losses in open-water area and macrophytic marsh (Bashir et al., 2022, DOI: 10.12944/cwe.17.3.6).',
        'Inside Greater Srinagar, urban sprawl marched directly into the lowest bathymetric contours of the floodplain. Former seasonal detention marshes across Bemina, Batamaloo, Narkara, Qamarwari, Lasjan, Nowgam and Rajbagh were progressively raised on trucked *karewa* earth—simultaneously stripping clay and silt from upland infiltration terraces while displacing millions of cubic metres of flood-storage volume below. Hydrological modelling across the Upper Jhelum Basin confirms that this shift from vegetative cover, wetlands and traditional paddy basins to impervious built-up surfaces significantly amplifies surface runoff, peak flood discharge and sediment delivery (Romshoo & Yousuf, 2022, DOI: 10.20944/preprints202209.0244.v1).',
        'For the waterbodies that remain above ground, hydraulic isolation and untreated effluent inflows have triggered severe biogeochemical deterioration. Comprehensive seasonal analyses of Dal Lake demonstrate how elevated organic and inorganic nutrient loads drive aggressive macrophyte proliferation—reaching 48.11 percent coverage dynamics across monitored zones—accelerating internal eutrophication and shallowing (Sultan et al., 2024, DOI: 10.2166/wst.2024.258). Directly downstream in the severed inner lagoon of Brari Nambal and adjacent urban Jhelum reaches, recent hydrochemical monitoring underscores acute pollution stress from raw sewage disposal and uncollected solid waste, depressing dissolved oxygen and elevating biochemical oxygen demand and nutrient concentrations (Shah, 2026, DOI: 10.21203/rs.3.rs-9463761/v1).',
        'Sediment and food-chain toxicology studies reveal an equally sobering chemical ledger beneath the water mirror. Assessments of floating lake gardens (*radh*) and aquatic crops across Kashmir’s major waterbodies show Dal Lake exhibiting the highest multi-metal pollution load in *Trapa natans* (water chestnut) surveys (Elbagory et al., 2026, DOI: 10.1038/s41598-026-39522-3), while sediment analyses in lotus (*Nelumbo nucifera*) cultivation zones record elevated potentially toxic elements including iron (1,610.51 mg/kg), manganese (31.48 mg/kg) and chromium (29.72 mg/kg) (Elbagory et al., 2025, DOI: 10.3390/toxics13040306).',
        'West of the city at Hokersar—designated a wetland of international importance under the Ramsar Convention and historically Srinagar’s premier flood-absorption sponge—anthropogenic disturbances measurably alter wetland soil physicochemical integrity compared with less disturbed zones (Mir et al., 2025, DOI: 10.1038/s41598-025-20632-3). While Hokersar’s macrophytes still perform vital seasonal carbon sequestration (Lolu et al., 2018, DOI: 10.1007/s13157-018-1092-8), incoming tributary silt from Doodhganga and Sukhnag, combined with emerging agricultural pesticide residues (Irshad et al., 2026, DOI: 10.1007/s11273-026-10188-y), steadily erodes both its waterbird habitat depth and its volumetric flood-buffering capacity.',
        'Across these fragmented waters, biological communities register the loss of flushing connectivity alongside chemical stress. In Dal’s Hazratbal basin, mechanical dredging carried out without halting external nutrient loading has been shown to disrupt benthic macrozoobenthos assemblages (Mushtaq et al., 2013, DOI: 10.12816/0000258), while invasive aquatic weeds such as alligator weed (*Alternanthera philoxeroides*) aggressively colonize nutrient-rich Kashmir lake margins (Masoodi & Khan, 2012, DOI: 10.3391/ai.2012.7.1.016). Meanwhile, across the connected Jhelum–Wular riverine–wetland axis, habitat degradation, siltation and hydraulic barriers compress native ichthyofaunal diversity and basin connectivity for threatened endemic Himalayan fishes (Mushtaq, Balkhi & Bhat, 2024, DOI: 10.15407/zoo2024.02.137; Gilani et al., 2026, DOI: 10.1016/j.isci.2026.116783).',
      ],
    },
    {
      numberRoman: 'VI',
      title: 'September 2014: When the Basin Remembered Its Floodplain',
      subtitle:
        'Anatomy of a 115,000-cusec surge confronting a 35,000-cusec urban throat.',
      dateline: 'SANGAM · RAM MUNSHI BAGH · RAJBAGH & BEMINA · SEPTEMBER 2014',
      paragraphs: [
        'In the first week of September 2014, physics audited forty years of Srinagar’s land-use decisions in seventy-two hours. Between September 2 and September 6, an anomalous synoptic convergence locked an intense late-monsoon depression from the Bay of Bengal against a southward-dipping extratropical trough (Western Disturbance) directly over the Pir Panjal and Greater Himalayan headwaters of the Jhelum and Chenab basins (Siddiqui et al., 2018, DOI: 10.1080/02626667.2018.1546049). Across southern Kashmir catchments—Vishav, Rambiara, Lidder and Sandran—multi-day rainfall shattered century-scale station records, sending steep mountain torrents converging nearly simultaneously onto the flat Anantnag–Pulwama–Srinagar valley floor.',
        'At Sangam in South Kashmir and downstream at Srinagar’s Ram Munshi Bagh gauge, Central Water Commission (CWC) and Jammu & Kashmir Irrigation and Flood Control observations, corroborated by subsequent integrated hydrological–hydraulic reconstructions (Parvaze et al., 2021, DOI: 10.21203/rs.3.rs-461873/v1; Attar et al., 2025, DOI: 10.1038/s41598-025-17009-x), documented peak flood discharges exceeding 115,000 cusecs. Confronting that wall of water was an urban hydraulic bottleneck: the embanked Jhelum channel winding through Srinagar could safely convey roughly 32,000 to 35,000 cusecs, while the silted and encroached Padshahi Bagh Flood Spill Channel carried barely a fraction of its original ~17,000-cusec design rating.',
        'Even had every twentieth-century embankment held firm, more than 65,000 cusecs of surplus discharge had nowhere to go except out of the channel. When earthen bunds overtopped and breached near Kandizaal, Shivpora, Rajbagh and Padshahi Bagh on September 7, the Jhelum did not flood randomly. National Remote Sensing Centre (NRSC) satellite inundation maps and post-flood geoinformatics analyses extending down to Wular (Ahmad, Pandey & Kumar, 2017, DOI: 10.5194/isprs-annals-iv-4-w4-13-2017) demonstrated with haunting precision that floodwaters reclaimed their exact historical paleochannels, backswamps and filled *nambals*.',
        'Residential colonies built across former floodways and low-lying bowls—Rajbagh, Jawahar Nagar, Kursu, Gogji Bagh, Wazir Bagh, Bemina, Batamaloo, Qamarwari and sections of the civil secretariat and major tertiary hospitals—submerged up to twelve to eighteen feet, stranding tens of thousands on upper storeys and rooftops. Meanwhile, elevated *karewa* tablelands and older high-plinth ridges fared markedly better, confirming what Walter Lawrence and nineteenth-century Kashmiri builders had recognized more than a century earlier about valley micro-topography.',
        'Most revealing of all was what happened after the rain stopped. In an intact amphibious network, receding river levels allow floodplain water to drain back through connected creeks, marshes and northern spillways toward Anchar and Wular. In September 2014, raised highway bunds, railway embankments, infill colonies and severed canal throats trapped stagnant floodwater inside urban bowls for two to four weeks, turning neighbourhoods into septic lagoons that escaped only when emergency excavators physically breached roads and embankments to recreate the very drainage paths urban planning had erased.',
        'Equally sobering was the institutional geography exposed by those floodwaters. Because post-1970s master plans had permitted critical civic lifelines—major maternity, paediatric and orthopaedic hospitals, diagnostic laboratories, high-court and secretariat records, grid substations, telecom exchanges and emergency grain stores—to concentrate on low-lying Jhelum and Flood Spill Channel floodplains without amphibious plinth elevations or floodway buffers, the inundation disabled emergency response capacity at the precise hour citizens needed it most.',
      ],
      plate: {
        imageUrl: '/images/hazard-intelligence/hazard-floods-riverine.jpg',
        caption:
          'Swollen Himalayan riverine discharge and floodplain constriction illustrating the hydraulic vulnerability of embanked valley-floor settlements.',
        credit: 'Kashmir EcoWatch Visual Archive',
        aspect: 'wide',
      },
      fieldNote: {
        label: 'SEPTEMBER 2014 HYDRAULIC DISCREPANCY',
        detail:
          'Peak upstream Jhelum inflow (>115,000 cusecs) exceeded combined Srinagar urban channel (~32,000–35,000 cusecs) and degraded Flood Spill Channel capacity by more than 65,000 cusecs, re-inundating filled floodplain basins from Rajbagh to Bemina and Wular.',
      },
    },
    {
      numberRoman: 'VII',
      title: 'Drains Without Sponges',
      subtitle:
        'Why concrete storm culverts and diesel dewatering stations cannot substitute for wetland detention.',
      paragraphs: [
        'In the decade following the September 2014 catastrophe, substantial public capital flowed into flood-recovery, dredging and municipal stormwater projects across Srinagar. Yet much of the resulting urban engineering has doubled down on a twentieth-century "conveyance-and-pumping" paradigm: lining neighbourhood drains in reinforced concrete, paving footpaths and courtyards wall to wall, expanding mechanical dewatering pump stations along river bunds, and laying high-velocity storm trunks aimed at the nearest waterbody.',
        'Urban hydrology identifies three structural flaws in building drains without sponges. First, replacing vegetated swales, permeable earth shoulders and courtyard gardens with impervious concrete slashes rainfall infiltration and dramatically shortens the catchment "time of concentration." Instead of percolating into shallow aquifers along piedmont fans and *karewa* margins, storm runoff races simultaneously from rooftops and streets into trunk drains within minutes, transforming moderate twenty-millimetre cloudbursts into flash-flood surcharges at low-lying sumps.',
        'Second, mechanical dewatering stations confront an inescapable boundary condition during genuine basin floods. Gravity storm outfalls into the Jhelum, Kutakul or Flood Spill Channel must close their non-return flap gates whenever river stages rise above street-invert elevations—precisely the days when intense basin-wide rain falls. At that moment, entire wards depend on diesel and electric pump batteries lifting trapped water over the bund. When grid power fails, fuel supply is disrupted by inundated roads, trash screens clog with uncollected plastic waste, or river embankments themselves overtop, pump stations drown inside the very bowls they were built to protect.',
        'Third, routing unseparated stormwater and greywater trunks directly into lentic or slow-moving ecosystems treats living lakes as sacrificial sumps. Every intense rain event flushes street oils, tyre microplastics, heavy metals and combined domestic sewage overflows into Brari Nambal, Dal Lake, Chunt Kul, Doodhganga and Gilsar—undermining sewage-treatment investments and accelerating the sediment contamination and macrophyte blooms documented by contemporary water-quality researchers (Sultan et al., 2024; Shah, 2026; Elbagory et al., 2025).',
        'Even mainstem river dredging, while helpful for removing localized gravel bars and garbage shoals, offers strictly bounded relief in a low-gradient alluvial river whose downstream base level is controlled by Wular Lake and the Baramulla outfall—especially when unregulated sand and boulder mining in steep upstream tributaries such as Vishav and Rambiara destabilizes channel beds and mobilizes fresh sediment pulses down-valley (Arafat et al., 2022, DOI: 10.1007/s10661-022-09788-x; Jafri, Jafri & Beg, 2025, DOI: 10.66498/cuklr.5.2025.9-34). Conveyance without storage merely pushes water faster against a narrow door.',
        'Underlying that engineering myopia is institutional fragmentation. A single hydrologically indivisible system inside Srinagar is partitioned across separate departmental mandates: lake conservation authorities managing Dal and Nigeen, municipal and urban environmental engineering wings building storm drains and STPs, Irrigation and Flood Control overseeing the Jhelum and Flood Spill Channel, Wildlife authorities stewarding Hokersar, and separate bodies managing Wular. Without a unified metropolitan watershed authority, one department’s flood-relief drain routinely becomes another department’s eutrophication crisis.',
      ],
    },
    {
      numberRoman: 'VIII',
      title: 'What Can Still Be Reconnected',
      subtitle:
        'A realistic hydrological restoration blueprint for Srinagar’s surviving channels and detention basins.',
      paragraphs: [
        'Reclaiming Srinagar’s hydraulic memory requires clarity free of romantic illusion. *Nallah Mar* cannot be excavated back into an open fifteenth-century stone canal beneath Marplan Road without demolishing thousands of densely inhabited homes, shops and utility corridors across *Shehr-e-Khas*—an intervention that would inflict immense social trauma without recreating the historical urban fabric. Remembering forgotten water does not mean pretending a metropolitan basin of well over a million residents can return to oar-powered commerce; it means restoring every surviving hydrological connection before the remaining throats close forever.',
        'First, the northern lacustrine chain linking Nigeen and Dal through *Nallah Amir Khan* into *Gilsar*, *Khushalsar* and *Anchar Lake* down to the Sindh–Jhelum confluence remains physically recoverable. Enforcing statutory wetland demarcations and judicial conservation directives along choked reaches in Zadibal, Soura and Saidapora—clearing solid-waste landfills, replacing undersized pipe culverts with wide-span box bridges, and intercepting raw municipal and hospital-corridor sewage before it enters the water—can revive gravity flushing across Srinagar’s entire northern arc.',
        'Second, *Brari Nambal* (*Babademb*) must be rescued from life-support stagnation by completing 100 percent peripheral sewer interception and re-engineering clean hydraulic exchange between Dal’s southern basin, Brari Nambal and *Tsunt Kul*. Mechanical fountains oxygenate only a few radial metres of surface film; sustained ecological recovery requires clean inflow head, selective removal of legacy toxic sludge, and vegetated littoral reed shelves capable of stripping dissolved nutrients naturally.',
        'Third, flood resilience west and south of the city depends on treating the *Padshahi Bagh Flood Spill Channel* and its companion wetland chain—Bemina marshes, Narkara, Hokersar, Mirgund, Shallabugh and Wular—as protected, inviolable critical infrastructure. Enforcing zero-fill zoning across remaining floodplain agriculture and *nambal* depressions, removing flow-blocking encroachments inside floodways, and managing seasonal silt-flushing gates at Hokersar and Wular will yield far greater peak-stage attenuation per rupee than endlessly raising urban concrete walls.',
        'Finally, Srinagar can relearn permeability at the neighbourhood scale: enacting statutory flood-zoning overlays under the Wetlands (Conservation and Management) Rules, 2017 and High Court public-interest conservation mandates to halt conversion of remaining *abi-awal* paddy and *nambal* floodways; replacing sealed concrete surfacing in public parks, institutional campuses and *karewa* housing layouts with bioswales, infiltration trenches and rainwater retention ponds; and rehabilitating surviving Devri limestone *yarbal* river steps along the Jhelum and *Kutakul* as clean public water thresholds paired with open, real-time water-quality telemetry. Beneath every flooded lane in Srinagar, gravity still remembers the old bed of the water; wisdom lies in giving it clean, living rooms in which to move again.',
      ],
      pullQuote: {
        quote:
          'Restoring Srinagar’s hydraulic memory does not mean unbuilding Old City homes over Marplan; it means refusing to lose one more metre of Gilsar, Khushalsar, Anchar, Brari Nambal, or Hokersar to concrete and sewage.',
        attribution: 'Himalayan Dispatch · Urban Hydrology Dossier',
      },
    },
  ],
  documentarySources: [
    {
      label: 'Kalhana’s Rajatarangini (M. Aurel Stein annotated trans., 1900, Book V)',
      url: 'https://archive.org/details/rajataranginik01kalhuoft',
      relevance: 'Primary historical chronicle documenting Suyya’s ninth-century Jhelum dredging, confluence realignment, and flood-relief engineering',
    },
    {
      label: 'Walter R. Lawrence, The Valley of Kashmir (Oxford University Press, 1895)',
      url: 'https://archive.org/details/valleyofkashmir00lawruoft',
      relevance: 'Late-nineteenth-century documentation of Srinagar’s internal canals, Nallah Mar commerce, and 1893 Jhelum flood dynamics',
    },
    {
      label: 'Alam, Bhat, Ahsan, Taloor & Farooq (2023), Environmental Monitoring and Assessment',
      url: 'https://doi.org/10.1007/s10661-023-12185-7',
      relevance: 'Earth-observation satellite assessment of multi-decadal wetland contraction and fragmentation in the Kashmir Himalaya',
    },
    {
      label: 'Sultan et al. (2024), Water Science and Technology',
      url: 'https://doi.org/10.2166/wst.2024.258',
      relevance: 'Physiological parameters, seasonal water dynamics, and nutrient-driven macrophytic expansion (48.11%) in Dal Lake',
    },
    {
      label: 'Shah (2026), Brari Nambal & Urban Jhelum Water Quality Case Study',
      url: 'https://doi.org/10.21203/rs.3.rs-9463761/v1',
      relevance: 'Empirical water-quality deterioration assessment across Brari Nambal and Srinagar’s urban Jhelum reaches',
    },
    {
      label: 'Elbagory et al. (2025), Toxics',
      url: 'https://doi.org/10.3390/toxics13040306',
      relevance: 'Potentially toxic element concentrations (Fe, Mn, Cr) in sediment and lotus crops of Dal floating gardens',
    },
    {
      label: 'Elbagory et al. (2026), Scientific Reports',
      url: 'https://doi.org/10.1038/s41598-026-39522-3',
      relevance: 'Heavy-metal bioaccumulation gradient across four major Jammu & Kashmir waterbodies',
    },
    {
      label: 'Lolu, Ahluwalia, Sidhu & Reshi (2018), Wetlands',
      url: 'https://doi.org/10.1007/s13157-018-1092-8',
      relevance: 'Macrophyte carbon sequestration and seasonal ecological dynamics in Hokersar Wetland, Kashmir',
    },
    {
      label: 'Mir et al. (2025), Scientific Reports',
      url: 'https://doi.org/10.1038/s41598-025-20632-3',
      relevance: 'Anthropogenic impacts on soil physicochemical properties across four Kashmir Valley wetlands',
    },
    {
      label: 'Bashir, Lone, Mir et al. (2022), Current World Environment',
      url: 'https://doi.org/10.12944/cwe.17.3.6',
      relevance: '28-year satellite LULC analysis showing 86.8% built-up expansion and open-water decline in Shallabugh wetland environs',
    },
    {
      label: 'Romshoo & Yousuf (2022), Upper Jhelum Land System & Flood Discharge Study',
      url: 'https://doi.org/10.20944/preprints202209.0244.v1',
      relevance: 'Coupled impact of urbanization, wetland/vegetative loss, and extreme precipitation on Jhelum peak flood discharge',
    },
    {
      label: 'Parvaze, Khan, Kumar & Allaie (2021), Integrated Jhelum Flood Modelling',
      url: 'https://doi.org/10.21203/rs.3.rs-461873/v1',
      relevance: 'Hydrological and hydraulic flood-forecasting reconstruction in the Jhelum River Basin',
    },
    {
      label: 'Attar et al. (2025), Scientific Reports',
      url: 'https://doi.org/10.1038/s41598-025-17009-x',
      relevance: 'Design storm estimation and flood-risk hydrograph modelling in temperate Kashmir Himalayan catchments',
    },
    {
      label: 'Ahmad, Pandey & Kumar (2017), ISPRS Annals',
      url: 'https://doi.org/10.5194/isprs-annals-iv-4-w4-13-2017',
      relevance: 'Pre- and post-September 2014 flood satellite inundation and LULC transformation analysis in Wular and Jhelum environs',
    },
    {
      label: 'Siddiqui, Haider, Gabriel & Shahzad (2018), Hydrological Sciences Journal',
      url: 'https://doi.org/10.1080/02626667.2018.1546049',
      relevance: 'Synoptic rainfall–runoff and flood inundation analysis of the September 2014 Jhelum–Chenab flood event',
    },
    {
      label: 'Jafri, Jafri & Beg (2025), Central University of Kashmir Law Review',
      url: 'https://doi.org/10.66498/cuklr.5.2025.9-34',
      relevance: 'Environmental law and governance challenges of riverbed sand mining along the Jhelum in Jammu & Kashmir',
    },
    {
      label: 'Floating Economies: The Valley of Kashmir and Dal Lake (Berghahn Books, 2022)',
      url: 'https://doi.org/10.1515/9781800730304-006',
      relevance: 'Historical political ecology of Dal Lake’s radh floating market gardens and urban water commerce',
    },
    {
      label: 'Hassan, Shah, Kanth & Pandit (2015), Ecological Processes',
      url: 'https://doi.org/10.1186/s13717-015-0035-z',
      relevance: 'Land-use/land-cover controls on the water chemistry and flood-attenuation basin of Wular Lake',
    },
    {
      label: 'Mushtaq, Raina, Yousuf et al. (2013), Jordan Journal of Biological Sciences',
      url: 'https://doi.org/10.12816/0000258',
      relevance: 'Impact of mechanical dredging on benthic macrozoobenthos in Dal Lake’s Hazratbal basin',
    },
    {
      label: 'Irshad et al. (2026), Wetlands Ecology and Management',
      url: 'https://doi.org/10.1007/s11273-026-10188-y',
      relevance: 'Emerging pesticide contaminants in Hokersar Wetland, Kashmir',
    },
    {
      label: 'Gilani et al. (2026), iScience',
      url: 'https://doi.org/10.1016/j.isci.2026.116783',
      relevance: 'Basin connectivity and conservation genetics of endemic Kashmir aquatic fauna',
    },
  ],
  editorialVerificationNote:
    'This Stage 08 pre-release investigation synthesizes published historical chronicles (Kalhana’s Rajatarangini, Stein trans. 1900; Walter R. Lawrence, 1895), public hydrometric records from the September 2014 Jhelum flood, and peer-reviewed remote-sensing and limnological studies. No personal field interviews or unverified artisan testimonies are included or fabricated. Colonial-era Survey of India Kashmir Valley cartographic baselines (1893–1924) are referenced through published historical geography and peer-reviewed geospatial scholarship rather than direct physical custody of original folio sheets. Visual plates carry institutional credits from the Himalayan Dispatch Visual Editions Desk and Kashmir EcoWatch Visual Archive.',
  corrections: [],
  relatedKewModule: {
    label: 'View KEW Lakes & Urban Water Quality Baselines',
    href: '/water-systems/lakes',
    scientificContext:
      'Companion hydrological, bathymetric, and water-quality records across Dal, Brari Nambal, Anchar, Hokersar, and Wular in KEW Water Systems.',
  },
  seoKeywords: [
    'The Water We Have Forgotten',
    'Nallah Mar Srinagar history Marplan Road',
    'Brari Nambal Khushalsar Gilsar Anchar hydrology',
    'September 2014 Kashmir flood Jhelum cusecs',
    'yarbal ghats Shehr-e-Khas Srinagar wetlands',
    'Himalayan Dispatch Urban Hydrology Dossier',
  ],
};
