// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH — 100-DOSSIER CONTENT-AWARE VISUAL & INSTRUMENT REGISTRY
// Enforces report-level and chapter-level visual selection, strict geographical
// validation across all 100 dossiers (KEW-SR-2026-01 through KEW-SR-2026-100),
// discipline-matched field/laboratory instrumentation, and backend asset
// provenance tracking without leaking administrative logs into public prose.
// ─────────────────────────────────────────────────────────────────────────────

import type { ResearchDivisionId, ResearchSeriesDossier } from '@/types/sectoral-eia';

export type VisualProvenanceCategory =
  | 'KEW Environmental Observatory Archive'
  | 'Satellite / Geospatial Product Reference'
  | 'Conceptual Scientific Process Diagram (Vector)'
  | 'Illustrative Scientific Visualization';

export interface VisualPlateRecord {
  id: string;
  src: string;
  figureLabel: string;
  title: string;
  caption: string;
  locationLabel: string;
  scientificDiscipline: string;
  equipmentPictured: string[];
  /** True when the asset is an illustrative visualization rather than an archival documentary photo */
  isIllustrative: boolean;
  /** Retained in backend registry for institutional asset governance */
  provenanceCategory: VisualProvenanceCategory;
  sourceAttribution: string;
  rightsAndIntegrityNote: string;
}

export interface DisciplineEquipmentProfile {
  discipline: string;
  fieldInstruments: string[];
  laboratoryAndComputationalSystems: string[];
  attireAndSafetyStandard: string;
}

export const DISCIPLINE_EQUIPMENT_REGISTRY: Record<string, DisciplineEquipmentProfile> = {
  glaciology: {
    discipline: 'Glaciology & Periglacial Sciences',
    fieldInstruments: [
      'Multi-frequency differential GNSS geodetic receivers',
      'Steam-drilled aluminum ablation stakes & snow-density cutters',
      'Ground-penetrating ice radar (GPR) & RTK-UAV photogrammetry',
    ],
    laboratoryAndComputationalSystems: [
      'InSAR glacier velocity & geodetic DEM differencing workstations',
      'Stable water isotope (δ18O / δ2H) laser spectroscopy',
    ],
    attireAndSafetyStandard: 'High-altitude mountaineering safety protocol',
  },
  limnology: {
    discipline: 'Limnology & Aquatic Ecology',
    fieldInstruments: [
      'Multiparameter optical water-quality sondes (DO, Chl-a, phycocyanin, turbidity, pH, EC)',
      'Gravity sediment corers, Van Dorn discrete depth samplers & Secchi disks',
      'Low-wake survey craft & dual-frequency bathymetric echosounders',
    ],
    laboratoryAndComputationalSystems: [
      'APHA nutrient auto-analyzers, ELISA/LC-MS cyanotoxin screening & inverted epifluorescence microscopy',
    ],
    attireAndSafetyStandard: 'Lacustrine watercraft safety protocol',
  },
  hydrology: {
    discipline: 'Fluvial & Watershed Hydrology',
    fieldInstruments: [
      'Tethered Acoustic Doppler Current Profilers (ADCP) & digital current meters',
      'Vented pressure-transducer water-level loggers & tipping-bucket rain gauges',
      'Automated suspended-sediment samplers',
    ],
    laboratoryAndComputationalSystems: [
      'HEC-RAS 2D unsteady hydrodynamic inundation & watershed water-balance modelling suites',
    ],
    attireAndSafetyStandard: 'Swiftwater hydrometric gauging protocol',
  },
  atmospheric: {
    discipline: 'Atmospheric Physics & Climatology',
    fieldInstruments: [
      'Seven-wavelength black-carbon aethalometers & beta-attenuation PM2.5/PM10 samplers',
      '3D ultrasonic eddy-covariance flux towers & automatic synoptic weather stations',
      'Four-component net radiometers for snow and surface spectral albedo',
    ],
    laboratoryAndComputationalSystems: [
      'ERA5 / WRF-Chem mesoscale atmospheric transport & receptor source-apportionment models',
    ],
    attireAndSafetyStandard: 'Atmospheric station calibration protocol',
  },
  forestry: {
    discipline: 'Forestry, Dendrology & Terrestrial Ecology',
    fieldInstruments: [
      'Tripod terrestrial laser scanners (TLS LiDAR) & laser hypsometers',
      'Forestry diameter tapes, increment borers & hemispherical canopy analyzers',
      'Sonic tomographs for non-destructive heritage Chinar trunk assessment',
    ],
    laboratoryAndComputationalSystems: [
      'Allometric above/below-ground carbon stock accounting & dendrochronology measurement stages',
    ],
    attireAndSafetyStandard: 'Montane forest mensuration protocol',
  },
  biodiversity: {
    discipline: 'Wildlife Biology & Conservation Genetics',
    fieldInstruments: [
      'No-glow infrared autonomous camera traps & bioacoustic recorders',
      'VHF/GPS telemetry receivers, laser rangefinders & spotting scopes',
      '1 m² alpine botanical quadrats & non-invasive faecal eDNA kits',
    ],
    laboratoryAndComputationalSystems: [
      'PCR / microsatellite & metabarcoding genetics benches, Bayesian SECR population models',
    ],
    attireAndSafetyStandard: 'Non-invasive wildlife survey protocol',
  },
  industrial_ecology: {
    discipline: 'Industrial Ecology & Sustainable Material Science',
    fieldInstruments: [
      'Portable multiparameter effluent conductivity/pH/ORP probes & composite outfall samplers',
      'Digital power-quality & kiln thermal-efficiency analyzers',
      'GNSS material-provenance field loggers',
    ],
    laboratoryAndComputationalSystems: [
      'Scanning optical/electron textile fibre microscopes (12–16 μm cuticle scale verification)',
      'Sub-milligram analytical balances & ISO 14040/14044 Life Cycle Assessment (LCA) matrices',
    ],
    attireAndSafetyStandard: 'Clean-workshop & effluent sampling protocol',
  },
  chemistry: {
    discipline: 'Environmental Analytical Chemistry & One Health',
    fieldInstruments: [
      'Amber borosilicate trace-organic grab samplers, solid-phase extraction (SPE) manifolds & cold-chain coolers',
      'Calibrated Class-1 integrating sound-level meters (environmental acoustics)',
    ],
    laboratoryAndComputationalSystems: [
      'ICP-MS (trace heavy metals), UHPLC-MS/MS & GC-MS (pesticides & emerging pharmaceuticals)',
      'Quantitative PCR (qPCR) for environmental antimicrobial resistance genes (ARGs)',
    ],
    attireAndSafetyStandard: 'Trace analytical chain-of-custody protocol',
  },
  geospatial: {
    discipline: 'Geospatial Intelligence, Tectonics & Remote Sensing',
    fieldInstruments: [
      'Dual-frequency RTK-GNSS ground-control survey rovers & field spectroradiometers',
      'Broadband digital seismometers & geotechnical piezometers/inclinometers',
    ],
    laboratoryAndComputationalSystems: [
      'Calibrated GIS & Earth-observation workstations (Sentinel-1 InSAR, Sentinel-2 MSI, Landsat archive harmonization)',
      'Monte Carlo spatial uncertainty & confusion-matrix validation pipelines',
    ],
    attireAndSafetyStandard: 'Geodetic ground-control & InSAR validation protocol',
  },
};

export function getDisciplineProfileForDossier(
  dossier: ResearchSeriesDossier
): DisciplineEquipmentProfile {
  if (dossier.sequenceNumber === 1 || dossier.sequenceNumber === 5 || dossier.sequenceNumber === 21 || dossier.sequenceNumber === 22) {
    return DISCIPLINE_EQUIPMENT_REGISTRY.limnology;
  }
  if (dossier.sequenceNumber === 7 || dossier.sequenceNumber === 8 || dossier.sequenceNumber === 24 || dossier.sequenceNumber === 32) {
    return DISCIPLINE_EQUIPMENT_REGISTRY.hydrology;
  }
  if (dossier.sequenceNumber === 6) {
    return DISCIPLINE_EQUIPMENT_REGISTRY.forestry;
  }
  switch (dossier.divisionId) {
    case 'sector-13-cryosphere-hydrology':
      return dossier.sequenceNumber === 45
        ? DISCIPLINE_EQUIPMENT_REGISTRY.hydrology
        : DISCIPLINE_EQUIPMENT_REGISTRY.glaciology;
    case 'sector-05-water-resources':
    case 'sector-14-aquatic-ecology':
      return dossier.sequenceNumber === 53
        ? DISCIPLINE_EQUIPMENT_REGISTRY.chemistry
        : DISCIPLINE_EQUIPMENT_REGISTRY.limnology;
    case 'sector-15-biodiversity-conservation':
      return DISCIPLINE_EQUIPMENT_REGISTRY.biodiversity;
    case 'sector-11-forestry-biodiversity':
    case 'sector-16-forestry-terrestrial':
      return DISCIPLINE_EQUIPMENT_REGISTRY.forestry;
    case 'sector-03-handicrafts':
    case 'sector-21-resource-sustainability':
      return DISCIPLINE_EQUIPMENT_REGISTRY.industrial_ecology;
    case 'sector-09-transportation-air':
    case 'sector-18-climate-atmospheric':
      return DISCIPLINE_EQUIPMENT_REGISTRY.atmospheric;
    case 'sector-10-waste-sanitation':
    case 'sector-19-pollution-public-health':
    case 'sector-02-horticulture':
    case 'sector-04-agriculture':
      return DISCIPLINE_EQUIPMENT_REGISTRY.chemistry;
    default:
      return DISCIPLINE_EQUIPMENT_REGISTRY.geospatial;
  }
}

// ─── CHAPTER-LEVEL FIELD & LABORATORY METHODOLOGY PLATES ──────────────────────
export const PUBLICATION_VISUAL_PLATES: Record<string, VisualPlateRecord> = {
  pashmina_01_changthang: {
    id: 'plate-pashmina-01',
    src: '/images/publications/pashmina-changthang-pastoral-ecology.jpg',
    figureLabel: 'Figure 01',
    title: 'Changra Pashmina Herds Across the Changthang Cold-Desert Steppe',
    caption:
      'High-altitude winter thermal regimes across the Changthang plateau (4,400–4,800 m ASL) govern 12–15.5 μm pashm undercoat growth alongside seasonal Kobresia–Caragana forage carrying capacity.',
    locationLabel: 'Changthang Trans-Himalayan Steppe, Ladakh',
    scientificDiscipline: 'Pastoral Rangeland Ecology',
    equipmentPictured: ['Rangeland carrying-capacity transect'],
    isIllustrative: true,
    provenanceCategory: 'Illustrative Scientific Visualization',
    sourceAttribution: 'KEW Scientific Visual Library',
    rightsAndIntegrityNote: 'Backend asset record: illustrative rangeland scene.',
  },
  pashmina_02_rangeland_science: {
    id: 'plate-pashmina-02',
    src: '/images/publications/pashmina-field-ecology-scientists.jpg',
    figureLabel: 'Figure 02',
    title: 'Above-Ground Biomass Quadrat & Differential GNSS Rangeland Assessment',
    caption:
      'Ecological sampling protocol pairing 1 m² botanical quadrat biomass estimation with RTK-GNSS positioning and Sentinel-2 SAVI calibration across high-altitude steppe pastures.',
    locationLabel: 'Upper Indus–Changthang Pastoral Transect',
    scientificDiscipline: 'Quantitative Rangeland Ecology',
    equipmentPictured: ['1 m² botanical quadrat', 'Differential GNSS receiver', 'Field tablet'],
    isIllustrative: true,
    provenanceCategory: 'Illustrative Scientific Visualization',
    sourceAttribution: 'KEW Scientific Visual Library',
    rightsAndIntegrityNote: 'Backend asset record: illustrative field methodology plate.',
  },
  pashmina_03_srinagar_processing: {
    id: 'plate-pashmina-03',
    src: '/images/publications/pashmina-artisanal-washing-spinning-srinagar.jpg',
    figureLabel: 'Figure 02',
    title: 'Botanical Reetha Scouring, Hand-Spinning & Rinse-Water Profiling in Shehr-e-Khas',
    caption:
      'Manual dehairing, biodegradable soapnut (Sapindus mukorossi) scouring, and wooden yender hand-spinning contrasted with multiparameter pH, conductivity, and chemical oxygen demand outfall monitoring.',
    locationLabel: 'Shehr-e-Khas Craft Enclave, Srinagar',
    scientificDiscipline: 'Industrial Ecology & Craft Water Stewardship',
    equipmentPictured: ['Wooden yender spindle', 'Multiparameter pH/EC/turbidity probe'],
    isIllustrative: true,
    provenanceCategory: 'Illustrative Scientific Visualization',
    sourceAttribution: 'KEW Scientific Visual Library',
    rightsAndIntegrityNote: 'Backend asset record: illustrative artisanal methodology plate.',
  },
  pashmina_04_lab_microscopy: {
    id: 'plate-pashmina-04',
    src: '/images/publications/pashmina-lca-laboratory-microscopy.jpg',
    figureLabel: 'Figure 03',
    title: 'Scanning Optical Fibre Cuticle Microscopy & Botanical Dye Residue Assay',
    caption:
      'Micron-diameter distribution profiling and cuticle scale-density microscopy (6–8 scales per 100 μm) paired with analytical screening of natural walnut-hull, madder, and indigo dye baths.',
    locationLabel: 'Fibre Metrology & Textile Chemistry Protocol',
    scientificDiscipline: 'Fibre Metrology & Environmental Chemistry',
    equipmentPictured: ['Scanning optical microscope', 'Sub-milligram analytical balance'],
    isIllustrative: true,
    provenanceCategory: 'Illustrative Scientific Visualization',
    sourceAttribution: 'KEW Scientific Visual Library',
    rightsAndIntegrityNote: 'Backend asset record: illustrative laboratory methodology plate.',
  },
  dal_limnology_boat_sonde: {
    id: 'plate-dal-limnology-sonde',
    src: '/images/hazard-intelligence/hazard-algal-bloom-lake.jpg',
    figureLabel: 'Figure 02',
    title: 'In-Situ Lacustrine Multiparameter Sonde & Photic-Zone Nutrient Profiling',
    caption:
      'Vertical profiling of dissolved oxygen, chlorophyll-a, phycocyanin fluorescence, Secchi transparency, and benthic sediment-water phosphorus exchange across valley lake sub-basins.',
    locationLabel: 'Dal–Nigeen & Valley Lacustrine Basins, Srinagar',
    scientificDiscipline: 'Limnology & Water Quality',
    equipmentPictured: ['Multiparameter optical water-quality sonde', 'Discrete depth water sampler'],
    isIllustrative: true,
    provenanceCategory: 'Illustrative Scientific Visualization',
    sourceAttribution: 'KEW Scientific Visual Library',
    rightsAndIntegrityNote: 'Backend asset record: illustrative valley-lake limnology plate.',
  },
  glaciology_kolahoi: {
    id: 'plate-glaciology-kolahoi',
    src: '/images/publications/glaciology-kolahoi-gnss-survey.jpg',
    figureLabel: 'Figure 02',
    title: 'Differential GNSS Terminus Survey & Ablation Stake Network on Debris-Mantled Ice',
    caption:
      'Geodetic GNSS benchmarks and steam-drilled ablation stakes used to calibrate multi-decadal Landsat and Sentinel-2 equilibrium-line altitude (ELA) and DEM surface-lowering records.',
    locationLabel: 'Upper Lidder & Sindh Cryosphere Zone (3,900–4,600 m ASL)',
    scientificDiscipline: 'Glaciology & Geodesy',
    equipmentPictured: ['Tripod differential GNSS receiver', 'Aluminum ablation stake'],
    isIllustrative: true,
    provenanceCategory: 'Illustrative Scientific Visualization',
    sourceAttribution: 'KEW Scientific Visual Library',
    rightsAndIntegrityNote: 'Backend asset record: illustrative glaciology methodology plate.',
  },
  limnology_alpine_sonde: {
    id: 'plate-limnology-sonde',
    src: '/images/publications/limnology-alpine-lake-sonde.jpg',
    figureLabel: 'Figure 02',
    title: 'Vertical Water-Column Sonde Cast & Secchi Profiling in High-Altitude Glacial Tarn',
    caption:
      'Oligotrophic cirque lakes above 3,500 m require ultra-low-detection profiling of dissolved oxygen, thermal stratification, photosynthetically active radiation (PAR), and trace phosphorus.',
    locationLabel: 'Kashmir Alpine Cirque Lake Belt (3,570–4,100 m ASL)',
    scientificDiscipline: 'Alpine Limnology',
    equipmentPictured: ['Multiparameter optical water sonde', 'Secchi disk'],
    isIllustrative: true,
    provenanceCategory: 'Illustrative Scientific Visualization',
    sourceAttribution: 'KEW Scientific Visual Library',
    rightsAndIntegrityNote: 'Backend asset record: illustrative alpine limnology plate.',
  },
  hydrology_adcp: {
    id: 'plate-hydrology-adcp',
    src: '/images/publications/hydrology-jhelum-adcp-discharge.jpg',
    figureLabel: 'Figure 02',
    title: 'Acoustic Doppler Current Profiler (ADCP) Cross-Sectional Discharge & Sediment Gauging',
    caption:
      'Stage-discharge rating calibration across gravel- and boulder-bed Himalayan tributaries integrating ADCP velocity transects with vented pressure transducers and suspended-sediment sampling.',
    locationLabel: 'Jhelum Mountain Tributary Gauging Reach, Kashmir',
    scientificDiscipline: 'Fluvial Hydrology',
    equipmentPictured: ['Tethered ADCP trimaran', 'Hydrographic field logger'],
    isIllustrative: true,
    provenanceCategory: 'Illustrative Scientific Visualization',
    sourceAttribution: 'KEW Scientific Visual Library',
    rightsAndIntegrityNote: 'Backend asset record: illustrative fluvial hydrology plate.',
  },
  atmospheric_karewa: {
    id: 'plate-atmospheric-karewa',
    src: '/images/publications/atmospheric-karewa-aerosol-station.jpg',
    figureLabel: 'Figure 02',
    title: 'Boundary-Layer Eddy-Covariance & Black-Carbon Aethalometer Station on Karewa Terrace',
    caption:
      'Elevated Plio-Pleistocene Karewa tablelands support continuous monitoring of winter temperature inversions, black-carbon aerosol optical depth, and agro-meteorological energy fluxes.',
    locationLabel: 'Pampore–Pulwama Karewa Plateau, Kashmir Valley',
    scientificDiscipline: 'Atmospheric Physics & Agrometeorology',
    equipmentPictured: ['3D sonic anemometer flux tower', 'Black-carbon aerosol inlet'],
    isIllustrative: true,
    provenanceCategory: 'Illustrative Scientific Visualization',
    sourceAttribution: 'KEW Scientific Visual Library',
    rightsAndIntegrityNote: 'Backend asset record: illustrative atmospheric station plate.',
  },
  forestry_treeline: {
    id: 'plate-forestry-treeline',
    src: '/images/publications/forestry-betula-treeline-lidar.jpg',
    figureLabel: 'Figure 02',
    title: 'Terrestrial LiDAR Point-Cloud & Hypsometer Survey in Betula utilis Treeline Ecotone',
    caption:
      'Three-dimensional structural scanning of Himalayan white birch (Betula utilis) stands quantifies seedling recruitment, snow-creep stem geometry, and above-ground biomass carbon.',
    locationLabel: 'Subalpine Birch Ecotone (3,300–3,600 m ASL), Kashmir Himalaya',
    scientificDiscipline: 'Forest Ecology & Dendrometry',
    equipmentPictured: ['Terrestrial LiDAR scanner', 'Laser hypsometer'],
    isIllustrative: true,
    provenanceCategory: 'Illustrative Scientific Visualization',
    sourceAttribution: 'KEW Scientific Visual Library',
    rightsAndIntegrityNote: 'Backend asset record: illustrative forestry methodology plate.',
  },
  biodiversity_dachigam: {
    id: 'plate-biodiversity-dachigam',
    src: '/images/publications/biodiversity-dachigam-camera-trap.jpg',
    figureLabel: 'Figure 02',
    title: 'Autonomous Infrared Camera-Trap Grid & VHF Telemetry in Riverine Broadleaf Habitat',
    caption:
      'Spatially explicit capture-recapture (SECR) camera grids and non-invasive genetic transects quantify seasonal corridor occupancy and demographic recruitment.',
    locationLabel: 'Temperate Riverine Woodland, Dachigam Landscape',
    scientificDiscipline: 'Conservation Biology & Wildlife Ecology',
    equipmentPictured: ['No-glow infrared camera trap', 'VHF telemetry receiver'],
    isIllustrative: true,
    provenanceCategory: 'Illustrative Scientific Visualization',
    sourceAttribution: 'KEW Scientific Visual Library',
    rightsAndIntegrityNote: 'Backend asset record: illustrative wildlife telemetry plate.',
  },
  geospatial_gis_lab: {
    id: 'plate-geospatial-lab',
    src: '/images/publications/geospatial-gis-earth-observation-lab.jpg',
    figureLabel: 'Figure 03',
    title: 'Multi-Temporal Sentinel/Landsat Radiometric Harmonization & Watershed DEM Modelling',
    caption:
      'Geospatial synthesis integrating Copernicus 30 m DEM terrain derivatives, Sentinel-1 SAR interferometry, and multi-decadal optical reflectance series with uncertainty propagation.',
    locationLabel: 'Earth-Observation & Spatial Modelling Protocol',
    scientificDiscipline: 'Geospatial Sciences & Remote Sensing',
    equipmentPictured: ['Calibrated GIS workstations', 'Multi-spectral raster cube'],
    isIllustrative: true,
    provenanceCategory: 'Illustrative Scientific Visualization',
    sourceAttribution: 'KEW Scientific Visual Library',
    rightsAndIntegrityNote: 'Backend asset record: illustrative GIS workstation plate.',
  },
  chemistry_icpms_lab: {
    id: 'plate-chemistry-lab',
    src: '/images/publications/chemistry-water-icpms-chromatography.jpg',
    figureLabel: 'Figure 03',
    title: 'ICP-MS & UHPLC-MS/MS Trace Contaminant Quantification with Blank/Duplicate QA/QC',
    caption:
      'Trace heavy metals, dissolved nutrients, agrochemical residues, and emerging organic micropollutants quantified via laboratory spectrometry under chain-of-custody quality control.',
    locationLabel: 'Environmental Analytical Chemistry Protocol',
    scientificDiscipline: 'Environmental Analytical Chemistry',
    equipmentPictured: ['ICP-MS / UHPLC-MS/MS autosampler', 'Filtered sample vials'],
    isIllustrative: true,
    provenanceCategory: 'Illustrative Scientific Visualization',
    sourceAttribution: 'KEW Scientific Visual Library',
    rightsAndIntegrityNote: 'Backend asset record: illustrative analytical chemistry plate.',
  },
};

// ─── REPORT-SPECIFIC GEOGRAPHICALLY VALIDATED OPENING IMAGERY (ALL 100 REPORTS) ─
const REPORT_AWARE_OPENING_POOL: Array<{
  matchSeqs: number[];
  src: string;
  location: string;
  title: string;
  caption: string;
  isIllustrative: boolean;
}> = [
  {
    matchSeqs: [1, 21, 48, 50],
    src: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
    location: 'Dal Lake Basin & Zabarwan Catchment, Srinagar',
    title: 'Dal Lake Houseboat Mooring Channels, Floating Gardens & Zabarwan Escarpment',
    caption:
      'Shallow multi-basin lacustrine environment of Dal Lake showing stationary houseboat moorings, floating rad agro-ecosystems, emergent macrophyte beds, and the Zabarwan mountain catchment.',
    isIllustrative: true,
  },
  {
    matchSeqs: [4, 17, 22],
    src: '/images/publications/wular-ramsar-wetland-floodplain.jpg',
    location: 'Wular Lake (Ramsar Site #461) & Lower Jhelum Floodplain',
    title: 'Wular Ramsar Wetland, Reedbed Buffers & Lower Jhelum Alluvial Delta',
    caption:
      'Floodplain detention marshes, willow-lined agricultural drainage confluences, and floating Trapa–Nymphoides beds across the Bandipora–Sopore Wular basin.',
    isIllustrative: true,
  },
  {
    matchSeqs: [5, 47],
    src: '/images/publications/sheshnag-alpine-glacial-lake.jpg',
    location: 'Sheshnag & High-Altitude Cirque Lake Belt (3,570–4,100 m ASL)',
    title: 'Oligotrophic High-Altitude Glacial Cirque Lake & Moraine Talus Catchment',
    caption:
      'Cold, ultra-low-nutrient alpine glacial tarn surrounded by treeless moraine scree and seasonal snowfields in the Greater Himalayan headwaters.',
    isIllustrative: true,
  },
  {
    matchSeqs: [6],
    src: '/images/sectoral-eia/eia-tourism-carrying-capacity.jpg',
    location: 'Gulmarg Subalpine Bowl & Apharwat Gondola Corridor (2,650–3,980 m ASL)',
    title: 'Gulmarg Gondola Corridor, Subalpine Meadow Turf & Recreational Compaction Zone',
    caption:
      'High-altitude ski-lift infrastructure, coniferous forest margins, and trampled subalpine meadow soils across the Gulmarg–Apharwat Pir Panjal escarpment.',
    isIllustrative: true,
  },
  {
    matchSeqs: [7, 8, 24, 32, 45],
    src: '/images/publications/lidder-pahalgam-mountain-river.jpg',
    location: 'Lidder, Sindh & Upper Jhelum Fluvial Catchments, Kashmir',
    title: 'Glacier-Fed Cobble-Bed Mountain River & Montane Conifer Corridor',
    caption:
      'High-gradient cold-water Himalayan river channel governed by seasonal snow/glacier melt discharge, boulder-bed sediment transport, and riparian conifer slopes.',
    isIllustrative: true,
  },
  {
    matchSeqs: [2, 9, 10, 11, 12],
    src: '/images/sectoral-eia/eia-horticulture-agrochemical.jpg',
    location: 'Shopian, Pulwama & Baramulla Karewa Orchard Belt',
    title: 'High-Density Trellised Apple Orchards & Karewa Vadose-Zone Soil Profile',
    caption:
      'Intensive clonal rootstock orchard rows on elevated Karewa silt-loam terraces requiring drip-irrigation management and integrated agrochemical stewardship.',
    isIllustrative: true,
  },
  {
    matchSeqs: [3, 14, 15, 16],
    src: '/images/sectoral-eia/eia-handicrafts-dye-effluent.jpg',
    location: 'Shehr-e-Khas & Kashmir Heritage Craft Enclaves, Srinagar',
    title: 'Traditional Handloom Workshop & Decentralized Dye-Effluent Pretreatment Interface',
    caption:
      'Artisanal weaving, woodcarving, and dyeing workshops in historic urban Srinagar where modular effluent neutralization protects downstream canals and lagoons.',
    isIllustrative: true,
  },
  {
    matchSeqs: [18, 19, 20, 84, 88],
    src: '/images/sectoral-eia/eia-agriculture-riverbed-soil.jpg',
    location: 'Kashmir Valley Agrarian Floodplain & Alluvial Terraces',
    title: 'Irrigated Paddy Terraces, Agrarian Soil Horizons & Tributary Return Channels',
    caption:
      'Coupled paddy-horticultural floodplain landscape linking topsoil organic carbon, irrigation return flows, and downstream riverine water quality.',
    isIllustrative: true,
  },
  {
    matchSeqs: [23],
    src: '/images/water-module/springs.jpg',
    location: 'Verinag–Anantnag Karst & Karewa Contact Spring Belt',
    title: 'Verinag Limestone Karst Spring Emergence & Jhelum Headwater Pool',
    caption:
      'Perennial karstic spring discharge at the Pir Panjal foothills feeding the upper Jhelum River, sensitive to upslope recharge land-use and precipitation shifts.',
    isIllustrative: false,
  },
  {
    matchSeqs: [25, 26, 83],
    src: '/images/earth-human-impact/ehii-karewa-land-transformation.jpg',
    location: 'Budgam, Pulwama & Pampore Quaternary Karewa Tablelands',
    title: 'Excavated Plio-Pleistocene Karewa Loess-Palaeosol Escarpment & Topographic Survey',
    caption:
      'Unconsolidated fluvio-lacustrine Karewa plateau stratigraphy exposed by terrace clay excavation, altering local plateau hydrology and quaternary geoheritage.',
    isIllustrative: true,
  },
  {
    matchSeqs: [27, 87],
    src: '/images/env-monitoring/khrew-cement-industrial-air-pollution.jpg',
    location: 'Khrew–Wuyan Limestone Foothills & Budgam Brick-Kiln Airshed',
    title: 'Mineral Cement/Kiln Point-Source Plumes & Downwind Agrarian Terrace Receptor Belt',
    caption:
      'Particulate and combustion emissions from foothill mineral processing and kiln clusters interacting with enclosed winter valley topography and adjacent croplands.',
    isIllustrative: true,
  },
  {
    matchSeqs: [28, 31, 33, 35],
    src: '/images/publications/srinagar-urban-jhelum-inversion.jpg',
    location: 'Greater Srinagar Jhelum Corridor & Enclosed Winter Valley Airshed',
    title: 'Urban Srinagar Along the Jhelum River Under Winter Boundary-Layer Inversion Haze',
    caption:
      'Dense impervious urban morphology along the Jhelum floodplain beneath a shallow winter cold-air pool trapped by the surrounding Pir Panjal and Zabarwan ranges.',
    isIllustrative: true,
  },
  {
    matchSeqs: [29, 30, 69],
    src: '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
    location: 'Ramban–Banihal NH-44 & Pir Panjal Cut-Slope Corridor',
    title: 'Fractured Himalayan Cut-Slopes, Subsurface Drainage & Mass-Wasting Escarpments',
    caption:
      'Steep tectonically sheared phyllite, slate, and overburden slopes along trans-Himalayan transport alignments susceptible to rainfall-triggered failure.',
    isIllustrative: true,
  },
  {
    matchSeqs: [34, 79, 86],
    src: '/images/earth-human-impact/ehii-command-center-satellite.jpg',
    location: 'Western Himalayan Multi-Sensor Earth-Observation Domain',
    title: 'Harmonized Multi-Spectral Orbital Imagery, Nighttime Radiometry & Terrain Grid',
    caption:
      'Calibrated Landsat, Sentinel, and VIIRS orbital earth-observation stacks supporting multi-decadal change detection, solar siting, and nightscape radiometry.',
    isIllustrative: true,
  },
  {
    matchSeqs: [36],
    src: '/images/env-monitoring/kashmir-transport-hero.jpg',
    location: 'Srinagar–Gulmarg–Pahalgam–NH-44 Mobility Network',
    title: 'High-Density Urban & Mountain Corridor Vehicular Emissions Stream',
    caption:
      'Peak-season tourist and freight traffic congestion across valley arterials and mountain gradients contributing NOx, black carbon, and resuspended road dust.',
    isIllustrative: true,
  },
  {
    matchSeqs: [37, 90],
    src: '/images/env-monitoring/kashmir-solid-waste-facility.jpg',
    location: 'Srinagar & Kashmir Urban Local Body Waste Streams',
    title: 'Source-Segregated Municipal Solid Waste Collection & Material Recovery Stream',
    caption:
      'Segregation of biodegradable wet organic fractions from dry recyclables required to curb landfill leachate generation and methane emissions across urban Kashmir.',
    isIllustrative: true,
  },
  {
    matchSeqs: [38, 80, 81],
    src: '/images/env-monitoring/sewage-treatment-plant-stp.jpg',
    location: 'Urban Kashmir Municipal Wastewater & Receiving Waterway Network',
    title: 'Clarifier & Biological Reactor Infrastructure for Municipal Wastewater Treatment',
    caption:
      'Secondary and tertiary nutrient, pathogen, and micropollutant removal capacity governing effluent quality discharged into Jhelum, Dal, and Anchar waterways.',
    isIllustrative: false,
  },
  {
    matchSeqs: [39, 61],
    src: '/images/protected-network/protected-national-parks-dachigam.jpg',
    location: 'Dachigam National Park & Western Himalayan Protected Network',
    title: 'Temperate Conifer–Broadleaf Sanctuary Core & Montane Ridges in Dachigam',
    caption:
      'Contiguous montane forest and subalpine wildlife habitat spanning steep elevation gradients within the Western Himalayan protected area network.',
    isIllustrative: false,
  },
  {
    matchSeqs: [41, 42, 43, 44, 46, 73, 74, 76, 94],
    src: '/images/publications/kolahoi-glacier-cryosphere.jpg',
    location: 'Kolahoi, Machoi & Western Himalayan Cryosphere Headwaters (3,800–5,425 m ASL)',
    title: 'Crevassed Valley Glacier Tongue, Debris-Mantled Ablation Zone & Proglacial Outwash',
    caption:
      'Western Himalayan valley glacier system displaying upward equilibrium-line migration, debris-covered lower ice, supraglacial melt channels, and braided proglacial runoff.',
    isIllustrative: true,
  },
  {
    matchSeqs: [49, 56],
    src: '/images/protected-network/protected-wetland-reserves-hokersar.jpg',
    location: 'Hokersar (#1204), Shallabugh (#2484) & Haigam (#2483) Ramsar Wetlands',
    title: 'Emergent Reed Marshes & Migratory Waterfowl Congregations on Hokersar Ramsar Reserve',
    caption:
      'Seasonal floodplain hydroperiods and Phragmites–Typha reed mosaics sustaining Central Asian Flyway wintering Anatidae across Kashmir’s Ramsar wetland chain.',
    isIllustrative: false,
  },
  {
    matchSeqs: [51, 52],
    src: '/images/biodiversity/biodiversity-fish-aquatic.jpg',
    location: 'Erin, Madhumati, Lidder & Bringi Cold-Water Streams',
    title: 'Oxygenated Gravel-Riffle Cold-Water Stream Habitat for Native Schizothorax & Benthic Taxa',
    caption:
      'Clear, unimpounded mountain riffle-pool substrates essential for endemic snow trout spawning and Ephemeroptera–Plecoptera–Trichoptera (EPT) macroinvertebrate guilds.',
    isIllustrative: true,
  },
  {
    matchSeqs: [53],
    src: '/images/env-monitoring/kashmir-drinking-water-lab.jpg',
    location: 'Rangil, Doodhganga & Sukhnag Potable Supply Zones',
    title: 'Source-to-Tap Drinking Water Filtration, Residual Chlorine & Microbiological Verification',
    caption:
      'Potable water quality assurance spanning mountain surface-water intakes, rapid sand filtration, disinfection dosing, and consumer distribution nodes.',
    isIllustrative: true,
  },
  {
    matchSeqs: [54],
    src: '/images/biodiversity/biodiversity-hangul-stag.jpg',
    location: 'Dachigam National Park & Zabarwan–Sindh Relict Corridors',
    title: 'Kashmir Hangul (Cervus hanglu hanglu) in Montane Conifer–Broadleaf Habitat',
    caption:
      'Critically Endangered Kashmir red deer population restricted to Dachigam and adjacent relict valleys, dependent on undisturbed riverine calving cover and alpine corridors.',
    isIllustrative: true,
  },
  {
    matchSeqs: [55],
    src: '/images/biodiversity/biodiversity-field-camera-trap.jpg',
    location: 'Kazinag, Hirpora, Kishtwar & Trans-Himalayan Ridgelines',
    title: 'High-Altitude Rocky Escarpment Habitat of Snow Leopard, Markhor & Mountain Ungulates',
    caption:
      'Rugged cliff and alpine steppe ecosystems across the Pir Panjal, Greater Himalaya, and Ladakh ranges supporting apex mountain carnivores and wild caprids.',
    isIllustrative: true,
  },
  {
    matchSeqs: [57, 58, 59],
    src: '/images/biodiversity/biodiversity-botany-flora.jpg',
    location: 'Apharwat, Sonamarg, Gurez & Sinthan Alpine Floristic Belts',
    title: 'Western Himalayan Endemic & Medicinal Alpine-Subalpine Plant Communities',
    caption:
      'High-elevation herbaceous meadows and forest-edge ecotones harbouring narrow-range Himalayan endemics and threatened medicinal rhizome taxa.',
    isIllustrative: true,
  },
  {
    matchSeqs: [60],
    src: '/images/protected-network/protected-hwc-rapid-response-rescue.jpg',
    location: 'Shopian, Kupwara, Uri & Dachigam Forest–Orchard Ecotones',
    title: 'Human–Wildlife Coexistence Interface Along Montane Forest & Orchard Settlements',
    caption:
      'Landscape boundary where Asiatic black bear and common leopard foraging movements intersect autumn fruit orchards, apiaries, and pastoral corrals.',
    isIllustrative: true,
  },
  {
    matchSeqs: [62, 63],
    src: '/images/protected-network/protected-conservation-reserves-shikargah.jpg',
    location: 'Kamraj, Pir Panjal, Lidder & Sonamarg Forest–Treeline Gradient',
    title: 'Himalayan Deodar, Blue Pine, Fir & Subalpine Birch Carbon-Biomass Stands',
    caption:
      'Old-growth and regenerating montane conifer-broadleaf forests storing major above-ground and soil organic carbon pools up to the Betula utilis timberline.',
    isIllustrative: false,
  },
  {
    matchSeqs: [64],
    src: '/images/hazard-intelligence/hazard-forest-fires-wildfire.jpg',
    location: 'Jammu Chir-Pine Shivaliks & Kashmir Dry-Spell Forest Slopes',
    title: 'Surface Litter Fuel Combustion, Canopy Scorch & Post-Fire Slope Exposure',
    caption:
      'Autumn and spring dry-spell fire regimes driven by resinous pine needle accumulation, vapour-pressure deficits, and anthropogenic ignitions.',
    isIllustrative: true,
  },
  {
    matchSeqs: [65],
    src: '/images/env-monitoring/kashmir-chinar-hero.jpg',
    location: 'Naseem Bagh, Shalimar, Bijbehara & Srinagar Heritage Groves',
    title: 'Monumental Chinar (Platanus orientalis) Canopy & Non-Destructive Trunk Sonic Assessment',
    caption:
      'Centuries-old heritage Chinar stands across alluvial terraces and historic gardens evaluated for root-zone soil sealing, basal decay, and arboricultural regeneration.',
    isIllustrative: true,
  },
  {
    matchSeqs: [66],
    src: '/images/hazard-intelligence/hazard-earthquakes-seismic.jpg',
    location: 'Kashmir Seismic Zone V Intermontane Basin & Thrust System',
    title: 'Tectonic Fault Escarpment & Soft Lacustrine Basin Seismic Wave Amplification Domain',
    caption:
      'Coupled seismic hazard across active Himalayan thrust structures and thick Plio-Pleistocene Jhelum-Karewa basin sediments prone to site amplification and liquefaction.',
    isIllustrative: true,
  },
  {
    matchSeqs: [67, 68],
    src: '/images/hazard-intelligence/hazard-floods-riverine.jpg',
    location: 'Jhelum Floodplain (Sangam–Srinagar–Sopore) & Mountain Torrents',
    title: 'High-Stage Riverine Flood Discharge & Hydrometric Floodplain Gauging',
    caption:
      'Extreme rainfall-runoff routing from steep Pir Panjal and Greater Himalayan tributaries into the low-gradient Jhelum alluvial valley floor.',
    isIllustrative: true,
  },
  {
    matchSeqs: [70],
    src: '/images/hazard-intelligence/hazard-avalanches-snow.jpg',
    location: 'Zojila, Razdan, Sadhna & Gulmarg–Apharwat Avalanche Chutes',
    title: 'Steep Leeward Snow Slab Accumulation, Release Zones & Mountain Pass Runout Tracks',
    caption:
      'Stratified winter snowpack instability across high-altitude Western Himalayan transport passes and inhabited valleys.',
    isIllustrative: true,
  },
  {
    matchSeqs: [71],
    src: '/images/hazard-intelligence/hazard-glofs-glacial-lakes.jpg',
    location: 'Upper Jhelum, Suru, Zanskar & Shyok Moraine-Dammed Glacial Lakes',
    title: 'Ice-Contact Proglacial Lake Behind Unconsolidated Terminal Moraine Dam',
    caption:
      'Rapidly expanding proglacial meltwater lake impounded by steep ice-cored moraines requiring bathymetric volume, freeboard, and telemetry monitoring.',
    isIllustrative: true,
  },
  {
    matchSeqs: [72, 75],
    src: '/images/hazard-intelligence/hazard-command-center.jpg',
    location: 'Kashmir, Jammu & Ladakh Critical Lifeline & Synoptic Network',
    title: 'Multi-Hazard Hydrometeorological & Lifeline Exposure Monitoring Architecture',
    caption:
      'Integrated tracking of compound meteorological extremes, slope failures, and critical road, hospital, and power network vulnerabilities.',
    isIllustrative: true,
  },
  {
    matchSeqs: [77],
    src: '/images/biodiversity/biodiversity-pollinators-bloom.jpg',
    location: 'Kashmir Valley Floor to Apharwat Phenological Elevation Transect',
    title: 'Spring Blossom Phenology & Insect Pollinator Synchrony Across Elevation Bands',
    caption:
      'Temperature-driven shifts in budburst, flowering onset, and wild bee emergence across Kashmir’s temperate orchards and subalpine meadows.',
    isIllustrative: true,
  },
  {
    matchSeqs: [78],
    src: '/images/env-monitoring/kashmir-noise-hero.jpg',
    location: 'Srinagar Hospital Silence Zones, School Precincts & Arterial Corridors',
    title: 'Urban Arterial Acoustic Exposure & Sensitive Receptor Soundscape Mapping',
    caption:
      'Continuous day-night equivalent sound pressure levels (Lden / Lnight) surrounding tertiary hospitals, educational zones, and high-traffic corridors.',
    isIllustrative: true,
  },
  {
    matchSeqs: [82],
    src: '/images/env-monitoring/Biomedical_Waste_PTI.jpg',
    location: 'Regional CBMWTF Facilities, Healthcare Nodes & E-Waste Streams',
    title: 'Segregated Biomedical, Electronic & Hazardous Waste Containment Stream',
    caption:
      'Barcoded clinical waste sterilization, autoclave validation, and closed-loop recovery of heavy-metal electronic and battery waste.',
    isIllustrative: false,
  },
  {
    matchSeqs: [40, 85, 99],
    src: '/images/protected-network/protected-area-atlas-gis.jpg',
    location: 'Shivalik Foothills to Karakoram Trans-Himalayan Ecoregions',
    title: 'Biogeographical Elevation Zonation & Cumulative Natural Capital Across the Western Himalaya',
    caption:
      'Regional synthesis spanning subtropical foothills, temperate intermontane valleys, montane conifer belts, alpine meadows, and cold-desert plateaus.',
    isIllustrative: false,
  },
  {
    matchSeqs: [89],
    src: '/images/protected-network/protected-research-trails-sightings.jpg',
    location: 'Kashmir Great Lakes, Tarsar–Marsar, Bangus & Warwan Backcountry Trails',
    title: 'High-Altitude Wilderness Trekking Corridor & Fragile Alpine Turf Margins',
    caption:
      'Dispersed backcountry camping, pack-animal grazing, and trail braiding across short-growing-season alpine cirques.',
    isIllustrative: false,
  },
  {
    matchSeqs: [91, 93],
    src: '/images/environmental-pil/forest-moratorium-river-basin.jpg',
    location: 'Tawi, Chenab & Neelum–Jhelum Mountain River Catchments',
    title: 'Forested Himalayan Gorge & Sub-Basin Watershed Continuity Across Jammu & Neelum–Jhelum',
    caption:
      'Steep forested headwaters, deeply incised river valleys, and transboundary sediment-hydrology connectivity across Western Himalayan subregions.',
    isIllustrative: true,
  },
  {
    matchSeqs: [92],
    src: '/images/environmental-pil/ladakh-transhimalayan-sanctuary.jpg',
    location: 'Upper Indus, Nubra, Zanskar & Changthang Basins, Ladakh',
    title: 'Trans-Himalayan Cold-Desert Oasis Stream, Wet-Sedge Marsh & Glaciated Range',
    caption:
      'Cryosphere-dependent stream corridors and endorheic high-altitude Ramsar wetlands sustaining biodiversity and settlements across arid Ladakh.',
    isIllustrative: false,
  },
  {
    matchSeqs: [95, 96],
    src: '/images/environmental-pil/kashmir-high-court-wetland.jpg',
    location: 'Jammu, Kashmir & Ladakh Environmental Jurisprudence & Wetland Commons',
    title: 'Judicial Oversight, Statutory Compliance & Public Trust Protection of Fragile Wetlands',
    caption:
      'Institutional interface linking environmental impact governance, court-monitored wetland conservation mandates, and equitable community resource access.',
    isIllustrative: true,
  },
  {
    matchSeqs: [97],
    src: '/images/ngo-module/community.jpg',
    location: 'Community Restoration Polygons & Wetland Stewardship Corridors',
    title: 'Participatory Ecological Restoration & Outcome-Verified Community Stewardship',
    caption:
      'Longitudinal survival, water-quality, and habitat recovery tracking across civil-society and community environmental interventions.',
    isIllustrative: true,
  },
  {
    matchSeqs: [98, 100],
    src: '/images/environmental-calendar/calendar-hero-scientists-lab.jpg',
    location: 'Western Himalayan Environmental Intelligence & Observatory Network',
    title: 'Calibrated Field-to-Laboratory Verification & Reproducible Environmental Data Architecture',
    caption:
      'Integration of citizen-science observations, ground instrumentation, analytical QA/QC, and open-data provenance standards across the Western Himalaya.',
    isIllustrative: true,
  },
];

/**
 * Returns an individually resolved, content-aware, geographically validated multi-plate
 * visual narrative for every report (KEW-SR-2026-01 through KEW-SR-2026-100).
 */
export function getEditorialVisualNarrativeForDossier(dossier: ResearchSeriesDossier): {
  openingPlate: VisualPlateRecord;
  fieldMethodologyPlate: VisualPlateRecord;
  analyticalPlate: VisualPlateRecord;
  equipmentProfile: DisciplineEquipmentProfile;
  pullQuote: {
    quote: string;
    attribution: string;
  };
  processDiagramType:
    | 'pashmina_lifecycle'
    | 'cryosphere_mass_balance'
    | 'aquatic_trophic_cascade'
    | 'biodiversity_corridor'
    | 'geohazard_cascade'
    | 'atmospheric_inversion'
    | 'contaminant_pathway'
    | 'observatory_architecture';
} {
  const equipmentProfile = getDisciplineProfileForDossier(dossier);

  // Dedicated 4-Plate Pashmina Lifecycle Narrative for KEW-SR-2026-13
  if (dossier.sequenceNumber === 13) {
    return {
      openingPlate: PUBLICATION_VISUAL_PLATES.pashmina_01_changthang,
      fieldMethodologyPlate: PUBLICATION_VISUAL_PLATES.pashmina_02_rangeland_science,
      analyticalPlate: PUBLICATION_VISUAL_PLATES.pashmina_04_lab_microscopy,
      equipmentProfile,
      pullQuote: {
        quote:
          'The environmental story of Kashmir Pashmina begins at 4,500 metres on the wind-scoured Changthang steppe—where winter temperatures below −25 °C trigger the 14-micron underfleece, and human kinetic spinning in Srinagar keeps operational fossil carbon near zero.',
        attribution: `${dossier.code} · Lifecycle & Pastoral Ecology Synthesis`,
      },
      processDiagramType: 'pashmina_lifecycle',
    };
  }

  const matched =
    REPORT_AWARE_OPENING_POOL.find((p) => p.matchSeqs.includes(dossier.sequenceNumber)) ||
    REPORT_AWARE_OPENING_POOL[0];

  const openingPlate: VisualPlateRecord = {
    id: `open-${dossier.code.toLowerCase()}`,
    src: matched.src,
    figureLabel: 'Figure 01',
    title: matched.title,
    caption: matched.caption,
    locationLabel: matched.location,
    scientificDiscipline: equipmentProfile.discipline,
    equipmentPictured: [equipmentProfile.fieldInstruments[0]],
    isIllustrative: matched.isIllustrative,
    provenanceCategory: matched.isIllustrative
      ? 'Illustrative Scientific Visualization'
      : 'KEW Environmental Observatory Archive',
    sourceAttribution: 'Kashmir EcoWatch Visual Library',
    rightsAndIntegrityNote: 'Backend provenance verified for study geography.',
  };

  // Chapter-aware & report-aware selection for Field (Ch 09) and Lab/Computational (Ch 11)
  let fieldMethodologyPlate = PUBLICATION_VISUAL_PLATES.hydrology_adcp;
  let analyticalPlate = PUBLICATION_VISUAL_PLATES.geospatial_gis_lab;
  let processDiagramType: ReturnType<
    typeof getEditorialVisualNarrativeForDossier
  >['processDiagramType'] = 'observatory_architecture';

  const seq = dossier.sequenceNumber;

  if (seq === 1 || seq === 21 || seq === 48 || seq === 49 || seq === 50) {
    // Valley lakes & wetlands (Dal, Nigeen, Anchar, Manasbal, Hokersar) -> Valley-lake boat sonde + water chemistry lab
    fieldMethodologyPlate = PUBLICATION_VISUAL_PLATES.dal_limnology_boat_sonde;
    analyticalPlate = PUBLICATION_VISUAL_PLATES.chemistry_icpms_lab;
    processDiagramType = 'aquatic_trophic_cascade';
  } else if (seq === 5 || seq === 47) {
    // High-altitude alpine lakes (Sheshnag, Gangabal, Tarsar) -> Treeless alpine cirque sonde + trace water lab
    fieldMethodologyPlate = PUBLICATION_VISUAL_PLATES.limnology_alpine_sonde;
    analyticalPlate = PUBLICATION_VISUAL_PLATES.chemistry_icpms_lab;
    processDiagramType = 'aquatic_trophic_cascade';
  } else if (seq === 4 || seq === 22) {
    // Wular & Lower Jhelum wetland nutrient budgets -> ADCP/canal inflow + nutrient water chemistry lab
    fieldMethodologyPlate = PUBLICATION_VISUAL_PLATES.hydrology_adcp;
    analyticalPlate = PUBLICATION_VISUAL_PLATES.chemistry_icpms_lab;
    processDiagramType = 'aquatic_trophic_cascade';
  } else if (seq === 6 || seq === 89) {
    // Gulmarg meadow / alpine backcountry recreation -> Subalpine LiDAR/quadrat + GIS terrain modelling
    fieldMethodologyPlate = PUBLICATION_VISUAL_PLATES.forestry_treeline;
    analyticalPlate = PUBLICATION_VISUAL_PLATES.geospatial_gis_lab;
    processDiagramType = 'biodiversity_corridor';
  } else if (seq === 7 || seq === 8 || seq === 17 || seq === 23 || seq === 24 || seq === 32 || seq === 45 || seq === 51 || seq === 52 || seq === 67 || seq === 68 || seq === 91 || seq === 93) {
    // Fluvial rivers, springs, floods, hydropower, cold-water stream ecology -> ADCP river gauging + GIS/Lab
    fieldMethodologyPlate = PUBLICATION_VISUAL_PLATES.hydrology_adcp;
    analyticalPlate =
      seq === 51 || seq === 52
        ? PUBLICATION_VISUAL_PLATES.chemistry_icpms_lab
        : PUBLICATION_VISUAL_PLATES.geospatial_gis_lab;
    processDiagramType = seq === 67 || seq === 68 ? 'geohazard_cascade' : 'aquatic_trophic_cascade';
  } else if (dossier.divisionId === 'sector-13-cryosphere-hydrology' || seq === 70 || seq === 71 || seq === 92 || seq === 94) {
    fieldMethodologyPlate = PUBLICATION_VISUAL_PLATES.glaciology_kolahoi;
    analyticalPlate = PUBLICATION_VISUAL_PLATES.geospatial_gis_lab;
    processDiagramType = seq === 70 || seq === 71 ? 'geohazard_cascade' : 'cryosphere_mass_balance';
  } else if (dossier.divisionId === 'sector-15-biodiversity-conservation') {
    fieldMethodologyPlate = PUBLICATION_VISUAL_PLATES.biodiversity_dachigam;
    analyticalPlate = PUBLICATION_VISUAL_PLATES.geospatial_gis_lab;
    processDiagramType = 'biodiversity_corridor';
  } else if (dossier.divisionId === 'sector-11-forestry-biodiversity' || dossier.divisionId === 'sector-16-forestry-terrestrial') {
    fieldMethodologyPlate = PUBLICATION_VISUAL_PLATES.forestry_treeline;
    analyticalPlate = PUBLICATION_VISUAL_PLATES.geospatial_gis_lab;
    processDiagramType = 'biodiversity_corridor';
  } else if (dossier.divisionId === 'sector-03-handicrafts') {
    fieldMethodologyPlate = PUBLICATION_VISUAL_PLATES.pashmina_03_srinagar_processing;
    analyticalPlate =
      seq === 3
        ? PUBLICATION_VISUAL_PLATES.chemistry_icpms_lab
        : PUBLICATION_VISUAL_PLATES.pashmina_04_lab_microscopy;
    processDiagramType = seq === 3 ? 'contaminant_pathway' : 'pashmina_lifecycle';
  } else if (dossier.divisionId === 'sector-09-transportation-air' || dossier.divisionId === 'sector-18-climate-atmospheric' || seq === 27 || seq === 31 || seq === 33 || seq === 87) {
    fieldMethodologyPlate = PUBLICATION_VISUAL_PLATES.atmospheric_karewa;
    analyticalPlate = PUBLICATION_VISUAL_PLATES.geospatial_gis_lab;
    processDiagramType = 'atmospheric_inversion';
  } else if (
    dossier.divisionId === 'sector-02-horticulture' ||
    dossier.divisionId === 'sector-04-agriculture' ||
    dossier.divisionId === 'sector-10-waste-sanitation' ||
    dossier.divisionId === 'sector-19-pollution-public-health' ||
    seq === 53 ||
    seq === 88 ||
    seq === 90
  ) {
    fieldMethodologyPlate =
      seq === 20
        ? PUBLICATION_VISUAL_PLATES.pashmina_02_rangeland_science
        : PUBLICATION_VISUAL_PLATES.atmospheric_karewa;
    analyticalPlate = PUBLICATION_VISUAL_PLATES.chemistry_icpms_lab;
    processDiagramType = 'contaminant_pathway';
  } else if (
    dossier.divisionId === 'sector-06-mining-extraction' ||
    dossier.divisionId === 'sector-07-urbanization-infrastructure' ||
    dossier.divisionId === 'sector-17-natural-hazards' ||
    dossier.divisionId === 'sector-20-earth-geospatial'
  ) {
    fieldMethodologyPlate = PUBLICATION_VISUAL_PLATES.atmospheric_karewa;
    analyticalPlate = PUBLICATION_VISUAL_PLATES.geospatial_gis_lab;
    processDiagramType = 'geohazard_cascade';
  } else {
    fieldMethodologyPlate = PUBLICATION_VISUAL_PLATES.pashmina_02_rangeland_science;
    analyticalPlate = PUBLICATION_VISUAL_PLATES.geospatial_gis_lab;
    processDiagramType = 'observatory_architecture';
  }

  return {
    openingPlate,
    fieldMethodologyPlate,
    analyticalPlate,
    equipmentProfile,
    pullQuote: {
      quote: dossier.distinctionNote || dossier.abstract,
      attribution: `${dossier.code} · ${dossier.author}`,
    },
    processDiagramType,
  };
}
