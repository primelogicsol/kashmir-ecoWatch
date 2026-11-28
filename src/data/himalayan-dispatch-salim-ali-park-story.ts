// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — VOL. 01 / NO. 01 · DISPATCH 10 (INVESTIGATIVE JOURNALISM)
// SPECIAL HISTORICAL INVESTIGATION · PROTECTED AREA GOVERNANCE & ENVIRONMENTAL JURISPRUDENCE
// "THE NATIONAL PARK THAT BECAME A GOLF COURSE: WHEN RECREATION REPLACED CONSERVATION:
//  THE FORGOTTEN ENVIRONMENTAL, LEGAL AND INSTITUTIONAL LEGACY OF SRINAGAR’S SÁLIM ALI NATIONAL PARK"
// Companion to 10-Volume, 75-Chapter Monograph 09 and the permanent 12-module
// KEW Protected Area Integrity Observatory (/protected-network/protected-area-integrity-observatory).
// ─────────────────────────────────────────────────────────────────────────────

import {
  buildPreReleaseStage08GateLedger,
  computeStoryMetrics,
} from '@/lib/himalayan-dispatch-metrics';
import type { MagazineStory } from '@/types/himalayan-dispatch';

const SALIM_ALI_PARK_STORY_BASE: MagazineStory = {
  id: 'hd-story-salim-ali-golf-course',
  slug: 'the-national-park-that-became-a-golf-course',
  editionSlug: 'vol-01-no-01',
  editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
  departmentId: 'investigative-journalism',
  secondaryDepartmentIds: ['data-journalism', 'interviews', 'cover-stories'],
  departmentRubric:
    'SPECIAL HISTORICAL INVESTIGATION · PROTECTED AREA GOVERNANCE & ENVIRONMENTAL JURISPRUDENCE',
  folioCode: '10 / SPECIAL HISTORICAL INVESTIGATION · PROTECTED AREA GOVERNANCE',
  title: 'The National Park That Became a Golf Course',
  subtitle:
    'When Recreation Replaced Conservation: The Forgotten Environmental, Legal and Institutional Legacy of Srinagar’s Sálim Ali National Park',
  excerpt:
    'An investigation into the transformation of Srinagar’s City Forest (Sálim Ali) National Park into land associated with the Royal Springs Golf Course, the National Board for Wildlife objections recorded after construction, the unresolved fate of 723 remaining hectares, and the lessons this precedent holds for the entire Western Himalayan Protected Area Network.',
  dateline:
    'SRINAGAR · DAL LAKE FOOTHILLS · ZABARWAN RANGE · WESTERN HIMALAYAN PROTECTED AREA NETWORK',
  region: 'Kashmir',
  readingTimeMinutes: 0,
  wordCount: 0,
  proseWordCount: 0,
  publishedAt: '2026-11-28',
  updatedAt: '2026-11-28',
  heroImage: '/images/protected-network/protected-conservation-reserves-shikargah.jpg',
  heroCaption:
    'Temperate broadleaf and mixed conifer woodland along Western Himalayan foothill slopes—illustrating foothill canopy structure, understory habitat, and watershed retention rather than forensic boundary photography of City Forest / Sálim Ali National Park or the Royal Springs Golf Course (Illustrative archival habitat plate, Kashmir EcoWatch Visual Archive).',
  heroCredit:
    'Kashmir EcoWatch Visual Archive (Illustrative Western Himalayan foothill woodland plate — non-forensic habitat reference)',
  journalistSlug: 'dr-fayaz-ahmad-khan',
  bylineDisplay:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Protected Area Governance, Environmental Jurisprudence and Geospatial Intelligence Desk',
  bylineRole:
    'Special Historical Investigation · Companion to Monograph 09 & KEW Protected Area Integrity Observatory',
  factCheckedBy:
    'Stage 04 Documentary, Statutory & Cadastral Reconciliation Completed · Himalayan Dispatch Desk',
  scientificReviewer:
    'Internal KEW Protected Area Governance, Hydrological Scenario & Geospatial Protocol Synthesis Completed · Independent External Stage 05 Specialist Review Pending',
  workflowStage: 'editorial_approval',
  isPublished: true,
  isBigRead: true,
  hasCompletedIndependentReview: false,
  supplementaryDatasetUrl:
    '/himalayan-dispatch/issues/monograph-09-the-national-park-that-became-a-golf-course',
  supplementaryDatasetLabel: 'Open Companion 10-Volume, 75-Chapter Monograph 09',
  relatedKewModule: {
    label: 'Open KEW Protected Area Integrity Observatory',
    href: '/protected-network/protected-area-integrity-observatory',
    scientificContext:
      'Permanent 12-module protected-area gazette, boundary, denotification, PADDD, hydrological, and restoration accountability infrastructure paired with KEW’s Sálim Ali National Park dossier (/protected-network/national-parks/salim-ali-national-park).',
  },
  reportingBeatSlug: 'biodiversity-wildlife-protected-habitats',
  reportingBeatLabel:
    'Protected Area Governance, Environmental Jurisprudence, PADDD Accountability & Geospatial Forensics',
  seoTitle:
    'The National Park That Became a Golf Course: When Recreation Replaced Conservation — Srinagar’s Sálim Ali National Park | Dispatch 10',
  publicationStatusNote:
    'Stage 08 · Pre-Release Special Historical Investigation & Companion Monograph 09 Framework Awaiting Administrator Approval',
  conceptualFolioDisclosure:
    'Three-Tier Investigative Architecture & Institutional Right of Response: Dispatch 10 anchors protected-area governance accountability in Himalayan Dispatch Vol. 01 / No. 01 immediately following Dispatch 09 ("The People Who Guard the Forest"), paired with Companion Monograph 09 ("The National Park That Became a Golf Course", a 10-volume, 75-chapter legal, ecological, hydrological, financial, and geospatial research programme) and the permanent 12-module KEW Protected Area Integrity Observatory (/protected-network/protected-area-integrity-observatory). Standing Institutional Right of Response is formally guaranteed to the Government of Jammu & Kashmir, the Department of Tourism, Royal Springs Golf Course authorities, the Department of Wildlife Protection, and all identifiable former or serving officials.',
  editorialVerificationNote:
    'Evidentiary, Legal & Hydrological Guardrails: Primary assertions regarding post-construction wildlife scrutiny rest on official Standing Committee proceedings of the Indian Board for Wildlife and National Board for Wildlife (May 6, 2003; August 25, 2004; April 6, 2005; October 4, 2005), Wildlife Institute of India National Wildlife Database records, Indira Gandhi National Forest Academy case-law compilations (PIL No. 115/99), and Kalpavriksh archival records. Because the original state gazette notification, authenticated final denotification instrument, complete High Court record in PIL No. 115/99, pre-1998 cadastral maps, and primary golf-course water/agrochemical logs remain pending formal retrieval, cadastral remainder figures (723 ha / 745 ha) and irrigation/nutrient scenarios (320 million litres; 6.00 t N; 0.90 t P) are presented strictly as arithmetic reconstructions and illustrative parametric models rather than certified measurements or adjudicated legal conclusions.',
  publicationGates: buildPreReleaseStage08GateLedger({
    scientificReviewApplicable: true,
    evidenceSummary:
      'Cross-checked against 2003–2005 IBWL/NBWL Standing Committee minutes, Wildlife Institute of India National Park Gazette repository records, IGNFA wildlife litigation compendia (PIL No. 115/99), Kalpavriksh Protected Area Update (1999) and Kalpavriksh Papers (Milli Archives), J&K Wildlife (Protection) Act 1978 Section 35 provisions, and 2020–2026 Royal Springs governance disclosures.',
    scientificNote:
      'Cadastral reconciliation equations, FAO-consistent turfgrass irrigation mass-balance scenarios, elemental nitrogen and phosphorus export models, nine-era remote-sensing protocols, and IUCN PADDD frameworks internally audited; independent external Stage 05 legal and hydrological review pending prior to formal release.',
    ethicsAndVisualNote:
      'Distinguishes verified archival facts from outstanding public records, refrains from certifying contested 1999 tree-felling numbers, labels all habitat and GIS plates as illustrative non-forensic visuals from the Kashmir EcoWatch Visual Archive, and extends full Institutional Right of Response.',
    adminHoldNote:
      'Stage 08 Pre-Release Special Historical Investigation staged for Founding Administrator sign-off alongside Monograph 09 and KEW Protected Area Integrity Observatory.',
  }),
  chapters: [
    {
      numberRoman: 'PROLOGUE',
      title: 'Green Land Is Not the Same as Protected Land',
      subtitle:
        'Why an inquiry into Srinagar’s vanished urban national park is not an argument against sport or tourism, but a test of whether statutory conservation law means what it says.',
      dateline: 'ZABARWAN PIEDMONT · EASTERN SHORE OF DAL LAKE · SRINAGAR',
      paragraphs: [
        'In Dispatch 09 ("The People Who Guard the Forest"), we honoured frontline rangers, forest guards, and wildlife watchers who risked or surrendered their lives defending statutory Himalayan forest boundaries; one folio earlier, in Dispatch 08 ("The Sky Has No Borders"), we traced how migratory and resident birds depend on unbroken chains of wetland, scrub, and foothill woodland across five Western Himalayan regions. Yet courage on a mountain beat and connectivity across the sky rely upon a silent third pillar: the legal permanence of protected land. When the state itself repurposes a National Park at the edge of its capital city, the question shifts from perimeter poaching to constitutional and statutory fidelity at the centre of government.',
        'Along the steep trap-rock spurs of the Zabarwan Range above Dal Lake, visitors passing the guarded gates of the Royal Springs Golf Course behold emerald fairways, sprinklers turning in morning light, and manicured championship greens. Mistaking irrigated green turf for conserved nature, however, is one of modern governance’s costliest category errors. An intensively mown, irrigated, and chemically managed turfgrass monoculture is biologically distinct from a self-regenerating native foothill woodland, just as a commercial or state recreational estate is legally the antithesis of a statutory National Park.',
        'Our editorial premise must be unmistakable from the first page: this investigation is not an argument against golf, high-value tourism, tournament hospitality, or outdoor recreation. It is an investigation into what statutory National Park protection actually guarantees if protected landscapes can be administratively reassigned whenever another use becomes politically or economically attractive—tracing how Srinagar’s City Forest (Sálim Ali) National Park became associated with Royal Springs Golf Course, why national wildlife boards recorded unanswered environmental objections years after construction ended, what happened to 723 unresolved hectares, and what precedent this history sets for every protected landscape across the Western Himalayas.',
      ],
      commemorationLedger: {
        heading: 'Sálim Ali (City Forest) National Park · Core Statutory & Cadastral Ledger',
        items: [
          { label: 'Reported Park Baselines', figure: '885 / 907 ha' },
          { label: 'Oct 2005 Reported Denotification', figure: '162 ha' },
          { label: 'Unresolved Remainder (885 ha Base)', figure: '723 ha' },
        ],
        methodologicalNote:
          'Baselines reflect 8.85 km² (885 ha) in October 4, 2005 NBWL proceedings and 9.07 km² (907 ha) in J&K inventories (plus 9.00 km² in WII/historical lists and 8.69 km² in ornithological literature). Remainder (885 − 162 = 723 ha) awaits cadastral verification.',
        sourceNote:
          'NBWL Standing Committee Minutes (2003–2005), WII National Wildlife Database, and KEW Protected Area Gazette Archive.',
      },
      fieldNote: {
        label: 'RESEARCH LIMITATIONS & EVIDENTIARY TRANSPARENCY NOTICE',
        detail:
          'Original state gazette notifications currently sit behind an institutional access form at the Wildlife Institute of India; the authenticated denotification instrument, complete High Court file in PIL No. 115/99, historical pre-1998 cadastral maps, and primary golf-course water/chemical monitoring datasets remain outstanding. Neither exact ecological damage nor final legality is declared settled here.',
      },
    },
    {
      numberRoman: 'I',
      title: '1986, 1992, and Six Conflicting Records of a City National Park',
      subtitle:
        'Reconciling six divergent establishment and area records across a forty-year institutional chronology from 1986 to 2026.',
      paragraphs: [
        'Even on basic threshold facts—when Srinagar’s City Forest (Sálim Ali) National Park was established and how much territory it covered—official and scholarly records split into six variants. Government of India tourism portals cite 1986 without boundary schedules; historical protected-area inventories record 1986 and 9.00 km² (900 ha); the Wildlife Institute of India (WII) database lists 1992 and 9.00 km²; Jammu and Kashmir protected-area inventories cite 9.07 km² (907 ha); October 4, 2005 National Board for Wildlife (NBWL) proceedings record 8.85 km² (885 ha); and recent ornithological literature cites 8.69 km² (869 ha). These discrepancies likely reflect staged Section 35 notifications of intention versus final vesting, post-1987 renaming in honour of India’s pioneering ornithologist Dr. Sálim Ali, and imperial-to-metric forest-compartment conversions—divergences only public release of the original state gazettes can definitively resolve.',
        'Across those competing baselines, the forty-year institutional chronology from 1986 to 2026 reveals an extraordinary reversal of conservation priority. Situated on the Zabarwan piedmont linking Dal Lake, Chashma Shahi, Shankaracharya, and Dachigam National Park, City Forest National Park came under executive conversion pressure in 1998 when, per published conservation and journalistic accounts, Chief Minister Dr. Farooq Abdullah’s government approved developing the championship Royal Springs Golf Course on National Park land. By October 1998, archival conservation correspondence already documented severe disruption inside the park, including pressure to relocate its captive snow leopard breeding facility.',
        'In January 1999, the Wildlife Protection Society of India (WPSI) filed PIL No. 115/99 challenging the conversion. February and July 1999 brought national press investigations and Protected Area Update dispatches reporting large-scale tree removal across the piedmont slopes. In November 2000, the Supreme Court of India restricted dereservation or denotification of any National Park or Sanctuary nationwide without statutory board scrutiny and express Court approval. Yet Royal Springs Golf Course was completed and inaugurated in 2001. Remarkably, formal IBWL and NBWL Standing Committee deliberations occurred only between May 2003 and October 2005—two to four years after construction finished—followed two decades later by a March 2020 governing-body reconstitution, a March 2023 public-private partnership (PPP) operational outsourcing proposal, and ongoing 2026 operational and archival reviews.',
      ],
      editorialTable: {
        kicker: 'ARCHIVE RECONCILIATION · SIX ESTABLISHMENT & AREA RECORDS',
        caption:
          'Divergent Institutional and Scientific Records for City Forest (Sálim Ali) National Park',
        headers: ['Documentary Source', 'Reported Year · Extent & Reconciliation Requirement'],
        rows: [
          [
            '01 · Government of India Tourism Portal',
            'Est. 1986 · Area unspecified; requires check against initial intention vs. post-1987 Sálim Ali renaming notice.',
          ],
          [
            '02 · Historical Protected-Area Inventory',
            'Est. 1986 · 9.00 km² (900 ha); rounded metric figure in early national conservation directories.',
          ],
          [
            '03 · Wildlife Institute of India (WII) Database',
            'Listed 1992 · 9.00 km² (900 ha); original gazette gated behind institutional access form.',
          ],
          [
            '04 · J&K Protected-Area Inventories',
            'Est. 1986 · 9.07 km² (907 ha); departmental forest-compartment summation across Zabarwan slopes.',
          ],
          [
            '05 · NBWL Proceedings (October 4, 2005)',
            '8.85 km² (885 ha) baseline · Central regulatory denominator against which 162 ha denotification was cited.',
          ],
          [
            '06 · Recent Ornithological Literature',
            '8.69 km² (869 ha) · Scholarly figure requiring check for road or enclave exclusions.',
          ],
        ],
        footnote:
          'Definitive reconciliation requires open publication of the J&K Gazette schedules and Forest compartment maps.',
      },
    },
    {
      numberRoman: 'II',
      title:
        'The Mathematics of a Disappearing National Park: 907, 885, 162, 121.4, and the Missing 723 Hectares',
      subtitle:
        'Deconstructing two spatial discrepancies—including an 81.7 percent remainder larger than four golf courses combined.',
      paragraphs: [
        'Popular shorthand in Srinagar assumes the entire Sálim Ali National Park was absorbed into the Royal Springs Golf Course. Official arithmetic tells a far more puzzling story. Take the October 4, 2005 NBWL baseline of 885 hectares (representing 100 percent of the park in central board records, compared against 907 hectares in state inventories). Those October 2005 proceedings cite 162 hectares—just 18.3 percent of the 885-hectare baseline (or 17.9 percent of 907 hectares)—in connection with denotification for the golf project. Meanwhile, official tourism descriptions state that Royal Springs spans roughly 300 acres, or 121.4 hectares.',
        'Two immediate spatial discrepancies emerge from that ledger. First, subtracting 121.4 hectares of advertised golf course from 162 hectares of cited denotification leaves a 40.6-hectare difference (~100.3 acres). That intermediate margin may reflect approach roads, security perimeters, parking aprons, clubhouse and hospitality precincts, maintenance nurseries, or steep unplayable ravines included inside the transferred parcel—yet no public cadastral map reconciles those boundaries.',
        'Second, and far more consequential, subtracting 162 hectares from 885 hectares leaves 723 hectares—81.7 percent of the entire National Park (or 745 hectares, 82.1 percent, against the 907-hectare inventory baseline). If less than one-fifth of the park was cited as denotified in 2005, why did Sálim Ali National Park vanish completely from contemporary public listings of Jammu and Kashmir’s active National Parks? Were those 723 hectares retained as National Park on paper while starved of active wildlife administration, folded back into territorial forest compartments, reassigned to adjacent institutional estates, or denotified through an unpublicized instrument? We frame this 723-hectare gap strictly as an arithmetic reconstruction requiring cadastral and revenue verification, not as proof of unauthorized occupation.',
      ],
      pullQuote: {
        quote:
          'Subtracting 162 reported denotified hectares from an 885-hectare National Park leaves 723 hectares—81.7 percent of a statutory park whose current legal boundary and stewardship remain publicly unresolved.',
        attribution: 'Himalayan Dispatch Cadastral & Statutory Audit Synthesis',
        context:
          'Comparison of October 4, 2005 NBWL proceedings (885 ha / 162 ha) and Royal Springs public estate disclosures (~300 acres / 121.4 ha).',
      },
    },
    {
      numberRoman: 'III',
      title: 'The Documentary Smoking Gun: Wildlife Board Objections After Construction, 2003–2005',
      subtitle:
        'Four official Standing Committee proceedings prove national wildlife regulators were still seeking pesticide and Dal Lake safeguards years after play began.',
      paragraphs: [
        'What elevates the Sálim Ali National Park saga from contested political memory into hard documentary evidence is the official minute book of India’s apex statutory wildlife bodies between May 2003 and October 2005. Keep the construction timeline clearly in view: site clearing began around 1998, and Royal Springs Golf Course opened for play in 2001. Yet formal regulatory review before the Standing Committee of the Indian Board for Wildlife (IBWL) and its statutory successor, the National Board for Wildlife (NBWL), unfolded two to four years after golfers were already walking the fairways.',
        'On May 6, 2003, the IBWL Standing Committee examined the official site inspection report submitted by eminent conservationist Dr. M. K. Ranjitsinh—principal drafter of India’s 1972 Wildlife Act—and senior forest officer Aseem Srivastav. Rather than rubber-stamping a fait accompli, the Committee deferred clearance because crucial questions regarding the quantities, chemical toxicity, and leaching risks of pesticides and fertilizers applied on the course remained unanswered. Fifteen months later, on August 25, 2004, the NBWL Standing Committee formally recorded institutional concern over the inadequate response of the State Government despite repeated requests for compliance disclosures.',
        'On April 6, 2005—four full years after course completion—the NBWL Standing Committee again debated agrochemical and nutrient effluent risks to Dal Lake and surrounding wildlife, discussing independent water and effluent testing through the CSIR laboratory in Jammu while deferring disposition pending formal comments from the State’s Chief Wildlife Warden. Finally, on October 4, 2005, the Committee audited State compliance across eight expert mitigation recommendations: exactly 4 of 8 were accepted (50.0 percent), 3 of 8 were deferred (37.5 percent), and 1 of 8 was explicitly not approved (12.5 percent)—the recommendation to transfer the adjacent Shankaracharya Reserve to the Wildlife Protection Department as compensatory habitat consolidation. Faced with incomplete compliance on an already-constructed course inside a National Park, the Committee resolved to place its objections and the record of non-compliance before the Supreme Court of India.',
      ],
      bulletList: [
        'May 6, 2003 (IBWL): Reviews Dr. M. K. Ranjitsinh & Aseem Srivastav site inspection report; defers due to unanswered pesticide and fertilizer questions.',
        'August 25, 2004 (NBWL): Records concern over inadequate State Government response despite repeated reminders.',
        'April 6, 2005 (NBWL): Addresses Dal Lake and wildlife effluent risks via CSIR Jammu laboratory monitoring; defers awaiting Chief Wildlife Warden comments.',
        'October 4, 2005 (NBWL): Tallies 8 expert recommendations—4 accepted (50%), 3 deferred (37.5%), 1 not approved (12.5%, Shankaracharya Reserve transfer)—and decides to place non-compliance objections before the Supreme Court.',
      ],
    },
    {
      numberRoman: 'IV',
      title: 'Section 35, PIL No. 115/99, and the Jurisprudence of Retrospective Approval',
      subtitle:
        'Distinguishing five separate legal actions and asking whether environmental review retains meaning after irreversible transformation.',
      paragraphs: [
        'Evaluating statutory legality requires analytically separating five distinct legal actions that casual commentary routinely conflates: (1) original statutory park notification (distinguishing initial intention from final rights-settlement and vesting); (2) executive cabinet or departmental project sanction and land transfer; (3) statutory authorization to alter National Park boundaries; (4) apex wildlife board recommendation and Supreme Court clearance; and (5) publication of an authenticated final denotification gazette specifying survey numbers and residual boundaries. Executive approval to construct a golf course in 1998 is legally distinct from valid statutory denotification.',
        'In 1998, wildlife governance in Jammu and Kashmir operated under the Jammu and Kashmir Wildlife (Protection) Act, 1978, whose Section 35 barred destroying, exploiting, or removing wildlife or habitat within a National Park except where demonstrably necessary for the improvement and better management of wildlife itself, while prohibiting boundary alterations save through strict statutory procedure. Converting native foothill woodland into championship golf turf could never qualify as wildlife habitat improvement. In January 1999, the Wildlife Protection Society of India instituted Public Interest Litigation—documented in Indira Gandhi National Forest Academy (IGNFA) legal compilations as PIL No. 115/99—and in November 2000 the Supreme Court prohibited dereservation of any National Park or Sanctuary nationwide without wildlife-board scrutiny and express Court orders.',
        'Because the complete High Court record in PIL No. 115/99 and post-October 2005 Supreme Court filings await full archival retrieval, we frame eight precise legal verification questions below rather than pronouncing a closed courtroom verdict. Yet the systemic jurisprudential question already confronts every environmental statute in South Asia: does environmental assessment retain any legal meaning if an ecosystem can be cleared, graded, and irrigated first, leaving statutory boards years later to negotiate partial mitigation over an irreversible fait accompli?',
      ],
      editorialTable: {
        kicker: 'STATUTORY & JUDICIAL AUDIT · EIGHT LEGAL VERIFICATION QUESTIONS',
        caption:
          'Eight Statutory and Judicial Questions Requiring Primary Archive & Registry Verification',
        headers: ['Legal Threshold', 'Verification Question'],
        rows: [
          [
            '01 · Original Section 35 Stage',
            'Did the park complete final Section 35(4) notification under the J&K Wildlife (Protection) Act, 1978, or operate under Section 35(1) statutory protection?',
          ],
          [
            '02 · Pre-1998 Boundary Alteration',
            'Was any statutory boundary-alteration resolution enacted under Section 35 before site clearing began in 1998?',
          ],
          [
            '03 · Land-Transfer Instrument',
            'Which cabinet or departmental orders transferred National Park compartments, and how did law officers address Section 35?',
          ],
          [
            '04 · Chief Wildlife Warden Record',
            'What statutory opinions were recorded by the Chief Wildlife Warden in 1998–1999 and after the April 2005 NBWL deferral?',
          ],
          [
            '05 · PIL No. 115/99 Dispositive File',
            'What interim orders, state affidavits, and final judgment were entered by the J&K High Court in WPSI’s PIL No. 115/99?',
          ],
          [
            '06 · Nov 2000 Supreme Court Restraint',
            'How were 2001 completion and post-2001 denotification claims squared with the November 2000 Supreme Court ban on unapproved dereservation?',
          ],
          [
            '07 · Post-Oct 2005 Supreme Court Action',
            'What proceedings followed the NBWL’s October 4, 2005 decision to place non-compliance objections before the Supreme Court?',
          ],
          [
            '08 · Legal Status of 723 Hectares',
            'Was an authenticated denotification gazette ever published for 162 ha or the wider park, and what status governs the remaining 723 ha today?',
          ],
        ],
      },
    },
    {
      numberRoman: 'V',
      title: 'Woodland, Turf, Trees, and the Snow Leopard Question',
      subtitle:
        'Nine ecological contrasts, contested 1999 tree-cutting claims, wildlife corridor severance, and a displaced snow leopard breeding facility.',
      paragraphs: [
        'Natural Zabarwan foothill habitat and intensively managed championship turf diverge across nine ecological dimensions: (1) multi-layered tree, shrub, and deadwood architecture versus uniform closely mown sward; (2) diverse native Western Himalayan broadleaf-scrub flora (Celtis, wild olive, Cotoneaster, Berberis, Rosa, Indigofera, native bunchgrasses) versus selected cool-season turfgrass cultivars; (3) organic forest litter and mycorrhizal soil horizons versus sand-engineered rootzones; (4) passive snowmelt and monsoon infiltration recharging springs versus heavy summer sprinkler abstraction paired with rapid subsurface drainage; (5) unfertilized closed nutrient cycling versus scheduled nitrogen, phosphorus, fungicide, and herbicide applications; (6) rich detrital arthropod and pollinator webs versus pest-suppressed fairways; (7) dense understory nesting cover for galliformes, thrushes, and warblers versus exposed mowing lanes; (8) dark, permeable nocturnal mammal movement along the Dachigam–Zabarwan–Shankaracharya slope versus perimeter walls, machinery, and lighting; and (9) deep-rooted canopy microclimatic buffering versus high summer evaporative water demand.',
        'In February and July 1999, investigative reporting by Vikram Jit Singh in The Indian Express and conservation chronicles in Kalpavriksh’s Protected Area Update recorded allegations that "thousands"—with some contemporaneous claims exceeding 10,000—of mature and fruit-bearing trees (including mulberry, walnut, and wild apricot relied upon by Asiatic black bears and frugivorous birds) had been cut inside the park, whereas official statements denied mass felling of mature forest and characterized the site as degraded scrub. Refusing to certify unverified counts from either side, Monograph 09 establishes an empirical audit combining 1998–2000 State Forest Corporation timber-extraction ledgers, PIL No. 115/99 affidavits, and dendrometric crown-segmentation across 1997 IRS-1C/1D panchromatic stereopairs and 2001–2002 IKONOS sub-metre imagery.',
        'Equally revealing is mammalian and institutional displacement. Beyond constricting lower-elevation seasonal buffers used by Asiatic black bear (Ursus thibetanus), common leopard (Panthera pardus), small carnivores, and foothill avifauna bordering Dachigam’s hangul landscape, October 1998 correspondence preserved in the Kalpavriksh Papers (Milli Archives) documents that a captive snow leopard (Panthera uncia) conservation breeding facility planned at Sálim Ali National Park had to be relocated or abandoned when golf-course development took precedence.',
      ],
      fieldNote: {
        label: 'ARCHIVAL RECORD · KALPAVRIKSH PAPERS (MILLI ARCHIVES)',
        detail:
          'October 1998 archival correspondence confirms that snow leopard captive-breeding conservation plans at Srinagar’s Sálim Ali National Park were directly displaced when the site was reassigned to golf development.',
      },
    },
    {
      numberRoman: 'VI',
      title: '320 Million Litres of Water, Elemental Nutrients, and the Dal Lake Catchment',
      subtitle:
        'Illustrative water and nutrient mass-balance models explaining why regulators demanded Dal Lake and CSIR Jammu monitoring.',
      paragraphs: [
        'Perched on permeable Zabarwan colluvial fans directly upslope of Boulevard Road and Dal Lake’s eastern basin, the Royal Springs estate occupies a hydrologically coupled piedmont recharge and drainage slope. Ephemeral torrent channels, roadside culverts, fractured trap-rock seeps, and coarse gravel lenses carry upslope water down-gradient toward Dal Lake—a shallow lacustrine ecosystem whose cultural eutrophication, phosphorus sensitivity, and dissolved-oxygen stress we examined in Dispatch 04.',
        'Because primary Royal Springs water-abstraction meters and chemical procurement logs remain unpublished, strictly illustrative mass-balance scenarios clarify why the IBWL and NBWL repeatedly pressed Srinagar authorities between 2003 and 2005. Under our baseline irrigation model, maintaining 60 hectares of irrigated turf (roughly half of the advertised 121.4-hectare course) at a 400-millimetre annual net seasonal irrigation depth and 75 percent sprinkler application efficiency requires a gross annual volume of 320,000 cubic metres—or 320 million litres—equivalent to 0.88 million litres per day (MLD) averaged over the year, and two to three times that daily rate during peak June–August evapotranspiration.',
        'Under our companion elemental nutrient model, fertilizing 60 hectares at moderate turfgrass rates of 100 kg/ha/year of elemental nitrogen (N) and 15 kg/ha/year of elemental phosphorus (P) introduces 6.00 tonnes of N and 0.90 tonnes of P annually onto the piedmont; assuming an illustrative 5 percent hydrological export fraction via storm runoff or subsurface leaching yields 300 kg/year of N and 45 kg/year of P exiting the rootzone. Readers can test alternative area, efficiency, application, and export parameters in the interactive forensic workbench immediately below. Both calculations are explicitly illustrative scenarios—not measured Royal Springs withdrawals or proven Dal Lake loads—demonstrating why primary pumping meters, active-ingredient pesticide ledgers, and post-2005 CSIR Jammu / catchment water-quality data are indispensable.',
      ],
      plate: {
        imageUrl: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
        caption:
          'Dal Lake beneath the Zabarwan Range—illustrating the down-gradient lacustrine basin whose sensitivity led the National Board for Wildlife in April 2005 to propose CSIR Jammu effluent monitoring (Illustrative archival plate, Kashmir EcoWatch Visual Archive; not forensic outfall photography).',
        credit: 'Kashmir EcoWatch Visual Archive (Illustrative Dal Lake catchment plate)',
        aspect: 'wide',
      },
    },
    {
      numberRoman: 'VII',
      title: 'The Twenty-Five-Year Financial Balance Sheet & Opportunity Cost',
      subtitle:
        'Balancing real tourism, tournament, and livelihood benefits against quarter-century public expenditure and ecological opportunity cost.',
      paragraphs: [
        'Rigorous public-interest journalism must weigh the economic arguments for Royal Springs with complete fairness. Conceived as Kashmir sought to rebuild visitor confidence after a devastating decade of conflict, the course delivered championship sporting prestige, national tournament hosting, greenkeeping, caddie, and hospitality employment, and manicured leisure infrastructure overlooking Dal Lake. Those tourism and livelihood contributions are real and belong honestly on the ledger.',
        'Yet transferring zero-priced statutory National Park land and developing it with public treasury funds demands an audited quarter-century financial reckoning from 1998 to 2026 governed by an explicit accounting identity: Net public financial contribution = Public expenditure − Revenue returned to government. Comparing cumulative public spending against verified exchequer receipts across fourteen structured categories—(1) 1998–2001 capital construction and earthworks, (2) international golf-architectural consultancy fees, (3) imported turf and pumping machinery, (4) shadow land value of transferred statutory park estate, (5) annual recurring O&M appropriations, (6) staffing and security payrolls, (7) power, irrigation, and agrochemical outlays, (8) green-fee and membership collections, (9) tournament and clubhouse hospitality receipts, (10) actual deposits into the government consolidated fund, (11) post-flood and capital refurbishment grants, (12) March 2020 governing-body restructuring terms, (13) the March 2023 public-private partnership (PPP) outsourcing proposal (which itself raised pointed questions about long-run state fiscal self-sufficiency), and (14) unpriced ecological opportunity costs including stormwater retention, carbon storage, wildlife connectivity, and public urban nature education—establishes whether recreational conversion yielded a net public return or required ongoing public subsidy.',
      ],
      bulletList: [
        'Core Fiscal Equation (1998–2026): Net public financial contribution = Public expenditure − Revenue returned to government across 14 capital, operational, revenue, March 2023 PPP, and ecosystem-service categories.',
      ],
    },
    {
      numberRoman: 'VIII',
      title: 'Forensic Geospatial Reconstruction Across Nine Eras, 1960–2026',
      subtitle:
        'Nine remote-sensing windows and seven GIS map layers ensuring disappearance from memory never passes for lawful erasure.',
      paragraphs: [
        'Where departmental paper files remain fragmented or gated, historical satellite and reconnaissance archives preserve an objective physical record of canopy, grading, moisture, and enclosures. Companion Monograph 09 executes a nine-era remote-sensing reconstruction from 1960 to 2026: (1) 1960–1972 declassified CORONA KH-4B and KH-9 Hexagon reconnaissance photography establishing pre-notification Zabarwan woodland and torrent geometry; (2) 1972–1985 early Landsat MSS/TM baselines; (3) 1986–1992 notification-era Landsat-5 and IRS-1A/1B scenes spanning both reported establishment dates; (4) 1993–1997 pre-project IRS-1C/1D (5.8 m panchromatic and LISS-III) canopy baselines; (5) 1998–2001 active construction-window clearing and fairway grading; (6) 2002–2005 sub-metre IKONOS and QuickBird imagery contemporaneous with the Ranjitsinh–Srivastav inspection and NBWL reviews; (7) 2006–2014 post-2005 perimeter build-out and September 2014 flood runoff pathways; (8) 2015–2020 Sentinel-2 and Landsat-8 optical/moisture series up to the March 2020 governance reconstitution; and (9) 2021–2026 high-resolution optical, dry-season NDWI irrigation signatures, and Landsat-9/ECOSTRESS thermal-infrared evapotranspiration analysis.',
        'Co-registering those nine eras generates seven distinct GIS map layers: (1) candidate original National Park outer boundaries (907 / 885 / 900 ha); (2) the reported 162 ha October 2005 denotification polygon; (3) the actual 121.4 ha Royal Springs managed turf and clubhouse footprint; (4) the 40.6 ha intermediate discrepancy zone; (5) current land-cover and institutional control across the unresolved 723 ha remainder; (6) Zabarwan–Dal Lake surface micro-watersheds, springs, and culvert outfalls; and (7) Dachigam–Zabarwan–Shankaracharya wildlife corridor impedance—ensuring disappearance from public memory is never mistaken for lawful disappearance from the protected-area network.',
      ],
      plate: {
        imageUrl: '/images/protected-network/protected-area-atlas-gis.jpg',
        caption:
          'Protected-area geospatial boundary and watershed overlay architecture—illustrating the seven-layer GIS reconciliation protocol of the KEW Protected Area Integrity Observatory (Illustrative cartographic plate, Kashmir EcoWatch Visual Archive; not an authenticated statutory cadastral survey of Sálim Ali National Park).',
        credit: 'Kashmir EcoWatch Visual Archive (Illustrative GIS cartographic framework plate)',
        aspect: 'wide',
      },
    },
    {
      numberRoman: 'IX',
      title: 'Who Stood Up for the National Park—and Kashmir’s Professional Mirror',
      subtitle:
        'Recognizing documented defenders while holding an historically fair mirror to Kashmir’s scientific, legal, and civic institutions.',
      paragraphs: [
        'Without a handful of principled interventions, Srinagar’s National Park conversion might have vanished from institutional consciousness without leaving an evidentiary trail. Lasting credit belongs on the historical record to the Wildlife Protection Society of India (WPSI) for filing PIL No. 115/99 in January 1999; to journalist Vikram Jit Singh for his February 1999 investigative reporting in The Indian Express; to Kalpavriksh and Protected Area Update for chronicling the controversy in 1999 and preserving the October 1998 snow leopard correspondence in the Milli Archives; to Mir Inayet Ullah (Chief Wildlife Warden) in documented early official correspondence; to Dr. M. K. Ranjitsinh and Aseem Srivastav for their rigorous 2003 inspection report; and to the IBWL and NBWL Standing Committees (2003–2005) for refusing uncritical ratification and resolving to place non-compliance objections before the Supreme Court.',
        'Connecting directly to Dispatch 15 ("South Asia’s Environmental Vanguard") in this Inaugural Issue, this episode also holds up a searching professional mirror to Kashmir’s own universities, environmental scientists, legal community, Srinagar newsrooms, conservation NGOs, legislators, and forestry cadres—asking why sustained post-2005 empirical monitoring, boundary audits, and legal follow-up remained so scarce ten minutes from the valley’s premier academic and judicial institutions. Yet historical fairness forbids facile retrospective accusation: late-1990s Srinagar operated under acute armed conflict, emergency security constraints, personal hazard for dissenters, and non-digitized Urdu and English newspaper and departmental files. Refusing to confuse undigitized archives with professional apathy, Monograph 09 establishes an archival and oral-history programme inviting retired wildlife officers, advocates, scholars, and editors to place buried contemporaneous records into open view.',
      ],
      pullQuote: {
        quote:
          'WPSI, Vikram Jit Singh, Kalpavriksh, Mir Inayet Ullah, Ranjitsinh, Srivastav, and the 2003–2005 wildlife boards ensured that even a completed golf course could not erase the statutory questions behind it.',
        attribution: 'Himalayan Dispatch Protected Area Governance Desk',
        context:
          'Linking Dispatch 10’s historical audit to Dispatch 17’s examination of South Asian environmental stewardship.',
      },
    },
    {
      numberRoman: 'X',
      title: 'The International Conservation Test, Alternatives, and Four Recovery Scenarios',
      subtitle:
        'Applying eleven governance benchmarks, evaluating six non-park site alternatives, and defining Scenarios A through D.',
      paragraphs: [
        'Carefully distinguishing modern IUCN Category II National Park governance principles from binding 1998 statutory obligations under Section 35 of the J&K Wildlife (Protection) Act, 1978 so contemporary international norms are never misapplied as retroactive statutes, we test the conversion across eleven benchmarks: conservation primacy, statutory permanence, prior independent EIA, exhaustive non-park alternatives analysis, transparent public notice, prior wildlife-board and judicial authorization, downstream wetland precaution, ecological equivalence, public-trust fiscal accounting, post-decision independent compliance monitoring, and open boundary archives. Measured against both 1998 law and modern IUCN standards, building first and negotiating partial safeguards years later fails core conservation governance. Equally clear is our six-scenario alternatives audit: championship golf could have been accommodated without sacrificing National Park land by (1) upgrading central Srinagar’s historic Kashmir Golf Club, (2) rehabilitating existing institutional/cantonment courses, (3) developing non-protected karewa uplands outside wildlife corridors, (4) using designated peri-urban tourism zones, (5) investing in historic Gulmarg meadow courses, or (6) repurposing brownfield state estates outside Dal Lake’s direct piedmont catchment.',
        'Looking ahead, four constructive recovery scenarios unite statutory accountability with practical realism: Scenario A immediately surveys, demarcates, and restores active Wildlife Department protection over all surviving non-golf woodland within the unresolved 723-hectare remainder, reconnecting it to Dachigam and Shankaracharya; Scenario B mandates closed-loop stormwater/leachate containment, phosphorus-free and biological turf transition, metered spring/water caps, native Zabarwan roughs, dark-sky perimeter lighting, and public quarterly CSIR/independent Dal Lake outfall monitoring at Royal Springs; Scenario C enacts compensatory habitat consolidation across contiguous Zabarwan–Shankaracharya–Dachigam slopes financed by a dedicated conservation levy on commercial or PPP golf revenues; and Scenario D evaluates phased long-term ecological restoration and a public Sálim Ali Urban Ornithological & Ecological Sanctuary upon future lease, PPP, or judicial review.',
      ],
      bulletList: [
        'Ten Immediate Field & Legal Audits: (1) Release original 1986/1992 gazettes; (2) Publish any authenticated denotification instrument; (3) Retrieve full PIL No. 115/99 High Court file; (4) Inspect post-Oct 2005 Supreme Court filings; (5) Conduct GPS cadastral survey of the 885/907 ha boundary and 723 ha remainder; (6) Audit water permits and seasonal pumping; (7) Disclose 2001–2026 fertilizer/pesticide procurement; (8) Execute four-season CSIR/independent Dal Lake outfall testing; (9) Survey surviving foothill biodiversity corridors; and (10) Publish consolidated 1998–2026 public expenditure vs. treasury revenue accounts.',
      ],
    },
    {
      numberRoman: 'XI',
      title:
        'PADDD Across Five Western Himalayan Regions, Monograph 09 & the KEW Integrity Observatory',
      subtitle:
        'Preventive PADDD vigilance across five regions, the 12-point Integrity Protocol, Monograph 09, and full Institutional Right of Response.',
      paragraphs: [
        'In global conservation science, Srinagar’s vanished urban park is a textbook case of PADDD—Protected Area Downgrading, Downsizing, and Degazettement—demonstrating how de facto excisions and post-facto regularizations erode protected estates faster than formal parliamentary repeals. Preventing silent repetition demands a preventive five-region Western Himalayan Protected Area audit across Kashmir (peri-urban tourism and utility pressures along the Dachigam–Zabarwan–Thajwas–Overa-Aru arc), Jammu (four-lane highway, rail, and transmission corridors intersecting Shivalik and Pir Panjal sanctuaries), Ladakh (high-altitude boundary rationalization, road, and energy infrastructure pressures across Changthang and Karakoram sanctuaries), Azad Jammu and Kashmir (hydropower diversions, road cuts, and subalpine pressures in Machiara, Musk Deer, and Ghamot reserves), and Gilgit-Baltistan (commercial tourism enclaves, mining claims, and highway expansion affecting Deosai, Khunjerab, and Central Karakoram National Parks).',
        'To inoculate all five mountain regions against retrospective erosion, we propose the twelve-requirement Western Himalayan Protected Area Integrity Protocol (WHPAIP): (1) open digital gazettes, (2) immutable public cadastral GIS polygons, (3) zero ex post facto wildlife clearances, (4) mandatory proof of no non-protected alternative, (5) cumulative watershed and corridor EIA, (6) legislative and apex judicial locks on National Park downsizing, (7) real-time PADDD event registration, (8) independent contaminant monitoring on adjacent commercial estates, (9) lifecycle public-finance disclosure, (10) equitable indigenous and pastoralist safeguard governance distinct from commercial diversion, (11) five-year satellite canopy/boundary audits, and (12) an enforceable citizen right to inspect compliance records.',
        'Dispatch 10 launches alongside the 10-volume, 75-chapter Companion Monograph 09 (monograph-09-the-national-park-that-became-a-golf-course, anchored by a 20-priority-document archival retrieval docket) and the permanent 12-module KEW Protected Area Integrity Observatory (/protected-network/protected-area-integrity-observatory). Standing Institutional Right of Response is formally guaranteed to the Government of Jammu & Kashmir, Tourism and Royal Springs Golf Course authorities, the Department of Wildlife Protection, and all identifiable former or serving decision-makers: every authenticated gazette, court order, monitoring dataset, or official response will be published in full.',
      ],
      editorialTable: {
        kicker: 'PERMANENT ACCOUNTABILITY ARCHITECTURE · MONOGRAPH 09 & KEW OBSERVATORY',
        caption:
          'Twelve Modules of the KEW Protected Area Integrity Observatory & Companion 10-Volume Monograph 09',
        headers: ['Observatory Module', 'Mandate & Companion Monograph 09 Scope'],
        rows: [
          [
            '01 · Original Gazette Archive',
            'Tracks 1986/1992 notifications, renaming orders, and the 20 priority archival documents docket (Vols. I–II).',
          ],
          [
            '02 · Cadastral Reconciliation Ledger',
            'Audits 907, 900, 885, and 869 ha baselines against 162 ha denotified, 121.4 ha golf course, and 723 ha remainder.',
          ],
          [
            '03 · NBWL Retrospective Clearance Tracker',
            'Indexes 2003–2005 IBWL/NBWL minutes, 4-of-8 compliance status, and Supreme Court referrals (Vol. III).',
          ],
          [
            '04 · Wildlife Jurisprudence Docket',
            'Monitors Section 35 compliance, PIL No. 115/99, and November 2000 Supreme Court dereservation restraints (Vol. IV).',
          ],
          [
            '05 · Nine-Era Satellite Forensics (1960–2026)',
            'Hosts CORONA, Landsat, IRS, IKONOS, Sentinel-2, and thermal-IR change layers across 7 GIS maps (Vol. V).',
          ],
          [
            '06 · Foothill Biodiversity & Corridor Atlas',
            'Tracks Dachigam–Zabarwan–Shankaracharya wildlife connectivity, tree-cover change, and snow leopard archive (Vol. VI).',
          ],
          [
            '07 · Piedmont Hydrology & Dal Lake Lab',
            'Runs 320M L irrigation and N/P export models alongside CSIR/culvert water-quality verification (Vol. VII).',
          ],
          [
            '08 · 25-Year Fiscal & PPP Audit',
            'Evaluates 14 public expenditure vs. revenue categories (1998–2026) and the March 2023 PPP proposal (Vol. VIII).',
          ],
          [
            '09 · Five-Region Western Himalayan PADDD Watch',
            'Tracks downsizing and degazettement risks across Kashmir, Jammu, Ladakh, AJ&K, and Gilgit-Baltistan (Vol. IX).',
          ],
          [
            '10 · Alternatives & Recovery Simulator',
            'Models 11 conservation tests, 6 historical site alternatives, Scenarios A–D, and 10 immediate audits (Vol. X).',
          ],
          [
            '11 · Integrity Protocol (WHPAIP) Scorecard',
            'Benchmarks regional protected areas against all 12 WHPAIP statutory and transparency requirements.',
          ],
          [
            '12 · Institutional Right of Response Portal',
            'Publishes authenticated government replies, gazettes, monitoring logs, and archival submissions in full.',
          ],
        ],
      },
    },
    {
      numberRoman: 'EPILOGUE',
      title: 'What Does Protected Really Mean?',
      subtitle:
        'A closing reflection beneath the Zabarwan escarpment on statutory memory and the future of Himalayan conservation.',
      paragraphs: [
        'Walk beside Dal Lake at dusk as evening shadow climbs the Zabarwan spurs toward Dachigam. Behind guarded stone walls lies hillside terrain once dedicated to Dr. Sálim Ali—the naturalist who taught South Asia that a tangled native thicket of wild rose, nettletree, berberis, and thrushes possesses an irreplaceable civic and biological dignity no manicured lawn can imitate. Yet an entire post-2001 generation in Srinagar has grown up scarcely knowing their city ever possessed a National Park.',
        'Conservation statutes are never truly tested on vertical six-thousand-metre ice walls where commercial developers seek no leases; they are tested where gentle slopes, sweet mountain springs, dramatic lake vistas, and proximity to power converge at the edge of cities. When a National Park can be graded into fairways first, questioned by national wildlife boards years afterward, left with 723 hectares in public obscurity, and quietly dropped from civic maps, every wetland reedbed, deodar compartment, alpine meadow, and wildlife sanctuary across the Western Himalayas grows more vulnerable.',
        'Until every gazette, court order, boundary pillar, and culvert record is restored to public daylight, Srinagar’s forgotten park leaves one inescapable question before the conscience of lawmakers, courts, scientists, and citizens alike: If a national park is not safe from incompatible development even after receiving the highest levels of statutory conservation recognition, what protection can the rest of our unprotected natural landscapes reasonably expect?',
      ],
      pullQuote: {
        quote:
          'If a national park is not safe from incompatible development even after receiving the highest levels of statutory conservation recognition, what protection can the rest of our unprotected natural landscapes reasonably expect?',
        attribution: 'Closing Inquiry · Dispatch 10 & Companion Monograph 09',
        context:
          'Foundational charter question of the KEW Protected Area Integrity Observatory.',
      },
    },
  ],
  documentarySources: [
    {
      label:
        'Ministry of Environment, Forest and Climate Change (MoEFCC) — Standing Committee of IBWL / NBWL Proceedings Archive (May 6, 2003; August 25, 2004; April 6, 2005; October 4, 2005)',
      url: 'https://moef.gov.in/',
      relevance:
        'Primary statutory record of post-construction deliberations on Sálim Ali (City Forest) National Park, including the Dr. M. K. Ranjitsinh and Aseem Srivastav inspection report, pesticide/fertilizer objections, CSIR Jammu monitoring proposal, 8.85 km² (885 ha) and 162 ha figures, 4-of-8 recommendation compliance ledger, and referral of non-compliance objections to the Supreme Court.',
    },
    {
      label:
        'Wildlife Institute of India (WII) — National Wildlife Database Cell: National Parks of India & Protected Area Gazette Repository',
      url: 'https://wii.gov.in/nwdc_national_parks',
      relevance:
        'Documents official technical listing of City Forest (Sálim Ali) National Park (1992 listing; 9.00 km²) and institutional request requirements for retrieving original state gazette notifications.',
    },
    {
      label:
        'Indira Gandhi National Forest Academy (IGNFA) — Wildlife & Environmental Case-Law Compilations (PIL No. 115/99 & November 2000 Supreme Court Dereservation Restraint)',
      url: 'https://www.ignfa.gov.in/',
      relevance:
        'Preserves institutional legal references to January 1999 Public Interest Litigation (PIL No. 115/99) filed by the Wildlife Protection Society of India and Supreme Court public-trust restrictions on National Park dereservation.',
    },
    {
      label:
        'Kalpavriksh — Protected Area Update Archive (1999) & Kalpavriksh Papers at Milli Archives (October 1998 Snow Leopard Facility Correspondence)',
      url: 'https://kalpavriksh.org/our-work/conservation-livelihoods/protected-area-update/',
      relevance:
        'Chronicles contemporaneous February–July 1999 reporting on City Forest National Park conversion, contested tree-felling claims, and October 1998 correspondence on relocating the park’s snow leopard breeding facility.',
    },
    {
      label:
        'India Code Statutory Archive — Jammu and Kashmir Wildlife (Protection) Act, 1978 (Section 35) & Wildlife (Protection) Act, 1972',
      url: 'https://www.indiacode.nic.in/',
      relevance:
        'Establishes the binding statutory framework governing National Park notification, strict prohibition on non-conservation habitat destruction, and legal thresholds for boundary alteration.',
    },
    {
      label:
        'Department of Tourism, Government of Jammu & Kashmir — Royal Springs Golf Course Estate, Governance (March 2020) & PPP Proposal Disclosures (March 2023)',
      url: 'https://jktourism.jk.gov.in/',
      relevance:
        'Provides official public descriptions of the ~300-acre (121.4 ha) Royal Springs Golf Course opened in 2001 alongside subsequent governing-body and public-private partnership operational records.',
    },
    {
      label:
        'IUCN World Commission on Protected Areas (WCPA) — Category II National Park Standards & Global PADDD (Downgrading, Downsizing, and Degazettement) Framework',
      url: 'https://www.iucn.org/our-union/commissions/world-commission-protected-areas',
      relevance:
        'Provides international protected-area governance criteria and PADDD methodology applied across the five-region Western Himalayan Protected Area Integrity Protocol.',
    },
  ],
  editorialMetadataTable: [
    { attribute: 'Publication', assignment: 'Himalayan Dispatch' },
    {
      attribute: 'Edition & Folio Placement',
      assignment:
        'Vol. 01 / No. 01 · The Inaugural Issue · Dispatch 10 (Immediately following Dispatch 09 "The People Who Guard the Forest")',
    },
    {
      attribute: 'Rubric & Classification',
      assignment:
        'Special Historical Investigation · Protected Area Governance & Environmental Jurisprudence',
    },
    {
      attribute: 'Byline',
      assignment:
        'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Protected Area Governance, Environmental Jurisprudence and Geospatial Intelligence Desk',
    },
    {
      attribute: 'Primary Case Jurisdiction',
      assignment:
        'Srinagar · Dal Lake Foothills · Zabarwan Range (Kashmir), with Five-Region Western Himalayan PADDD Audit (Kashmir, Jammu, Ladakh, AJ&K & Gilgit-Baltistan)',
    },
    {
      attribute: 'Investigation Chronology',
      assignment:
        '1986–2026 (40-Year Statutory, Institutional, Hydrological & Geospatial Span; Nine Remote-Sensing Eras from 1960 to 2026)',
    },
    {
      attribute: 'Narrative Scope & Reading Duration',
      assignment:
        'Thirteen-Section Longform Investigation (Prologue, Chapters I–XI & Epilogue) · Extended Investigative Reading Folio',
    },
    {
      attribute: 'Companion Research Monograph',
      assignment:
        'Monograph 09: "The National Park That Became a Golf Course" (10 Thematic Volumes · 75 Chapters · 20 Priority Archival Documents)',
    },
    {
      attribute: 'Permanent KEW Infrastructure',
      assignment:
        'KEW Protected Area Integrity Observatory (/protected-network/protected-area-integrity-observatory · 12 Permanent Modules) & Sálim Ali National Park Dossier (/protected-network/national-parks/salim-ali-national-park)',
    },
    {
      attribute: 'Proposed Governance Standard',
      assignment:
        'Western Himalayan Protected Area Integrity Protocol (WHPAIP · 12 Statutory & Transparency Requirements)',
    },
    {
      attribute: 'Publication Gate Status',
      assignment:
        'Stage 08 · Pre-Release Edition Folio Awaiting Administrator Approval (Full Institutional Right of Response Active)',
    },
  ],
  corrections: [],
  seoKeywords: [
    'Salim Ali National Park Srinagar City Forest Royal Springs Golf Course',
    'National Board for Wildlife 2003 2005 minutes Salim Ali National Park 162 hectares 723 hectares',
    'PIL 115 99 Wildlife Protection Society of India Section 35 J&K Wildlife Protection Act 1978',
    'Dal Lake Zabarwan catchment golf course irrigation nutrient runoff scenario',
    'PADDD Protected Area Downgrading Downsizing Degazettement Western Himalayas',
    'KEW Protected Area Integrity Observatory Monograph 09 Himalayan Dispatch',
  ],
};

const SALIM_ALI_PARK_STORY_METRICS = computeStoryMetrics(SALIM_ALI_PARK_STORY_BASE);

export const THE_NATIONAL_PARK_THAT_BECAME_A_GOLF_COURSE_STORY: MagazineStory = {
  ...SALIM_ALI_PARK_STORY_BASE,
  wordCount: SALIM_ALI_PARK_STORY_METRICS.wordCount,
  proseWordCount: SALIM_ALI_PARK_STORY_METRICS.proseWordCount,
  readingTimeMinutes: SALIM_ALI_PARK_STORY_METRICS.readingTimeMinutes,
  editorialMetadataTable: SALIM_ALI_PARK_STORY_BASE.editorialMetadataTable?.map((row) =>
    row.attribute === 'Narrative Scope & Reading Duration'
      ? {
          attribute: row.attribute,
          assignment: `Thirteen-Section Longform Investigation (Prologue, Chapters I–XI & Epilogue) · Approximately ${SALIM_ALI_PARK_STORY_METRICS.readingTimeMinutes} minutes estimated reading duration`,
        }
      : row
  ),
};
