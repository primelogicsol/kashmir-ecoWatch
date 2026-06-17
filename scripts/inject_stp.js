const fs = require('fs');
const path = require('path');

const sewageTreatmentPlants = [
  {
    id: "STP-KC-001", name: "Noorbagh STP", category: "Sewage Treatment Plants", scope: "Kashmir Core", district: "Srinagar", priority: "Strategic Priority", designCapacity: "60 MLD", currentLoad: "Testing Phase", operationalStatus: "Under Commissioning", efficiency: "N/A", serviceArea: "Srinagar Downtown", riskExposure: "High", riskDrivers: "Untreated discharge until fully active", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-SMC-NOORBAGH"
  },
  {
    id: "STP-KC-002", name: "Brari Nambal STP", category: "Sewage Treatment Plants", scope: "Kashmir Core", district: "Srinagar", priority: "Critical Priority", designCapacity: "17.08 MLD", currentLoad: "16.1 MLD", operationalStatus: "Operational", efficiency: "BOD/COD removal failing periodically", serviceArea: "Downtown / Brari Nambal / Dal-linked catchment", riskExposure: "High", riskDrivers: "NGT flagged / Dal Lake discharge sensitivity", confidence: "High", dashboardLocked: false, sourceId: "SRC-BRARI-NAMBAL-STP"
  },
  {
    id: "STP-KC-003", name: "Nallah Amir Khan STP", category: "Sewage Treatment Plants", scope: "Kashmir Core", district: "Srinagar", priority: "High Priority", designCapacity: "5.4 MLD", currentLoad: "5.4 MLD", operationalStatus: "Operational", efficiency: "Adequate", serviceArea: "Nigeen Basin", riskExposure: "Moderate", riskDrivers: "Lake-basin discharge sensitivity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-LCMA-NAK-STP"
  },
  {
    id: "STP-KC-004", name: "Habak STP", category: "Sewage Treatment Plants", scope: "Kashmir Core", district: "Srinagar", priority: "High Priority", designCapacity: "3.2 MLD", currentLoad: "3.2 MLD", operationalStatus: "Operational", efficiency: "Adequate", serviceArea: "Dal Lake North", riskExposure: "Moderate", riskDrivers: "Dal Lake peripheral sewage load", confidence: "High", dashboardLocked: false, sourceId: "SRC-HABAK-STP"
  },
  {
    id: "STP-KC-005", name: "Hazratbal STP", category: "Sewage Treatment Plants", scope: "Kashmir Core", district: "Srinagar", priority: "High Priority", designCapacity: "7.5 MLD", currentLoad: "7.5 MLD", operationalStatus: "Operational", efficiency: "Adequate", serviceArea: "Dal Lake North", riskExposure: "Moderate", riskDrivers: "Dal Lake peripheral sewage load", confidence: "High", dashboardLocked: false, sourceId: "SRC-HAZRATBAL-STP"
  },
  {
    id: "STP-KC-006", name: "Lam / Nishat STP", category: "Sewage Treatment Plants", scope: "Kashmir Core", district: "Srinagar", priority: "High Priority", designCapacity: "4.5 MLD", currentLoad: "4.5 MLD", operationalStatus: "Operational", efficiency: "Adequate", serviceArea: "Dal Lake East", riskExposure: "Moderate", riskDrivers: "Dal Lake eastern basin sewage load", confidence: "High", dashboardLocked: false, sourceId: "SRC-LAM-NISHAT-STP"
  },
  {
    id: "STP-KC-007", name: "Aloochi Bagh STP", category: "Sewage Treatment Plants", scope: "Kashmir Core", district: "Srinagar", priority: "Local Priority", designCapacity: "164 KLD", currentLoad: "Data Pending", operationalStatus: "Data Pending", efficiency: "Source Required", serviceArea: "Aloochi Bagh", riskExposure: "Pending Verification", riskDrivers: "Small decentralized sewage treatment record needs verification", confidence: "Medium", dashboardLocked: true, sourceId: "SRC-IJRASET-JK-STP"
  },
  {
    id: "STP-KC-008", name: "Achan STP", category: "Sewage Treatment Plants", scope: "Kashmir Core", district: "Srinagar", priority: "Local Priority", designCapacity: "130 KLD", currentLoad: "Data Pending", operationalStatus: "Data Pending", efficiency: "Source Required", serviceArea: "Achan", riskExposure: "Pending Verification", riskDrivers: "Small decentralized sewage treatment record needs verification", confidence: "Medium", dashboardLocked: true, sourceId: "SRC-IJRASET-JK-STP"
  },
  {
    id: "STP-KC-009", name: "Mehndikadal STP", category: "Sewage Treatment Plants", scope: "Kashmir Core", district: "Anantnag", priority: "High Priority", designCapacity: "4 MLD", currentLoad: "Data Pending", operationalStatus: "Data Pending", efficiency: "Source Required", serviceArea: "Anantnag / Mehndikadal", riskExposure: "Moderate", riskDrivers: "Urban sewage load / Jhelum-Lidder basin sensitivity", confidence: "Medium", dashboardLocked: true, sourceId: "SRC-IJRASET-JK-STP"
  },
  {
    id: "STP-KC-010", name: "Anantnag MCD STP", category: "Sewage Treatment Plants", scope: "Kashmir Core", district: "Anantnag", priority: "High Priority", designCapacity: "5 MLD", currentLoad: "Planned", operationalStatus: "Planned / DPR Stage", efficiency: "N/A", serviceArea: "Anantnag Municipal Area", riskExposure: "Moderate", riskDrivers: "Urban sewage load / project not yet operational", confidence: "Medium", dashboardLocked: true, sourceId: "SRC-IJRASET-JK-STP"
  },
  {
    id: "STP-KC-011", name: "Sopore STP", category: "Sewage Treatment Plants", scope: "Kashmir Core", district: "Baramulla", priority: "High Priority", designCapacity: "9.5 MLD", currentLoad: "DPR Stage", operationalStatus: "Planned", efficiency: "N/A", serviceArea: "Sopore Town / Aadipora site", riskExposure: "High", riskDrivers: "Untreated sewage currently entering Jhelum at multiple points", confidence: "High", dashboardLocked: false, sourceId: "SRC-SOPORE-STP-2025"
  },
  {
    id: "STP-TD-001", name: "Bhagwati Nagar STP", category: "Sewage Treatment Plants", scope: "Trans-Divisional", district: "Jammu", priority: "Strategic Priority", designCapacity: "27 MLD", currentLoad: "15 MLD", operationalStatus: "Partial / Upgrading", efficiency: "BOD/COD removal inconsistent", serviceArea: "Jammu West", riskExposure: "High", riskDrivers: "Tawi River discharge / partial network linkage", confidence: "High", dashboardLocked: false, sourceId: "SRC-BHAGWATI-NAGAR-STP"
  },
  {
    id: "STP-TD-002", name: "Jammu 30 MLD STP", category: "Sewage Treatment Plants", scope: "Trans-Divisional", district: "Jammu", priority: "Critical Priority", designCapacity: "30 MLD", currentLoad: "Non-functional", operationalStatus: "Non-functional", efficiency: "N/A", serviceArea: "Jammu Urban Sewerage Zone", riskExposure: "High", riskDrivers: "Non-functional treatment capacity / Tawi pollution pressure", confidence: "Medium", dashboardLocked: true, sourceId: "SRC-IJRASET-JK-STP"
  },
  {
    id: "STP-TD-003", name: "Jammu 10 MLD STP", category: "Sewage Treatment Plants", scope: "Trans-Divisional", district: "Jammu", priority: "Critical Priority", designCapacity: "10 MLD", currentLoad: "Non-functional", operationalStatus: "Non-functional", efficiency: "N/A", serviceArea: "Jammu Urban Sewerage Zone", riskExposure: "High", riskDrivers: "Non-functional treatment capacity / urban wastewater discharge", confidence: "Medium", dashboardLocked: true, sourceId: "SRC-IJRASET-JK-STP"
  },
  {
    id: "STP-TD-004", name: "Raipur Satwari STP", category: "Sewage Treatment Plants", scope: "Trans-Divisional", district: "Jammu", priority: "Local Priority", designCapacity: "4 KLD", currentLoad: "Data Pending", operationalStatus: "Data Pending", efficiency: "Source Required", serviceArea: "Raipur Satwari", riskExposure: "Pending Verification", riskDrivers: "Small decentralized sewage treatment record needs verification", confidence: "Medium", dashboardLocked: true, sourceId: "SRC-IJRASET-JK-STP"
  },
  {
    id: "STP-TD-005", name: "Leh STP Registry", category: "Sewage Treatment Plants", scope: "Trans-Divisional", district: "Leh", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending", efficiency: "Source Required", serviceArea: "Leh Urban Area", riskExposure: "High", riskDrivers: "Cold desert sanitation pressure / tourism load / groundwater vulnerability", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-LADAKH-STP-PENDING"
  },
  {
    id: "STP-TD-006", name: "Kargil STP Registry", category: "Sewage Treatment Plants", scope: "Trans-Divisional", district: "Kargil", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending", efficiency: "Source Required", serviceArea: "Kargil Urban Area", riskExposure: "High", riskDrivers: "Cold-region sanitation pressure / river-source sensitivity", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-LADAKH-STP-PENDING"
  },
  {
    id: "STP-TB-001", name: "Muzaffarabad STP Registry", category: "Sewage Treatment Plants", scope: "Transboundary / Extended", district: "Muzaffarabad", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending", efficiency: "Source Required", serviceArea: "Muzaffarabad Urban Area", riskExposure: "High", riskDrivers: "Jhelum-Neelum confluence wastewater pressure / seismic urban corridor", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-AJK-STP-PENDING"
  },
  {
    id: "STP-TB-002", name: "Mirpur STP Registry", category: "Sewage Treatment Plants", scope: "Transboundary / Extended", district: "Mirpur", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending", efficiency: "Source Required", serviceArea: "Mirpur Urban Area / Mangla-linked basin", riskExposure: "High", riskDrivers: "Reservoir-linked urban wastewater pressure", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-AJK-STP-PENDING"
  },
  {
    id: "STP-TB-003", name: "Kotli STP Registry", category: "Sewage Treatment Plants", scope: "Transboundary / Extended", district: "Kotli", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending", efficiency: "Source Required", serviceArea: "Kotli Urban Area", riskExposure: "Pending Verification", riskDrivers: "Poonch-Jhelum basin wastewater pressure", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-AJK-STP-PENDING"
  },
  {
    id: "STP-TB-004", name: "Gilgit STP Registry", category: "Sewage Treatment Plants", scope: "Transboundary / Extended", district: "Gilgit", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending", efficiency: "Source Required", serviceArea: "Gilgit Urban Area", riskExposure: "High", riskDrivers: "Upper Indus urban wastewater pressure / mountain drainage vulnerability", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-GB-STP-PENDING"
  },
  {
    id: "STP-TB-005", name: "Skardu STP Registry", category: "Sewage Treatment Plants", scope: "Transboundary / Extended", district: "Skardu", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending", efficiency: "Source Required", serviceArea: "Skardu Urban Area", riskExposure: "High", riskDrivers: "Tourism load / Satpara-Indus basin wastewater pressure", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-GB-STP-PENDING"
  },
  {
    id: "STP-TB-006", name: "Hunza STP Registry", category: "Sewage Treatment Plants", scope: "Transboundary / Extended", district: "Hunza", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Data Pending", efficiency: "Source Required", serviceArea: "Hunza Urban / Tourism Settlements", riskExposure: "High", riskDrivers: "Tourism sanitation pressure / mountain stream vulnerability", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-GB-STP-PENDING"
  }
];

const mappedSTP = sewageTreatmentPlants.map(h => {
  return {
    id: h.id,
    asset_name: h.name,
    asset_type: h.category,
    scope: h.scope,
    division_region: h.scope === 'Transboundary / Extended' ? (h.district === 'Muzaffarabad' || h.district === 'Mirpur' || h.district === 'Kotli' ? 'AJK' : 'GB') : (h.scope === 'Kashmir Core' ? 'Kashmir Valley' : (h.district === 'Leh' || h.district === 'Kargil' ? 'Ladakh' : 'Jammu')),
    district: h.district,
    city_or_authority: h.sourceId.split('-')[1] || 'Authority',
    ward_or_service_area: h.serviceArea,
    operator: h.sourceId.split('-')[1] || 'Authority',
    source_or_catchment: 'Sewage Network',
    design_capacity: h.designCapacity,
    current_load: h.currentLoad,
    utilization_percent: 'N/A',
    treatment_technology: 'STP Treatment',
    operational_status: h.operationalStatus,
    treatment_efficiency: h.efficiency,
    management_efficiency: h.efficiency === 'Source Required' || h.efficiency === 'Data Pending' || h.efficiency === 'N/A' ? 'Pending' : 'High',
    risk_exposure: h.riskExposure + (h.riskDrivers ? ' (' + h.riskDrivers + ')' : ''),
    receiving_waterbody: 'Lake / River System',
    served_population: 'N/A',
    last_upgrade_year: 'N/A',
    priority_level: h.priority
  };
});

const fileContent = fs.readFileSync(path.join(__dirname, 'generate_critical_infrastructure_data.js'), 'utf8');

const startMarker = '    // ─── SEWAGE TREATMENT PLANTS ───';
const startIndex = fileContent.indexOf(startMarker);

const endMarker = '    // ─── HYDROPOWER DAMS / RESERVOIRS ───';
const endIndex = fileContent.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find STP markers.");
  process.exit(1);
}

const before = fileContent.substring(0, startIndex);
const after = fileContent.substring(endIndex);

const stpString = '    // ─── SEWAGE TREATMENT PLANTS ───\n' + mappedSTP.map(r => '    ' + JSON.stringify(r, null, 4)).join(',\n') + ',\n\n';

const newContent = before + stpString + after;

fs.writeFileSync(path.join(__dirname, 'generate_critical_infrastructure_data.js'), newContent);
console.log("Successfully injected " + mappedSTP.length + " STP records into generate_critical_infrastructure_data.js");
