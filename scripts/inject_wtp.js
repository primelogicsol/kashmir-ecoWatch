const fs = require('fs');
const path = require('path');

const drinkingWaterTreatmentPlants = [
  {
    id: "WTP-KC-001", name: "Rangil WTP", category: "Drinking Water Treatment Plants", scope: "Kashmir Core", district: "Ganderbal / Srinagar",
    sourceWater: "Sindh River", priority: "Strategic Priority", designCapacity: "30 MGD", currentLoad: "30 MGD", operationalStatus: "Fully Operational",
    efficiency: "Turbidity removal, Chlorine compliance met", serviceArea: "Srinagar North / Ganderbal / parts of Baramulla", riskExposure: "Low",
    riskDrivers: "Operationally stable / laboratory and chlorination units present", confidence: "High", dashboardLocked: false, sourceId: "SRC-JALSHAKTI-RANGIL"
  },
  {
    id: "WTP-KC-002", name: "Nishat WTP", category: "Drinking Water Treatment Plants", scope: "Kashmir Core", district: "Srinagar",
    sourceWater: "Dal Lake / Nishat intake system", priority: "High Priority", designCapacity: "19 MGD", currentLoad: "19 MGD", operationalStatus: "Fully Operational",
    efficiency: "Turbidity removal active", serviceArea: "Nishat / Brein / Dal Belt / Khanyar / Rainawari / Lal Chowk tail-end areas", riskExposure: "High",
    riskDrivers: "Lake-source sensitivity / odour and colour treatment upgrade / sewage mixing allegations pending verification", confidence: "High", dashboardLocked: false, sourceId: "SRC-JALSHAKTI-NISHAT"
  },
  {
    id: "WTP-KC-003", name: "Nishat Rapid Sand Filtration Augmentation", category: "Drinking Water Treatment Plants", scope: "Kashmir Core", district: "Srinagar",
    sourceWater: "Nishat WTP raw-water system", priority: "High Priority", designCapacity: "3 MGD", currentLoad: "Under Development", operationalStatus: "Under Construction / Upgrade",
    efficiency: "Data Pending", serviceArea: "Tail-end Srinagar areas including Khanyar, Rainawari, Lal Chowk and adjoining localities", riskExposure: "Moderate",
    riskDrivers: "Capacity augmentation / urban supply pressure", confidence: "High", dashboardLocked: false, sourceId: "SRC-SMARTCITY-NISHAT-3MGD"
  },
  {
    id: "WTP-KC-004", name: "Nishat Activated Carbon Chamber", category: "Drinking Water Treatment Plants", scope: "Kashmir Core", district: "Srinagar",
    sourceWater: "Nishat WTP raw-water system", priority: "High Priority", designCapacity: "7 MGD", currentLoad: "Under Development", operationalStatus: "Under Construction / AMRUT 2.0 Upgrade",
    efficiency: "Activated carbon treatment for colour and odour issues", serviceArea: "Nishat-fed Srinagar command area", riskExposure: "Moderate",
    riskDrivers: "Raw-water quality sensitivity / colour and odour control", confidence: "High", dashboardLocked: false, sourceId: "SRC-AMRUT-NISHAT-7MGD"
  },
  {
    id: "WTP-KC-005", name: "Alasteng WTP", category: "Drinking Water Treatment Plants", scope: "Kashmir Core", district: "Ganderbal / Srinagar",
    sourceWater: "Sindh River / Alasteng supply system", priority: "High Priority", designCapacity: "10 MGD", currentLoad: "10 MGD", operationalStatus: "Fully Operational",
    efficiency: "Good", serviceArea: "Srinagar Outskirts", riskExposure: "Low", riskDrivers: "Source Required", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JALSHAKTI-ALASTENG"
  },
  {
    id: "WTP-KC-006", name: "Doodhganga WTP / Mehjoor Nagar", category: "Drinking Water Treatment Plants", scope: "Kashmir Core", district: "Srinagar / Budgam",
    sourceWater: "Doodhganga", priority: "High Priority", designCapacity: "10 MGD", currentLoad: "10 MGD", operationalStatus: "Fully Operational",
    efficiency: "Moderate", serviceArea: "Srinagar South / Budgam / Bagh-i-Mehtab / Chanapora / Natipora / Rambagh / Hyderpora / Sanat Nagar", riskExposure: "High",
    riskDrivers: "Upstream pollution / desilting requirement / service reservoir maintenance", confidence: "High", dashboardLocked: false, sourceId: "SRC-PHE-DOODHGANGA"
  },
  {
    id: "WTP-KC-007", name: "Padshahibagh WTP", category: "Drinking Water Treatment Plants", scope: "Kashmir Core", district: "Srinagar",
    sourceWater: "Jhelum / Srinagar urban supply system", priority: "Strategic Priority", designCapacity: "19 MGD", currentLoad: "19 MGD", operationalStatus: "Fully Operational",
    efficiency: "High", serviceArea: "Srinagar City", riskExposure: "Moderate", riskDrivers: "Urban supply pressure / source-water sensitivity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JALSHAKTI-PADSHAHIBAGH"
  },
  {
    id: "WTP-KC-008", name: "Rangil 5 MGD Filtration Plant Upgrade", category: "Drinking Water Treatment Plants", scope: "Kashmir Core", district: "Ganderbal",
    sourceWater: "Sindh River / Rangil system", priority: "High Priority", designCapacity: "5 MGD", currentLoad: "Under Development", operationalStatus: "Work in Progress",
    efficiency: "Data Pending", serviceArea: "Rangil-fed service command", riskExposure: "Low", riskDrivers: "Capacity augmentation / completion pending", confidence: "High", dashboardLocked: false, sourceId: "SRC-JALSHAKTI-RANGIL-5MGD"
  },
  {
    id: "WTP-TD-001", name: "Jammu Urban WTP Registry", category: "Drinking Water Treatment Plants", scope: "Trans-Divisional", district: "Jammu",
    sourceWater: "Tawi / groundwater / urban supply systems", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending",
    efficiency: "Source Required", serviceArea: "Jammu City", riskExposure: "Pending Verification", riskDrivers: "Urban demand / river and groundwater dependency", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-JALSHAKTI-JAMMU-PENDING"
  },
  {
    id: "WTP-TD-002", name: "Udhampur WTP / Filtration Plant Registry", category: "Drinking Water Treatment Plants", scope: "Trans-Divisional", district: "Udhampur",
    sourceWater: "Local streams / groundwater", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending",
    efficiency: "Source Required", serviceArea: "Udhampur urban and peri-urban areas", riskExposure: "Pending Verification", riskDrivers: "Mountain water supply dependency", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-JALSHAKTI-UDHAMPUR-PENDING"
  },
  {
    id: "WTP-TD-003", name: "Anantnag / Bijbehara WTP Registry", category: "Drinking Water Treatment Plants", scope: "Kashmir Core", district: "Anantnag",
    sourceWater: "Lidder / Jhelum-linked supply systems", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending",
    efficiency: "Source Required", serviceArea: "Anantnag / Bijbehara", riskExposure: "Pending Verification", riskDrivers: "Urban growth / river-source dependency", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-JALSHAKTI-ANANTNAG-PENDING"
  },
  {
    id: "WTP-TD-004", name: "Leh Drinking Water Treatment / Filtration Registry", category: "Drinking Water Treatment Plants", scope: "Trans-Divisional", district: "Leh",
    sourceWater: "Indus / groundwater / spring-fed systems", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending",
    efficiency: "Source Required", serviceArea: "Leh urban area", riskExposure: "High", riskDrivers: "Cold desert water stress / tourism pressure / seasonal supply risk", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-LADAKH-PHE-LEH-PENDING"
  },
  {
    id: "WTP-TD-005", name: "Kargil Drinking Water Treatment / Filtration Registry", category: "Drinking Water Treatment Plants", scope: "Trans-Divisional", district: "Kargil",
    sourceWater: "Suru / groundwater / spring-fed systems", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending",
    efficiency: "Source Required", serviceArea: "Kargil urban area", riskExposure: "High", riskDrivers: "Cold-region hydrology / seasonal source dependency", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-LADAKH-PHE-KARGIL-PENDING"
  },
  {
    id: "WTP-TB-001", name: "Muzaffarabad Water Filtration / Treatment Registry", category: "Drinking Water Treatment Plants", scope: "Transboundary / Extended", district: "Muzaffarabad",
    sourceWater: "Neelum / Jhelum urban supply systems", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending",
    efficiency: "Source Required", serviceArea: "Muzaffarabad urban area", riskExposure: "High", riskDrivers: "Seismic corridor / river-source dependency / urban demand", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-AJK-PHE-MUZAFFARABAD-PENDING"
  },
  {
    id: "WTP-TB-002", name: "Mirpur Water Filtration / Treatment Registry", category: "Drinking Water Treatment Plants", scope: "Transboundary / Extended", district: "Mirpur",
    sourceWater: "Mangla / Jhelum-linked supply systems", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending",
    efficiency: "Source Required", serviceArea: "Mirpur urban area", riskExposure: "Moderate", riskDrivers: "Reservoir-linked supply / urban growth", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-AJK-PHE-MIRPUR-PENDING"
  },
  {
    id: "WTP-TB-003", name: "Gilgit Water Filtration Plant Registry", category: "Drinking Water Treatment Plants", scope: "Transboundary / Extended", district: "Gilgit",
    sourceWater: "Gilgit River / groundwater / gravity-flow systems", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending",
    efficiency: "Source Required", serviceArea: "Gilgit urban and peri-urban areas", riskExposure: "High", riskDrivers: "Mountain supply dependency / climate and glacial hydrology", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-GB-WATER-GILGIT-PENDING"
  },
  {
    id: "WTP-TB-004", name: "Skardu Water Filtration Plant Registry", category: "Drinking Water Treatment Plants", scope: "Transboundary / Extended", district: "Skardu",
    sourceWater: "Satpara / Indus-linked systems / groundwater", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending",
    efficiency: "Source Required", serviceArea: "Skardu urban area", riskExposure: "High", riskDrivers: "Tourism pressure / mountain water scarcity / lake-source dependency", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-GB-WATER-SKARDU-PENDING"
  },
  {
    id: "WTP-TB-005", name: "GB Community Water Filtration Plants Registry", category: "Drinking Water Treatment Plants", scope: "Transboundary / Extended", district: "Gilgit-Baltistan Multiple Districts",
    sourceWater: "Community water supply systems", priority: "High Priority", designCapacity: "Plant-level data pending", currentLoad: "Data Pending", operationalStatus: "Data Pending",
    efficiency: "Source Required", serviceArea: "Multiple GB communities", riskExposure: "Pending Verification", riskDrivers: "Community-level filtration infrastructure / plant-level verification required", confidence: "Medium", dashboardLocked: true, sourceId: "SRC-ALKHIDMAT-GB-WFP"
  }
];

const mappedWTP = drinkingWaterTreatmentPlants.map(h => {
  return {
    id: h.id,
    asset_name: h.name,
    asset_type: h.category,
    scope: h.scope,
    division_region: h.scope === 'Transboundary / Extended' ? (h.district === 'Muzaffarabad' || h.district === 'Mirpur' || h.district.includes('AJK') ? 'AJK' : 'GB') : (h.scope === 'Kashmir Core' ? 'Kashmir Valley' : (h.district === 'Leh' || h.district === 'Kargil' ? 'Ladakh' : 'Jammu')),
    district: h.district,
    city_or_authority: h.sourceId.split('-')[1] || 'Authority',
    ward_or_service_area: h.serviceArea,
    operator: h.sourceId.split('-')[1] || 'Authority',
    source_or_catchment: h.sourceWater,
    design_capacity: h.designCapacity,
    current_load: h.currentLoad,
    utilization_percent: 'N/A',
    treatment_technology: 'Filtration / Treatment',
    operational_status: h.operationalStatus,
    treatment_efficiency: h.efficiency,
    management_efficiency: h.efficiency === 'Source Required' || h.efficiency === 'Data Pending' ? 'Pending' : 'High',
    risk_exposure: h.riskExposure + (h.riskDrivers ? ' (' + h.riskDrivers + ')' : ''),
    receiving_waterbody: 'N/A (Supply Network)',
    served_population: 'N/A',
    last_upgrade_year: 'N/A',
    priority_level: h.priority
  };
});

const fileContent = fs.readFileSync(path.join(__dirname, 'generate_critical_infrastructure_data.js'), 'utf8');

const startMarker = '    // ─── WATER TREATMENT PLANTS ───';
const startIndex = fileContent.indexOf(startMarker);

const endMarker = '    // ─── SOLID WASTE / DUMPSITES ───';
const endIndex = fileContent.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find WTP markers.");
  process.exit(1);
}

const before = fileContent.substring(0, startIndex);
const after = fileContent.substring(endIndex);

const wtpString = '    // ─── WATER TREATMENT PLANTS ───\n' + mappedWTP.map(r => '    ' + JSON.stringify(r, null, 4)).join(',\n') + ',\n\n';

const newContent = before + wtpString + after;

fs.writeFileSync(path.join(__dirname, 'generate_critical_infrastructure_data.js'), newContent);
console.log("Successfully injected " + mappedWTP.length + " WTP records into generate_critical_infrastructure_data.js");
