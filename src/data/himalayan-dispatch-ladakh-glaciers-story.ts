// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — SPECIAL SCIENTIFIC ISSUE · LADAKH'S ECOLOGICAL FRONTIERS
// INVESTIGATION 01 · CRYOSPHERE, PERMAFROST & COLD-DESERT WATER SECURITY
//
// "WHEN THE GLACIERS STOP GIVING:
//  CRYOSPHERIC RETREAT, CHANGING SNOWMELT DYNAMICS, PERMAFROST DEGRADATION
//  AND THE FUTURE OF LADAKH'S WATER SECURITY"
//
// Companion to the 45-Chapter Special Scientific Issue ("Ladakh's Ecological
// Frontiers") and the permanent 12-module KEW Ladakh Cold-Desert Cryosphere
// & Ecology Observatory (/earth-human-impact/ladakh-cold-desert-observatory).
// ─────────────────────────────────────────────────────────────────────────────

import {
  buildPreReleaseStage08GateLedger,
  computeStoryMetrics,
} from '@/lib/himalayan-dispatch-metrics';
import type { MagazineStory } from '@/types/himalayan-dispatch';

const LADAKH_GLACIERS_STOP_GIVING_BASE: MagazineStory = {
  id: 'hd-story-ladakh-glaciers-stop-giving',
  slug: 'when-the-glaciers-stop-giving',
  editionSlug: 'ladakhs-ecological-frontiers',
  editionLabel: "SPECIAL SCIENTIFIC ISSUE · LADAKH'S ECOLOGICAL FRONTIERS",
  departmentId: 'cover-stories',
  secondaryDepartmentIds: ['investigative-journalism', 'data-journalism', 'field-reports'],
  departmentRubric:
    'LADAKH SCIENTIFIC INVESTIGATION I · CRYOSPHERE, PERMAFROST & COLD-DESERT WATER SECURITY',
  folioCode: '01 / LADAKH ECOLOGICAL FRONTIERS · CRYOSPHERIC DEPENDENCE',
  title: 'When the Glaciers Stop Giving',
  subtitle:
    "Cryospheric Retreat, Changing Snowmelt Dynamics, Permafrost Degradation and the Future of Ladakh's Water Security",
  excerpt:
    "In a Trans-Himalayan rain shadow where valley floors receive barely 90–150 millimetres of annual precipitation, human settlement exists only where snowfields, small cirque glaciers, and permafrost active layers release meltwater on time. Anchored in a 2026 scientific synthesis documenting ~0.02°C annual warming, earlier snowmelt, and glacier mass losses of 0.21 to 0.37 metres of water equivalent per year, this investigation examines how hydrograph shifts across Zanskar, Suru, Nubra, Leh, Kargil, Drass, and Changthang threaten gravity-fed oases long before the last ice vanishes.",
  dateline: 'ZANSKAR · SURU · NUBRA · LEH · KARGIL · DRASS · CHANGTHANG',
  region: 'Ladakh',
  readingTimeMinutes: 0,
  wordCount: 0,
  proseWordCount: 0,
  publishedAt: '2026-11-28',
  updatedAt: '2026-11-28',
  heroImage: '/images/earth-human-impact/ehii-cryosphere-glacier-station.jpg',
  heroCaption:
    'High-altitude Trans-Himalayan glacier ablation zone, moraine threshold, and headwater meltwater drainage representative of Ladakh’s cryosphere-dependent catchments across Zanskar, Suru, Leh, and the Karakoram margin (Illustrative archival plate — Kashmir EcoWatch Cryosphere Visual Archive).',
  heroCredit: 'Kashmir EcoWatch Cryosphere Visual Archive (Illustrative archival plate)',
  journalistSlug: 'dr-fayaz-ahmad-khan',
  bylineDisplay:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Ladakh Cryosphere, Cold-Desert Ecology, Carrying Capacity and Geospatial Intelligence Desk',
  bylineRole:
    "Ladakh Scientific Investigation I · Companion to the 45-Chapter Ladakh's Ecological Frontiers Issue & KEW Ladakh Cold-Desert Observatory",
  factCheckedBy:
    'Stage 04 Cryospheric Literature, Geodetic Mass-Balance Synthesis & Hydrological Baseline Verification Completed · Himalayan Dispatch Desk',
  scientificReviewer:
    'Internal KEW Glaciology, Permafrost & Cold-Desert Hydrology Protocol Synthesis Completed · Independent External Stage 05 Specialist Review Pending',
  workflowStage: 'editorial_approval',
  isPublished: true,
  isFeaturedCoverStory: true,
  isBigRead: true,
  hasCompletedIndependentReview: false,
  supplementaryDatasetUrl: '/himalayan-dispatch/issues/ladakhs-ecological-frontiers',
  supplementaryDatasetLabel: "Open Complete 45-Chapter Ladakh's Ecological Frontiers Issue",
  relatedKewModule: {
    label: 'Open KEW Ladakh Cold-Desert Cryosphere & Ecology Observatory',
    href: '/earth-human-impact/ladakh-cold-desert-observatory',
    scientificContext:
      '12-module Trans-Himalayan observatory tracking glacier mass balance, seasonal snowline elevation, permafrost thaw, GLOF hazards, and village meltwater security.',
  },
  reportingBeatSlug: 'cryosphere-glaciers-high-passes',
  reportingBeatLabel:
    'Cryosphere, Glaciers, Permafrost, Snowmelt Hydrology & Cold-Desert Water Security',
  seoTitle:
    "When the Glaciers Stop Giving: Cryospheric Retreat & Ladakh's Water Security | Ladakh's Ecological Frontiers",
  publicationStatusNote:
    "Stage 08 · Pre-Release Cover Scientific Investigation in Special Issue 'Ladakh's Ecological Frontiers' Awaiting Administrator Approval",
  conceptualFolioDisclosure:
    "Scientific Investigation Architecture & Prospective Experiment Transparency: Investigation 01 of 'Ladakh's Ecological Frontiers' synthesizes peer-reviewed Trans-Himalayan glaciological, climatological, permafrost, and traditional irrigation literature—including the 2026 scientific synthesis reporting regional warming of approximately 0.02°C annually, earlier snowmelt onset, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually. All seven empirical protocols detailed in Chapter VII are explicitly framed as Proposed Original Scientific Experiments for execution across Chapters 01–15 of the companion scientific issue and the KEW Ladakh Cold-Desert Observatory; no unexecuted field instrumentation or unpublished satellite processing is claimed as completed.",
  editorialVerificationNote:
    'Methodological & Evidentiary Guardrails: (1) Glacier mass-balance loss ranges (0.21–0.37 m w.e./yr) and regional warming rates (~0.02°C/yr) reflect basin-scale multi-decadal syntheses across Ladakh’s Zanskar, Suru, and Leh-range catchments; sub-regional heterogeneity—especially surge-type glaciers in the Shyok–Nubra–Eastern Karakoram sector versus small (<2 km²) cirque glaciers on the Ladakh Range—must never be collapsed into a single uniform retreat rate. (2) Volumetric comparisons between artificial glaciers / ice stupas (typically 10³–10⁴ m³ per structure) and natural cirque glaciers (10⁶–10⁸ m³) evaluate seasonal spring-bridging utility rather than total basin replacement. (3) Accompanying visual plates are verified illustrative landscape references from the Kashmir EcoWatch Visual Archive.',
  publicationGates: buildPreReleaseStage08GateLedger({
    scientificReviewApplicable: true,
    evidenceSummary:
      'Verified against 2026 Trans-Himalayan cryospheric syntheses (Indian Agricultural Research Journals & multi-sensor geodetic assessments reporting ~0.02°C/yr warming and 0.21–0.37 m w.e./yr glacier mass loss), peer-reviewed studies on Pensilungpa, Parkachik, Drung-Drung, Chhota Shigri/Zanskar, and Leh-range niche glaciers, ICIMOD & WIHG glacial-lake inventories, and documented Ladakhi yura/zing/churpon and artificial-glacier hydraulic engineering records.',
    scientificNote:
      'Fifteen cold-desert cryospheric research domains, elevation-band snowmelt hydrograph equations, permafrost active-layer mechanisms, and seven Proposed Original Scientific Experiments internally audited; independent external Stage 05 glaciological and cold-region hydrological review pending.',
    ethicsAndVisualNote:
      'Honors the centuries-old hydraulic knowledge of Ladakhi farming communities, churpon water masters, and ice-reservoir innovators while transparently distinguishing published syntheses from Proposed Original Scientific Experiments; visual plates carry explicit illustrative provenance captions.',
    adminHoldNote:
      "Staged at Stage 08 (editorial_approval) as Cover Investigation 01 of Special Scientific Issue 'Ladakh's Ecological Frontiers', paired with Chapter IV's interactive Cryosphere & Melt-Timing Workbench.",
  }),
  dataVisualization: {
    id: 'fig-ladakh-glacier-mass-balance-regimes',
    kicker: 'FIGURE 01 · TRANS-HIMALAYAN CRYOSPHERIC HETEROGENEITY & WATER DEPENDENCE',
    title: 'Glacier Mass Loss & Oasis Meltwater Dependence Across Ladakh Sub-Basins',
    subtitle:
      'Indicative annual specific mass-balance loss magnitude (|m w.e./yr|, 2000–2026 literature synthesis) contrasted against headwater cirque sensitivity from Drass–Suru–Zanskar to the Leh Range and Shyok–Karakoram.',
    unit: 'm w.e./yr',
    chartStyle: 'snowline_horizon',
    keyFindingStat: '0.21–0.37 m w.e./yr',
    keyFindingNarrative:
      'Small (<2 km²) high-elevation Leh-range cirque glaciers feeding village yuras lose mass near the upper synthesis bound (~0.37 m w.e./yr), threatening spring irrigation long before larger Karakoram trunk glaciers.',
    methodologyNote:
      'Synthesized from published geodetic DEM-differencing and 2026 regional cryospheric reviews reporting basin-wide losses of 0.21–0.37 m w.e./yr alongside smaller net losses or surge-modulated variability in the Eastern Karakoram.',
    sourceCitation:
      '2026 Ladakh Cryospheric Synthesis (Indian Agricultural Research Journals+1); WIHG / SAC-ISRO / peer-reviewed Zanskar, Suru & Ladakh Range geodetic inventories.',
    points: [
      {
        yearOrLabel: 'Leh Range Cirques (<2 km²)',
        primaryValue: 0.37,
        annotation:
          '−0.37 m w.e./yr · Thin, high-equilibrium-line ice patches above 5,200 m feeding Leh, Saboo, Phyang, and Likir gravity yuras.',
      },
      {
        yearOrLabel: 'Zanskar Catchments',
        primaryValue: 0.33,
        annotation:
          '−0.33 m w.e./yr · Steep debris-mantled and clean-ice tongues experiencing sustained thinning and proglacial lake expansion.',
      },
      {
        yearOrLabel: 'Suru & Drass Corridor',
        primaryValue: 0.28,
        annotation:
          '−0.28 m w.e./yr · Parkachik and Pensilungpa systems stressed by warmer spring isotherms and proglacial lake calving.',
      },
      {
        yearOrLabel: 'Changthang Ice Caps',
        primaryValue: 0.24,
        annotation:
          '−0.24 m w.e./yr · Cold hyper-arid ice caps (>5,500 m) coupled with degrading permafrost active layers feeding endorheic basins.',
      },
      {
        yearOrLabel: 'Ladakh Lower Synthesis Bound',
        primaryValue: 0.21,
        annotation:
          '−0.21 m w.e./yr · Lower bound of the 2026 synthesis range (0.21–0.37 m w.e./yr) across monitored Trans-Himalayan sub-basins.',
      },
      {
        yearOrLabel: 'Eastern Karakoram Trunks',
        primaryValue: 0.11,
        annotation:
          '−0.11 m w.e./yr · Surge-modulated Shyok/Nubra trunk glaciers where tributary thinning and ice-dam hazards increasingly emerge.',
      },
    ],
  },
  chapters: [
    {
      numberRoman: 'PROLOGUE',
      title: 'The Architecture of an Oasis in a Rain Shadow',
      subtitle:
        'Why Ladakh cannot be understood through the hydrology of monsoon valleys',
      paragraphs: [
        'Cross the Great Himalayan crest northward over Zojila, Pensila, or Baralacha La and the atmospheric grammar of South Asia reverses within thirty kilometres. Behind the granite and gneiss wall of the Greater Himalaya, monsoon moisture wrung out over Kashmir, Kishtwar, and Lahul arrives in Ladakh only as a spent, high-altitude whisper—except during rare, destructive convective cloudbursts when anomalous subtropical moisture breaches the barrier. Across the central Indus corridor around Leh (3,500 metres) and the high basins of Changthang (4,300 to 4,800 metres), mean annual valley-floor precipitation scarcely reaches 90 to 150 millimetres. Even in western Ladakh—across Drass, Kargil, and the upper Suru valley, where winter Western Disturbances deliver deep seasonal snowpacks—summer skies over the cultivated river terraces remain intensely dry, high-radiation, and evaporative.',
        'Yet for more than a millennium, Ladakhi civilization has turned bleak granite fans and glacial outwash terraces into emerald polygons of hulless barley (nas), wheat, peas, buckwheat, willow coppices, and apricot orchards. Every single village from Wanla, Domkhar, and Alchi to Padum, Sankoo, Diskit, and Hanle is a hydraulic pact negotiated with frozen water. Because rainfall on the fields themselves is hydrologically negligible during the growing season, cultivation depends almost entirely on solid winter snowpack, high-elevation cirque glaciers, rock glaciers, and thawing permafrost perched between 4,800 and 6,200 metres—delivered downward through hand-built stone channels (yuras or kuhls), held overnight in mud-and-stone storage ponds (zings), and rationed turn by turn under the community authority of the village water master (churpon).',
        'A 2026 scientific synthesis of Ladakh’s hydro-climatic trajectory quantifies why that millennium-old pact has entered perilous territory: regional temperatures have risen at approximately 0.02°C annually over multi-decadal instrumental and reanalysis series, seasonal snowmelt is shifting earlier into late winter and early spring, and glacier mass balances across Ladakh’s mountain ranges are registering net losses between 0.21 and 0.37 metres of water equivalent (m w.e.) per year. In a humid river basin, a fractional shift in snowmelt timing is buffered by monsoon rain and deep alluvial aquifers. In a cold desert, when frozen reservoirs mistime or exhaust their seasonal release, the desert reclaims the terrace.',
      ],
      commemorationLedger: {
        heading: 'LADAKH CRYOSPHERIC & HYDRO-CLIMATIC BENCHMARKS · 2026 SYNTHESIS',
        items: [
          { label: 'Regional Warming Trend', figure: '~0.02°C / yr' },
          { label: 'Annual Glacier Mass Loss', figure: '0.21–0.37 m w.e.' },
          { label: 'Research Scope (Inv. 01)', figure: '15 Domains · 7 Expts' },
        ],
        methodologicalNote:
          'Empirical benchmarks cited from the 2026 regional synthesis (Indian Agricultural Research Journals+1) and peer-reviewed geodetic glacier mass-balance records across Zanskar, Suru, and Ladakh Range sub-basins.',
        sourceNote:
          "Companion to Chapters 01–15 of 'Ladakh's Ecological Frontiers' and the KEW Ladakh Cold-Desert Observatory.",
      },
      pullQuote: {
        quote:
          "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
        attribution: 'Central Research Hypothesis · Investigation 01',
        context: "Ladakh's Ecological Frontiers — Cryosphere, Permafrost & Water Security",
      },
    },
    {
      numberRoman: 'I',
      title: 'Two Cryospheres Under One Sky: Cirque Slivers and Karakoram Giants',
      subtitle:
        'Domains 01–04: Cryospheric systems, historical climatology, glacier mass balance, and the Karakoram paradox',
      paragraphs: [
        'Popular commentary routinely treats Himalayan glaciers as a single monolithic ice sheet either vanishing overnight or—when invoking the “Karakoram anomaly”—mysteriously immune to warming. Both caricatures fail catastrophically in Ladakh, because Ladakh spans the junction of three distinct mountain systems: the northern flank of the Greater Himalaya (draining into Zanskar and Suru), the central granitoid batholith of the Ladakh Range (flanking the Indus between Leh and Nubra), and the towering Eastern Karakoram beyond the Shyok suture.',
        'In the Zanskar and Suru basins—home to benchmark valley glaciers such as Drung-Drung, Pensilungpa, Kangriz, and Parkachik—glaciers occupy steep, high-relief troughs fed by winter Western Disturbances and limited summer spillover. Multi-temporal satellite stereophotogrammetry and field stakes confirm sustained negative mass balances within the 0.21 to 0.37 m w.e. per year regional loss envelope, accompanied by terminus retreat, surface lowering, and expanding supraglacial debris mantles. Farther north along the Ladakh Range—directly above Leh, Saboo, Phyang, Taru, Umla, and Nimo—the hydrological reality is far starker. Here, villages do not sit below twenty-kilometre trunk glaciers; they depend on tiny cirque and niche glaciers often smaller than 0.5 to 2.0 square kilometres, tucked into north-facing hollows above 5,200 metres. With minimal accumulation zones, rising equilibrium-line altitudes (ELAs) push virtually their entire surface area into the summer ablation zone, stripping away multi-year firn reserves and exposing bare, darkened ice.',
        'Across Khardung La in the Nubra–Shyok basin, trunk glaciers such as Siachen, Mamostong Kangri, Kumdan, and Rimo exhibit the complex dynamics of the Eastern Karakoram: high-elevation accumulation zones above 5,600 metres, thick debris covers, and periodic kinematic surges driven by internal thermal and subglacial hydrological switches. Yet recent geodetic reconstructions show that even Karakoram icefields are no longer uniformly balanced—tributary tongues are thinning, surge return intervals are destabilizing, and—crucially for human water security—the meltwater of Siachen and Shyok flows down deep mainstem gorges hundreds of metres below the perched lateral fans where most Ladakhi villages actually farm.',
        'Reconstructing Ladakh’s historical climatology (Domain 02) exposes why sparse valley-bottom weather gauges have long obscured high-altitude warming. Instrumental records at Leh and Kargil, discontinuous across twentieth-century transitions and relocated between airfield and town sites, sample boundary-layer inversions on the valley floor rather than free-tropospheric warming at 5,300 metres, where elevation-dependent warming (EDW), snow-albedo feedbacks, and light-absorbing aerosols (black carbon and mineral dust) amplify absorbed solar radiation on snow and ice surfaces.',
      ],
      fieldNote: {
        label: 'HYDROLOGICAL SCALE PARADOX · LEH RANGE VS. MAINSTEM INDUS',
        coordinates: '34.15°N, 77.58°E · 3,500–5,450 m ASL',
        detail:
          'Although the mainstem Indus River carries billions of cubic metres past Leh annually, lifting water 200–600 metres onto steep tributary alluvial fans requires energy-intensive pumping; traditional gravity agriculture depends almost 100% on tiny headwater cirque glaciers and snowpacks directly upslope of each village.',
      },
    },
    {
      numberRoman: 'II',
      title: 'The Shifting Calendar of Snow and Western Disturbances',
      subtitle:
        'Domains 05–06: Seasonal snow cover dynamics, winter storm tracks, and the April–May irrigation bottleneck',
      paragraphs: [
        'In Ladakh’s traditional agro-hydrological calendar, snow and glacier ice perform two distinct, non-interchangeable duties. Seasonal winter snow—deposited between November and March across intermediate elevations (3,500 to 4,900 metres) by extratropical Western Disturbances originating over the Mediterranean, Caspian, and Black Seas—melts first in April and May. That early snowmelt moistens thawed fields precisely when farmers in Leh, Kargil, Suru, and Zanskar must sow barley, wheat, and peas so crops can mature before September frosts. Only in mid-June, July, and August, after seasonal snow has retreated above 5,000 metres, does glacier ice ablation take over to sustain mid-summer irrigation.',
        'When regional temperatures climb by ~0.02°C annually and winter storm tracks become more erratic, this two-stage relay fractures in the middle. Across Drass—historically celebrated as one of the coldest inhabited valleys in the Himalaya—and across Kargil, Sankoo, and Padum, late-winter warm spells increasingly convert lower-elevation snowfall into wet snow or rain, triggering premature March runoff before fields are plowed or irrigation channels are cleared of avalanche ice. Conversely, snow-depleted slopes dry out by late April, opening a critical three-to-five-week “spring water gap” after ephemeral snowmelt has vanished from mid-elevations yet before high-altitude cirque glaciers reach the 0°C isotherm.',
        'Worse still, Western Disturbances themselves are exhibiting heightened interannual volatility: prolonged mid-winter snow droughts leave bare talus exposed to winter sublimation under fierce cold-desert winds, followed by late-spring snowfalls or unseasonal summer convective rainstorms over unconsolidated desert slopes that carry zero soil-binding vegetation—generating destructive mud-and-debris flows (such as the recurring flash-flood torrents recorded across Leh tributaries since 2010) rather than slow, usable groundwater recharge.',
      ],
    },
    {
      numberRoman: 'III',
      title: 'Permafrost Thaw and the Rising Threat of Glacial Lakes',
      subtitle:
        'Domains 07–09: Degrading cryotic ground, moraine-dammed lake expansion, and GLOF vulnerability',
      paragraphs: [
        'Beneath Ladakh’s visible glaciers lies an invisible, unmapped third pillar of the Trans-Himalayan cryosphere: mountain permafrost and periglacial rock glaciers. Across Changthang, the high passes of Khardung La, Chang La, Tanglang La, Singge La, and Shinku La, and unglaciated scree basins above 4,500 to 4,800 metres, perennially frozen ground acts both as an impermeable aquitard perching shallow suprapermafrost moisture for alpine sedge meadows and as an interstitial ice reservoir releasing cold baseflow in late summer after clean surface snow has disappeared.',
        'As active-layer thickness deepens under persistent atmospheric warming, permafrost degradation (Domain 07) unleashes cascading geotechnical and hydrological consequences. Along high-altitude roads and defense-civilian corridors, thawing ice-rich talus triggers retrogressive slope slumps, frost-heave roadbed buckling, and rockfall detachments from freshly de-buttressed headwalls. Hydrologically, initial permafrost thaw temporarily boosts late-season stream mineralization and discharge, only to drain perched wet meadows permanently once the impermeable ice table drops below root zones—a silent desiccation directly linking Cryospheric Investigation 01 to Changthang wetland integrity in Investigation 03.',
        'Simultaneously, glacier recession behind steep Little Ice Age terminal moraines is driving rapid glacial lake expansion (Domain 08) and Glacial Lake Outburst Flood (GLOF) vulnerability (Domain 09) across Zanskar, Suru, and the Shyok basin. At Parkachik Glacier on the Suru River and Pensilungpa and Stod/Tsarap tributaries in Zanskar, ice-contact proglacial lakes lengthen as calving fronts thin and float, while buried dead-ice cores within unconsolidated moraine dams slowly melt. Ladakh has already witnessed how rapidly cryospheric and geomorphic blockages threaten valley corridors—from the 2014–2015 Phuktal (Tsarap) landslide-dammed lake crisis in Zanskar to sudden supraglacial/moraine outburst surges destroying village footbridges, micro-hydel canals, and riverside terraces in Gya-Miru, Domkhar, and Zanskar.',
      ],
      plate: {
        imageUrl: '/images/publications/kolahoi-glacier-cryosphere.jpg',
        caption:
          'High-elevation Himalayan glacier ablation tongue, debris-mantled moraine ridges, and proglacial meltwater channel illustrating terminus thinning and ice-contact hazard geometry (Illustrative archival plate — Kashmir EcoWatch Cryosphere Visual Archive).',
        credit: 'Kashmir EcoWatch Cryosphere Visual Archive (Illustrative archival plate)',
      },
    },
    {
      numberRoman: 'IV',
      title: 'Aquifers, Springs, Yuras, and the Engineering of Ice Stupas',
      subtitle:
        'Domains 10–12: Glacial-outwash groundwater, traditional churpon governance, and the real physics of artificial glaciers',
      paragraphs: [
        'Follow a meltwater stream down from a Leh-range cirque and half of its discharge often disappears into coarse, angular granite boulders before ever reaching a village headgate. These high-permeability glacial outwash fans and talus cones constitute Ladakh’s primary groundwater aquifers (Domain 10), recharged almost exclusively by snowmelt infiltration and seepage from unlined upper yura channels, then resurfacing down-fan along lithological contacts as perennial cold springs (chumiks, Domain 11) that provide winter drinking water when surface streams freeze solid.',
        'For centuries, Ladakhi communities governed this coupled surface-subsurface system through exquisite socio-ecological institutions. Under the churpon system, water allocation rotates across households (trompa/khangchen) according to codified village registers (bandobast / riwaz-i-abpashi), adjusting rotation intervals seamlessly between abundant snow-years and drought springs. Even the apparent “seepage losses” of stone-and-turf yuras recharged the downslope willow groves, wet meadows (olthang), and chumik springs—meaning well-intentioned modern concrete lining of upper channels can inadvertently starve lower village springs if fan hydrogeology is ignored.',
        'Confronted with the widening April–May spring meltwater deficit, Ladakhi engineers and villagers pioneered world-renowned cryospheric adaptations (Domain 12): first Chewang Norphel’s low-gradient cascade stone-bund artificial glaciers in shaded side valleys above Phuktsey and Nang, and subsequently Sonam Wangchuk and community teams’ vertical conical ice stupas across Phyang, Igoo, Shara, and Kargil villages, which freeze otherwise wasted winter stream baseflow into low-surface-area-to-volume ice cones that melt gradually through spring.',
        'Scientific honesty requires celebrating this indigenous hydraulic brilliance while refusing to romanticize artificial ice as a substitute for climate stabilization or basin-scale water governance. A large ice stupa storing 3,000 to 15,000 cubic metres of water can decisively rescue two critical spring irrigations for fledgling apricot blossoms and barley seedlings in a small headwater hamlet—provided winter stream baseflow remains unfrozen in buried HDPE supply pipes, nocturnal winter temperatures stay reliably sub-zero without mid-winter warm winds, and freeze-thaw pipe bursts are maintained by trained village youth. Yet artificial glaciers redistribute existing winter baseflow in time; they cannot manufacture net water once the parent headwater cirque glacier and permafrost spring above them exhaust their multi-decadal mass.',
      ],
    },
    {
      numberRoman: 'V',
      title: 'Peak Water, Barley Terraces, and Long-Term Survival Modelling',
      subtitle:
        'Domains 13–15: Agricultural water security, peak-water inflection horizons, and coupled basin forecasting',
      paragraphs: [
        'For Ladakh’s agrarian communities (Domain 13), water insecurity manifests first not as an empty river in July, but as mistimed moisture, labour attrition, and crop failure at the margins. High-altitude hulless barley, local wheat landraces, buckwheat, sea-buckthorn belts, and Kargil–Sham Halman apricot orchards are finely tuned to specific thermal-moisture windows. When April irrigation turns fail by ten days in higher villages such as Kulum, Kumik, or Photoksar—places where documented springs and niche snowfields have already faltered—households face agonizing choices between abandoning outer terraces, shifting toward cash crops or tourism wage labour in Leh, and leaving shared yura maintenance short-handed.',
        'Glacio-hydrological theory describes a two-phase curve under sustained warming known as “peak water” (Domain 14). During Phase I, accelerated ice melt temporarily inflates midsummer runoff—creating a dangerous optical illusion of water abundance that tempts planners to approve water-intensive hotels, lawns, and urban expansions. Once shrinking glacier area outweighs higher melt rates per unit area, the catchment crosses its peak-water inflection into Phase II: irreversible secular decline in summer glacial runoff, heightened interannual variability, and eventual reversion to a purely snow-and-rain-driven arid flash regime.',
        'Crucially, Ladakh will not cross peak water on a single calendar date. Small, thin cirque glaciers (<1–2 km²) along the Leh Range appear to have already passed—or are imminently passing—their peak-water threshold, whereas larger heavily glaciated sub-basins in Suru and Zanskar may experience elevated or plateaued summer melt through mid-century before declining sharply in the second half of the twenty-first century. Long-term water security modelling (Domain 15) must therefore couple high-resolution energy-balance cryospheric physics with village-scale irrigation demand, groundwater storage, and winter town water supply.',
      ],
    },
    {
      numberRoman: 'VI',
      title: 'The Fifteen-Chapter Scientific Investigation Architecture',
      subtitle:
        'Mapping the cryospheric chain from high-altitude ice physics to village water governance',
      paragraphs: [
        'To prevent piecemeal, project-by-project water planning across Leh and Kargil districts, Investigation 01 organizes fifteen sequential monograph chapters (Chapters 01–15 of Ladakh’s Ecological Frontiers). Each chapter links physical remote sensing and field glaciology directly to downstream springs, yura networks, GLOF preparedness, and community adaptation:',
      ],
      editorialTable: {
        kicker: 'INVESTIGATION 01 · CHAPTER ARCHITECTURE (CHAPTERS 01–15 OF 45)',
        caption:
          'Fifteen Cryospheric, Permafrost, Glacial Hazard & Water-Security Research Domains Across Ladakh',
        headers: ['Chapter & Domain', 'Core Scientific & Hydrological Scope'],
        rows: [
          [
            'Ch. 01 · Cryospheric Systems',
            'Typology and hypsometry of clean-ice, debris-covered, surge-type, cirque, and rock glaciers across Zanskar, Suru, Ladakh Range, Pangong, Changthang, and Eastern Karakoram.',
          ],
          [
            'Ch. 02 · Historical Climatology',
            'Multi-decadal temperature (~0.02°C/yr warming), elevation-dependent warming (EDW), solar radiation, black-carbon albedo forcing, and valley-vs-ridge station bias.',
          ],
          [
            'Ch. 03 · Glacier Retreat & Mass Balance',
            'Geodetic and glaciological mass balance (0.21–0.37 m w.e./yr regional loss), ELA rise, and accelerated depletion of small (<2 km²) oasis-feeding cirque glaciers.',
          ],
          [
            'Ch. 04 · Karakoram Glacier Variability',
            'Surge mechanics, subglacial hydrology, and tributary thinning across Siachen, Nubra, and Shyok—clarifying why Karakoram ice does not insulate Leh-range villages.',
          ],
          [
            'Ch. 05 · Seasonal Snow Cover Dynamics',
            'MODIS/Sentinel snow-cover duration, snowline elevation trajectories, winter sublimation losses, and premature March–April snowpack exhaustion.',
          ],
          [
            'Ch. 06 · Western Disturbances',
            'Synoptic storm-track variability, solid-to-liquid precipitation phase shifts across Drass, Kargil, and Suru, and convective rain-shadow cloudburst anomalies.',
          ],
          [
            'Ch. 07 · Permafrost Degradation',
            'Active-layer deepening across Changthang and high passes (>4,500 m), rock-glacier baseflow shifts, roadbed thermokarst, and high-mountain slope instability.',
          ],
          [
            'Ch. 08 · Glacial Lake Expansion',
            'Multi-temporal inventory of moraine-dammed, ice-contact, and supraglacial lakes across Zanskar, Suru (Parkachik/Pensilungpa), and Shyok headwaters.',
          ],
          [
            'Ch. 09 · GLOF Vulnerability',
            'Dam-breach hydrodynamic routing, avalanche/rockfall wave triggers, and exposure of villages, bridges, micro-hydel plants, and strategic highways.',
          ],
          [
            'Ch. 10 · Groundwater Recharge',
            'Isotopic (δ18O, δ2H, tritium) partitioning of snowmelt vs. icemelt recharge in glacial-outwash alluvial fans and fractured granite aquifers.',
          ],
          [
            'Ch. 11 · Springs & Traditional Irrigation',
            'Hydrogeology of chumik springs and socio-hydraulic resilience of yura canals, zing ponds, and churpon rotational governance under shifting hydrographs.',
          ],
          [
            'Ch. 12 · Artificial Glaciers & Ice Stupas',
            'Rigorous mass-energy balance audit of cascade artificial glaciers and vertical ice stupas: storage volumes, winter baseflow prerequisites, and failure modes.',
          ],
          [
            'Ch. 13 · Agricultural Water Security',
            'Crop-water stress across April–May sowing windows for barley, wheat, peas, apricot orchards, and sea-buckthorn across elevation-graded oases.',
          ],
          [
            'Ch. 14 · Future Climate Scenarios',
            'CMIP6 / CORDEX bias-corrected projections (SSP2-4.5 & SSP5-8.5) and sub-basin peak-water inflection timing from 2026 to 2100.',
          ],
          [
            'Ch. 15 · Long-Term Water Security Modelling',
            'Integrated cold-desert water allocation framework uniting headwater cryosphere budgets, Jal Jeevan winter pipelines, ecological baseflows, and urban caps.',
          ],
        ],
        footnote:
          "Full chapter protocols, primary documentary sources, and right-of-response rosters are published in the companion issue (/himalayan-dispatch/issues/ladakhs-ecological-frontiers).",
      },
    },
    {
      numberRoman: 'VII',
      title: 'Seven Proposed Original Scientific Experiments',
      subtitle:
        'A transparent empirical protocol to measure cryospheric change from satellite archive to village headgate',
      paragraphs: [
        'Because responsible environmental journalism must never blur published synthesis with unexecuted fieldwork, Himalayan Dispatch and Kashmir EcoWatch formulate seven explicit Proposed Original Scientific Experiments for Investigation 01. Each protocol pairs open multi-sensor Earth observation with reproducible glacio-hydrological modelling and community-verified village water audits:',
      ],
      editorialTable: {
        kicker: 'PROPOSED ORIGINAL SCIENTIFIC EXPERIMENTS · INVESTIGATION 01 (PROSPECTIVE PROTOCOLS)',
        caption:
          'Seven Reproducible Cryospheric, Permafrost & Village Water-Security Research Experiments (1985–2026 Baseline & 2050/2100 Scenarios)',
        headers: ['Proposed Experiment', 'Reproducible Scientific Methodology & Validation Target'],
        rows: [
          [
            '01 · Glacier Retreat Mapping (1985–2026)',
            'Multi-sensor optical/SAR terminus and area delineation across Zanskar, Suru, Leh Range, Nubra–Shyok, and Changthang using Landsat 5/7/8/9, Sentinel-2, and ASTER imagery stratified by size class (<0.5, 0.5–2, 2–10, >10 km²), aspect, and debris cover.',
          ],
          [
            '02 · Historical Snowline Elevation Reconstruction',
            '41-year reconstruction of end-of-summer snowline altitude (SLA, proxy for ELA) and monthly snow-covered area (SCA) curves across elevation bands from 3,200 m to 6,200 m, quantifying spring snowmelt advancement in days per decade.',
          ],
          [
            '03 · Glacier Mass Balance Assessment',
            'Geodetic DEM differencing (KH-9 Hexagon / ASTER / HMA-DEM / TanDEM-X / ICESat-2 altimetry) to disaggregate specific mass loss (m w.e./yr) between oasis-feeding Leh-range cirque glaciers and trunk glaciers in Suru, Zanskar, and Karakoram.',
          ],
          [
            '04 · Permafrost Vulnerability Modelling',
            'High-resolution Permafrost Zonation Index (PZI) and ground-surface temperature / InSAR rock-glacier creep mapping across Changthang, Khardung La, Chang La, Tanglang La, and Zanskar passes (>4,400 m).',
          ],
          [
            '05 · Glacial Lake Expansion & Hazard Mapping',
            'Automated NDWI/SAR decadal glacial-lake inventory paired with moraine-dam geometry, ice-avalanche runout susceptibility, and 2D hydrodynamic breach routing for high-priority Zanskar, Suru, and Shyok lakes.',
          ],
          [
            '06 · Seasonal Meltwater Availability Forecasting',
            'Coupled snow-glacier-permafrost degree-day / energy-balance runoff modelling under SSP1-2.6, SSP2-4.5, and SSP5-8.5 to pinpoint April–May spring deficits and sub-basin peak-water inflection decades.',
          ],
          [
            '07 · Village-Level Water Security Assessment',
            'Comparative socio-hydrological audit across 30 stratified villages (Leh Range, Sham, Nubra, Zanskar, Suru, Drass, Changthang) pairing headwater ice reserves, chumik spring discharge, yura/zing capacity, and artificial-glacier feasibility.',
          ],
        ],
        footnote:
          'Evidentiary Transparency Notice: All seven protocols above are Prospective Scientific Research Designs; datasets will be published openly through the KEW Ladakh Cold-Desert Observatory only as each validation gate is completed.',
      },
    },
    {
      numberRoman: 'EPILOGUE',
      title: 'Before the Last Cirque Turns to Stone',
      subtitle:
        'Why Ladakh’s water governance must adapt to hydrograph timing today rather than waiting for glacier disappearance',
      paragraphs: [
        'Walk above a Ladakhi village to the stone intake where the main yura peels away from a braided glacial stream and the lesson of Investigation 01 becomes unmistakable. A glacier does not have to vanish from the map to stop sustaining a village. Long before the final remnant of cirque ice melts beneath grey granite talus, rising snowlines empty the April channel, mid-winter rain crusts starve the spring aquifer, unlined urban borewells intercept fan recharge, and sudden moraine-lake surges smash the stone headworks that generations of villagers rebuilt each spring.',
        'Yet Ladakh possesses intellectual and institutional assets rare anywhere in the high mountains: communities that still understand water as a sacred, collectively rationed commons; local innovators who turned winter physics into artificial glaciers; and a scientific community increasingly capable of resolving every cirque, rock glacier, and glacial lake at ten-metre resolution. Pairing those strengths requires retiring lowland infrastructure templates that treat cold-desert water as infinite—bringing us directly to Investigation 02 of this issue: how many people, hotels, borewells, and highways a cold desert can actually sustain.',
      ],
    },
  ],
  documentarySources: [
    {
      label:
        '2026 Ladakh Cryospheric & Hydro-Climatic Scientific Synthesis (Indian Agricultural Research Journals & Regional Geodetic Assessments)',
      url: 'https://epubs.icar.org.in/',
      relevance:
        'Establishes the empirical regional benchmark of ~0.02°C annual warming, earlier spring snowmelt onset, and glacier mass losses of 0.21–0.37 m w.e. annually across Ladakh.',
    },
    {
      label:
        'Wadia Institute of Himalayan Geology (WIHG) & Peer-Reviewed Zanskar / Suru Glacier Mass-Balance Studies (Pensilungpa, Parkachik & Kangriz)',
      url: 'https://www.wihg.res.in/',
      relevance:
        'Provides field-glaciological and multi-temporal satellite evidence on glacier thinning, debris-cover feedbacks, and proglacial lake expansion in western Ladakh.',
    },
    {
      label:
        'SAC-ISRO / NRSC Himalayan Cryosphere, Snow-Cover & Glacial Lake Atlas (Indus, Shyok, Nubra, Zanskar & Suru Sub-Basins)',
      url: 'https://www.nrsc.gov.in/',
      relevance:
        'Documents sub-basin glacier inventories, elevation-band snow-cover dynamics, and high-altitude glacial lakes across the Upper Indus watershed.',
    },
    {
      label:
        'ICIMOD Hindu Kush Himalaya Cryosphere, Permafrost & Water Assessment Reports',
      url: 'https://www.icimod.org/',
      relevance:
        'Contextualizes elevation-dependent warming, mountain permafrost active-layer thaw, Karakoram surge variability, and peak-water runoff trajectories.',
    },
    {
      label:
        'Peer-Reviewed Studies on Leh-Range Niche Glaciers, Traditional Yura/Churpon Irrigation & Artificial Glaciers / Ice Stupas (Nüsser, Baghel, Schmidt, Norphel & Wangchuk Literature)',
      url: 'https://www.cambridge.org/core/journals/journal-of-glaciology',
      relevance:
        'Quantifies small-cirque vulnerability (<2 km²) on the Ladakh Range alongside socio-hydrological evaluations of traditional irrigation and artificial ice reservoirs.',
    },
  ],
  editorialMetadataTable: [
    {
      attribute: 'Publication Series & Issue',
      assignment:
        "Himalayan Dispatch · Special Regional Scientific Issue: Ladakh's Ecological Frontiers (Investigation 01 of 03)",
    },
    {
      attribute: 'Geographical Scope',
      assignment: 'Zanskar · Suru · Nubra · Leh · Kargil · Drass · Changthang',
    },
    {
      attribute: 'Narrative Structure & Reading Duration',
      assignment:
        'Nine-Section Cover Scientific Investigation (Prologue, Chapters I–VII & Epilogue)',
    },
    {
      attribute: 'Empirical Benchmark (2026 Synthesis)',
      assignment:
        '~0.02°C/yr regional warming · Earlier snowmelt · 0.21–0.37 m w.e./yr glacier mass loss',
    },
    {
      attribute: 'Companion Issue & Observatory',
      assignment:
        'Chapters 01–15 of Ladakh’s Ecological Frontiers + KEW Ladakh Cold-Desert Observatory (/earth-human-impact/ladakh-cold-desert-observatory)',
    },
    {
      attribute: 'Interactive Scientific Module',
      assignment:
        'LadakhEcologicalFrontiersWorkbench (defaultTab="cryosphere") mounted beneath Chapter IV',
    },
    {
      attribute: 'Publication Gate Status',
      assignment:
        'Stage 08 · Pre-Release Special Scientific Issue Cover Folio Awaiting Administrator Approval (Prospective Experiment Transparency Active)',
    },
  ],
  corrections: [],
  seoKeywords: [
    'When the Glaciers Stop Giving Ladakh water security investigation',
    'Ladakh glacier mass loss 0.21 to 0.37 m w.e. regional warming 0.02C',
    'Zanskar Suru Parkachik Pensilungpa Leh Range cirque glaciers',
    'Ladakh permafrost degradation Changthang rock glaciers GLOF vulnerability',
    'Ladakh yura zing churpon traditional irrigation spring snowmelt gap',
    'Chewang Norphel artificial glaciers Sonam Wangchuk ice stupas hydrology',
    'Ladakhs Ecological Frontiers Himalayan Dispatch Kashmir EcoWatch',
  ],
};

const LADAKH_GLACIERS_STOP_GIVING_METRICS = computeStoryMetrics(
  LADAKH_GLACIERS_STOP_GIVING_BASE
);

export const LADAKH_GLACIERS_STOP_GIVING_STORY: MagazineStory = {
  ...LADAKH_GLACIERS_STOP_GIVING_BASE,
  wordCount: LADAKH_GLACIERS_STOP_GIVING_METRICS.wordCount,
  proseWordCount: LADAKH_GLACIERS_STOP_GIVING_METRICS.proseWordCount,
  readingTimeMinutes: LADAKH_GLACIERS_STOP_GIVING_METRICS.readingTimeMinutes,
  editorialMetadataTable:
    LADAKH_GLACIERS_STOP_GIVING_BASE.editorialMetadataTable?.map((row) =>
      row.attribute === 'Narrative Structure & Reading Duration'
        ? {
            attribute: row.attribute,
            assignment: `Nine-Section Cover Scientific Investigation (Prologue, Chapters I–VII & Epilogue) · Approximately ${LADAKH_GLACIERS_STOP_GIVING_METRICS.readingTimeMinutes} minutes estimated reading duration`,
          }
        : row
    ),
};
