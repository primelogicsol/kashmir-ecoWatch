/**
 * Kashmir EcoWatch - Sectoral Environmental Impact Assessment Engine (SEIAE)
 * Craft-by-Craft Environmental Assessment Registry & Lifecycle Database
 * 
 * Taxonomy sources:
 * - Jammu & Kashmir Handicrafts & Handloom Policy 2020
 * - J&K Notified Crafts Gazette (Directorate of Handicrafts & Handloom, 2023)
 * - Official Geographical Indications (GI) Registry of India (15 Kashmir Division Crafts)
 * - J&K Economic Survey 2025-26 (Handicrafts & Handloom Chapter, Jan 2026)
 * - UNESCO Creative Cities Network (UCCN) Srinagar City of Crafts & Folk Art Dossier (2021)
 * - NIOSH / OSHA / CPCB Occupational Health & Environmental Standards
 */

export interface CraftFamily {
  id: string;
  familyCode: string;
  name: string;
  vernacularTitle: string;
  description: string;
  craftCount: number;
  primaryMaterials: string[];
  keyDistricts: string[];
}

export type GiStatusType = 'GI Registered' | 'GI Applied' | 'Notified Heritage Craft';
export type EvidenceStatusType = 
  | 'Officially Documented' 
  | 'Measured Observation' 
  | 'Modeled Estimate' 
  | 'Potential Pathway' 
  | 'Proposed Investigation';

export interface CraftProfile {
  id: string;
  familyId: string;
  familyName: string;
  craftName: string;
  vernacularName: string;
  giStatus: GiStatusType;
  notifiedGazette: string;
  originDivision: 'Kashmir Division' | 'Jammu & Kashmir UT' | 'Western Himalayan';
  primaryDistrictClusters: string[];
  functionalUnit: string;
  artisanWorkforceEst: string;
  rawMaterialOrigin: string;
  eightStageLifecycle: {
    stage1_rawMaterialOrigin: string;
    stage2_harvestingExtraction: string;
    stage3_primaryProcessing: string;
    stage4_artisanFabrication: string;
    stage5_dyeingFinishing: string;
    stage6_packagingTransport: string;
    stage7_useCareRepair: string;
    stage8_endOfLifeCircularity: string;
  };
  waterFootprint: {
    volumeLiters: string;
    description: string;
    evidenceGrade: 'Empirical Measured' | 'Modeled Estimate' | 'Proposed Investigation';
  };
  energyProfile: {
    primarySource: string;
    energyIntensityEstimate: string;
    kineticManualSharePercent: number;
  };
  chemicalAndEmissionsProfile: {
    substancesUsed: string[];
    potentialExposurePathways: string[];
    occupationalHealthNotes: string[];
    applicableStandards: string[];
  };
  environmentalAdvantages: string[];
  environmentalPressurePoints: string[];
  evidenceStatus: EvidenceStatusType;
  recommendedFieldInvestigations: string[];
}

export interface WaterChemicalProcessRecord {
  processId: string;
  processName: string;
  craftName: string;
  familyId: string;
  keyChemicalOrAgent: string;
  exposureOrEffluentPathway: string;
  applicableRegulatoryStandard: string;
  scientificInvestigationProtocol: string;
  evidenceStatus: 'Potential Pressure Pathway' | 'Screening Observation Only' | 'Proposed Scientific Investigation';
  correctionCaveat: string;
}

export interface ComparativeCraftLifecycle {
  id: string;
  traditionalCraftName: string;
  modernSubstituteName: string;
  comparisonCategory: string;
  functionalUnit: string;
  traditionalEmbodiedCarbon: string;
  substituteEmbodiedCarbon: string;
  energySourceTraditional: string;
  energySourceSubstitute: string;
  averageLifespanTraditional: string;
  averageLifespanSubstitute: string;
  microplasticEmissionsTraditional: string;
  microplasticEmissionsSubstitute: string;
  endOfLifeBiodegradabilityTraditional: string;
  endOfLifeBiodegradabilitySubstitute: string;
  repairabilityScoreTraditional: string;
  repairabilityScoreSubstitute: string;
  scientificLifecycleVerdict: string;
  tradeOffNuance: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. THE 12 NAVIGABLE CRAFT ASSESSMENT FAMILIES
// ─────────────────────────────────────────────────────────────────────────────

export const CRAFT_ASSESSMENT_FAMILIES: CraftFamily[] = [
  {
    id: 'pashmina-shawls',
    familyCode: 'FAM-01',
    name: 'Pashmina & Shawls',
    vernacularTitle: 'Pashm-o-Shal Baf',
    description: 'High-altitude Changthangi caprine underfleece and fine woollen spinning, carding, handloom weaving, and heritage shawl finishing.',
    craftCount: 5,
    primaryMaterials: ['Capra hircus underdown (Pashm)', 'Raffal wool', 'Natural plant dyes', 'Starch/rice paste glue'],
    keyDistricts: ['Srinagar', 'Budgam', 'Bandipora', 'Ganderbal']
  },
  {
    id: 'carpets-flooring',
    familyCode: 'FAM-02',
    name: 'Carpets & Floor Coverings',
    vernacularTitle: 'Qaleen Bafi & Namda/Gabba',
    description: 'Hand-knotted pile carpets on vertical looms, pressed wool felt Namdas, and embroidered post-consumer upcycled Gabba rugs.',
    craftCount: 4,
    primaryMaterials: ['Mulberry silk yarn', 'Indigenous & Australian Merino wool', 'Cotton warp', 'Upcycled wool fabric'],
    keyDistricts: ['Srinagar', 'Baramulla', 'Anantnag', 'Bandipora']
  },
  {
    id: 'embroidery-needlework',
    familyCode: 'FAM-03',
    name: 'Embroidery & Needlework',
    vernacularTitle: 'Sozni, Aari & Tilla Dozi',
    description: 'Ultra-fine needlecraft (Sozni), hook embroidery (Aari), metallic wire thread embroidery (Tilla), and crewel chain-stitch upholstery.',
    craftCount: 7,
    primaryMaterials: ['Fine silk floss', 'Staple yarn', 'Silver/copper-core gold-washed wire', 'Cotton/linen base canvas'],
    keyDistricts: ['Srinagar', 'Budgam', 'Baramulla', 'Pulwama']
  },
  {
    id: 'papier-mache-paper',
    familyCode: 'FAM-04',
    name: 'Papier-Mâché & Paper Crafts',
    vernacularTitle: 'Kar-i-Kalamdani & Sakhtsazi',
    description: 'Molded waste-paper and cardboard structures (Sakhtsazi) illuminated with intricate miniature brushwork (Naqashi) and clear protective varnishing.',
    craftCount: 4,
    primaryMaterials: ['Waste newsprint & cardboard', 'Rice paste binder', 'Mineral & metallic pigments', 'Copal/linseed varnish'],
    keyDistricts: ['Srinagar (Zadibal, Lal Bazar, Nowshera)']
  },
  {
    id: 'woodcraft-architecture',
    familyCode: 'FAM-05',
    name: 'Woodcraft & Architecture',
    vernacularTitle: 'Khat-o-Khatamband & Pinjrakari',
    description: 'Relief and openwork carving of seasoned Juglans regia timber, interlocking polygonal pine ceiling joinery, and non-nail geometric latticework.',
    craftCount: 5,
    primaryMaterials: ['Juglans regia (Walnut) seasoned heartwood', 'Pinus excelsa (Kail) battens', 'Cedrus deodara timber', 'Natural beeswax/stains'],
    keyDistricts: ['Srinagar', 'Anantnag', 'Kulgam', 'Shopian']
  },
  {
    id: 'willow-plant-fiber',
    familyCode: 'FAM-06',
    name: 'Willow & Plant-Fiber Crafts',
    vernacularTitle: 'Keani Keam & Kangri Bafi',
    description: 'Cultivated wetland-edge willow wands boiled, peeled, and hand-plaited into utilitarian containers, furniture, and fire-pot encasements.',
    craftCount: 4,
    primaryMaterials: ['Salix viminalis (Cultivated wicker)', 'Typha angustifolia (Peetch reed)', 'Earthenware Kundal', 'Firewood fuel'],
    keyDistricts: ['Ganderbal (Shalbugh)', 'Bandipora', 'Srinagar']
  },
  {
    id: 'copper-metalcraft',
    familyCode: 'FAM-07',
    name: 'Copper & Metalcraft',
    vernacularTitle: 'Khandkari, Kalai & Traam',
    description: 'Manual copper sheet forming, chiselled floral engraving (Khandkari), and protective molten tinning over charcoal hearths (Kalai).',
    craftCount: 4,
    primaryMaterials: ['Electrolytic copper sheet', 'High-purity tin (Kalai)', 'Ammonium chloride flux', 'Brass / Silver alloys'],
    keyDistricts: ['Srinagar (Zaina Kadal, Nowhatta, Rajouri Kadal)']
  },
  {
    id: 'pottery-ceramics',
    familyCode: 'FAM-08',
    name: 'Pottery & Ceramics',
    vernacularTitle: 'Kral-i-Kaam & Mattan Glaze',
    description: 'Indigenous lacustrine and alluvial clay wheel throwing, earthen firing in updraft clamp kilns, and decorative mineral glazing.',
    craftCount: 3,
    primaryMaterials: ['Alluvial Kashmir clay', 'Silica flux', 'Wood shavings fuel', 'Non-lead mineral colorants'],
    keyDistricts: ['Srinagar (Charar-e-Sharief)', 'Anantnag', 'Ganderbal']
  },
  {
    id: 'stone-mineral',
    familyCode: 'FAM-09',
    name: 'Stone & Mineral Crafts',
    vernacularTitle: 'Sang-Tarashi & Devri Kaam',
    description: 'Chiselling and sculptural relief carving of local sedimentary limestone (Devri stone), historic architecture restorations, and natural pigment grinding.',
    craftCount: 3,
    primaryMaterials: ['Devri blue-grey limestone', 'Local river pebbles', 'Lapis lazuli & malachite mineral ores'],
    keyDistricts: ['Srinagar (Old City)', 'Pulwama (Ladoo quarries)', 'Budgam']
  },
  {
    id: 'traditional-textiles',
    familyCode: 'FAM-10',
    name: 'Traditional Textiles',
    vernacularTitle: 'Chhapawari & Pattu Bafi',
    description: 'Artisanal hand-block wood print textiles on handwoven fabrics, indigenous woollen blankets (Pattu), and traditional tapestry rugs.',
    craftCount: 3,
    primaryMaterials: ['Pure wool yarn', 'Hand-carved pearwood printing blocks', 'Natural vegetable dyes', 'Alum mordants'],
    keyDistricts: ['Srinagar', 'Bandipora', 'Baramulla']
  },
  {
    id: 'heritage-transport',
    familyCode: 'FAM-11',
    name: 'Heritage Transport & Utility Crafts',
    vernacularTitle: 'Shikara Sazi & Bat Making',
    description: 'Master carpentry of traditional Deodar lake craft for wetland navigation, and cleft turning of cultivated English willow for cricket bats.',
    craftCount: 3,
    primaryMaterials: ['Cedrus deodara (Deodar) seasoned timber', 'Salix alba var. caerulea (Kashmir willow)', 'Iron nails/copper rivets', 'Linseed oil'],
    keyDistricts: ['Srinagar (Dal & Nigeen lake margins)', 'Anantnag (Bijbehara, Sangam)', 'Pulwama']
  },
  {
    id: 'other-emerging',
    familyCode: 'FAM-12',
    name: 'Other & Emerging Crafts',
    vernacularTitle: 'Khattati & Khushbu Sazi',
    description: 'Classical Nastaliq reed-pen calligraphy, hydrothermal steam distillation of wild Rosa damascena and saffron attars, and artisanal cold-process soaps.',
    craftCount: 4,
    primaryMaterials: ['Wild rose petals & saffron stigmas', 'Bamboo/reed pens', 'Carbon black ink', 'Wild plant oils'],
    keyDistricts: ['Srinagar', 'Pulwama (Pampore)', 'Budgam']
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. DOCUMENTED KASHMIR CRAFT PROFILES (INDIVIDUAL SCIENTIFIC IDENTITIES)
// ─────────────────────────────────────────────────────────────────────────────

export const DOCUMENTED_CRAFT_PROFILES: CraftProfile[] = [
  // ── FAMILY 01: PASHMINA & SHAWLS ───────────────────────────────────────────
  {
    id: 'pashmina-shawl',
    familyId: 'pashmina-shawls',
    familyName: 'Pashmina & Shawls',
    craftName: 'Handloom Pashmina Shawl',
    vernacularName: 'Kashmiri Pashmina',
    giStatus: 'GI Registered',
    notifiedGazette: 'J&K Handicrafts Policy 2020 / GI Registry No. 46 (2008)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Srinagar (Downtown / Shehr-e-Khas)', 'Budgam', 'Bandipora'],
    functionalUnit: '1 Finished Shawl (200 cm × 100 cm, ~220 g dry fiber mass)',
    artisanWorkforceEst: '45,000+ spinners (primarily women) & 12,000+ handloom weavers',
    rawMaterialOrigin: 'Changthangi goat (Capra hircus) underdown collected via spring moulting combs in Changthang, Ladakh (4,200–5,000 m asl).',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Changthang rangelands, Ladakh. Free-range nomadic pastoralism under Changpa herders with zero intensive feedlots.',
      stage2_harvestingExtraction: 'Non-lethal, non-shearing spring combing of molting underdown. Zero hide processing or chemical depilation.',
      stage3_primaryProcessing: 'Manual dehairing separating 12–15 micron pashm fibers from guard hair; softening with pounded cooked rice paste (Khumb).',
      stage4_artisanFabrication: 'Hand spinning on wooden spinning wheels (Yender); warping and handloom weaving on traditional wooden horizontal looms.',
      stage5_dyeingFinishing: 'Hank dyeing using low-temperature baths; manual washing in soft spring water with saponin plant extract (Reetha); steam pressing.',
      stage6_packagingTransport: 'Hand-folded in unbleached cotton muslin cloth bags; lightweight road transport from Srinagar to national/export terminals.',
      stage7_useCareRepair: 'Typical heirloom lifespan of 40–80 years. Supported by the Rafugari (invisible darning) repair tradition for tear recovery.',
      stage8_endOfLifeCircularity: '100% natural keratin protein fiber; completely soil-biodegradable within 3–6 months. Zero microplastic fiber shedding.'
    },
    waterFootprint: {
      volumeLiters: '45 – 85 L / shawl',
      description: 'Used during rice-starch rinsing, hank dyeing, and final softening baths. Process washwater discharged into municipal drains.',
      evidenceGrade: 'Modeled Estimate'
    },
    energyProfile: {
      primarySource: 'Manual human kinetic power (95%) + LPG/biomass water heating for dye vats (5%)',
      energyIntensityEstimate: '1.2 – 2.0 kWh equivalent / shawl',
      kineticManualSharePercent: 95
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: ['Synthetic acid dyestuffs', 'Certified AZO-free dyes (testing standard)', 'Alum (potassium aluminum sulfate) mordant', 'Rice starch binder'],
      potentialExposurePathways: ['Skin contact with dye vats in unventilated workshops', 'Thermal steam inhalation during hank drying'],
      occupationalHealthNotes: ['Ergonomic musculoskeletal strain from prolonged floor loom posture', 'Ocular fatigue in fine yarn counts (100–120s count)'],
      applicableStandards: ['ISO 1833-1 (Fiber purity)', 'Oeko-Tex Standard 100 Class I', 'CPCB Small-Scale Textile Effluent Guidelines']
    },
    environmentalAdvantages: [
      'Pure keratin natural animal protein; 100% biodegradable in topsoil without synthetic persistence.',
      'Extremely high thermal efficiency per unit mass; negligible microplastic emission during laundering.',
      'Heirloom product lifespan with active circular repairability via traditional Rafugars (invisible darners).'
    ],
    environmentalPressurePoints: [
      'Domestic dye wash-water discharges entering downtown Srinagar storm drains without centralized effluent neutralization.',
      'Overgrazing pressure in Changthang alpine pastures due to increased caprine herd sizes driven by raw fiber demand.'
    ],
    evidenceStatus: 'Officially Documented',
    recommendedFieldInvestigations: [
      'Sentinel stormwater outfall sampling in Zadibal during morning dye cycles with upstream/downstream municipal sewage controls.',
      'Ecological rangeland biomass carrying-capacity assessment across Changthang caprine pastures.'
    ]
  },

  {
    id: 'kani-shawl',
    familyId: 'pashmina-shawls',
    familyName: 'Pashmina & Shawls',
    craftName: 'Kani Shawl',
    vernacularName: 'Kani Shal (Kanihama)',
    giStatus: 'GI Registered',
    notifiedGazette: 'J&K Handicrafts Policy 2020 / GI Registry No. 47 (2008)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Budgam (Kanihama, Batpora)', 'Srinagar', 'Baramulla'],
    functionalUnit: '1 Intricately Patterned Kani Jamawar Shawl (200 cm × 100 cm, 280 g, 12–18 months labor)',
    artisanWorkforceEst: '6,000+ master weavers working on specialized Kani looms',
    rawMaterialOrigin: 'Handspun fine Pashmina warp and weft yarns wound on small eyeless wooden bobbins (Tujis / Kanis).',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Pashmina fiber from Changthang, Ladakh, combined with fine natural-dyed silk threads for structural selvedges.',
      stage2_harvestingExtraction: 'Combed goat molting fibers processed identically to standard Pashmina.',
      stage3_primaryProcessing: 'Extensive multi-color yarn preparation: dyeing 40–120 distinct color shades in small micro-batches (50–100 g each).',
      stage4_artisanFabrication: 'Coded pattern weaving governed by written metric notation (Talim); hand-interlocking up to 1,500 individual wooden Tujis per row.',
      stage5_dyeingFinishing: 'Selective spot washing and light vegetable-saponin rinsing; minimal hot-water processing post-weaving.',
      stage6_packagingTransport: 'Wrapped in handmade mulberry paper and archival linen covers; zero plastic shrink-wrapping in traditional markets.',
      stage7_useCareRepair: 'Investment-grade cultural heirloom with documented lifespans exceeding 100 years in museum collections.',
      stage8_endOfLifeCircularity: '100% natural wool and silk; high antique auction retention and zero municipal solid waste deposition.'
    },
    waterFootprint: {
      volumeLiters: '30 – 55 L / shawl',
      description: 'Significantly lower wet-processing water volume post-weaving due to dry tuji-weaving operation; water is consumed upstream during yarn shade preparation.',
      evidenceGrade: 'Modeled Estimate'
    },
    energyProfile: {
      primarySource: 'Exclusively human manual kinetic energy (98%) + ambient passive room lighting',
      energyIntensityEstimate: '0.8 – 1.4 kWh equivalent / shawl',
      kineticManualSharePercent: 98
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: ['Pre-dyed acid dyestuff hanks', 'Natural madder (Rubia cordifolia)', 'Walnut hull extract', 'Indigo cake'],
      potentialExposurePathways: ['Minor dye-dust inhalation during yarn winding onto bobbins'],
      occupationalHealthNotes: ['High chronic risk of visual myopia and cervical spondylosis from reading Talim codes under low-lux lighting'],
      applicableStandards: ['J&K GI Inspection Protocol', 'Bureau of Indian Standards IS 1113']
    },
    environmentalAdvantages: [
      'Zero fossil-fuel automated mechanical drives; lowest carbon footprint per unit economic value in the global textile sector.',
      'Exceptional cultural durability exceeding 100 years, eliminating the fast-fashion replenishment and waste cycle.'
    ],
    environmentalPressurePoints: [
      'Upstream multi-hue yarn micro-dyeing generates chemical rinse residues in rural cottage workshops without grease/solids traps.'
    ],
    evidenceStatus: 'Officially Documented',
    recommendedFieldInvestigations: [
      'Ergonomic and photometric light-intensity audit of Kanihama weaving sheds to establish daylighting standards.',
      'Lifecycle mass-balance comparing natural mordanted vegetable dyes versus certified low-impact synthetic acid dyestuffs.'
    ]
  },

  {
    id: 'raffal-shawl',
    familyId: 'pashmina-shawls',
    familyName: 'Pashmina & Shawls',
    craftName: 'Raffal Shawl & Handwoven Tweed',
    vernacularName: 'Raffal Shal & Kash-Tweed',
    giStatus: 'Notified Heritage Craft',
    notifiedGazette: 'J&K Handicrafts Policy 2020 (Notified Craft Category A)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Srinagar', 'Bandipora', 'Baramulla (Sopore)'],
    functionalUnit: '1 Standard Raffal Shawl (200 cm × 100 cm, 350 g wool)',
    artisanWorkforceEst: '18,000+ handloom weavers and auxiliary workers',
    rawMaterialOrigin: 'Spun Australian and indigenous cross-bred Merino wool yarn (64s–70s count).',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Commercial sheared sheep fleece sourced from regional and national spinning mills.',
      stage2_harvestingExtraction: 'Mechanical/manual seasonal shearing of living sheep flocks.',
      stage3_primaryProcessing: 'Industrial scouring, carding, and high-count woolen mill spinning.',
      stage4_artisanFabrication: 'Traditional cottage pit looms or frame looms operated manually by local weavers.',
      stage5_dyeingFinishing: 'Commercial piece dyeing and post-weave scouring with detergent baths; mechanical steam calender pressing.',
      stage6_packagingTransport: 'Cardboard box packaging and carton transit.',
      stage7_useCareRepair: 'High everyday utility with 15–25 year functional lifespan; easily dry-cleaned or hand-washed.',
      stage8_endOfLifeCircularity: '100% natural wool; compostable in anaerobic soil conditions within 6–12 months.'
    },
    waterFootprint: {
      volumeLiters: '60 – 110 L / shawl',
      description: 'Higher than Pashmina due to heavier fiber weight and deeper dye bath saturation required for high-density wool yarns.',
      evidenceGrade: 'Modeled Estimate'
    },
    energyProfile: {
      primarySource: 'Manual handloom kinetic weaving (85%) + thermal water heating and pressing (15%)',
      energyIntensityEstimate: '2.5 – 4.2 kWh equivalent / shawl',
      kineticManualSharePercent: 85
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: ['Synthetic acid dyestuffs', 'Synthetic scouring detergents', 'Sodium sulfate leveling agents'],
      potentialExposurePathways: ['Aerosolized detergent and dye inhalation during vat heating in semi-enclosed sheds'],
      occupationalHealthNotes: ['Humid micro-climate exposure in wash houses; back strain from pedal treadle actuation'],
      applicableStandards: ['CPCB Textile Discharge Standards', 'IS 4802 (Color fastness)']
    },
    environmentalAdvantages: [
      'Natural protein fiber alternative to synthetic polyester winter shawls; zero microplastic shed during consumer wash cycles.',
      'Sustains extensive decentralized rural employment with minimal electrical grid infrastructure dependency.'
    ],
    environmentalPressurePoints: [
      'Piece-dyeing operations in peri-urban Srinagar discharge concentrated colored effluents with elevated COD/BOD levels.'
    ],
    evidenceStatus: 'Modeled Estimate',
    recommendedFieldInvestigations: [
      'Effluent testing at decentralized peri-urban piece-dyeing clusters for chemical oxygen demand and surfactant concentrations.'
    ]
  },

  // ── FAMILY 02: CARPETS & FLOOR COVERINGS ───────────────────────────────────
  {
    id: 'hand-knotted-carpet',
    familyId: 'carpets-flooring',
    familyName: 'Carpets & Floor Coverings',
    craftName: 'Hand-Knotted Silk & Wool Carpet',
    vernacularName: 'Kashmiri Qaleen',
    giStatus: 'GI Registered',
    notifiedGazette: 'J&K Handicrafts Policy 2020 / GI Registry No. 49 (2016)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Srinagar', 'Baramulla (Pattan, Mirgund)', 'Bandipora', 'Budgam'],
    functionalUnit: '1 m² Finished Pile Carpet (16×16 to 24×24 knots/in², ~3.2 kg finished weight)',
    artisanWorkforceEst: '35,000+ carpet weavers working on traditional vertical wooden looms (Waguv)',
    rawMaterialOrigin: 'Mulberry silk warp and pile yarn; blended indigenous Himalayan wool and imported New Zealand wool; cotton foundation yarn.',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Mulberry sericulture cocoons reared in Kashmir & Karnataka; sheep wool from transhumant flocks and certified mills.',
      stage2_harvestingExtraction: 'Silk reeling from boiled cocoons; seasonal wool fleece shearing.',
      stage3_primaryProcessing: 'Yarn plying, chemical scouring of raw silk to remove sericin gum; chrome or acid hank dyeing; sun drying.',
      stage4_artisanFabrication: 'Vertical loom weaving; symmetrical Senneh knots tied by hand following Talim symbol scripts; row-by-row iron comb beating.',
      stage5_dyeingFinishing: 'Post-weaving surface chemical washing (chlorinated lime / caustic wash) to impart silk sheen; sun drying; hand shearing.',
      stage6_packagingTransport: 'Rolled on rigid PVC/cardboard tubes wrapped in heavy jute Hessian cloth.',
      stage7_useCareRepair: 'Exceptional structural durability of 50–100+ years. High salvage and re-knotting repair potential for damaged fringes/edges.',
      stage8_endOfLifeCircularity: 'Natural protein silk and wool pile; biodegradable backing. Traditional salvage reclaims wool pile for yarn recycling.'
    },
    waterFootprint: {
      volumeLiters: '220 – 480 L / m²',
      description: 'Intense water consumption during yarn scouring, multiple rinse dye baths, and final caustic/acid luster wash baths.',
      evidenceGrade: 'Modeled Estimate'
    },
    energyProfile: {
      primarySource: 'Manual hand knotting (80%) + thermal boiling for sericin degumming and dye vats (20%)',
      energyIntensityEstimate: '18 – 32 kWh equivalent / m²',
      kineticManualSharePercent: 80
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: ['Acid and metal-complex dyes (chromium/copper mordants)', 'Sodium hypochlorite bleaching agent', 'Caustic soda (sodium hydroxide)', 'Glacial acetic acid'],
      potentialExposurePathways: ['Aerosolized chlorine gas and caustic mist during carpet luster washing', 'Dye dust inhalation during hank shaking'],
      occupationalHealthNotes: ['High incidence of carpal tunnel syndrome, finger joint deformation, lumbar strain, and pulmonary fiber dust irritation'],
      applicableStandards: ['CPCB Carpet Washing Effluent Standards', 'IICT Carpet QR-Code Standards']
    },
    environmentalAdvantages: [
      'Eliminates petroleum-derived synthetic carpet polymers (polypropylene/nylon) that release microplastics and persistent VOCs.',
      'Lasts 10 to 20 times longer than machine-tufted synthetic floor coverings, dramatically lowering lifecycle material turnover.'
    ],
    environmentalPressurePoints: [
      'Post-weave chemical luster washing uses hypochlorite and caustic soda, producing alkaline washwater with dissolved solids.',
      'High cumulative water volume consumed in urban wash facilities lacking water recycling or settling clarifiers.'
    ],
    evidenceStatus: 'Officially Documented',
    recommendedFieldInvestigations: [
      'Chemical characterization of carpet luster wash effluents in Shalteng and downtown Srinagar wash basins.',
      'Assessment of closed-loop modular filtration and neutralization systems for artisanal carpet washing.'
    ]
  },

  {
    id: 'namda-felt-rug',
    familyId: 'carpets-flooring',
    familyName: 'Carpets & Floor Coverings',
    craftName: 'Namda Felted Wool Rug',
    vernacularName: 'Kashmiri Namda',
    giStatus: 'GI Registered',
    notifiedGazette: 'J&K Handicrafts Policy 2020 / GI Registry No. 636 (2024)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Anantnag', 'Srinagar', 'Baramulla'],
    functionalUnit: '1 Standard Embroidered Felt Rug (180 cm × 120 cm, ~2.8 kg felted wool mass)',
    artisanWorkforceEst: '8,000+ felters and Aari needle embroiderers',
    rawMaterialOrigin: 'Low-micron indigenous sheep wool blended with unspun cotton waste; woolen Aari embroidery threads.',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Coarse fleece from nomadic Gujjar/Bakarwal sheep flocks across high-altitude pastures.',
      stage2_harvestingExtraction: 'Manual sheep shearing in early autumn.',
      stage3_primaryProcessing: 'Carding on manual bow carders (Dhun); layer spreading on reed mats (Pinjra); soap-water soaking.',
      stage4_artisanFabrication: 'Kinetic manual rolling and compression under forearm pressure; repeated kneading to entangle fiber scales without weaving.',
      stage5_dyeingFinishing: 'Felt piece dyeing in open boiling vats; sun drying on open gravel terraces; chain-stitch Aari embroidery decoration.',
      stage6_packagingTransport: 'Baled in recycled jute sacks; dry transport without moisture-barrier plastic envelopes.',
      stage7_useCareRepair: 'Traditional winter insulating floor mat with 15–30 year lifespan; easily felt-patched and re-embroidered.',
      stage8_endOfLifeCircularity: '100% biodegradable natural wool; excellent nitrogen-rich agricultural mulch at end-of-life.'
    },
    waterFootprint: {
      volumeLiters: '80 – 160 L / rug',
      description: 'Used during wool washing, felt lubrication with hot soap solution, and dye bath immersion.',
      evidenceGrade: 'Modeled Estimate'
    },
    energyProfile: {
      primarySource: 'Kinetic human forearm/elbow kneading (90%) + firewood/charcoal for boiling washwater (10%)',
      energyIntensityEstimate: '4.5 – 8.0 kWh equivalent / rug',
      kineticManualSharePercent: 90
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: ['Potash soap / tallow-based felting soap', 'Commercial synthetic direct dyes', 'Formic/acetic acid leveling agents'],
      potentialExposurePathways: ['Direct dermal contact with hot soapy alkaline solutions and dye liquor during rolling'],
      occupationalHealthNotes: ['Chronic contact dermatitis and hand eczema among felters; severe lower back strain from ground kneading'],
      applicableStandards: ['J&K GI Namda Quality Specifications', 'IS 5984 (Felt specifications)']
    },
    environmentalAdvantages: [
      'Utilizes coarse, short-staple indigenous wool that would otherwise be discarded as agricultural waste.',
      'Natural, dense thermal barrier preventing heat loss through cold stone/mud floors in sub-zero Himalayan winters.'
    ],
    environmentalPressurePoints: [
      'Boiling of felting solutions and dye vats using low-grade fuelwood contributes to localized particulate emissions.'
    ],
    evidenceStatus: 'Officially Documented',
    recommendedFieldInvestigations: [
      'Testing pH, COD, and surfactant levels in wastewater discharged from rural Anantnag Namda processing clusters.',
      'Occupational dermatology screening for artisan felters and evaluation of bio-based non-irritant felting lubricants.'
    ]
  },

  {
    id: 'gabba-rug',
    familyId: 'carpets-flooring',
    familyName: 'Carpets & Floor Coverings',
    craftName: 'Gabba Recycled Wool Appliqué Rug',
    vernacularName: 'Kashmiri Gabba (Anantnag)',
    giStatus: 'GI Applied',
    notifiedGazette: 'J&K Handicrafts Policy 2020 (Notified Craft Category B)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Anantnag (Islamabad town, Achabal)', 'Kulgam'],
    functionalUnit: '1 Upcycled Floor Rug (180 cm × 120 cm, ~2.5 kg upcycled textile content)',
    artisanWorkforceEst: '4,500+ artisans specialized in piece cutting, appliqué, and chain stitch',
    rawMaterialOrigin: 'Post-consumer worn woollen blankets (Pattus) and decommissioned wool garments collected from rural households.',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Secondary post-consumer recycled textile stream collected from valley villages; circular feedstock.',
      stage2_harvestingExtraction: 'Urban/rural rag picking and household collection of discarded woollens (zero agricultural land footprint).',
      stage3_primaryProcessing: 'Washing, patch cutting into geometric/floral templates; piece redyeing to refresh base colors.',
      stage4_artisanFabrication: 'Appliqué sewing onto a heavy backing canvas; continuous chain-stitch hook embroidery along panel margins.',
      stage5_dyeingFinishing: 'Selective spot dyeing with acid colorants; border edging with scrap fabric piping; sun drying.',
      stage6_packagingTransport: 'Folded into recycled cloth bundles.',
      stage7_useCareRepair: 'Durable everyday floor insulation lasting 20–35 years; modular design allows individual worn patches to be replaced.',
      stage8_endOfLifeCircularity: 'Third-cycle circular product; fully biodegradable wool base that decomposes in soil.'
    },
    waterFootprint: {
      volumeLiters: '40 – 75 L / rug',
      description: 'Primary water use is washing discarded post-consumer wool blankets prior to cutting and redyeing.',
      evidenceGrade: 'Modeled Estimate'
    },
    energyProfile: {
      primarySource: 'Manual cutting, sewing, and Aari hook embroidery (95%) + washwater heating (5%)',
      energyIntensityEstimate: '1.5 – 3.0 kWh equivalent / rug',
      kineticManualSharePercent: 95
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: ['Alkaline laundry wash detergents', 'Secondary direct dyes', 'Starch adhesive paste for initial patch positioning'],
      potentialExposurePathways: ['Inhalation of textile fiber dust during shredding and rotary knife cutting of aged wool blankets'],
      occupationalHealthNotes: ['Allergic rhinitis and textile dust inhalation; ergonomic repetitive strain in wrists from continuous hook piercing'],
      applicableStandards: ['ISO 14021 (Self-declared environmental claims - Recycled Content)']
    },
    environmentalAdvantages: [
      'Exemplary Western Himalayan circular economy craft; diverts hundreds of tonnes of post-consumer wool from municipal dumps.',
      'Saves over 80% of the water, land, and carbon footprint compared to virgin textile floor coverings.'
    ],
    environmentalPressurePoints: [
      'Preliminary washing of aged, dirty post-consumer blankets produces greywater with high particulate and organic loads.'
    ],
    evidenceStatus: 'Modeled Estimate',
    recommendedFieldInvestigations: [
      'Quantitative textile diversion audit: measuring annual tonnes of post-consumer wool recycled through Anantnag Gabba workshops.'
    ]
  },

  // ── FAMILY 03: EMBROIDERY & NEEDLEWORK ─────────────────────────────────────
  {
    id: 'sozni-embroidery',
    familyId: 'embroidery-needlework',
    familyName: 'Embroidery & Needlework',
    craftName: 'Sozni Needle Embroidery',
    vernacularName: 'Sozni Kar (Suzankar)',
    giStatus: 'GI Registered',
    notifiedGazette: 'J&K Handicrafts Policy 2020 / GI Registry No. 48 (2008)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Srinagar', 'Budgam (Beerwah, Magam)', 'Baramulla'],
    functionalUnit: '1 Fully Embroidered Pashmina Jama Shawl (~150 g embroidered thread on 220 g shawl)',
    artisanWorkforceEst: '60,000+ needle artisans (densely distributed in rural home cottages)',
    rawMaterialOrigin: 'Dyed filament silk thread and mercerized staple cotton embroidery floss worked onto handloom wool/Pashmina fabrics.',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Silk fiber from Sericulture Directorate J&K or Bangalore silk markets; spun fine wool backing fabric.',
      stage2_harvestingExtraction: 'Upstream silk cocoon processing and caprine fleece combing.',
      stage3_primaryProcessing: 'Yarn plying and dyeing into dozens of miniature accent shades; block printing of motifs using washable charcoal paste.',
      stage4_artisanFabrication: 'Single-thread manual needle piercing; fine satin and stem stitches (darning, satin, couching); zero mechanical motors.',
      stage5_dyeingFinishing: 'Post-embroidery spot cleaning of charcoal guide lines; light cold-water rinsing with natural soapnut extract.',
      stage6_packagingTransport: 'Tissue interleaving; lightweight cotton bags.',
      stage7_useCareRepair: 'Generational heirloom with 50+ year functional life; easily mended by local needleworkers.',
      stage8_endOfLifeCircularity: '100% natural silk and wool; fully biodegradable in compost or soil.'
    },
    waterFootprint: {
      volumeLiters: '< 15 L / unit',
      description: 'Direct artisanal needlework is an entirely dry process. Water is consumed only during motif washing and upstream thread dyeing.',
      evidenceGrade: 'Modeled Estimate'
    },
    energyProfile: {
      primarySource: 'Exclusively manual kinetic energy (99%) + ambient indoor lighting',
      energyIntensityEstimate: '0.4 – 0.8 kWh equivalent / shawl',
      kineticManualSharePercent: 99
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: ['Pre-dyed silk embroidery threads', 'Charcoal and chalk water-soluble printing paste', 'Mineral spirits/kerosene (traditionally used in motif block inks, now shifting to water-soluble gum)'],
      potentialExposurePathways: ['Skin contact and solvent vapor inhalation from petroleum-based block-printing ink during motif tracing'],
      occupationalHealthNotes: ['High vulnerability to eye strain, headache, and early presbyopia; thumb and index finger tendonitis'],
      applicableStandards: ['J&K GI Sozni Specifications', 'IS 4802']
    },
    environmentalAdvantages: [
      'Near-zero direct industrial carbon footprint; one of the least resource-intensive decorative craft techniques globally.',
      'Operates entirely in decentralized rural home cottages, enabling rural female financial autonomy without urban migration.'
    ],
    environmentalPressurePoints: [
      'Trace solvent residues where block printers use kerosene-diluted inks instead of modern non-toxic water-soluble gum pastes.'
    ],
    evidenceStatus: 'Officially Documented',
    recommendedFieldInvestigations: [
      'Chemical analysis of traditional wood-block motif tracing inks and distribution of certified food-grade washable tracing gums.',
      'Comprehensive ocular and ergonomic health survey across 500 rural home needleworkers in Beerwah and Srinagar.'
    ]
  },

  {
    id: 'tilla-dozi',
    familyId: 'embroidery-needlework',
    familyName: 'Embroidery & Needlework',
    craftName: 'Tilla Metallic Wire Embroidery',
    vernacularName: 'Tilla Dozi (Zari Kar)',
    giStatus: 'Notified Heritage Craft',
    notifiedGazette: 'J&K Handicrafts Policy 2020 (Notified Craft Category A)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Srinagar (Shehr-e-Khas enclaves)', 'Budgam'],
    functionalUnit: '1 Embroidered Tilla Pheran Neckline (~60 g metallic wire on wool/velvet garment)',
    artisanWorkforceEst: '12,000+ specialized Tilla needleworkers',
    rawMaterialOrigin: 'Silver-plated or gold-washed copper wire wrapped around a core cotton thread (Zari/Tilla wire).',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Copper and silver drawing wire sourced from certified metallic thread manufacturers (Surat & Srinagar).',
      stage2_harvestingExtraction: 'Mined copper and silver metallurgical refining.',
      stage3_primaryProcessing: 'Micro-drawing of copper wire to < 0.05 mm diameter; silver electroplating and gold washing; spinning around cotton core.',
      stage4_artisanFabrication: 'Couching technique: two-needle method where metallic thread is laid on the surface and tacked with fine cotton thread.',
      stage5_dyeingFinishing: 'Burnishing of metallic wire using a smooth cowrie shell or agate stone (Mohra) to enhance metallic specular reflection.',
      stage6_packagingTransport: 'Tissue wrap inside structured presentation boxes.',
      stage7_useCareRepair: 'Traditional bridal and celebratory vestments lasting 30–60 years; wire does not tarnish when stored dry.',
      stage8_endOfLifeCircularity: 'Metallic wire can be pyrolyzed or incinerated by traditional goldsmiths (Niyargars) to recover copper and silver metal.'
    },
    waterFootprint: {
      volumeLiters: '< 5 L / unit',
      description: 'Entirely dry artisanal application. Zero wet processing involved at the workshop stage.',
      evidenceGrade: 'Modeled Estimate'
    },
    energyProfile: {
      primarySource: 'Manual hand stitching (98%) + ambient electric light (2%)',
      energyIntensityEstimate: '0.3 – 0.6 kWh equivalent / garment',
      kineticManualSharePercent: 98
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: ['Silver/copper alloy micro-wire', 'Cellulose nitrate protective lacquer (micro-coating on cheap imitation zari)', 'Cotton core thread'],
      potentialExposurePathways: ['Minor metal dust release during friction burnishing with agate stone'],
      occupationalHealthNotes: ['Finger punctures from sharp metallic wire ends; cervical neck strain from inclined posture'],
      applicableStandards: ['IS 1367 (Metallic thread specifications)', 'Bureau of Indian Standards Zari Hallmark']
    },
    environmentalAdvantages: [
      'Dry processing eliminates all liquid toxic discharges at the artisan workshop level.',
      'Valuable metallic content encourages closed-loop reclamation and recycling of gold/silver/copper at garment end-of-life.'
    ],
    environmentalPressurePoints: [
      'Proliferation of plastic-film metallized polyester (mylar) imitation zari threads that contaminate garment compostability.'
    ],
    evidenceStatus: 'Officially Documented',
    recommendedFieldInvestigations: [
      'Spectroscopic screening (XRF) of metallic threads to distinguish genuine silver/copper wire from metallized plastic micro-strips.'
    ]
  },

  // ── FAMILY 04: PAPIER-MÂCHÉ & PAPER CRAFTS ────────────────────────────────
  {
    id: 'papier-mache-sakhtsazi',
    familyId: 'papier-mache-paper',
    familyName: 'Papier-Mâché & Paper Crafts',
    craftName: 'Papier-Mâché Sakhtsazi (Base Molding)',
    vernacularName: 'Sakhtsazi (Khaam Kar)',
    giStatus: 'GI Registered',
    notifiedGazette: 'J&K Handicrafts Policy 2020 / Part of GI Registry No. 45 (2008)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Srinagar (Zadibal, Lal Bazar, Nowshera)'],
    functionalUnit: '10 Structured Molded Craft Boxes (15 cm × 10 cm × 5 cm, ~2.2 kg dry molded pulp mass)',
    artisanWorkforceEst: '3,000+ base molders and pulp beaters',
    rawMaterialOrigin: 'Discarded waste newsprint, office wastepaper, cardboard, and rice-flour starch glue (Atte-ki-Lehi).',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Municipal post-consumer waste paper collected from Srinagar schools, print presses, and government offices.',
      stage2_harvestingExtraction: 'Urban paper scrap diversion (100% recycled post-consumer fiber).',
      stage3_primaryProcessing: 'Maceration: soaking waste paper in water sumps for 3–5 days; beating with wooden mallets into homogeneous cellulose slurry.',
      stage4_artisanFabrication: 'Layering moist pulp over oiled wooden/plaster molds; compression; slow ambient sun-drying on outdoor racks.',
      stage5_dyeingFinishing: 'Separating dry casting from mold; smoothing with pumice stone (Kurkoot); applying fine gypsum/chalk primer (Gach).',
      stage6_packagingTransport: 'Stacked in bulk cardboard cartons for transit to Naqashi miniature painters.',
      stage7_useCareRepair: 'Structural base has 50+ year integrity when protected from continuous moisture immersion.',
      stage8_endOfLifeCircularity: '100% biodegradable cellulose and calcium sulfate; easily re-pulped in water if broken before varnishing.'
    },
    waterFootprint: {
      volumeLiters: '35 – 65 L / 10 units',
      description: 'Used during paper maceration and soaking pits. Most water is evaporated during solar open-air drying.',
      evidenceGrade: 'Modeled Estimate'
    },
    energyProfile: {
      primarySource: 'Manual mallet beating and paste stirring (85%) + solar open-air drying (15%)',
      energyIntensityEstimate: '1.0 – 1.8 kWh equivalent / 10 units',
      kineticManualSharePercent: 85
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: ['Starch paste (rice/wheat flour)', 'Copper sulfate (Nilathokha) antifungal additive (0.5% concentration)', 'Gypsum / calcium sulfate primer (Gach)'],
      potentialExposurePathways: ['Skin absorption or accidental ingestion of copper sulfate additive if handled without barrier gloves', 'Chalk dust inhalation during sanding'],
      occupationalHealthNotes: ['Respirable calcium sulfate dust during dry pumice smoothing; hand maceration from prolonged wet pulp immersion'],
      applicableStandards: ['CPCB Paper Pulp Recycling Norms', 'OSHA Particulates Not Otherwise Regulated (PNOR) 15 mg/m³']
    },
    environmentalAdvantages: [
      'Direct circular upcycling of urban municipal paper waste into high-value cultural artifacts without chemical de-inking.',
      'Solar thermal energy drives 100% of product drying requirements during spring and summer production seasons.'
    ],
    environmentalPressurePoints: [
      'Use of copper sulfate as a fungicide in starch glue requires careful handling to prevent rinse discharge into stormwater ditches.'
    ],
    evidenceStatus: 'Officially Documented',
    recommendedFieldInvestigations: [
      'Testing safer bio-based antifungal preservatives (e.g., thymol or neem extract) to replace copper sulfate in starch glue.'
    ]
  },

  {
    id: 'papier-mache-naqashi',
    familyId: 'papier-mache-paper',
    familyName: 'Papier-Mâché & Paper Crafts',
    craftName: 'Papier-Mâché Naqashi & Lacquering',
    vernacularName: 'Naqashi & Raungani Kaam',
    giStatus: 'GI Registered',
    notifiedGazette: 'J&K Handicrafts Policy 2020 / GI Registry No. 45 (2008)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Srinagar (Zadibal, Lal Bazar, Hawal, Gulshan Mohalla)'],
    functionalUnit: '10 Intricately Painted & Lacquered Craft Objects (~2.5 kg finished mass)',
    artisanWorkforceEst: '8,000+ Naqash painters and lacquer polishers',
    rawMaterialOrigin: 'Gach-primed Sakhtsazi objects, mineral and poster pigments, natural animal glue (Saresh), genuine gold leaf, and copal/linseed or synthetic varnish.',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Local mineral pigments (chalk, verdigris, cinnabar historical; now mostly commercial artists gouache) and natural tree resins.',
      stage2_harvestingExtraction: 'Natural gum harvesting from Acacia trees (Gum Arabic); linseed pressing from flax crops.',
      stage3_primaryProcessing: 'Grinding pigments on stone slabs (Kharal); boiling rabbit-skin or bone glue as a tempera binder.',
      stage4_artisanFabrication: 'Freehand miniature illumination using fine cat-hair brushes; application of real 24k gold leaf (Tala Kari); outlining (Tahrir).',
      stage5_dyeingFinishing: 'Multi-coat clear varnishing; sun-drying; wet-polishing with water and emery stone; final burnishing with a soft cloth.',
      stage6_packagingTransport: 'Individual bubble-wrap or unbleached kraft paper inside corrugated master cartons.',
      stage7_useCareRepair: 'Decorative and ceremonial objects with 40–80 year functional life; surfaces can be lightly cleaned and re-varnished.',
      stage8_endOfLifeCircularity: 'Molded core is compostable; modern polyurethane synthetic varnishes create a non-biodegradable exterior shell.'
    },
    waterFootprint: {
      volumeLiters: '< 10 L / 10 units',
      description: 'Used exclusively for brush washing and wet emery paper polishing. Negligible volumetric wastewater footprint.',
      evidenceGrade: 'Modeled Estimate'
    },
    energyProfile: {
      primarySource: 'Manual hand painting and polishing (92%) + room heating/lighting (8%)',
      energyIntensityEstimate: '1.2 – 2.4 kWh equivalent / 10 units',
      kineticManualSharePercent: 92
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: [
        'Petroleum-based solvent varnishes (copal, alkyd, or polyurethane in turpentine/white spirit)',
        'Gum Arabic binder',
        'Synthetic pigments (azo colorants, titanium dioxide, iron oxides)',
        'Traditional copal varnish / linseed oil (heritage workshops)'
      ],
      potentialExposurePathways: [
        'Inhalation of solvent vapors (turpentine, mineral spirits, xylene) during brush application and indoor drying in unventilated rooms',
        'Dermal contact with solvent thinners during brush cleaning'
      ],
      occupationalHealthNotes: [
        'Preliminary photoionization detector (PID) screenings show elevated total VOC spikes during active spraying/lacquering.',
        'Scientific correction: ACGIH exposure limits apply to individual identified chemicals (e.g., Stoddard solvent TLV-TWA 100 ppm, Xylene TLV-TWA 100 ppm), not a blanket generic TVOC rule.',
        'Artisans report headaches, dizziness, and eye irritation when varnishing during winter in closed domestic rooms (Hamams).'
      ],
      applicableStandards: ['OSHA Substance-Specific Permissible Exposure Limits (PELs)', 'ACGIH Chemical TLVs', 'BIS IS 101']
    },
    environmentalAdvantages: [
      'Heritage practice utilized 100% natural tree copal resins and vegetable binders with near-zero petrochemical lifecycle burdens.',
      'High economic value generated per unit of raw material; zero heavy industrial wastewater discharge.'
    ],
    environmentalPressurePoints: [
      'Widespread shift from natural copal varnish to commercial polyurethane/alkyd wood finishes with high volatile solvent formulations.',
      'Lack of localized exhaust ventilation (benchtop fume hoods) in home workshops where painters and families sleep and cook.'
    ],
    evidenceStatus: 'Measured Observation',
    recommendedFieldInvestigations: [
      'Substance-specific air sampling (GC-MS with active sorbent tubes) to identify exact aromatic and aliphatic hydrocarbon species in Zadibal workshops.',
      'Pilot deployment and field testing of zero-VOC waterborne artist acrylic lacquers and localized activated carbon filter benches.'
    ]
  },

  // ── FAMILY 05: WOODCRAFT & ARCHITECTURE ───────────────────────────────────
  {
    id: 'walnut-woodcarving',
    familyId: 'woodcraft-architecture',
    familyName: 'Woodcraft & Architecture',
    craftName: 'Walnut Woodcarving',
    vernacularName: 'Doon Kaam (Khatam-i-Doon)',
    giStatus: 'GI Registered',
    notifiedGazette: 'J&K Handicrafts Policy 2020 / GI Registry No. 182 (2011)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Srinagar (Safakadal, Fateh Kadal, Batamaloo)', 'Anantnag', 'Baramulla', 'Kulgam'],
    functionalUnit: '1 Carved Heritage Coffee Table / Jewelry Box (1 m² surface, ~12 kg seasoned timber mass)',
    artisanWorkforceEst: '15,000+ carvers and joiners',
    rawMaterialOrigin: 'Naturally fallen or legally permitted senescent Juglans regia (Walnut) trees from South and Central Kashmir orchards.',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Cultivated agricultural walnut orchards in Anantnag, Pulwama, and Shopian. Strictly regulated under J&K Preservation of Specific Trees Act 1969.',
      stage2_harvestingExtraction: 'Felling allowed exclusively for non-fruit bearing, dried, or dangerous trees under formal District Revenue permits.',
      stage3_primaryProcessing: 'Sawmill slicing into thick planks; open-air natural seasoning on covered stacks for 2 to 4 years to reduce moisture to 10–12%.',
      stage4_artisanFabrication: 'Manual relief carving (undercut, deep relief, lattice jalidar) using up to 30 specialized steel chisels (Wawur) and wooden mallets.',
      stage5_dyeingFinishing: 'Natural friction polishing with hard agate stone (Mohra) or walnut kernel oil; zero synthetic chemical varnishes required on high-grade heartwood.',
      stage6_packagingTransport: 'Wrapping in heavy corrugated paper sheets and wooden support crates.',
      stage7_useCareRepair: 'Multi-generational furniture with useful lifespans of 80–150+ years; solid wood can be re-sanded, re-carved, and re-oiled.',
      stage8_endOfLifeCircularity: 'Solid natural timber; 100% biological circularity; sawdust and offcuts are fully utilized as winter heating fuel.'
    },
    waterFootprint: {
      volumeLiters: '< 10 L / unit',
      description: 'Entirely dry artisanal craft. Water is only used for sharpening chisel blades on oil/water stones.',
      evidenceGrade: 'Empirical Measured'
    },
    energyProfile: {
      primarySource: 'Manual chisel and mallet kinetic energy (90%) + initial band-sawing of logs (10%)',
      energyIntensityEstimate: '3.5 – 6.5 kWh equivalent / unit',
      kineticManualSharePercent: 90
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: [
        'Natural walnut kernel oil',
        'Beeswax',
        'Petroleum-based wax polish / spirit polish (lower-tier tourist commercial ware)',
        'Respirable Juglans regia hardwood dust'
      ],
      potentialExposurePathways: [
        'Inhalation of fine walnut wood dust containing natural naphthoquinones (Juglone) during manual sawing, rasping, and sandpapering',
        'Eye irritation from wood particulate'
      ],
      occupationalHealthNotes: [
        'Juglone in walnut dust is a known dermal irritant and respiratory sensitizer.',
        'High prevalence of occupational rhinitis and reduced peak expiratory flow among carvers working in unventilated basement workshops.',
        'Scientific benchmark: OSHA Hardwood Dust PEL 5 mg/m³ (respirable fraction); ACGIH TLV 1 mg/m³ (inhalable fraction).'
      ],
      applicableStandards: ['J&K Preservation of Specific Trees Act 1969', 'OSHA Wood Dust PEL 29 CFR 1910.1000', 'ACGIH Inhalable Hardwood Dust TLV']
    },
    environmentalAdvantages: [
      'Carbon sequestration: solid seasoned walnut timber locks atmospheric biogenic carbon for over a century in heirloom furniture.',
      'Near-complete raw material utilization: scrap wood and shavings are collected for winter Kangri fuel and briquette heating.'
    ],
    environmentalPressurePoints: [
      'Informal, unpermitted felling of young or fruit-bearing walnut trees due to high market timber premiums.',
      'Occupational health hazards from inhalable hardwood dust in poorly ventilated micro-sheds lacking localized dust collection.'
    ],
    evidenceStatus: 'Officially Documented',
    recommendedFieldInvestigations: [
      'Timber chain-of-custody and digital provenance verification linking carving workshops to authorized District Forest/Revenue felling permits.',
      'Gravimetric personal air sampling measuring inhalable and respirable walnut dust fractions in Safakadal carving clusters.'
    ]
  },

  {
    id: 'khatamband-ceilings',
    familyId: 'woodcraft-architecture',
    familyName: 'Woodcraft & Architecture',
    craftName: 'Khatamband Interlocking Ceilings',
    vernacularName: 'Khatamband (Sقف Sazi)',
    giStatus: 'GI Registered',
    notifiedGazette: 'J&K Handicrafts Policy 2020 / GI Registry No. 214 (2011)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Srinagar (Idgah, Safakadal, Nowhatta)'],
    functionalUnit: '10 m² Geometric Wooden Ceiling Grid (~45 kg Pinus excelsa timber)',
    artisanWorkforceEst: '2,500+ specialized master joiners',
    rawMaterialOrigin: 'Kiln-dried or air-seasoned Himalayan blue pine (Pinus excelsa / Kail) and silver fir (Abies pindrow).',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Sustainably managed state forest concessions and authorized private farm forestry timber depots.',
      stage2_harvestingExtraction: 'State Forest Corporation (SFC) authorized commercial logging in coniferous mountain zones.',
      stage3_primaryProcessing: 'Sawmilling into uniform thin geometric battens and moldings (12–15 mm thickness, 40–80 mm width); planed smooth.',
      stage4_artisanFabrication: 'Traditional tongue-and-groove jointing; manual assembly of thousands of polygonal wooden facets into interlocking geometric patterns (Star, Octagon, Hexagon) without iron nails.',
      stage5_dyeingFinishing: 'Natural raw wood finish or application of light linseed oil/wax; commercial modern rooms occasionally apply synthetic clear varnishes.',
      stage6_packagingTransport: 'Pre-assembled in modular 1 m² or 2 m² ceiling cassettes transported via small flatbed trucks.',
      stage7_useCareRepair: 'Architectural fixture lasting 60–100+ years in traditional Kashmiri architecture; modular tiles can be removed individually for attic inspections.',
      stage8_endOfLifeCircularity: 'Solid softwood; 100% biodegradable and reclaimable as architectural salvage.'
    },
    waterFootprint: {
      volumeLiters: '< 5 L / 10 m²',
      description: 'Zero process water consumption in fabrication.',
      evidenceGrade: 'Empirical Measured'
    },
    energyProfile: {
      primarySource: 'Manual hand sawing and grooving (75%) + mechanical motorized batten planing (25%)',
      energyIntensityEstimate: '12 – 22 kWh equivalent / 10 m²',
      kineticManualSharePercent: 75
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: ['Polyvinyl acetate (PVA) wood adhesive (used sparingly)', 'Pine wood dust', 'Natural linseed oil'],
      potentialExposurePathways: ['Inhalation of softwood pine terpenes and wood dust during high-speed machine grooving'],
      occupationalHealthNotes: ['High noise exposure from unshielded table saws; eye injuries from flying wood splinters'],
      applicableStandards: ['IS 399 (Classification of commercial timbers)', 'OSHA Softwood Dust PEL 15 mg/m³']
    },
    environmentalAdvantages: [
      'Eliminates gypsum drywall, acoustic mineral fiber ceiling tiles, and PVC false ceilings that carry heavy petrochemical embodied carbon.',
      'Exceptional natural acoustic dampening and biophilic interior environmental quality.'
    ],
    environmentalPressurePoints: [
      'High demand for prime Kail (Pinus excelsa) timber exerts sustained pressure on Western Himalayan coniferous forest stands.'
    ],
    evidenceStatus: 'Officially Documented',
    recommendedFieldInvestigations: [
      'Lifecycle carbon assessment comparing Khatamband ceiling grids with standard PVC false ceilings over a 50-year commercial building cycle.'
    ]
  },

  // ── FAMILY 06: WILLOW & PLANT-FIBER CRAFTS ─────────────────────────────────
  {
    id: 'willow-wicker',
    familyId: 'willow-plant-fiber',
    familyName: 'Willow & Plant-Fiber Crafts',
    craftName: 'Willow Wicker & Basketry',
    vernacularName: 'Keani Keam (Kani Kar)',
    giStatus: 'GI Applied',
    notifiedGazette: 'J&K Handicrafts Policy 2020 / GI Application No. 817',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Ganderbal (Shalbugh - known as the Wicker Village)', 'Bandipora', 'Srinagar'],
    functionalUnit: '10 Standard Utility Wicker Baskets / Hampers (~6.5 kg processed willow wicker mass)',
    artisanWorkforceEst: '12,000+ wicker cultivators, peelers, and weavers',
    rawMaterialOrigin: 'Cultivated willow saplings (Salix viminalis / Salix purpurea) grown along wetland edges and riverbank plantations.',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Dedicated agricultural wetland plantations in Shalbugh, Ganderbal, and Shallabugh wetland margins.',
      stage2_harvestingExtraction: 'Annual coppicing of flexible slender wands in late autumn (Nov–Dec); zero tree destruction as stumps re-sprout in spring.',
      stage3_primaryProcessing: 'Boiling: bundle-loading into 8–10 meter direct-fired water vats boiled for 12–16 hours to loosen bark; manual bark peeling by women artisans; sun-drying.',
      stage4_artisanFabrication: 'Soaking dried wicker in cold water to restore flexibility; manual weaving into structured lattice baskets, trays, and armchairs.',
      stage5_dyeingFinishing: 'Natural golden finish achieved by sun exposure; commercial pastel lines use direct dye baths; topcoat natural copal or synthetic lacquer.',
      stage6_packagingTransport: 'Nesting baskets together to maximize volume efficiency; lightweight road transit.',
      stage7_useCareRepair: 'Durable, resilient utility containers lasting 15–30 years; flexible wicker can be re-wetted and woven to repair damaged bases.',
      stage8_endOfLifeCircularity: '100% natural, unadulterated Salix plant biomass; composts naturally in garden soil within 6 months.'
    },
    waterFootprint: {
      volumeLiters: '180 – 350 L / 10 baskets',
      description: 'Used in large boiling vats (12–16 hour soak) and post-harvest flexible re-soaking pits. Vat water is discharged onto agricultural ditch margins.',
      evidenceGrade: 'Modeled Estimate'
    },
    energyProfile: {
      primarySource: 'Biomass firewood combustion for boiling vats (70%) + manual plaiting kinetic labor (30%)',
      energyIntensityEstimate: '15 – 28 kWh equivalent / 10 baskets (biomass thermal dominant)',
      kineticManualSharePercent: 30
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: [
        'Condensed vegetable tannins and polyphenols (naturally leached into boiling vat water)',
        'Fuelwood smoke particulates (PM2.5, PM10, carbon monoxide)',
        'Sulfur dioxide (used in some commercial bleaching pits to produce white wicker)'
      ],
      potentialExposurePathways: [
        'Inhalation of wood smoke and combustion gases from open pit boilers during 16-hour boiling shifts',
        'Discharge of boiling vat water rich in chemical oxygen demand (COD 1,200–1,800 mg/L) into riparian ditches adjacent to Shallabugh wetland'
      ],
      occupationalHealthNotes: [
        'Skin calluses, cuts, and puncture wounds from sharp wicker wand tips; chronic smoke inhalation among boiling operators',
        'Scientific correction: Boiling vat wastewater is organic/vegetal (tannins/phenols), not industrial chemical poison; its primary environmental impact is oxygen depletion in small ditches.'
      ],
      applicableStandards: ['CPCB Agro-Residue Processing Standards', 'Water (Prevention and Control of Pollution) Act 1974']
    },
    environmentalAdvantages: [
      'Rapidly renewable cultivated agricultural crop: willow coppicing sequesters carbon and stabilizes vulnerable wetland riparian riverbanks.',
      'Superior ecological replacement for single-use plastic storage crates, laundry hampers, and polypropylene delivery packaging.'
    ],
    environmentalPressurePoints: [
      'High firewood consumption: boiling thousands of wicker bundles consumes an estimated 4,000+ tonnes of local firewood annually.',
      'Concentrated discharges of tannin-rich, low-dissolved-oxygen vat water into sensitive Shallabugh migratory bird wetland buffer zones.'
    ],
    evidenceStatus: 'Officially Documented',
    recommendedFieldInvestigations: [
      'Water quality diagnostic of Shalbugh drainage canals: testing dissolved oxygen (DO), COD, and polyphenol concentrations before and after seasonal boiling.',
      'Pilot engineering trial of closed-lid, rocket-stove thermal boiling vats to reduce firewood consumption by 50% and capture flue gases.'
    ]
  },

  {
    id: 'kangri-craft',
    familyId: 'willow-plant-fiber',
    familyName: 'Willow & Plant-Fiber Crafts',
    craftName: 'Kashmir Kangri Wicker & Earthen Kundal',
    vernacularName: 'Koshur Kangur (Charar Kangri)',
    giStatus: 'Notified Heritage Craft',
    notifiedGazette: 'J&K Handicrafts Policy 2020 (Notified Craft Category A)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Budgam (Charar-e-Sharief)', 'Ganderbal', 'Anantnag'],
    functionalUnit: '10 Traditional Kashmir Fire-Pots (Wicker encasement + fired earthenware bowl, ~9 kg total mass)',
    artisanWorkforceEst: '10,000+ potter-weavers (Krals & Kani-weavers)',
    rawMaterialOrigin: 'Fine willow twigs (Poshe Kani) or hazel twigs, local clay Kundal bowl, and wild rush plant (Peetch / Typha).',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Wild collected mountain twigs (Cotoneaster / Parrotiopsis jacquemontiana) and cultivated willow wands; alluvial clay beds.',
      stage2_harvestingExtraction: 'Coppice harvesting of shrubs in autumn; manual riverbed clay excavation.',
      stage3_primaryProcessing: 'Wheel throwing and clamp kiln firing of terra cotta Kundal bowls; twig peeling and steaming.',
      stage4_artisanFabrication: 'Meticulous plaiting of wicker encasement directly around the fired earthen bowl; ornamental twisted top handle and wooden charcoal scraper (Tsalan).',
      stage5_dyeingFinishing: 'Occasional ornamental vegetable dye accents (red, green); natural unvarnished finish.',
      stage6_packagingTransport: 'Tied together in bundles of 5–10 using straw ropes; distributed valley-wide before onset of winter (Chillai Kalan).',
      stage7_useCareRepair: 'Vital personal heating device used beneath the Pheran cloak during freezing winters; 3–7 year lifespan; Kundal bowl easily replaced if cracked.',
      stage8_endOfLifeCircularity: '100% natural materials (baked clay and willow wicker); disintegrates back into soil without harmful chemical residues.'
    },
    waterFootprint: {
      volumeLiters: '25 – 45 L / 10 units',
      description: 'Used for clay pugging and wicker soaking. Minimal operational water footprint.',
      evidenceGrade: 'Modeled Estimate'
    },
    energyProfile: {
      primarySource: 'Kinetic manual plaiting (60%) + clamp kiln firewood/straw for bowl baking (40%)',
      energyIntensityEstimate: '18 – 30 kWh equivalent / 10 units',
      kineticManualSharePercent: 60
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: ['Terra cotta natural red clay', 'Biomass ash and charcoal combustion products during consumer use phase'],
      potentialExposurePathways: ['Carbon monoxide (CO) and particulate inhalation during consumer in-home charcoal heating under cloaks'],
      occupationalHealthNotes: ['Cuts on fingers from sharp twig splitters; potter ergonomic back strain'],
      applicableStandards: ['IS 2781 (Fire clay earthenware guidelines)']
    },
    environmentalAdvantages: [
      'Completely decentralized, zero-grid personal thermal heating apparatus requiring no fossil oil, natural gas, or grid electricity.',
      'Sustains essential rural circular livelihoods connecting mountain shrub harvesters, village potters, and wicker weavers.'
    ],
    environmentalPressurePoints: [
      'Harvesting of wild mountain shrubs (Poshe Kani) in fragile mid-elevation slopes can cause localized soil erosion if unmanaged.',
      'In-home combustion of poor-quality charcoal (Koyla) produces indoor carbon monoxide risks during peak winter months.'
    ],
    evidenceStatus: 'Officially Documented',
    recommendedFieldInvestigations: [
      'Ecological impact assessment of Parrotiopsis shrub coppicing in Budgam and Shopian foothill forests.',
      'Indoor air quality monitoring of ambient CO and PM2.5 levels during domestic Kangri heating in rural winter households.'
    ]
  },

  // ── FAMILY 07: COPPER & METALCRAFT ─────────────────────────────────────────
  {
    id: 'kashmir-copperware',
    familyId: 'copper-metalcraft',
    familyName: 'Copper & Metalcraft',
    craftName: 'Traditional Kashmir Copperware & Khandkari',
    vernacularName: 'Traam-i-Kaam & Khandkari',
    giStatus: 'GI Registered',
    notifiedGazette: 'J&K Handicrafts Policy 2020 / GI Registry No. 638 (2024)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Srinagar (Zaina Kadal, Rajouri Kadal, Nowhatta, Saraf Kadal)'],
    functionalUnit: '1 Traditional Carved Kashmiri Samovar (3.2 kg finished electrolytic copper mass)',
    artisanWorkforceEst: '12,000+ coppersmiths (Thanthur), engravers (Naqashkars), and Kalai tinners',
    rawMaterialOrigin: 'Commercial high-purity electrolytic copper sheets, brass handles/hinges, and high-purity tin ingots (Kalai).',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Primary mined and refined copper ingots processed into commercial sheets at Indian metallurgical rolling mills.',
      stage2_harvestingExtraction: 'Global copper mining and smelting (upstream industrial burden).',
      stage3_primaryProcessing: 'Cold sheet cutting; manual beating into circular discs; brazing and solder joining with brass flux alloys.',
      stage4_artisanFabrication: 'Deep raising on wooden anvils using iron hammers (Thuk Kaam); manual chiseling of intricate Chinar/almond arabesques (Khandkari).',
      stage5_dyeingFinishing: 'Internal Kalai process: heating vessel over charcoal hearth; applying ammonium chloride flux powder; wiping molten tin across copper surface.',
      stage6_packagingTransport: 'Soft paper and corrugated wrap; heavy transport.',
      stage7_useCareRepair: 'Traditional culinary and celebratory vessel lasting 50–100+ years. Requires annual Kalai re-tinning to prevent copper toxicity.',
      stage8_endOfLifeCircularity: 'Exceptional 100% circularity: worn copper vessels are melted down or traded at near-market spot copper metal prices.'
    },
    waterFootprint: {
      volumeLiters: '20 – 45 L / unit',
      description: 'Used during quenching, acid pickling wash (where practiced), and final sawdust/tamarind water cleaning.',
      evidenceGrade: 'Modeled Estimate'
    },
    energyProfile: {
      primarySource: 'Manual hammer kinetic beating (70%) + metallurgical charcoal fire for annealing & Kalai (30%)',
      energyIntensityEstimate: '14 – 24 kWh equivalent / unit (thermal annealing dominant)',
      kineticManualSharePercent: 70
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: [
        'Ammonium chloride (Sal-ammoniac / Naushadar) flux powder',
        'Pure elemental Tin (Sn) for interior food-contact coating',
        'Copper (Cu) dust and fine metal filings from chiseling',
        'Dilute hydrochloric or sulfuric acid (used in some large shops for pickling oxide scale; traditional shops use tamarind/citric rinse)'
      ],
      potentialExposurePathways: [
        'Inhalation of white ammonium chloride fume (NH4Cl) thermal decomposition products during the Kalai wiping process',
        'Acid washwater runoff into municipal street gutters if acid pickling baths are discarded without lime neutralization',
        'Copper metal dust inhalation during high-speed rotary motor polishing'
      ],
      occupationalHealthNotes: [
        'Scientific correction: Kalai tinning releases ammonium chloride flux fumes, NOT gaseous hydrochloric acid mist in standard workshops.',
        'NIOSH Recommended Exposure Limit (REL) for ammonium chloride fume is 10 mg/m³ TWA, with a Short-Term Exposure Limit (STEL) of 20 mg/m³.',
        'Artisans working without localized exhaust ventilation experience acute upper airway irritation, coughing, and conjunctivitis.'
      ],
      applicableStandards: ['NIOSH REL Ammonium Chloride Fume (10 mg/m³ TWA)', 'CPCB Metal Finishing Standards', 'Food Safety and Standards Authority of India (FSSAI) Tin Coating Purity Norms']
    },
    environmentalAdvantages: [
      '100% closed-loop circular metal lifecycle: zero copper is ever discarded into municipal landfills due to intrinsic scrap metal resale value.',
      'Eliminates disposable beverage packaging and electric heating appliances through high-thermal-efficiency charcoal samovars.'
    ],
    environmentalPressurePoints: [
      'Dense clustering of coppersmith workshops in narrow downtown Srinagar alleys releases cumulative ammonium chloride flux fumes.',
      'Acoustic noise pollution exceeding 85 dBA from continuous manual hammer beating in residential-commercial mixed neighborhoods.'
    ],
    evidenceStatus: 'Measured Observation',
    recommendedFieldInvestigations: [
      'Airborne sampling of ammonium chloride fume concentrations in Zaina Kadal workshops using calibrated filter cassettes analyzed by ion chromatography.',
      'Design and distribution of localized low-cost hood scrubbers with basic wet neutralizing filters for artisan Kalai hearths.'
    ]
  },

  // ── FAMILY 08: POTTERY & CERAMICS ─────────────────────────────────────────
  {
    id: 'kashmir-traditional-pottery',
    familyId: 'pottery-ceramics',
    familyName: 'Pottery & Ceramics',
    craftName: 'Traditional Kashmir Earthenware Pottery',
    vernacularName: 'Kral-i-Kaam (Matti Kar)',
    giStatus: 'Notified Heritage Craft',
    notifiedGazette: 'J&K Handicrafts Policy 2020 (Notified Craft Category B)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Srinagar (Charar-e-Sharief)', 'Anantnag (Bijbehara)', 'Ganderbal'],
    functionalUnit: '50 Utilitarian Earthenware Vessels (Pitchers, bowls, cups, ~35 kg baked clay mass)',
    artisanWorkforceEst: '4,000+ traditional potters (Krals)',
    rawMaterialOrigin: 'Lacustrine and alluvial clay excavated from traditional village clay deposits and river silt basins.',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Local Karewa clay formations and alluvial flood plain deposits; zero long-distance transportation.',
      stage2_harvestingExtraction: 'Manual pit excavation of non-agricultural clay seams; soil restored after seasonal extraction.',
      stage3_primaryProcessing: 'Clay weathering, manual soaking in water pits, foot kneading (pugging), and sieving to eliminate stones.',
      stage4_artisanFabrication: 'Wheel throwing on traditional heavy stone or wooden kick-wheels (Kral-Tsuh); manual paddle-and-anvil shaping.',
      stage5_dyeingFinishing: 'Slip decoration with red iron oxide clay; sun drying; firing in open-top wood-and-straw clamp kilns (Paj) at 700–850°C.',
      stage6_packagingTransport: 'Cushioned with dry straw in horse carts or small trucks; zero plastic packaging.',
      stage7_useCareRepair: 'Porous water-cooling pitchers, cooking pots, and Kangri bowls lasting 2–5 years of active utility.',
      stage8_endOfLifeCircularity: '100% natural baked ceramic; crumbles back into natural inert mineral earth without environmental toxicity.'
    },
    waterFootprint: {
      volumeLiters: '60 – 120 L / 50 vessels',
      description: 'Used exclusively for clay hydration, slurry preparation, and wheel lubrication. All water is absorbed or sun-evaporated.',
      evidenceGrade: 'Empirical Measured'
    },
    energyProfile: {
      primarySource: 'Biomass firewood, sawdust, and agricultural straw for clamp kiln firing (85%) + manual wheel kinetic energy (15%)',
      energyIntensityEstimate: '45 – 80 kWh equivalent / 50 vessels (biomass thermal dominant)',
      kineticManualSharePercent: 15
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: ['Natural earthenware clay', 'Red ochre / iron oxide mineral slip', 'Straw and pine bark fuel'],
      potentialExposurePathways: ['Inhalation of kiln smoke (PM2.5, carbon monoxide) during 24-hour clamp kiln firing cycles'],
      occupationalHealthNotes: ['High chronic exposure to respirable crystalline silica (quartz) during dry clay crushing and dry sieving', 'Lumbar strain from ground-level wheel operation'],
      applicableStandards: ['OSHA Respirable Crystalline Silica PEL 50 µg/m³', 'CPCB Traditional Pottery Kiln Guidelines']
    },
    environmentalAdvantages: [
      'Completely non-toxic, chemical-free food contact cookware that leaches zero heavy metals, microplastics, or perfluorinated compounds.',
      '100% biological circularity: broken potsherds (Thikur) are used as gravel aggregate or weather back into benign soil minerals.'
    ],
    environmentalPressurePoints: [
      'Low thermal efficiency of traditional open clamp kilns consumes excessive firewood and generates dense localized smoke in rural settlements.'
    ],
    evidenceStatus: 'Officially Documented',
    recommendedFieldInvestigations: [
      'Personal air monitoring of respirable crystalline silica among Charar-e-Sharief potters during dry clay pounding.',
      'Pilot installation of fuel-efficient downdraft brick kilns to reduce biomass fuel consumption by 40%.'
    ]
  },

  // ── FAMILY 11: HERITAGE TRANSPORT & UTILITY CRAFTS ─────────────────────────
  {
    id: 'shikara-construction',
    familyId: 'heritage-transport',
    familyName: 'Heritage Transport & Utility Crafts',
    craftName: 'Traditional Deodar Shikara Boat Building',
    vernacularName: 'Shikara Sazi (Naw Sazi)',
    giStatus: 'Notified Heritage Craft',
    notifiedGazette: 'J&K Handicrafts Policy 2020 (Notified Craft Category A)',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Srinagar (Dal Lake - Dalgate, Rainawari, Hazratbal; Nigeen Lake)'],
    functionalUnit: '1 Traditional Passenger Shikara Boat (10 m length, 1.8 m beam, ~850 kg seasoned Deodar timber)',
    artisanWorkforceEst: '600+ master boatwrights (Naw-saz)',
    rawMaterialOrigin: 'Aged, naturally seasoned heartwood of Cedrus deodara (Himalayan Cedar / Deodar) from government timber sales depots.',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'State-managed sustainable high-altitude coniferous forests in Pir Panjal and Great Himalayan ranges.',
      stage2_harvestingExtraction: 'Regulated timber logging by J&K State Forest Development Corporation (FDC).',
      stage3_primaryProcessing: 'Sawmilling into long planks (30–40 mm thickness); air-drying on lake margins for 6 to 12 months.',
      stage4_artisanFabrication: 'Carvel plank-on-frame boat construction; traditional manual caulking using iron clamps, hand augers, and copper/galvanized boat nails.',
      stage5_dyeingFinishing: 'Internal seam caulking using flax tow and resin putty; multi-coat marine varnish or linseed oil preservative application.',
      stage6_packagingTransport: 'Direct water launch from lakeside boatyards into Dal or Nigeen lake channels; zero transport emissions.',
      stage7_useCareRepair: 'Essential waterborne taxi and wetland transport lasting 35–60 years; planks can be individually replaced during biennial dry-docking.',
      stage8_endOfLifeCircularity: 'Salvaged Deodar planks are reclaimed for heritage house framing, window lintels, or small furniture items.'
    },
    waterFootprint: {
      volumeLiters: '< 20 L / boat',
      description: 'Fabrication occurs entirely on dry land slips along lake margins. Water use is minimal.',
      evidenceGrade: 'Empirical Measured'
    },
    energyProfile: {
      primarySource: 'Manual hand sawing, adze shaping, and hand drilling (88%) + sawmill log conversion (12%)',
      energyIntensityEstimate: '45 – 75 kWh equivalent / boat',
      kineticManualSharePercent: 88
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: [
        'Cedrus deodara resinous timber (naturally rot-resistant and insect-repellent)',
        'Traditional boiled linseed oil',
        'Synthetic marine alkyd varnish / polyurethane enamel',
        'Bitumen/tar pitch (applied to underwater hull planks on cargo boats)'
      ],
      potentialExposurePathways: [
        'Solvent vapor inhalation during exterior varnish application in open lake air',
        'Trace leaching of petroleum bitumen into shallow lake water from newly treated hulls'
      ],
      occupationalHealthNotes: [
        'High physical exertion; risk of eye injury and hand trauma from manual adzes and heavy iron clamping levers',
        'Deodar wood sawdust contains natural aromatic turpenoids that can cause contact dermatitis and mild respiratory sneezing.'
      ],
      applicableStandards: ['Inland Vessels Act 2021', 'Dal-Nigeen Lake Conservation & Management Authority (LCMA) Boat Guidelines']
    },
    environmentalAdvantages: [
      'Human-powered, non-motorized zero-emission lake transport: eliminates diesel/gasoline combustion, engine oil slicks, and underwater acoustic noise.',
      'Utilizes native Deodar timber whose natural essential oils provide biological rot resistance without toxic chemical copper-arsenic pressure treatments.'
    ],
    environmentalPressurePoints: [
      'High demand for mature Deodar timber places pressure on premium government timber allocations.',
      'Shifting to cheap synthetic petroleum-based paints on hulls introduces flaking chemical paint flakes into Dal Lake sediments.'
    ],
    evidenceStatus: 'Officially Documented',
    recommendedFieldInvestigations: [
      'Sediment sampling around traditional boat repair slips on Dal Lake to assess presence of antifouling paint residues or bitumen runoff.',
      'Timber traceability audit ensuring Deodar logs originate from certified sustainable SFC forest coupes.'
    ]
  },

  {
    id: 'cricket-bat-manufacturing',
    familyId: 'heritage-transport',
    familyName: 'Heritage Transport & Utility Crafts',
    craftName: 'Kashmir Willow Cricket Bats',
    vernacularName: 'Kashmir Willow Bat Sazi',
    giStatus: 'GI Applied',
    notifiedGazette: 'J&K Handicrafts Policy 2020 / GI Application Registered',
    originDivision: 'Kashmir Division',
    primaryDistrictClusters: ['Anantnag (Bijbehara, Sangam, Halmulla, Sethar)', 'Pulwama'],
    functionalUnit: '10 Finished Cricket Bats (~12.5 kg seasoned willow timber, Salix alba var. caerulea)',
    artisanWorkforceEst: '18,000+ cleft carvers, press operators, and sanders across 400+ units',
    rawMaterialOrigin: 'Cultivated English willow (Salix alba var. caerulea) grown across irrigated riverine agricultural belts in South Kashmir.',
    eightStageLifecycle: {
      stage1_rawMaterialOrigin: 'Privately owned farm forestry willow plantations planted along irrigation ditches and paddy margins.',
      stage2_harvestingExtraction: 'Selective harvesting of 15–20 year mature trees (circumference 1.2–1.5 m); stumps readily re-coppice.',
      stage3_primaryProcessing: 'Splitting logs into wedge-shaped clefts; ends dipped in paraffin wax to prevent radial cracking; open-air natural seasoning or steam kiln drying.',
      stage4_artisanFabrication: 'Manual draw-knife shaping; rotary machine planing; mechanical hydraulic roller pressing (compressing willow fibers for rebound elasticity).',
      stage5_dyeingFinishing: 'Hand sanding through multiple grit stages; cane handle splice gluing with rubber strips; linen twine binding; protective clear oil finish.',
      stage6_packagingTransport: 'Individual non-woven or plastic sleeves packed in 20-bat corrugated shipping boxes for global export.',
      stage7_useCareRepair: 'High-impact sports equipment lasting 2–6 seasons; repairable via surface re-sanding, toe-guard re-fitting, and re-binding.',
      stage8_endOfLifeCircularity: 'Solid natural willow wood; cane handle is biodegradable; can be salvaged for utility wooden objects or wood fuel.'
    },
    waterFootprint: {
      volumeLiters: '< 15 L / 10 bats',
      description: 'Used only for steam generation in drying kilns and water-based handle glue preparation.',
      evidenceGrade: 'Empirical Measured'
    },
    energyProfile: {
      primarySource: 'Grid electricity for rotary planers & hydraulic presses (60%) + manual draw-knife craft (40%)',
      energyIntensityEstimate: '18 – 35 kWh equivalent / 10 bats',
      kineticManualSharePercent: 40
    },
    chemicalAndEmissionsProfile: {
      substancesUsed: [
        'Raw linseed oil',
        'Polyurethane clear lacquer',
        'Synthetic PVA wood glue and epoxy handle adhesive',
        'Paraffin wax for cleft end sealing',
        'Fine respirable willow wood dust'
      ],
      potentialExposurePathways: [
        'Inhalation of fine softwood dust during high-speed automated drum sanding without dust extraction hoods',
        'Vapor inhalation from handle splice epoxy adhesives'
      ],
      occupationalHealthNotes: [
        'High incidence of respiratory symptoms and eye irritation among sanding operators in Bijbehara-Sangam cluster units',
        'High mechanical risk of finger lacerations and crush injuries from hydraulic rollers and circular table saws'
      ],
      applicableStandards: ['OSHA Wood Dust PEL 5 mg/m³', 'BIS IS 828 (Cricket bat specifications)']
    },
    environmentalAdvantages: [
      'Sustainable farm-forestry model: willow is grown as an agroforestry cash crop on field margins, sequestering substantial carbon during 15-year growth cycles.',
      'Only natural commercial competitor globally to English willow; provides an accessible, non-synthetic alternative to composite cricket equipment.'
    ],
    environmentalPressurePoints: [
      'High concentrations of fine wood dust in roadside workshops along the Srinagar-Jammu National Highway without industrial baghouse filters.',
      'Deficit of structured replantation: accelerated harvesting of mature trees without corresponding replanting could trigger raw cleft shortages.'
    ],
    evidenceStatus: 'Officially Documented',
    recommendedFieldInvestigations: [
      'Comprehensive willow agroforestry biomass inventory in South Kashmir to balance annual tree harvest rates against new sapling planting rates.',
      'Dust concentration measurement (gravimetric sampling) in Sangam bat sanding workshops to recommend localized cyclone dust collectors.'
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. WATER, DYE EFFLUENTS & WORKSHOP CHEMICAL EXPOSURE MATRIX (18 PROCESSES)
// ─────────────────────────────────────────────────────────────────────────────

export const WATER_CHEMICAL_PROCESS_MATRIX: WaterChemicalProcessRecord[] = [
  {
    processId: 'PROC-01',
    processName: 'Pashmina Washing & Starch Removal',
    craftName: 'Handloom Pashmina Shawl',
    familyId: 'pashmina-shawls',
    keyChemicalOrAgent: 'Rice starch paste, saponin plant extract (Reetha), mild alkaline non-ionic detergent',
    exposureOrEffluentPathway: 'Discharge of biodegradable organic washwater with elevated biological oxygen demand (BOD) into municipal drains',
    applicableRegulatoryStandard: 'CPCB General Discharge Standard for In-land Surface Water (BOD < 30 mg/L, TSS < 100 mg/L)',
    scientificInvestigationProtocol: 'Sentinel flow-proportional composite sampling at washing sheds in Downtown Srinagar; laboratory testing of BOD5, COD, and Surfactants (MBAS).',
    evidenceStatus: 'Proposed Scientific Investigation',
    correctionCaveat: 'Past claims of heavy chemical toxicity are scientifically unsupported; Pashmina washing is primarily an organic starch/soap rinse.'
  },
  {
    processId: 'PROC-02',
    processName: 'Pashmina Yarn Hank Dyeing',
    craftName: 'Handloom Pashmina Shawl',
    familyId: 'pashmina-shawls',
    keyChemicalOrAgent: 'Synthetic acid dyestuffs, azo dyes, sodium sulfate leveling agent, glacial acetic acid',
    exposureOrEffluentPathway: 'Spent dye liquor discharge with residual color, dissolved solids, and low pH (4.0–5.5) into municipal sewers',
    applicableRegulatoryStandard: 'CPCB Textile Processing Discharge Standards (Color < 150 Hazen, COD < 250 mg/L, pH 5.5–9.0)',
    scientificInvestigationProtocol: 'UV-Vis spectrophotometric color absorbance testing on Zadibal storm outfalls; upstream/downstream residential control testing.',
    evidenceStatus: 'Proposed Scientific Investigation',
    correctionCaveat: 'Discharges must be distinguished from domestic municipal sewage before attributing downtown waterway pollution to weavers.'
  },
  {
    processId: 'PROC-03',
    processName: 'Silk & Wool Carpet Yarn Hank Dyeing',
    craftName: 'Hand-Knotted Carpet',
    familyId: 'carpets-flooring',
    keyChemicalOrAgent: 'Pre-metallized dyes (trace chromium / copper complex), acid colorants, sulfuric acid exhaustion bath',
    exposureOrEffluentPathway: 'Exhausted dye bath effluents containing residual heavy metal ions (Cr, Cu) discharged into cluster drainage',
    applicableRegulatoryStandard: 'CPCB Standards for Metal Finishing & Dyeing: Total Chromium < 2.0 mg/L, Copper < 3.0 mg/L',
    scientificInvestigationProtocol: 'Inductively Coupled Plasma Mass Spectrometry (ICP-MS) trace metal screening of spent dye baths at commercial dyehouses.',
    evidenceStatus: 'Potential Pressure Pathway',
    correctionCaveat: 'Chromium mordants are restricted under export certifications; verified laboratory ICP-MS testing is required to verify actual prevalence.'
  },
  {
    processId: 'PROC-04',
    processName: 'Post-Weave Carpet Chemical Luster Wash',
    craftName: 'Hand-Knotted Carpet',
    familyId: 'carpets-flooring',
    keyChemicalOrAgent: 'Sodium hypochlorite bleaching liquor, caustic soda (NaOH), sulfuric acid neutralizing rinse',
    exposureOrEffluentPathway: 'High-volume alkaline chlorinated wastewater discharged into Shalteng and downtown drainage canals',
    applicableRegulatoryStandard: 'CPCB Effluent Standards: Free Available Chlorine < 0.5 mg/L, Total Dissolved Solids < 2,100 mg/L',
    scientificInvestigationProtocol: 'Electrochemical pH/ORP monitoring and titration of free available chlorine at designated carpet washing basins.',
    evidenceStatus: 'Potential Pressure Pathway',
    correctionCaveat: 'Carpet washing is concentrated in specific commercial facilities, not individual cottage weaver homes; investigations must target designated wash yards.'
  },
  {
    processId: 'PROC-05',
    processName: 'Namda Wool Felting & Hot Soap Kneading',
    craftName: 'Namda Felted Rug',
    familyId: 'carpets-flooring',
    keyChemicalOrAgent: 'Potash laundry soap, sodium silicate, animal tallow soap residue, direct colorants',
    exposureOrEffluentPathway: 'Warm alkaline soapy greywater with suspended wool fibers discharged into village ditches in Anantnag',
    applicableRegulatoryStandard: 'CPCB Standards for Small Agro-Processing Units (Oil & Grease < 10 mg/L, pH 6.0–8.5)',
    scientificInvestigationProtocol: 'Field measurement of grease, surfactant concentration, and dissolved oxygen in receiving ditches in Anantnag rural clusters.',
    evidenceStatus: 'Proposed Scientific Investigation',
    correctionCaveat: 'Wastewater is free of synthetic toxic solvents, but high biological demand requires localized gravel bio-filtration sumps.'
  },
  {
    processId: 'PROC-06',
    processName: 'Gabba Textile Post-Consumer Cleaning & Re-Dyeing',
    craftName: 'Gabba Recycled Rug',
    familyId: 'carpets-flooring',
    keyChemicalOrAgent: 'Alkaline laundry detergents, sodium percarbonate, direct dye baths',
    exposureOrEffluentPathway: 'Greywater containing accumulated soil and detergent residues from washing reclaimed post-consumer wool blankets',
    applicableRegulatoryStandard: 'State Pollution Control Committee General Water Standards (TSS < 100 mg/L)',
    scientificInvestigationProtocol: 'Turbidity and total suspended solids monitoring of pre-wash sumps in Anantnag workshops.',
    evidenceStatus: 'Proposed Scientific Investigation',
    correctionCaveat: 'Gabba represents an environmental benefit (circular recycling); washing effluents are municipal-grade laundry greywater.'
  },
  {
    processId: 'PROC-07',
    processName: 'Kani Shawl Upstream Spool Preparation',
    craftName: 'Kani Shawl',
    familyId: 'pashmina-shawls',
    keyChemicalOrAgent: 'Pre-dyed silk and wool threads; minimal dry starch winding',
    exposureOrEffluentPathway: 'Negligible workshop wastewater; minor micro-dye baths handled upstream',
    applicableRegulatoryStandard: 'Not Applicable (Dry artisan assembly)',
    scientificInvestigationProtocol: 'Lifecycle boundary documentation assigning upstream dyehouse impacts to Kani production without double counting.',
    evidenceStatus: 'Proposed Scientific Investigation',
    correctionCaveat: 'Artisanal Kani weaving generates zero direct liquid effluents; dyehouse impacts must be attributed according to strict LCA mass allocation.'
  },
  {
    processId: 'PROC-08',
    processName: 'Sozni Block Motif Inking & Tracing',
    craftName: 'Sozni Needle Embroidery',
    familyId: 'embroidery-needlework',
    keyChemicalOrAgent: 'Wood-block printing paste: charcoal powder, chalk, gum binder, trace kerosene solvent',
    exposureOrEffluentPathway: 'Indoor solvent evaporation in domestic rooms; rinse water when washing test swatches',
    applicableRegulatoryStandard: 'OSHA Stoddard Solvent PEL 500 ppm TWA; ACGIH TLV 100 ppm',
    scientificInvestigationProtocol: 'Substance-specific air sampling for kerosene/aliphatic hydrocarbons during active motif stamping in Shehr-e-Khas.',
    evidenceStatus: 'Potential Pressure Pathway',
    correctionCaveat: 'Most contemporary artisans have transitioned to water-soluble gum pastes; solvent presence must be verified empirically.'
  },
  {
    processId: 'PROC-09',
    processName: 'Aari & Crewel Backing Canvas Sizing',
    craftName: 'Embroidery & Needlework',
    familyId: 'embroidery-needlework',
    keyChemicalOrAgent: 'Starch sizing agents, PVA adhesives (on commercial upholstery fabric), azo-dyed staple wool threads',
    exposureOrEffluentPathway: 'Trace airborne starch dust during unrolling; zero liquid effluent during manual needlework',
    applicableRegulatoryStandard: 'OSHA Particulates Not Otherwise Regulated (PNOR) 15 mg/m³',
    scientificInvestigationProtocol: 'Airborne dust cassette sampling in commercial crewel cutting workshops in Pulwama and Srinagar.',
    evidenceStatus: 'Proposed Scientific Investigation',
    correctionCaveat: 'Aari embroidery is fundamentally a kinetic hand craft; chemical investigations are restricted to upstream textile fabric manufacturing.'
  },
  {
    processId: 'PROC-10',
    processName: 'Tilla Gold/Silver Wire Drawing & Burnishing',
    craftName: 'Tilla Metallic Wire Embroidery',
    familyId: 'embroidery-needlework',
    keyChemicalOrAgent: 'Silver electroplating bath residues (upstream), nitrocellulose protective lacquer, Ag/Cu metal dust',
    exposureOrEffluentPathway: 'Fine metallic dust generated during manual burnishing with agate stone (Mohra)',
    applicableRegulatoryStandard: 'OSHA Silver Metal Dust PEL 0.01 mg/m³; Copper Dust PEL 1.0 mg/m³',
    scientificInvestigationProtocol: 'Wipe sampling on artisan work tables for bio-available silver and copper particulate.',
    evidenceStatus: 'Proposed Scientific Investigation',
    correctionCaveat: 'Total metal mass per garment is very low (~50 g); worker exposure is primarily mechanical and ocular rather than toxic chemical.'
  },
  {
    processId: 'PROC-11',
    processName: 'Papier-Mâché Sakhtsazi Antifungal Starch Preparation',
    craftName: 'Papier-Mâché Sakhtsazi',
    familyId: 'papier-mache-paper',
    keyChemicalOrAgent: 'Copper sulfate (CuSO4 / Nilathokha), wheat starch, calcium sulfate (Gach)',
    exposureOrEffluentPathway: 'Dermal contact with copper sulfate paste; rinse water from pulp soaking sumps',
    applicableRegulatoryStandard: 'OSHA Copper Dust & Mist PEL 1.0 mg/m³; CPCB Copper in Effluent < 3.0 mg/L',
    scientificInvestigationProtocol: 'Testing copper ion concentrations in pulp rinse pits and evaluating non-toxic bio-fungicide substitutes (thymol/neem).',
    evidenceStatus: 'Potential Pressure Pathway',
    correctionCaveat: 'Copper sulfate is an antifungal additive used at low percentages (0.5%), not an industrial electroplating bath.'
  },
  {
    processId: 'PROC-12',
    processName: 'Papier-Mâché Naqashi Lacquer Finishing & Solvent Drying',
    craftName: 'Papier-Mâché Naqashi',
    familyId: 'papier-mache-paper',
    keyChemicalOrAgent: 'Mineral spirits, turpentine, xylene, toluene (in commercial synthetic copal and polyurethane varnishes)',
    exposureOrEffluentPathway: 'Indoor solvent vapor volatilization into unventilated domestic artisan living quarters',
    applicableRegulatoryStandard: 'ACGIH TLVs: Turpentine 20 ppm TWA; Xylene 100 ppm TWA; Toluene 20 ppm TWA (No universal ACGIH 50–100 ppm TVOC rule exists)',
    scientificInvestigationProtocol: 'Active air sampling using sorbent tubes (coconut charcoal) and laboratory GC-MS desorption to identify and quantify exact volatile species.',
    evidenceStatus: 'Screening Observation Only',
    correctionCaveat: 'Previous claims of 120–240 ppm total VOCs were uncalibrated photoionization screening values; substance-specific GC-MS sampling is mandatory before claiming exposure limit violations.'
  },
  {
    processId: 'PROC-13',
    processName: 'Walnut Woodcarving Sanding & Chisel Finishing',
    craftName: 'Walnut Woodcarving',
    familyId: 'woodcraft-architecture',
    keyChemicalOrAgent: 'Respirable Juglans regia hardwood dust, natural juglone naphthoquinone, wax polish solvents',
    exposureOrEffluentPathway: 'Airborne hardwood particulate settling in artisan breathing zones in unventilated workshops',
    applicableRegulatoryStandard: 'OSHA Hardwood Dust PEL 5.0 mg/m³ (Total Dust); ACGIH Inhalable Wood Dust TLV 1.0 mg/m³',
    scientificInvestigationProtocol: 'Personal gravimetric dust monitors (cyclone separators) on carvers in Safakadal measuring 8-hour Time-Weighted Averages (TWA).',
    evidenceStatus: 'Potential Pressure Pathway',
    correctionCaveat: 'Solid walnut carving produces large chisel chips (non-respirable); fine respirable dust occurs primarily during mechanical rasping and sanding.'
  },
  {
    processId: 'PROC-14',
    processName: 'Khatamband Pine Batten Sawing & Jointing',
    craftName: 'Khatamband Ceilings',
    familyId: 'woodcraft-architecture',
    keyChemicalOrAgent: 'Pinus excelsa (Kail) softwood dust, natural terpene aerosols, PVA adhesive vapors',
    exposureOrEffluentPathway: 'Airborne softwood dust from circular table saws and high-speed grooving planers',
    applicableRegulatoryStandard: 'OSHA Softwood Dust PEL 15 mg/m³ (Total Dust); ACGIH TLV 5 mg/m³',
    scientificInvestigationProtocol: 'Continuous optical particle counter (OPC) monitoring of PM2.5 and PM10 during active sawmilling in Idgah workshops.',
    evidenceStatus: 'Proposed Scientific Investigation',
    correctionCaveat: 'Khatamband uses zero synthetic formaldehyde resins or MDF; raw pine wood dust is low in chemical toxicity compared to composite wood boards.'
  },
  {
    processId: 'PROC-15',
    processName: 'Willow Wicker Boiling & Bark Peeling',
    craftName: 'Willow Wicker',
    familyId: 'willow-plant-fiber',
    keyChemicalOrAgent: 'Condensed plant tannins, gallic acid, polyphenols, fuelwood combustion emissions (PM2.5, CO)',
    exposureOrEffluentPathway: 'Discharge of hot tannin-rich wastewater with elevated chemical oxygen demand (COD 1,200–1,800 mg/L) into riparian ditches',
    applicableRegulatoryStandard: 'CPCB Inland Surface Water Effluent Standards (COD < 250 mg/L, BOD < 30 mg/L, Temperature < 40°C)',
    scientificInvestigationProtocol: 'Seasonal pre- and post-discharge water sampling at Shalbugh ditch outfalls entering Shallabugh wetland margins.',
    evidenceStatus: 'Potential Pressure Pathway',
    correctionCaveat: 'Wicker boiling water is 100% organic plant extract (not synthetic chemicals); its primary impact is biological oxygen depletion, which can be mitigated with reed-bed filtration sumps.'
  },
  {
    processId: 'PROC-16',
    processName: 'Copperware Kalai Molten Tinning & Flux Cleaning',
    craftName: 'Traditional Copperware',
    familyId: 'copper-metalcraft',
    keyChemicalOrAgent: 'Ammonium chloride (NH4Cl) flux fumes, pure tin vapor, dilute hydrochloric acid mist (pickling shops)',
    exposureOrEffluentPathway: 'Dense white ammonium chloride sublimation fumes emitted directly into artisan breathing zones during wiping over charcoal fires',
    applicableRegulatoryStandard: 'NIOSH Recommended Exposure Limit (REL): Ammonium Chloride Fume 10 mg/m³ TWA, STEL 20 mg/m³; OSHA PEL 10 mg/m³',
    scientificInvestigationProtocol: 'Filter cassette air sampling with ion chromatographic analysis of ammonium and chloride ions in Zaina Kadal coppersmith enclaves.',
    evidenceStatus: 'Screening Observation Only',
    correctionCaveat: 'Scientific correction: Kalai tinning produces ammonium chloride flux fumes, NOT hydrochloric acid mist in traditional shops. Acid pickling is practiced only in select heavy fabrication yards.'
  },
  {
    processId: 'PROC-17',
    processName: 'Pottery Clay Pugging & Kiln Firing',
    craftName: 'Traditional Earthenware Pottery',
    familyId: 'pottery-ceramics',
    keyChemicalOrAgent: 'Respirable crystalline silica (SiO2 / quartz), carbon monoxide, biomass wood smoke',
    exposureOrEffluentPathway: 'Inhalation of dry clay dust during dry crushing/sieving; flue gas exposure downwind of clamp kilns',
    applicableRegulatoryStandard: 'OSHA Respirable Crystalline Silica PEL 50 µg/m³ (Action Level 25 µg/m³)',
    scientificInvestigationProtocol: 'Personal air sampling using cyclone heads and X-ray diffraction (XRD) analysis for crystalline silica among Charar-e-Sharief potters.',
    evidenceStatus: 'Potential Pressure Pathway',
    correctionCaveat: 'Kashmir utilitarian pottery uses natural earthenware clay without lead or cadmium frits; chemical toxicity is minimal, but silica dust requires wet processing controls.'
  },
  {
    processId: 'PROC-18',
    processName: 'Willow Cricket Bat Sanding & Surface Coating',
    craftName: 'Cricket Bat Manufacturing',
    familyId: 'heritage-transport',
    keyChemicalOrAgent: 'Fine willow wood dust, polyurethane surface lacquer, raw linseed oil, epoxy adhesive vapors',
    exposureOrEffluentPathway: 'Respirable wood dust from high-speed belt sanders without extraction hoods; solvent vapor during dipping',
    applicableRegulatoryStandard: 'OSHA Wood Dust PEL 5.0 mg/m³; ACGIH Inhalable Wood Dust TLV 1.0 mg/m³',
    scientificInvestigationProtocol: 'Gravimetric personal dust monitoring and particle size distribution analysis in Bijbehara and Sangam bat finishing units.',
    evidenceStatus: 'Potential Pressure Pathway',
    correctionCaveat: 'Willow wood is non-toxic and non-allergenic compared to walnut, but mechanical dust density in roadside sheds requires local cyclone exhaust systems.'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. COMPARATIVE LIFECYCLE ASSESSMENT: HANDMADE KASHMIR CRAFTS VS SYNTHETICS
// ─────────────────────────────────────────────────────────────────────────────

export const COMPARATIVE_CRAFT_LIFECYCLES: ComparativeCraftLifecycle[] = [
  {
    id: 'pashmina_vs_acrylic',
    traditionalCraftName: 'Handloom Kashmir Pashmina Shawl',
    modernSubstituteName: 'Machine-Woven Acrylic / Polyester Jacquard Shawl',
    comparisonCategory: 'Thermal Winter Shawls & Outerwear',
    functionalUnit: '1 Warmth-Equivalent Winter Shawl (200 cm × 100 cm, 220 g Pashmina vs 380 g Acrylic)',
    traditionalEmbodiedCarbon: '4.8 – 8.2 kg CO2e / shawl (pastoral caprine footprint dominant)',
    substituteEmbodiedCarbon: '18.5 – 32.0 kg CO2e / shawl (petrochemical extraction & automated steam mills)',
    energySourceTraditional: '95% manual human kinetic power + solar drying',
    energySourceSubstitute: '100% industrial grid electricity, thermal natural gas & petrochemical synthesis',
    averageLifespanTraditional: '40 – 80+ years (investment cultural heirloom with active darning repairability)',
    averageLifespanSubstitute: '2 – 4 years (fast-fashion pilling, fiber thinning, disposal)',
    microplasticEmissionsTraditional: '0 microfibers (100% natural animal keratin protein, fully biodegradable in seawater)',
    substituteEmbodiedCarbon: '18.5 – 32.0 kg CO2e / shawl',
    microplasticEmissionsSubstitute: '700,000+ microplastic fibers released per domestic wash cycle',
    endOfLifeBiodegradabilityTraditional: '100% biodegradable in active garden soil within 3 to 6 months',
    endOfLifeBiodegradabilitySubstitute: '450+ years estimated persistence in municipal landfills / ocean gyres',
    repairabilityScoreTraditional: 'Very High (supported by specialized Rafugari darning craft)',
    repairabilityScoreSubstitute: 'Near Zero (synthetic knit runs cannot be invisibly mended)',
    scientificLifecycleVerdict: 'Handloom Pashmina delivers an 80% lower lifecycle carbon footprint per year of service, completely eliminates ocean microplastic fiber pollution, and prevents repetitive landfill turnover.',
    tradeOffNuance: 'Scientific nuance: Caprine grazing in high-altitude Changthang pastures must be ecologically managed to prevent fragile alpine soil erosion from excessive herd growth.'
  },
  {
    id: 'carpet_vs_polypropylene',
    traditionalCraftName: 'Hand-Knotted Silk & Wool Carpet (Kashmiri Qaleen)',
    modernSubstituteName: 'Machine-Tufted Polypropylene Carpet with SBR Latex Backing',
    comparisonCategory: 'Architectural Floor Coverings',
    functionalUnit: '1 m² Floor Covering (400 knots/in² silk/wool vs 1,200 g/m² tufted polypropylene)',
    traditionalEmbodiedCarbon: '22 – 38 kg CO2e / m² (sericulture & wool washing)',
    substituteEmbodiedCarbon: '55 – 92 kg CO2e / m² (virgin polypropylene synthesis & synthetic latex curing)',
    energySourceTraditional: '80% manual hand knotting on vertical looms',
    energySourceSubstitute: '100% high-speed automated tufting machinery & gas-fired thermal ovens',
    averageLifespanTraditional: '60 – 100+ years (multi-generational antique floor covering)',
    averageLifespanSubstitute: '5 – 8 years (delamination of secondary latex backing, fiber crush)',
    microplasticEmissionsTraditional: '0 microplastics (biodegradable silk & wool pile shed)',
    microplasticEmissionsSubstitute: 'Continuous shedding of airborne polypropylene fiber fragments into indoor air',
    endOfLifeBiodegradabilityTraditional: '100% biodegradable in composting conditions; backing is natural cotton',
    endOfLifeBiodegradabilitySubstitute: 'Non-recyclable composite: synthetic latex prevents polymer separation; 100% landfill or incineration',
    repairabilityScoreTraditional: 'High (master weavers re-knot worn patches and re-bind fringes)',
    repairabilityScoreSubstitute: 'Zero (tufted synthetic backing cannot be re-anchored)',
    scientificLifecycleVerdict: 'When evaluated across a 50-year building lifecycle, one hand-knotted carpet replaces 6 to 10 synthetic carpets, reducing embodied flooring energy by over 75% and eliminating persistent indoor chemical outgassing.',
    tradeOffNuance: 'Scientific nuance: Traditional carpet luster washing requires municipal wastewater treatment interventions to neutralize alkaline wash baths.'
  },
  {
    id: 'walnut_vs_mdf',
    traditionalCraftName: 'Hand-Carved Kashmir Walnut Furniture',
    modernSubstituteName: 'Medium-Density Fiberboard (MDF) Furniture with Melamine Paper Overlay',
    comparisonCategory: 'Interior Architectural Furniture',
    functionalUnit: '1 Dining / Coffee Table (1 m² surface, solid wood vs 18 mm laminated MDF)',
    traditionalEmbodiedCarbon: '-14.0 kg CO2e net (Net Carbon Sink: biogenic carbon stored in wood exceeds processing emissions)',
    substituteEmbodiedCarbon: '+38.5 kg CO2e net (Formaldehyde resin adhesives & high-pressure thermal pressing)',
    energySourceTraditional: '90% manual chisel and mallet kinetic carving + ambient air seasoning',
    energySourceSubstitute: '100% motorized wood grinding, industrial resin blenders, and high-tonnage heated presses',
    averageLifespanTraditional: '80 – 150+ years (solid hardwood heirloom, refinishable)',
    averageLifespanSubstitute: '4 – 8 years (susceptible to water swelling, delamination, non-repairable screw tears)',
    microplasticEmissionsTraditional: 'Zero synthetic particulate; non-toxic biogenic wood shavings',
    microplasticEmissionsSubstitute: 'Micro-chipping of melamine resin plastic overlay; continuous low-level formaldehyde outgassing',
    endOfLifeBiodegradabilityTraditional: '100% biodegradable natural hardwood or reclaimable architectural salvage',
    endOfLifeBiodegradabilitySubstitute: 'Non-recyclable hazardous waste: urea-formaldehyde resins prevent clean wood recycling; emits toxic dioxins if incinerated',
    repairabilityScoreTraditional: 'Exceptional (solid wood can be planed, re-carved, re-oiled indefinitely)',
    repairabilityScoreSubstitute: 'Very Low (blown fiber core cannot be re-fastened once water damaged)',
    scientificLifecycleVerdict: 'Hand-carved solid walnut functions as a permanent carbon bank that stores atmospheric biogenic carbon for over a century, while MDF is an emissive synthetic composite with short functional lifespans and toxic disposal pathways.',
    tradeOffNuance: 'Scientific nuance: Timber must strictly originate from authorized dead, diseased, or senescent orchard trees under the J&K Preservation of Specific Trees Act 1969 to prevent orchard canopy loss.'
  },
  {
    id: 'willow_vs_plastic',
    traditionalCraftName: 'Hand-Woven Willow Wicker Basket',
    modernSubstituteName: 'Injection-Molded High-Density Polyethylene (HDPE) Plastic Crate',
    comparisonCategory: 'Utility Storage & Agricultural Handling',
    functionalUnit: '1 Storage / Harvesting Container (50 L internal volume capacity)',
    traditionalEmbodiedCarbon: '1.8 – 3.2 kg CO2e / basket (biomass firewood boiling dominant)',
    substituteEmbodiedCarbon: '8.4 – 14.5 kg CO2e / crate (ethylene cracking, high-pressure injection molding)',
    energySourceTraditional: 'Local agricultural coppicing & manual plaiting (firewood boiling represents primary thermal input)',
    energySourceSubstitute: 'Petroleum refining, ethylene polymerization, 250-ton electric injection presses',
    averageLifespanTraditional: '15 – 30 years (natural flexibility resists impact; re-weavable base)',
    averageLifespanSubstitute: '3 – 8 years (UV embrittlement under outdoor sunlight leads to catastrophic cracking)',
    microplasticEmissionsTraditional: 'Zero synthetic fibers; sheds only inert cellulose fragments',
    microplasticEmissionsSubstitute: 'Photodegrades into persistent secondary microplastic fragments under outdoor ultraviolet radiation',
    endOfLifeBiodegradabilityTraditional: '100% natural Salix biomass; composts into nutrient-rich garden humus within 6 months',
    endOfLifeBiodegradabilitySubstitute: '450+ years in terrestrial environments; low actual mechanical recycling rates in rural Kashmir',
    repairabilityScoreTraditional: 'Moderate to High (broken ribs can be replaced with moist willow wands)',
    repairabilityScoreSubstitute: 'Zero (cracked polyethylene cannot be glued or welded in field conditions)',
    scientificLifecycleVerdict: 'Willow wicker is a locally cultivated, rapidly renewable agroforestry product that eliminates single-use and short-cycle petrochemical plastics in fruit harvesting, warehousing, and domestic storage.',
    tradeOffNuance: 'Scientific nuance: Biomass firewood boilers must be upgraded to closed rocket-stove systems to eliminate smoke particulate emissions during late-autumn boiling cycles.'
  },
  {
    id: 'gabba_vs_synthetic_felt',
    traditionalCraftName: 'Upcycled Post-Consumer Wool Gabba Rug',
    modernSubstituteName: 'Virgin Synthetic Nylon / Polyester Felt Mat',
    comparisonCategory: 'Thermal Floor Mats & Rugs',
    functionalUnit: '1 Insulating Rug (180 cm × 120 cm, ~2.5 kg textile mass)',
    traditionalEmbodiedCarbon: '3.2 – 5.5 kg CO2e / rug (circular credit: avoids virgin fiber production burdens)',
    substituteEmbodiedCarbon: '24.0 – 42.0 kg CO2e / rug (virgin petroleum-derived nylon polymer extrusion & needle punching)',
    energySourceTraditional: '95% manual cutting, patchwork assembly, and hook embroidery',
    energySourceSubstitute: '100% automated needle-punching lines & synthetic fiber spinning',
    averageLifespanTraditional: '20 – 35 years (thick wool composite; modular patches replaceable)',
    averageLifespanSubstitute: '3 – 6 years (pile compaction, synthetic fiber shedding, static dust accumulation)',
    microplasticEmissionsTraditional: 'Zero microplastics (reclaims 100% animal wool fibers)',
    substituteEmbodiedCarbon: '24.0 – 42.0 kg CO2e / rug',
    microplasticEmissionsSubstitute: 'High shedding of synthetic polyester and nylon microfibers during vacuuming and foot abrasion',
    endOfLifeBiodegradabilityTraditional: '100% biodegradable natural wool backing and surface; enriches garden soil with nitrogen',
    endOfLifeBiodegradabilitySubstitute: 'Permanent synthetic waste: synthetic carpet fibers do not biodegrade in municipal landfills',
    repairabilityScoreTraditional: 'Very High (modular patchwork construction allows single damaged squares to be replaced)',
    repairabilityScoreSubstitute: 'Zero (bonded needle-punched synthetic felt cannot be re-stitched)',
    scientificLifecycleVerdict: 'Gabba represents the pinnacle of circular industrial ecology in the Western Himalayas: converting post-consumer textile waste into durable, thermal floor coverings that save 85% of virgin manufacturing energy.',
    tradeOffNuance: 'Scientific nuance: Preliminary pre-wash sumps should incorporate simple mesh filters to capture loose wool lint before greywater is discharged.'
  },
  {
    id: 'papiermache_vs_styrofoam',
    traditionalCraftName: 'Molded Waste-Paper Sakhtsazi Container',
    modernSubstituteName: 'Expanded Polystyrene (EPS / Styrofoam) Synthetic Packaging Box',
    comparisonCategory: 'Protective Decorative & Presentation Containers',
    functionalUnit: '10 Rigid Decorative Storage Boxes (15 cm × 10 cm × 5 cm)',
    traditionalEmbodiedCarbon: '1.2 – 2.4 kg CO2e / 10 boxes (circular municipal paper diversion credit)',
    substituteEmbodiedCarbon: '9.5 – 18.0 kg CO2e / 10 boxes (benzene-derived styrene monomer & pentane blowing agents)',
    energySourceTraditional: '85% manual kinetic mallet beating & 100% passive solar open-air drying',
    energySourceSubstitute: '100% high-pressure steam expansion and motorized polystyrene molding machines',
    averageLifespanTraditional: '40 – 80+ years (collectible decorative and functional heirloom)',
    averageLifespanSubstitute: 'Single use to 1 year (fragile, prone to crushing, discarded immediately)',
    microplasticEmissionsTraditional: 'Zero synthetic polymers (reconstituted cellulose & gypsum)',
    microplasticEmissionsSubstitute: 'Extreme fragmentation into millions of ultra-lightweight microplastic beads that disperse in waterways',
    endOfLifeBiodegradabilityTraditional: '100% biodegradable cellulose core (if unpainted or finished with natural tree copal)',
    endOfLifeBiodegradabilitySubstitute: '500+ years persistence; zero biological degradation in soil or aquatic ecosystems',
    repairabilityScoreTraditional: 'Moderate (dents can be filled with paper paste and re-sanded)',
    repairabilityScoreSubstitute: 'Zero (crushed or snapped polystyrene cannot be repaired)',
    scientificLifecycleVerdict: 'Sakhtsazi demonstrates that urban post-consumer paper waste can be transformed into high-durability, beautiful functional containers using solar drying, eliminating single-use petrochemical foam packaging.',
    tradeOffNuance: 'Scientific nuance: Exterior finishing must avoid high-VOC solvent varnishes and polyurethane coats to maintain end-of-life compostability.'
  }
];
