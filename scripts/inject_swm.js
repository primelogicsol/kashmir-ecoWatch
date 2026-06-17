const fs = require('fs');
const path = require('path');

const solidWasteLandfillsDumpsites = [
  {
    id: "SWD-KC-001", name: "Achan Waste Management Facility", category: "Solid Waste Landfills / Dumpsites", scope: "Kashmir Core", district: "Srinagar", priority: "Critical Priority", designCapacity: "500 TPD", currentLoad: "1100 TPD (Overloaded)", operationalStatus: "Critical / Overloaded", efficiency: "Biomining progress slow", serviceArea: "Srinagar City", riskExposure: "Critical", riskDrivers: "Leachate / Odour / legacy waste / overcapacity", confidence: "High", dashboardLocked: false, sourceId: "SRC-SMC-ACHAN"
  },
  {
    id: "SWD-KC-002", name: "Saidpora / Achan Legacy Dump Zone", category: "Solid Waste Landfills / Dumpsites", scope: "Kashmir Core", district: "Srinagar", priority: "Critical Priority", designCapacity: "Data Pending", currentLoad: "Legacy Waste Accumulation", operationalStatus: "Active Legacy Dump Interface", efficiency: "Source Required", serviceArea: "Srinagar City / Saidpora belt", riskExposure: "Critical", riskDrivers: "Legacy waste / leachate / odour / residential exposure", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-SMC-ACHAN-LEGACY"
  },
  {
    id: "SWD-KC-003", name: "Anantnag Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Kashmir Core", district: "Anantnag", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Anantnag Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Urban solid waste disposal site requires official location and capacity verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-KC-ANANTNAG-SWM-PENDING"
  },
  {
    id: "SWD-KC-004", name: "Baramulla Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Kashmir Core", district: "Baramulla", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Baramulla Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Jhelum corridor waste-disposal risk requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-KC-BARAMULLA-SWM-PENDING"
  },
  {
    id: "SWD-KC-005", name: "Sopore Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Kashmir Core", district: "Baramulla", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Sopore Town", riskExposure: "Pending Verification", riskDrivers: "Urban waste load / wetland and Jhelum-linked sensitivity", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-KC-SOPORE-SWM-PENDING"
  },
  {
    id: "SWD-KC-006", name: "Kupwara Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Kashmir Core", district: "Kupwara", priority: "Moderate Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Kupwara Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Mountain town waste-disposal verification required", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-KC-KUPWARA-SWM-PENDING"
  },
  {
    id: "SWD-KC-007", name: "Bandipora Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Kashmir Core", district: "Bandipora", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Bandipora Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Wular basin solid waste sensitivity requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-KC-BANDIPORA-SWM-PENDING"
  },
  {
    id: "SWD-KC-008", name: "Ganderbal Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Kashmir Core", district: "Ganderbal", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Ganderbal Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Sindh River / drinking-water corridor sensitivity", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-KC-GANDERBAL-SWM-PENDING"
  },
  {
    id: "SWD-KC-009", name: "Budgam Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Kashmir Core", district: "Budgam", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Budgam Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Doodhganga / urban expansion waste pressure requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-KC-BUDGAM-SWM-PENDING"
  },
  {
    id: "SWD-KC-010", name: "Pulwama Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Kashmir Core", district: "Pulwama", priority: "Moderate Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Pulwama Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Agricultural belt and stream-linked disposal risk requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-KC-PULWAMA-SWM-PENDING"
  },
  {
    id: "SWD-KC-011", name: "Shopian Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Kashmir Core", district: "Shopian", priority: "Moderate Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Shopian Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Rambiara / mountain catchment sensitivity requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-KC-SHOPIAN-SWM-PENDING"
  },
  {
    id: "SWD-KC-012", name: "Kulgam Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Kashmir Core", district: "Kulgam", priority: "Moderate Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Kulgam Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Vishav basin and urban waste disposal verification required", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-KC-KULGAM-SWM-PENDING"
  },
  {
    id: "SWD-TD-001", name: "Kot Bhalwal Solid Waste Facility", category: "Solid Waste Landfills / Dumpsites", scope: "Trans-Divisional", district: "Jammu", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Active / Source Verification Required", efficiency: "Source Required", serviceArea: "Jammu City", riskExposure: "High", riskDrivers: "Urban waste load / leachate / Tawi basin sensitivity", confidence: "Medium", dashboardLocked: true, sourceId: "SRC-JMC-KOT-BHALWAL"
  },
  {
    id: "SWD-TD-002", name: "Jammu Legacy Dumpsite / Processing Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Trans-Divisional", district: "Jammu", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Jammu Municipal Corporation Area", riskExposure: "Pending Verification", riskDrivers: "Legacy waste and processing site verification required", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-JMC-SWM-PENDING"
  },
  {
    id: "SWD-TD-003", name: "Udhampur Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Trans-Divisional", district: "Udhampur", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Udhampur Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Mountain urban waste-disposal verification required", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-TD-UDHAMPUR-SWM-PENDING"
  },
  {
    id: "SWD-TD-004", name: "Kathua Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Trans-Divisional", district: "Kathua", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Kathua Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Industrial and urban waste interface requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-TD-KATHUA-SWM-PENDING"
  },
  {
    id: "SWD-TD-005", name: "Samba Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Trans-Divisional", district: "Samba", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Samba Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Industrial corridor / municipal waste interface requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-TD-SAMBA-SWM-PENDING"
  },
  {
    id: "SWD-TD-006", name: "Reasi Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Trans-Divisional", district: "Reasi", priority: "Moderate Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Reasi Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Pilgrimage and Chenab corridor waste pressure requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-TD-REASI-SWM-PENDING"
  },
  {
    id: "SWD-TD-007", name: "Doda Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Trans-Divisional", district: "Doda", priority: "Moderate Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Doda Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Chenab mountain settlement waste risk requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-TD-DODA-SWM-PENDING"
  },
  {
    id: "SWD-TD-008", name: "Kishtwar Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Trans-Divisional", district: "Kishtwar", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Kishtwar Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Chenab hydropower corridor and mountain waste pressure requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-TD-KISHTWAR-SWM-PENDING"
  },
  {
    id: "SWD-TD-009", name: "Rajouri Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Trans-Divisional", district: "Rajouri", priority: "Moderate Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Rajouri Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Urban waste and stream-corridor risk requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-TD-RAJOURI-SWM-PENDING"
  },
  {
    id: "SWD-TD-010", name: "Poonch Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Trans-Divisional", district: "Poonch", priority: "Moderate Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Poonch Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Poonch River basin waste risk requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-TD-POONCH-SWM-PENDING"
  },
  {
    id: "SWD-TD-011", name: "Leh Solid Waste Management Facility Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Trans-Divisional", district: "Leh", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Leh Urban / Tourism Belt", riskExposure: "High", riskDrivers: "Cold desert ecology / tourism waste / groundwater vulnerability", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-LADAKH-LEH-SWM-PENDING"
  },
  {
    id: "SWD-TD-012", name: "Kargil Solid Waste Management Facility Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Trans-Divisional", district: "Kargil", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Kargil Urban Area", riskExposure: "High", riskDrivers: "Cold-region waste pressure / Suru basin sensitivity", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-LADAKH-KARGIL-SWM-PENDING"
  },
  {
    id: "SWD-TB-001", name: "Muzaffarabad Municipal Waste Disposal System", category: "Solid Waste Landfills / Dumpsites", scope: "Transboundary / Extended", district: "Muzaffarabad", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "50–55 TPD collected daily", operationalStatus: "Active Collection / Disposal System", efficiency: "Source Required", serviceArea: "Muzaffarabad Municipal Area", riskExposure: "High", riskDrivers: "Jhelum-Neelum confluence sensitivity / disposal method requires verification", confidence: "High", dashboardLocked: false, sourceId: "SRC-MCMZD-WASTE"
  },
  {
    id: "SWD-TB-002", name: "Skardu Municipal Solid Waste Disposal System", category: "Solid Waste Landfills / Dumpsites", scope: "Transboundary / Extended", district: "Skardu", priority: "Strategic Priority", designCapacity: "Data Pending", currentLoad: "45–55 TPD seasonal range", operationalStatus: "Active Collection / Dumping System", efficiency: "Corrective measures required", serviceArea: "Skardu Municipal Area", riskExposure: "High", riskDrivers: "Tourism pressure / mountain surface process sensitivity / open dumping concerns", confidence: "High", dashboardLocked: false, sourceId: "SRC-PPAS-SKARDU-SWM"
  },
  {
    id: "SWD-TB-003", name: "Gilgit Solid Waste Segregation / Collection Site", category: "Solid Waste Landfills / Dumpsites", scope: "Transboundary / Extended", district: "Gilgit", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Active Collection / Segregation Interface", efficiency: "Segregation machine installed", serviceArea: "Gilgit Municipal Area", riskExposure: "Moderate", riskDrivers: "Plastic and paper waste segregation / disposal-site linkage pending", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-NESTLE-GBWMC-GILGIT"
  },
  {
    id: "SWD-TB-004", name: "GBWMC Skardu Disposal / Collection Network", category: "Solid Waste Landfills / Dumpsites", scope: "Transboundary / Extended", district: "Skardu", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "45–55 TPD seasonal range", operationalStatus: "Active", efficiency: "Manual collection and dumping system", serviceArea: "Skardu Municipal Area", riskExposure: "High", riskDrivers: "Waste growth rate / tourism pressure / dumping-site impacts", confidence: "High", dashboardLocked: false, sourceId: "SRC-PPAS-SKARDU-SWM"
  },
  {
    id: "SWD-TB-005", name: "Mirpur Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Transboundary / Extended", district: "Mirpur", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Mirpur Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Mangla reservoir-linked urban waste risk requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-AJK-MIRPUR-SWM-PENDING"
  },
  {
    id: "SWD-TB-006", name: "Kotli Municipal Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Transboundary / Extended", district: "Kotli", priority: "Moderate Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Kotli Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Poonch-Jhelum basin disposal site requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-AJK-KOTLI-SWM-PENDING"
  },
  {
    id: "SWD-TB-007", name: "Rawalakot / Poonch AJK Dumpsite Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Transboundary / Extended", district: "Poonch AJK", priority: "Moderate Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Rawalakot / Poonch Municipal Area", riskExposure: "Pending Verification", riskDrivers: "Mountain town waste-disposal verification required", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-AJK-POONCH-SWM-PENDING"
  },
  {
    id: "SWD-TB-008", name: "Hunza Solid Waste Management Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Transboundary / Extended", district: "Hunza", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Hunza / Tourism Settlements", riskExposure: "High", riskDrivers: "Tourism waste / mountain-stream and landslide-lake sensitivity", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-GB-HUNZA-SWM-PENDING"
  },
  {
    id: "SWD-TB-009", name: "Diamer / Chilas Solid Waste Registry", category: "Solid Waste Landfills / Dumpsites", scope: "Transboundary / Extended", district: "Diamer", priority: "High Priority", designCapacity: "Data Pending", currentLoad: "Data Pending", operationalStatus: "Source Required", efficiency: "Source Required", serviceArea: "Chilas / Diamer Urban Area", riskExposure: "Pending Verification", riskDrivers: "Indus corridor / highway settlement waste risk requires verification", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-GB-DIAMER-SWM-PENDING"
  }
];

const mappedSWM = solidWasteLandfillsDumpsites.map(h => {
  return {
    id: h.id,
    asset_name: h.name,
    asset_type: h.category,
    scope: h.scope,
    division_region: h.scope === 'Transboundary / Extended' ? (h.district === 'Muzaffarabad' || h.district === 'Mirpur' || h.district === 'Kotli' || h.district.includes('AJK') ? 'AJK' : 'GB') : (h.scope === 'Kashmir Core' ? 'Kashmir Valley' : (h.district === 'Leh' || h.district === 'Kargil' ? 'Ladakh' : 'Jammu')),
    district: h.district,
    city_or_authority: h.sourceId.split('-')[1] || 'Authority',
    ward_or_service_area: h.serviceArea,
    operator: h.sourceId.split('-')[1] || 'Authority',
    source_or_catchment: 'Urban Solid Waste',
    design_capacity: h.designCapacity,
    current_load: h.currentLoad,
    utilization_percent: 'N/A',
    treatment_technology: 'Waste Management / Dumping',
    operational_status: h.operationalStatus,
    treatment_efficiency: h.efficiency,
    management_efficiency: h.efficiency === 'Source Required' || h.efficiency === 'Data Pending' || h.efficiency === 'N/A' ? 'Pending' : 'High',
    risk_exposure: h.riskExposure + (h.riskDrivers ? ' (' + h.riskDrivers + ')' : ''),
    receiving_waterbody: 'Land / Groundwater Risk',
    served_population: 'N/A',
    last_upgrade_year: 'N/A',
    priority_level: h.priority
  };
});

const fileContent = fs.readFileSync(path.join(__dirname, 'generate_critical_infrastructure_data.js'), 'utf8');

const startMarker = '    // ─── SOLID WASTE / DUMPSITES ───';
const startIndex = fileContent.indexOf(startMarker);

const endMarker = '    // ─── SEWAGE TREATMENT PLANTS ───';
const endIndex = fileContent.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find SWM markers.");
  process.exit(1);
}

const before = fileContent.substring(0, startIndex);
const after = fileContent.substring(endIndex);

const swmString = '    // ─── SOLID WASTE / DUMPSITES ───\n' + mappedSWM.map(r => '    ' + JSON.stringify(r, null, 4)).join(',\n') + ',\n\n';

const newContent = before + swmString + after;

fs.writeFileSync(path.join(__dirname, 'generate_critical_infrastructure_data.js'), newContent);
console.log("Successfully injected " + mappedSWM.length + " SWM records into generate_critical_infrastructure_data.js");
