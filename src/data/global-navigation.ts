/**
 * KASHMIR ECOWATCH — CANONICAL 14-MODULE GLOBAL NAVIGATION CONFIGURATION
 * Single source of truth shared across Desktop, Tablet, Mobile Drawer & Navigation components.
 * Do not duplicate this configuration in individual UI components.
 */

import { getKewToDispatchUrl } from '@/lib/himalayan-dispatch-routes';

export interface GlobalNavItem {
  order: number;
  label: string;
  href: string;
  subtitle?: string;
  hasDropdown: boolean;
}

export interface GlobalDropdownItem {
  name: string;
  href: string;
  desc?: string;
  isHeader?: boolean;
  groupId?: string;
  parentGroup?: string;
}

export const GLOBAL_NAV_ITEMS: GlobalNavItem[] = [
  { order: 1,  label: 'Protected Areas',          href: '/protected-network',            hasDropdown: true },
  { order: 2,  label: 'Biodiversity',             href: '/biodiversity',                 hasDropdown: true },
  { order: 3,  label: 'Water Systems',            href: '/water-systems',                hasDropdown: true },
  { order: 4,  label: 'Environmental Monitoring', href: '/environmental-monitoring',     hasDropdown: true },
  { order: 5,  label: 'Hazard Intelligence',      href: '/hazard-intelligence',          hasDropdown: true },
  { order: 6,  label: 'Earth & Human Impact',     href: '/earth-human-impact',           hasDropdown: true },
  { order: 7,  label: 'Sectoral EIA',             href: '/sectoral-eia',                 hasDropdown: true },
  { order: 8,  label: 'Investigations',           href: '/environmental-investigations', hasDropdown: true },
  { order: 9,  label: 'Himalayan Dispatch',       href: getKewToDispatchUrl('/'),           subtitle: 'Environmental Journalism & Magazine', hasDropdown: true },
  { order: 10, label: 'NGO Impact',               href: '/ngo-impact',                   hasDropdown: false },
  { order: 11, label: 'EcoVoices',                href: '/ecovoices',                    subtitle: 'Environmental Arts & Creative Expression', hasDropdown: true },
  { order: 12, label: 'Student Action Hub',       href: '/environmental-calendar',       subtitle: 'Environmental Awareness, Education, Participation & Action', hasDropdown: true },
  { order: 13, label: 'Webinars & Conferences',   href: '/webinars',                     subtitle: 'Scientific Exchange & Knowledge Sharing', hasDropdown: true },
  { order: 14, label: 'About',                    href: '/about',                        hasDropdown: true },
];

export function getGlobalDropdownItems(label: string): GlobalDropdownItem[] {
  switch (label) {
    case 'Protected Areas':
      return [
        { name: '🗺️ Network Overview', href: '/protected-network', desc: 'Complete protected area system' },
        { name: '📍 Protected Area Atlas', href: '/protected-network/atlas', desc: 'Interactive GIS mapping' },
        { name: '── Protected Areas ──', href: '#', desc: '', isHeader: true },
        { name: 'National Parks', href: '/protected-network/national-parks', desc: 'Core conservation landscapes' },
        { name: 'Wildlife Sanctuaries', href: '/protected-network/wildlife-sanctuaries', desc: 'Protected habitats' },
        { name: 'Wetland Reserves', href: '/protected-network/wetland-reserves', desc: 'Marsh & bird conservation' },
        { name: 'Conservation Reserves', href: '/protected-network/conservation-reserves', desc: 'Community landscapes' },
        { name: 'Bird & Habitat Areas', href: '/protected-network/bird-and-habitat-areas', desc: 'Important bird areas' },
        { name: '── Ecological Intelligence ──', href: '#', desc: '', isHeader: true },
        { name: 'Species Intelligence Network', href: '/protected-network/species-intelligence', desc: 'Biological intelligence layer' },
        { name: 'Corridors and Connectivity', href: '/protected-network/corridors-and-connectivity', desc: 'Landscape linkages' },
        { name: 'Monitoring and Threat Intelligence', href: '/protected-network/monitoring-and-threats', desc: 'Conservation alerts' },
        { name: 'Human–Wildlife Conflict', href: '/protected-network/human-wildlife-conflict', desc: 'Community safety, conflict patterns & coexistence' },
        { name: 'Research and Assessments', href: '/protected-network/reports-and-plans', desc: 'Scientific publications' },
        { name: 'Trails & Sightings', href: '/protected-network/trails-and-sightings', desc: 'Field observations' },
      ];

    case 'Biodiversity':
      return [
        { name: '📊 Overview', href: '/biodiversity/overview', desc: 'Module command center' },
        { name: '📊 Dashboards', href: '/biodiversity/dashboards', desc: 'Analytics & trends' },
        { name: '── Species ──', href: '#', desc: '', isHeader: true },
        { name: 'Species Directory', href: '/biodiversity', desc: 'Browse complete database' },
        { name: 'Mammals', href: '/biodiversity/mammals', desc: 'Ungulates, carnivores & more' },
        { name: 'Birds', href: '/biodiversity/birds', desc: 'Resident & migratory species' },
        { name: 'Fish & Aquatic Life', href: '/biodiversity/fish', desc: 'Freshwater & aquatic biodiversity' },
        { name: 'Plants & Flora', href: '/biodiversity/plants', desc: 'Vascular plants & vegetation' },
        { name: 'Medicinal Flora', href: '/biodiversity/medicinal-plants', desc: 'Traditional medicinal plants' },
        { name: 'Priority & Threatened Species', href: '/biodiversity/threatened-species', desc: 'CR, EN, VU conservation taxa' },
        { name: '── Observation & Ecology ──', href: '#', desc: '', isHeader: true },
        { name: 'Wildlife Sightings', href: '/biodiversity/wildlife-sightings', desc: 'Verified & community observations' },
        { name: 'Birding & Observation Hotspots', href: '/biodiversity/birding-hotspots', desc: 'Prime observation areas' },
        { name: 'Forest Ecosystems', href: '/biodiversity/forest-ecosystems', desc: '10-module habitat intelligence layer' },
        { name: '── Seasonal Ecology & Phenology ──', href: '#', desc: '', isHeader: true },
        { name: 'Seasonal Landscapes', href: '/seasonal-ecology/seasonal-landscapes', desc: 'Landscape-scale seasonal patterns' },
        { name: 'Bloom Mapping', href: '/seasonal-ecology/bloom-mapping', desc: 'Bloom zones and flowering landscapes' },
        { name: 'Migration Windows', href: '/seasonal-ecology/migration-windows', desc: 'Migration timing & wetland bird windows' },
        { name: 'Pollinator Activity', href: '/seasonal-ecology/pollinator-windows', desc: 'Pollinator activity timing across Kashmir' },
        { name: 'Phenology & Flowering Records', href: '/seasonal-ecology/phenology-records', desc: 'Flowering & observation-based records' },
        { name: 'Seasonal Habitat Signals', href: '/seasonal-ecology/habitat-signals', desc: 'Seasonal habitat changes & transitions' },
        { name: 'Water & Wetland Transitions', href: '/seasonal-ecology/water-transitions', desc: 'Seasonal water & wetland transitions' },
        { name: 'Seasonal Species Activity', href: '/seasonal-ecology/species-activity', desc: 'Seasonal species activity patterns' },
        { name: 'Climate & Visibility Windows', href: '/seasonal-ecology/climate-windows', desc: 'Climate-linked visibility & access' },
        { name: 'Seasonal Reports & References', href: '/seasonal-ecology/reports-references', desc: 'Kashmir seasonal research & evidence' },
        { name: '── Intelligence ──', href: '#', desc: '', isHeader: true },
        { name: 'District Biodiversity Profiles', href: '/biodiversity/district-profiles', desc: 'Regional intelligence' },
      ];

    case 'Water Systems':
      return [
        { name: '💧 Overview', href: '/water-systems', desc: 'Complete hydrological intelligence' },
        { name: 'Dashboards', href: '/water-systems/dashboards', desc: 'Analytics, trends & heatmaps' },
        { name: 'Lakes', href: '/water-systems/lakes', desc: 'Major, minor, urban & high-altitude lakes' },
        { name: 'Wetlands', href: '/water-systems/wetlands', desc: 'Marshes, floodplain & Ramsar wetlands' },
        { name: 'Rivers & Streams', href: '/water-systems/rivers', desc: 'Major rivers, tributaries & streams' },
        { name: 'Springs', href: '/water-systems/springs', desc: 'Perennial, seasonal & community springs' },
        { name: 'Watersheds', href: '/water-systems/watersheds', desc: 'Basins, catchments & hydrological units' },
        { name: 'Groundwater', href: '/water-systems/groundwater', desc: 'Aquifers, water levels & validation queues' },
        { name: 'Glaciers & Cryosphere', href: '/water-systems/glaciers', desc: 'Glaciers & snow-fed systems' },
        { name: 'Drinking Water Sources', href: '/water-systems/drinking-water-sources', desc: 'Spring & surface supply vulnerability' },
        { name: 'Water Quality', href: '/water-systems/water-quality', desc: 'Quality monitoring & trends' },
        { name: 'Aquatic Life & Fisheries', href: '/water-systems/fisheries', desc: 'Fish species & fishery management' },
        { name: 'Restoration & Rejuvenation', href: '/water-systems/restoration', desc: 'Conservation & restoration projects' },
        { name: 'Flood & Hydrological Risk', href: '/water-systems/flood-risk', desc: 'Flood zones & hazard assessment' },
      ];

    case 'Environmental Monitoring':
      return [
        { name: '🏗️ Overview', href: '/environmental-monitoring', desc: 'Environmental intelligence command center' },
        { name: 'Dashboards', href: '/environmental-monitoring/dashboards', desc: 'District comparison & stress heatmaps' },
        { name: 'Solid Waste', href: '/environmental-monitoring/solid-waste', desc: 'Dumping, landfill stress, open waste' },
        { name: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution', desc: 'Plastic waste, recycling & contamination' },
        { name: 'Bio-Waste', href: '/environmental-monitoring/bio-waste', desc: 'Organic waste, decomposition zones' },
        { name: 'Sewage & Wastewater', href: '/environmental-monitoring/sewage-wastewater', desc: 'Overflow, outfalls, untreated discharge' },
        { name: 'Drinking Water', href: '/environmental-monitoring/drinking-water', desc: 'Contamination alerts, supply issues' },
        { name: 'Critical Infrastructure', href: '/environmental-monitoring/critical-infrastructure', desc: 'Reservoirs, utilities, waste assets' },
        { name: 'Air Pollution', href: '/environmental-monitoring/air-pollution', desc: 'AQI, particulate, smoke, burning' },
        { name: 'Transportation Pollution', href: '/environmental-monitoring/transportation-pollution', desc: 'Vehicle emissions, traffic & noise' },
        { name: 'Noise Pollution', href: '/environmental-monitoring/noise-pollution', desc: 'Sound levels, hotspots & exposure' },
        { name: 'Environmental Health Signals', href: '/environmental-monitoring/environmental-health', desc: 'Odor, fish kill, stagnant water' },
        { name: 'Environmental Resilience', href: '/environmental-monitoring/environmental-resilience', desc: 'Resilience, recovery & stress capacity' },
        { name: 'Chinar Monitoring', href: '/environmental-monitoring/chinar-monitoring', desc: 'Tree health, GIS & conservation' },
        { name: 'SDG Monitoring', href: '/environmental-monitoring/sdg-monitoring', desc: 'Environmental UN SDG performance tracking' },
      ];

    case 'Hazard Intelligence':
      return [
        { name: '⚠️ Overview', href: '/hazard-intelligence', desc: 'Multi-hazard intelligence command center' },
        { name: '📊 Dashboards', href: '/hazard-intelligence/dashboards', desc: 'Risk dashboards, heatmaps & trends' },
        { name: '── Atmospheric Systems ──', href: '#', desc: '', isHeader: true, groupId: 'atmospheric' },
        { name: 'Western Disturbances', href: '/hazard-intelligence/atmospheric-systems/western-disturbances', desc: 'WD tracking, rain/snow forecasts & regional impacts', parentGroup: 'atmospheric' },
        { name: 'Monsoon Dynamics', href: '/hazard-intelligence/atmospheric-systems/monsoon-dynamics', desc: 'Terrain-masked moisture, ERA5 rain & anomalies', parentGroup: 'atmospheric' },
        { name: 'Jet Stream & Circulation', href: '/hazard-intelligence/atmospheric-systems/jet-stream-circulation', desc: '2D SWJ axis, 500 hPa troughs & blocking ridges', parentGroup: 'atmospheric' },
        { name: '── Extreme Weather Systems ──', href: '#', desc: '', isHeader: true, groupId: 'extreme-weather' },
        { name: 'Extreme Weather Hub', href: '/hazard-intelligence/extreme-weather', desc: '12-module phased extreme meteorology architecture', parentGroup: 'extreme-weather' },
        { name: 'Extreme Rainfall & Cloudbursts', href: '/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts', desc: 'Operational: 1h/24h rain, 31-member ensemble & ERA5', parentGroup: 'extreme-weather' },
        { name: 'Heavy Snowfall & Blizzards', href: '/hazard-intelligence/extreme-weather', desc: 'Phase 1 Rollout · Snowfall, SWE & gusts', parentGroup: 'extreme-weather' },
        { name: 'Thunderstorms & Lightning', href: '/hazard-intelligence/extreme-weather', desc: 'Phase 2 Rollout · CAPE & convective watch', parentGroup: 'extreme-weather' },
        { name: 'Heatwaves', href: '/hazard-intelligence/extreme-weather', desc: 'Phase 1 Rollout · Elevation-adjusted Tmax', parentGroup: 'extreme-weather' },
        { name: 'Cold Waves & Frost', href: '/hazard-intelligence/extreme-weather', desc: 'Phase 1 Rollout · Sub-zero & orchard frost', parentGroup: 'extreme-weather' },
        { name: 'Hailstorms', href: '/hazard-intelligence/extreme-weather', desc: 'Phase 2 Rollout · Hail instability & alerts', parentGroup: 'extreme-weather' },
        { name: 'Extreme Winds & Storms', href: '/hazard-intelligence/extreme-weather', desc: 'Phase 2 Rollout · Peak gusts & pass rotors', parentGroup: 'extreme-weather' },
        { name: 'Fog & Visibility', href: '/hazard-intelligence/extreme-weather', desc: 'Phase 2 Rollout · Valley fog & METAR visibility', parentGroup: 'extreme-weather' },
        { name: 'Drought & Dry Spells', href: '/hazard-intelligence/extreme-weather', desc: 'Phase 3 Rollout · SPI/SPEI & rainfall deficits', parentGroup: 'extreme-weather' },
        { name: 'Dust Storms', href: '/hazard-intelligence/extreme-weather', desc: 'Phase 3 Rollout · CAMS dust, PM10 & AOD', parentGroup: 'extreme-weather' },
        { name: 'Freezing Rain & Ice', href: '/hazard-intelligence/extreme-weather', desc: 'Phase 3 Rollout · Thermal inversions & icing', parentGroup: 'extreme-weather' },
        { name: 'Rain-on-Snow & Snowmelt', href: '/hazard-intelligence/extreme-weather', desc: 'Phase 3 Rollout · Warm rain over snowpack', parentGroup: 'extreme-weather' },
        { name: '── Hazard Systems ──', href: '#', desc: '', isHeader: true, groupId: 'hazard-systems' },
        { name: 'Floods', href: '/hazard-intelligence/floods', desc: 'Riverine, urban & floodplain flooding', parentGroup: 'hazard-systems' },
        { name: 'Flash Floods', href: '/hazard-intelligence/flash-floods', desc: 'Cloudburst & rapid runoff hazards', parentGroup: 'hazard-systems' },
        { name: 'Landslides', href: '/hazard-intelligence/landslides', desc: 'Slope instability & mass movement', parentGroup: 'hazard-systems' },
        { name: 'Avalanches', href: '/hazard-intelligence/avalanches', desc: 'Snow-slide monitoring & exposure', parentGroup: 'hazard-systems' },
        { name: 'Algal Bloom Intelligence', href: '/hazard-intelligence/algal-bloom-intelligence', desc: 'Eutrophication & bloom risk monitoring', parentGroup: 'hazard-systems' },
        { name: 'Earthquakes', href: '/hazard-intelligence/earthquakes', desc: 'Seismic activity & fault systems', parentGroup: 'hazard-systems' },
        { name: 'GLOFs', href: '/hazard-intelligence/glofs', desc: 'Glacial lake outburst flood intelligence', parentGroup: 'hazard-systems' },
        { name: 'Forest Fires', href: '/hazard-intelligence/forest-fires', desc: 'Wildfire occurrence & burn monitoring', parentGroup: 'hazard-systems' },
      ];

    case 'Earth & Human Impact':
      return [
        { name: '🌍 EHII Command Center', href: '/earth-human-impact', desc: 'Western Himalayan Earth Systems Observatory' },
        { name: '🛰️ Satellite Change Observatory', href: '/earth-human-impact/change-detection-observatory', desc: 'Spaceborne multi-temporal detection core' },
        { name: '🔔 Two-Tier Detection Alerts', href: '/earth-human-impact/change-detection-observatory/detection-alerts', desc: 'Preliminary alerts & verified findings' },
        { name: '── The 7 Scientific Systems ──', href: '#', desc: '', isHeader: true },
        { name: 'Climate & Atmosphere', href: '/earth-human-impact/climate-atmosphere', desc: 'Temperature, snowfall, rainfall & extremes' },
        { name: 'Forest & Landscape', href: '/earth-human-impact/forests-landscapes', desc: 'Canopy density, biomass & fragmentation' },
        { name: 'Land Use & Earth Systems', href: '/earth-human-impact/land-earth-systems', desc: 'Karewa destruction, conversion & erosion' },
        { name: 'Aquatic & Cryosphere Change', href: '/earth-human-impact/aquatic-cryosphere', desc: 'Lake, wetland, glacier & springshed change detection' },
        { name: 'Energy & Infrastructure', href: '/earth-human-impact/energy-infrastructure', desc: 'Hydropower, highways, tunnels & transmission' },
        { name: 'Mining & Extraction', href: '/earth-human-impact/mining-extraction', desc: 'Riverbed excavation, quarries & brick kilns' },
        { name: 'Urban Ecology', href: '/earth-human-impact/urban-ecology', desc: 'Urban heat islands, sprawl & impervious surface' },
        { name: '── Spaceborne Tools & Evidence ──', href: '#', desc: '', isHeader: true },
        { name: 'Loss & Recovery Ledger (1985–2026)', href: '/earth-human-impact/aquatic-cryosphere/loss-recovery-ledger', desc: 'Historical multi-decadal ecosystem balance sheet' },
        { name: 'Historical Comparison (1982–2026)', href: '/earth-human-impact/change-detection-observatory/historical-comparison', desc: 'Pampore, Wular & Srinagar multi-epoch' },
        { name: 'Spatial Change Atlas', href: '/earth-human-impact/change-detection-observatory/change-detection-atlas', desc: 'Interactive PostGIS vector boundaries' },
        { name: 'Verification Queue', href: '/earth-human-impact/change-detection-observatory/verification-queue', desc: 'Step 7 scientific peer review workbench' },
        { name: 'Scientific Evidence Dossiers', href: '/earth-human-impact/change-detection-observatory/scientific-dossiers', desc: 'Permanent assessment packages' },
        { name: 'Cumulative Impact Matrix', href: '/earth-human-impact/cumulative-impact', desc: 'Compounding multi-stressor interactions' },
      ];

    case 'Sectoral EIA':
      return [
        { name: '🌐 SEIAE Portal Hub', href: '/sectoral-eia', desc: 'Sectoral Environmental Impact Assessment Engine' },
        { name: '🏛️ Architecture & Overview', href: '/sectoral-eia/overview', desc: 'Scientific architecture & SEA mandate' },
        { name: '📋 9-Step Methodology', href: '/sectoral-eia/methodology', desc: 'Standard assessment workflow' },
        { name: '🗄️ Data Sources & Registry', href: '/sectoral-eia/data-sources', desc: 'External scientific acquisition catalog' },
        { name: '── Sector Engines ──', href: '#', desc: '', isHeader: true },
        { name: 'Tourism EIA', href: '/sectoral-eia/sectors/tourism', desc: 'Carrying capacity & visitor pressure' },
        { name: 'Horticulture EIA', href: '/sectoral-eia/sectors/horticulture', desc: 'Orchard agrochemicals & Karewa aquifers' },
        { name: 'Handicrafts EIA', href: '/sectoral-eia/sectors/handicrafts', desc: 'Artisanal lifecycle & dye wastewater' },
        { name: 'Agriculture EIA', href: '/sectoral-eia/sectors/agriculture', desc: 'Nutrient runoff & soil health' },
        { name: '── Intelligence & Tools ──', href: '#', desc: '', isHeader: true },
        { name: '➕ Submit Assessment', href: '/sectoral-eia/assessment/new', desc: 'Enterprise & scientific intake portal' },
        { name: 'Cumulative Impact Matrix', href: '/sectoral-eia/cumulative-impact', desc: 'Multi-sector compounding stress' },
        { name: 'Scenario Modeling', href: '/sectoral-eia/scenario-modeling', desc: '2026-2035 predictive pathways' },
        { name: 'GIS Impact Atlas', href: '/sectoral-eia/impact-atlas', desc: 'Interactive spatial boundaries' },
        { name: 'Mitigation Tracker', href: '/sectoral-eia/mitigation-tracker', desc: 'Track verified reductions' },
        { name: 'Scientific Reports', href: '/sectoral-eia/reports', desc: 'Peer-reviewed dossiers & monographs' },
      ];

    case 'Investigations':
      return [
        { name: '⚖️ Investigations Hub (KEW-EIAI)', href: '/environmental-investigations', desc: 'Scientific evidence & institutional accountability' },
        { name: '📊 Investigation Dashboard', href: '/environmental-investigations/dashboard', desc: 'Intelligence & evidence cockpit' },
        { name: '📑 Investigation Reports', href: '/environmental-investigations/reports', desc: 'Scientific dossiers & scoping portfolio' },
        { name: '🏛️ Environmental Economics & Finance', href: '/environmental-investigations/economics', desc: 'Public expenditure, natural capital & fiscal audits' },
        { name: '── Flagship Published Reports ──', href: '#', desc: '', isHeader: true },
        { name: 'KEW-INV-0001: Dal Lake Dredging', href: '/environmental-investigations/reports/dal-lake-mechanical-dredging-ecological-defences', desc: '1990–2026 sediment, wetland & audit synthesis' },
        { name: 'KEW-INV-0002: Sheshnag Ecology', href: '/environmental-investigations/reports/sheshnag-pilgrimage-infrastructure-alpine-ecology', desc: '2012–2026 alpine tarn & corridor risks' },
        { name: '── Architecture & Verification ──', href: '#', desc: '', isHeader: true },
        { name: 'Investigation Domains', href: '/environmental-investigations/domains', desc: 'Lakes, cryosphere, Karewas, dams & governance' },
        { name: 'Scientific Disciplines', href: '/environmental-investigations/disciplines', desc: 'Governing equations & analytical methods' },
        { name: 'Scientific Evidence Registry', href: '/environmental-investigations/evidence', desc: 'Documented vs unverified claim matrix' },
        { name: 'Spatial Investigation Atlas', href: '/environmental-investigations/atlas', desc: 'Interactive GIS investigation footprints' },
        { name: 'Institutional Accountability', href: '/environmental-investigations/accountability', desc: 'Statutory responsibility matrix' },
        { name: 'Asian & Global Case Studies', href: '/environmental-investigations/precedents', desc: 'Lake Biwa, Taihu, Imja Tsho & Rhine benchmarks' },
        { name: 'Recommendations Tracker', href: '/environmental-investigations/recommendations', desc: 'Phased corrective actions & indicators' },
        { name: 'Investigation Methodology', href: '/environmental-investigations/methodology', desc: 'Scientific standards & investigative workflow' },
        { name: '➕ Submit Investigation', href: '/environmental-investigations/submit', desc: 'Propose scoped study or official response' },
      ];

    case 'Himalayan Dispatch':
      return [
        { name: '📰 The Inaugural Issue', href: getKewToDispatchUrl('/'), desc: 'Environmental Journalism & Magazine' },
        { name: '⏳ Coming Next (Issue 02)', href: getKewToDispatchUrl('/forthcoming'), desc: 'Forthcoming assignments & editorial slate' },
        { name: '── Editorial & Reporting ──', href: '#', desc: '', isHeader: true },
        { name: '📖 Editorial Departments', href: getKewToDispatchUrl('/departments'), desc: 'Cover stories, longform, field & data journalism' },
        { name: '🖋️ Journalists & Portfolios', href: getKewToDispatchUrl('/journalists'), desc: 'Correspondents & documentary photographers' },
        { name: '🏛️ Editorial Board', href: getKewToDispatchUrl('/editorial-board'), desc: 'Governance, standards & scientific review' },
        { name: '🗄️ Edition Archive', href: getKewToDispatchUrl('/archive'), desc: 'Permanent periodical folio archive' },
        { name: '✉️ Pitch a Story', href: getKewToDispatchUrl('/pitch'), desc: 'Commissioning desk & source-protected intake' },
      ];

    case 'EcoVoices':
      return [
        { name: '🎼 EcoVoices Hub', href: '/ecovoices', desc: 'Environmental Arts, Music & Creative Expression' },
        { name: '── Creative Departments ──', href: '#', desc: '', isHeader: true },
        { name: '🎵 Environmental Music', href: '/ecovoices#music', desc: '6 Published Releases · SufiPulse USA × KEW' },
        { name: '✒️ Environmental Poetry', href: '/ecovoices#poetry', desc: 'Mystical kalam, shruks & ecological verse' },
        { name: '🎬 Environmental Cinema', href: '/ecovoices#cinema', desc: 'Short films, documentaries & visual narratives' },
        { name: '🎨 Environmental Art', href: '/ecovoices#visual-arts', desc: 'Paintings, installations & ecological art' },
        { name: '🌊 Sounds of Nature', href: '/ecovoices#soundscapes', desc: 'Western Himalayan acoustic heritage' },
        { name: '👥 Creative Contributors', href: '/ecovoices#artists', desc: 'Musicians, poets, filmmakers & storytellers' },
        { name: '── Featured & Submissions ──', href: '#', desc: '', isHeader: true },
        { name: '✨ Pani Gawah Hai', href: '/ecovoices/song/pani-gawah-hai', desc: 'Kashmir Water Bears Witness · Dr. Zarf-e-Noori' },
        { name: '✍️ Submit Creative Work', href: '/ecovoices#submit', desc: 'Editorial & scientific review gateway' },
      ];

    case 'Student Action Hub':
    case 'Environmental Calendar':
      return [
        { name: '🎓 Student Action Hub', href: '/environmental-calendar', desc: 'Environmental awareness, participation & action' },
        { name: '📅 Environmental Calendar', href: '/environmental-calendar#calendar-directory', desc: '16 UN & Western Himalayan observances' },
        { name: '── Outdoor Classroom (OD) ──', href: '#', desc: '', isHeader: true },
        { name: '🧭 Program Overview', href: '/environmental-calendar/outdoor-classroom', desc: '8-stage experiential learning lifecycle' },
        { name: '📚 Curriculum Library', href: '/environmental-calendar/outdoor-classroom/curriculum', desc: '5-tier teacher guides & student rubrics' },
        { name: '🌐 Adopt-an-Ecosystem', href: '/environmental-calendar/outdoor-classroom/adopt-an-ecosystem', desc: '20 registered field sites across 10 districts' },
        { name: '🔬 8 Field Programs', href: '/environmental-calendar/outdoor-classroom/field-learning-programs', desc: 'Wetlands, forests, karst springs & cryosphere' },
        { name: '🏫 School Registration', href: '/environmental-calendar/outdoor-classroom/institutional-registration', desc: '100% free school & eco-club intake' },
        { name: '📡 Field Telemetry', href: '/environmental-calendar/outdoor-classroom/student-observations', desc: 'Supervised student environmental logs' },
        { name: '🏅 Competency Certificates', href: '/environmental-calendar/outdoor-classroom/certificates', desc: 'Cryptographically verifiable digital credentials' },
        { name: '📊 Annual Pilot Report', href: '/environmental-calendar/outdoor-classroom/annual-report', desc: '2026 Phase 1 pilot findings & archive' },
      ];

    case 'Webinars & Conferences':
      return [
        { name: '🎥 Hub Overview', href: '/webinars', desc: 'Scientific Exchange & Knowledge Sharing' },
        { name: '🏛️ Flagship Conferences (8)', href: '/webinars/conferences', desc: 'Multi-track Western Himalayan symposiums' },
        { name: '📅 2027–28 Scientific Calendar', href: '/webinars/calendar', desc: '104 scheduled webinars & conferences' },
        { name: '⏳ Upcoming Sessions', href: '/webinars/upcoming', desc: 'Open registration & live symposium schedule' },
        { name: '── Collaboration & Archives ──', href: '#', desc: '', isHeader: true },
        { name: '➕ Host a Conference', href: '/webinars/host-a-conference', desc: 'University & institutional symposium intake' },
        { name: '🏫 Institutional Network', href: '/webinars/institution/verification', desc: 'Partner university accreditation & registration' },
        { name: '📑 Published Proceedings', href: '/webinars/proceedings', desc: 'Abstracts, monographs & session papers' },
        { name: '🏅 Past Event Archives', href: '/webinars/past-events', desc: 'Recorded symposiums & verifiable certificates' },
      ];

    case 'About':
      return [
        { name: '🏛️ About KEW', href: '/about', desc: 'Platform overview & scientific charter' },
        { name: '📜 Message', href: '/about/message', desc: 'Reflections inspired by Dr. Ghulam Mohammad Kumar' },
        { name: '🎯 Mission', href: '/about/mission', desc: 'Ecological mandates & strategic vision' },
        { name: '⚖️ Governance', href: '/about/governance', desc: 'Institutional oversight & ethics' },
        { name: '👤 Institutional Leadership', href: '/about/founder', desc: 'Founder & executive director' },
        { name: '👥 Contributors', href: '/about/contributors', desc: 'Scientists, researchers & advisors' },
        { name: '🤝 Support KEW', href: '/about/support-sponsorship', desc: 'Philanthropic support & sponsorship' },
        { name: '🏢 CSR & Grants', href: '/about/csr-collaborations', desc: 'Corporate social responsibility' },
        { name: '✉️ Contact', href: '/about/contact', desc: 'Inquiries & editorial communications' },
        { name: '❓ KEW Q&A', href: '/about/qna', desc: '50 foundational knowledge answers' },
        { name: '── Affiliated Initiatives ──', href: '#', desc: '', isHeader: true },
        { name: 'Kashmir Craft Lifecycle Assessment', href: 'https://www.craftlore.org/clee', desc: 'Craftlore CLEE artisanal environmental index' },
        { name: 'Plan Your Kashmir Trip', href: 'https://kashmirartstay.com/', desc: 'Kashmir ArtStay ethical heritage travel' },
      ];

      default:
      return [];
  }
}

export interface GlobalNavigationGroupItem {
  label: string;
  href: string;
  description?: string;
}

export interface GlobalNavigationGroup {
  id: string;
  label: string;
  href: string;
  subtitle?: string;
  items: GlobalNavigationGroupItem[];
}

function stripLeadingIconPrefix(text: string): string {
  return text.replace(/^[^\p{L}\p{N}(]+\s*/u, '').trim() || text.trim();
}

/**
 * Structured group projection of the canonical 14-module navigation registry,
 * consumed by HD-ANIE dynamic taxonomy discovery and cross-module indexers.
 */
export const NAVIGATION_GROUPS: GlobalNavigationGroup[] = GLOBAL_NAV_ITEMS.map((nav) => {
  const rawDropdown = nav.hasDropdown ? getGlobalDropdownItems(nav.label) : [];
  const internalItems: GlobalNavigationGroupItem[] = rawDropdown
    .filter((item) => !item.isHeader && item.href.startsWith('/'))
    .map((item) => ({
      label: stripLeadingIconPrefix(item.name),
      href: item.href,
      description: item.desc || nav.subtitle,
    }));

  if (internalItems.length === 0 && nav.href.startsWith('/')) {
    internalItems.push({
      label: nav.label,
      href: nav.href,
      description: nav.subtitle || `${nav.label} intelligence module`,
    });
  }

  return {
    id: nav.href.replace(/^\//, '').replace(/\//g, '-') || `module-${nav.order}`,
    label: nav.label,
    href: nav.href,
    subtitle: nav.subtitle,
    items: internalItems,
  };
});
