const fs = require('fs');
const path = require('path');

const drinkingWaterQualityCards = [
  // KASHMIR CORE
  { id: "DW-KC-001", title: "Tap Water Quality", name: "Srinagar Interconnected Grid", scope: "Kashmir Core", district: "Srinagar", riskLevel: "Low Risk", supplyType: "Surface Water Source", urbanRural: "Urban", testingCoverage: "NABL District Lab", treatmentStatus: "Treated Piped Supply", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Turbidity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-KC-002", title: "Tap Water Quality", name: "Ganderbal Interconnected Grid", scope: "Kashmir Core", district: "Ganderbal", riskLevel: "Low Risk", supplyType: "Surface Water Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Treated Piped Supply", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Turbidity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-KC-003", title: "Tap Water Quality", name: "Bandipora Interconnected Grid", scope: "Kashmir Core", district: "Bandipora", riskLevel: "Low Risk", supplyType: "Surface Water Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Turbidity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-KC-004", title: "Tap Water Quality", name: "Baramulla Interconnected Grid", scope: "Kashmir Core", district: "Baramulla", riskLevel: "Low Risk", supplyType: "Surface Water Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Turbidity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-KC-005", title: "Tap Water Quality", name: "Kupwara Interconnected Grid", scope: "Kashmir Core", district: "Kupwara", riskLevel: "Low Risk", supplyType: "Spring Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Turbidity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-KC-006", title: "Tap Water Quality", name: "Budgam Interconnected Grid", scope: "Kashmir Core", district: "Budgam", riskLevel: "Moderate Risk", supplyType: "Mixed Source Network", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Nitrate / Turbidity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-CGWB-JK-GWQ" },
  { id: "DW-KC-007", title: "Tap Water Quality", name: "Pulwama Interconnected Grid", scope: "Kashmir Core", district: "Pulwama", riskLevel: "Moderate Risk", supplyType: "Groundwater Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Nitrate", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-CGWB-JK-GWQ" },
  { id: "DW-KC-008", title: "Tap Water Quality", name: "Shopian Interconnected Grid", scope: "Kashmir Core", district: "Shopian", riskLevel: "Low Risk", supplyType: "Spring Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Turbidity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-KC-009", title: "Tap Water Quality", name: "Kulgam Interconnected Grid", scope: "Kashmir Core", district: "Kulgam", riskLevel: "Low Risk", supplyType: "Spring Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Turbidity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-KC-010", title: "Tap Water Quality", name: "Anantnag Interconnected Grid", scope: "Kashmir Core", district: "Anantnag", riskLevel: "Low Risk", supplyType: "Spring Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Turbidity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },

  // TRANS-DIVISIONAL
  { id: "DW-TD-001", title: "Tap Water Quality", name: "Jammu Interconnected Grid", scope: "Trans-Divisional", district: "Jammu", riskLevel: "Moderate Risk", supplyType: "Mixed Source Network", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Nitrate / Turbidity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-CGWB-JK-GWQ" },
  { id: "DW-TD-002", title: "Tap Water Quality", name: "Udhampur Interconnected Grid", scope: "Trans-Divisional", district: "Udhampur", riskLevel: "Low Risk", supplyType: "Groundwater Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "TDS", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-TD-003", title: "Tap Water Quality", name: "Kathua Interconnected Grid", scope: "Trans-Divisional", district: "Kathua", riskLevel: "Moderate Risk", supplyType: "Groundwater Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Turbidity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-TD-004", title: "Tap Water Quality", name: "Samba Interconnected Grid", scope: "Trans-Divisional", district: "Samba", riskLevel: "Moderate Risk", supplyType: "Groundwater Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Nitrate", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-CGWB-JK-GWQ" },
  { id: "DW-TD-005", title: "Tap Water Quality", name: "Reasi Interconnected Grid", scope: "Trans-Divisional", district: "Reasi", riskLevel: "Low Risk", supplyType: "Spring Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "TDS", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-TD-006", title: "Tap Water Quality", name: "Ramban Interconnected Grid", scope: "Trans-Divisional", district: "Ramban", riskLevel: "Moderate Risk", supplyType: "Spring Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Turbidity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-TD-007", title: "Tap Water Quality", name: "Doda Interconnected Grid", scope: "Trans-Divisional", district: "Doda", riskLevel: "Moderate Risk", supplyType: "Spring Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Turbidity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-TD-008", title: "Tap Water Quality", name: "Kishtwar Interconnected Grid", scope: "Trans-Divisional", district: "Kishtwar", riskLevel: "Moderate Risk", supplyType: "Spring Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Turbidity", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-TD-009", title: "Tap Water Quality", name: "Rajouri Interconnected Grid", scope: "Trans-Divisional", district: "Rajouri", riskLevel: "Low Risk", supplyType: "Spring Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "TDS", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-TD-010", title: "Tap Water Quality", name: "Poonch Interconnected Grid", scope: "Trans-Divisional", district: "Poonch", riskLevel: "Low Risk", supplyType: "Groundwater Source", urbanRural: "Mixed", testingCoverage: "NABL District Lab", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "TDS", confidence: "Medium", dashboardLocked: false, sourceId: "SRC-JJM-WQMIS-JK" },
  { id: "DW-TD-011", title: "Tap Water Quality", name: "Leh Interconnected Grid", scope: "Trans-Divisional", district: "Leh", riskLevel: "Moderate Risk", supplyType: "Groundwater Source", urbanRural: "Mixed", testingCoverage: "District Lab / Source Required", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "Turbidity", confidence: "Low", dashboardLocked: true, sourceId: "SRC-LADAKH-WQ-PENDING" },
  { id: "DW-TD-012", title: "Tap Water Quality", name: "Kargil Interconnected Grid", scope: "Trans-Divisional", district: "Kargil", riskLevel: "Low Risk", supplyType: "Groundwater Source", urbanRural: "Mixed", testingCoverage: "District Lab / Source Required", treatmentStatus: "Partially Treated", chlorinationStatus: "Monitored", priorityLevel: "Strategic", mainRisk: "TDS", confidence: "Low", dashboardLocked: true, sourceId: "SRC-LADAKH-WQ-PENDING" },

  // TRANSBOUNDARY / EXTENDED
  { id: "DW-TB-001", title: "Tap Water Quality", name: "Muzaffarabad Interconnected Grid", scope: "Transboundary / Extended", district: "Muzaffarabad", riskLevel: "Pending Verification", supplyType: "Surface Water Source", urbanRural: "Mixed", testingCoverage: "Source Required", treatmentStatus: "Source Required", chlorinationStatus: "Source Required", priorityLevel: "Strategic", mainRisk: "Source Required", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-AJK-WQ-PENDING" },
  { id: "DW-TB-002", title: "Tap Water Quality", name: "Mirpur Interconnected Grid", scope: "Transboundary / Extended", district: "Mirpur", riskLevel: "Pending Verification", supplyType: "Surface Water Source", urbanRural: "Mixed", testingCoverage: "Source Required", treatmentStatus: "Source Required", chlorinationStatus: "Source Required", priorityLevel: "Strategic", mainRisk: "Source Required", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-AJK-WQ-PENDING" },
  { id: "DW-TB-003", title: "Tap Water Quality", name: "Gilgit Interconnected Grid", scope: "Transboundary / Extended", district: "Gilgit", riskLevel: "Pending Verification", supplyType: "Surface Water Source", urbanRural: "Mixed", testingCoverage: "Source Required", treatmentStatus: "Source Required", chlorinationStatus: "Source Required", priorityLevel: "Strategic", mainRisk: "Source Required", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-GB-WQ-PENDING" },
  { id: "DW-TB-004", title: "Tap Water Quality", name: "Skardu Interconnected Grid", scope: "Transboundary / Extended", district: "Skardu", riskLevel: "Pending Verification", supplyType: "Surface Water Source", urbanRural: "Mixed", testingCoverage: "Source Required", treatmentStatus: "Source Required", chlorinationStatus: "Source Required", priorityLevel: "Strategic", mainRisk: "Source Required", confidence: "Pending", dashboardLocked: true, sourceId: "SRC-GB-WQ-PENDING" }
];

const mappedCards = drinkingWaterQualityCards.map(c => {
  return {
    id: c.id,
    scope: c.scope,
    district: c.district,
    urban_rural: c.urbanRural,
    area: c.name,
    supply_type: c.supplyType,
    quality_issue: c.mainRisk,
    risk_level: c.riskLevel.replace(' Risk', ''),
    testing_coverage: c.testingCoverage,
    treatment_status: c.treatmentStatus,
    chlorination_status: c.chlorinationStatus,
    priority_level: c.priorityLevel,
    evidence_confidence: c.confidence,
    description: c.dashboardLocked ? 'Pending Verification via ' + c.sourceId : 'Monitored via ' + c.sourceId
  };
});

const fileContent = fs.readFileSync(path.join(__dirname, 'generate_drinking_water_data.js'), 'utf8');

// We need to replace the auto-generation block:
// // Replicate missing districts to ensure module feels complete
// ... down to ...
// let out = "export type Scope = ...

const startMarker = '// Replicate missing districts to ensure module feels complete';
const startIndex = fileContent.indexOf(startMarker);
const endMarker = 'let out = "export type Scope =';
const endIndex = fileContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find generation block markers.");
  process.exit(1);
}

const before = fileContent.substring(0, startIndex);
const after = fileContent.substring(endIndex);

const newInjection = `// ─── INJECTED DATA CARDS ───
const newCards = ${JSON.stringify(mappedCards, null, 4)};
records.push(...newCards);

`;

// We also need to update the risk_level type definition in `out += ...` to allow 'Pending Verification'
// Let's replace `'Critical' | 'High' | 'Moderate' | 'Low'` with `'Critical' | 'High' | 'Moderate' | 'Low' | 'Pending Verification'`
const newAfter = after.replace("'Critical' | 'High' | 'Moderate' | 'Low'", "'Critical' | 'High' | 'Moderate' | 'Low' | 'Pending Verification'");

const newContent = before + newInjection + newAfter;

fs.writeFileSync(path.join(__dirname, 'generate_drinking_water_data.js'), newContent);
console.log("Successfully injected " + mappedCards.length + " cards into generate_drinking_water_data.js");
