const fs = require('fs');
const path = require('path');

const EXPANDED_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/hydrology/groundwater-expanded.ts';
const WATER_SYSTEMS_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/water-systems.ts';

console.log('=== STARTING GROUNDWATER DATA MERGE ===');

// 1. Read and parse expanded groundwater records
console.log('Reading expanded groundwater database...');
const expandedContent = fs.readFileSync(EXPANDED_PATH, 'utf8');
const match = expandedContent.match(/export const groundwaterExpandedRecords: GroundwaterExpandedRecord\[\] = (\[[\s\S]+?\]);/);
if (!match) {
  console.error('Could not find groundwaterExpandedRecords in expanded file.');
  process.exit(1);
}

const expandedRecords = new Function(`return ${match[1]}`)();
console.log(`Successfully parsed ${expandedRecords.length} groundwater expanded records.`);

// 2. Map expanded records to WaterEntity structure
const mappedEntities = expandedRecords.map(gw => {
  const isLatNum = typeof gw.Latitude === 'number';
  const isLngNum = typeof gw.Longitude === 'number';
  const isElevNum = typeof gw.Elevation_m === 'number';
  const isTableDepthNum = typeof gw.Water_Table_Depth_m === 'number';
  const isRechargeNum = typeof gw.Recharge_Rate === 'number';

  // Map Water Quality Status
  const wqStatus = gw.Water_Quality_Status.toLowerCase();
  const validWq = ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'].includes(wqStatus) ? wqStatus : 'moderate';

  const waterQuality = {
    pH: typeof gw.pH === 'number' ? gw.pH : 7.2,
    dissolvedOxygen: 0, // Not applicable to deep groundwater
    turbidity: 1, // Low turbidity for filtered groundwater
    conductivity: typeof gw.Electrical_Conductivity === 'number' ? gw.Electrical_Conductivity : 400,
    temperature: 15, // Ground temp proxy
    nitrates: typeof gw.Nitrate === 'number' ? gw.Nitrate : null,
    phosphates: null,
    biologicalOxygenDemand: null,
    totalDissolvedSolids: typeof gw.TDS === 'number' ? gw.TDS : null,
    fecalColiform: typeof gw.Fecal_Coliform === 'number' ? gw.Fecal_Coliform : null,
    lastTested: '2026-06-16',
    status: validWq,
    trends: { pH: 'stable', dissolvedOxygen: 'stable', turbidity: 'stable' }
  };

  const hydrologicalData = {
    rechargeRate: isRechargeNum ? gw.Recharge_Rate : undefined,
    waterLevel: isTableDepthNum ? gw.Water_Table_Depth_m : undefined,
    seasonalVariation: 'perennial',
    source: 'groundwater',
    drainageArea: undefined,
    floodRisk: 'low'
  };

  let verStatus = 'under-review';
  if (gw.Verification_Status === 'Verified') verStatus = 'verified';
  else if (gw.Verification_Status === 'Source Linked') verStatus = 'reviewed';

  return {
    id: gw.Groundwater_ID,
    slug: gw.Groundwater_ID.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: gw.Record_Name,
    type: 'groundwater',
    category: gw.Record_Type,
    description: gw.Notes || `${gw.Record_Name} is a ${gw.Record_Type.toLowerCase()} located in ${gw.Village_or_Locality}, ${gw.District} (${gw.Region}). Taps the ${gw.Aquifer_Name}.`,
    district: gw.District,
    watershed: gw.Watershed !== 'Data Pending' && gw.Watershed !== 'Source Required' ? gw.Watershed : undefined,
    elevation: isElevNum ? gw.Elevation_m : 0,
    coordinates: (isLatNum && isLngNum) ? { lat: gw.Latitude, lng: gw.Longitude } : undefined,
    waterQuality,
    hydrologicalData,
    region: gw.Region,
    verificationStatus: verStatus,
    createdAt: '2026-06-16T00:00:00Z',
    updatedAt: '2026-06-16T00:00:00Z'
  };
});

// 3. Read water-systems.ts and inject
let content = fs.readFileSync(WATER_SYSTEMS_PATH, 'utf8');

// A. Inject 'groundwater' into WaterEntityType union
const typeUnionMatch = content.match(/export type WaterEntityType =[\s\S]+?;/);
if (typeUnionMatch && !typeUnionMatch[0].includes("'groundwater'")) {
  console.log("Adding 'groundwater' to WaterEntityType union...");
  content = content.replace(
    /export type WaterEntityType =([\s\S]+?)\| 'restoration-site';/,
    "export type WaterEntityType =$1| 'restoration-site'\n  | 'groundwater';"
  );
}

// B. Inject groundwaterData array
const dataVarStr = 'export const groundwaterData: WaterEntity[] = ';
if (content.includes('export const groundwaterData: WaterEntity[] =')) {
  console.log("Updating existing groundwaterData array...");
  const startIdx = content.indexOf('export const groundwaterData: WaterEntity[] =');
  const endIdx = content.indexOf('// Data access functions', startIdx);
  const closingBracketIdx = content.lastIndexOf('];', endIdx);
  
  const before = content.substring(0, startIdx);
  const after = content.substring(closingBracketIdx + 2);
  
  content = before + dataVarStr + JSON.stringify(mappedEntities, null, 2) + ';' + after;
} else {
  console.log("Injecting new groundwaterData array...");
  const insertIdx = content.indexOf('// Data access functions');
  if (insertIdx === -1) {
    console.error('Could not find // Data access functions section in water-systems.ts');
    process.exit(1);
  }
  
  const before = content.substring(0, insertIdx);
  const after = content.substring(insertIdx);
  
  content = before + dataVarStr + JSON.stringify(mappedEntities, null, 2) + ';\n\n' + after;
}

// C. Inject groundwater: { ... } in getWaterEntities
if (!content.includes('groundwater: {')) {
  console.log("Injecting getWaterEntities.groundwater accessor...");
  const getEntitiesStart = content.indexOf('export const getWaterEntities = {');
  const insertionPoint = content.indexOf('  all: {', getEntitiesStart);
  
  const before = content.substring(0, insertionPoint);
  const after = content.substring(insertionPoint);
  
  const groundwaterAccessor = `  groundwater: {
    all: () => groundwaterData,
    bySlug: (slug: string) => groundwaterData.find(g => g.slug === slug),
    byDistrict: (district: string) => groundwaterData.filter(g => g.district === district),
    byCategory: (category: string) => groundwaterData.filter(g => g.category === category),
  },\n`;
  
  content = before + groundwaterAccessor + after;
}

// D. Inject 'groundwater' in all.byType
if (!content.includes("case 'groundwater': return groundwaterData;")) {
  console.log("Injecting case 'groundwater' in all.byType...");
  content = content.replace(
    "        case 'restoration-site': return restorationSites;",
    "        case 'restoration-site': return restorationSites;\n        case 'groundwater': return groundwaterData;"
  );
}

// E. Inject groundwaterData in all.byDistrict
if (!content.includes("...groundwaterData.filter(g => g.district === district),")) {
  console.log("Injecting groundwaterData in all.byDistrict...");
  content = content.replace(
    "      ...glaciersData.filter(g => g.district === district),",
    "      ...glaciersData.filter(g => g.district === district),\n      ...groundwaterData.filter(g => g.district === district),"
  );
}

// F. Inject groundwaterData in all.byWatershed
if (!content.includes("...groundwaterData.filter(g => g.watershed === watershed),")) {
  console.log("Injecting groundwaterData in all.byWatershed...");
  content = content.replace(
    "      ...watershedsData.filter(w => w.watershed === watershed),",
    "      ...watershedsData.filter(w => w.watershed === watershed),\n      ...groundwaterData.filter(g => g.watershed === watershed),"
  );
}

// G. Inject totalGroundwater in updatedWaterSystemsMetrics
if (!content.includes('totalGroundwater:')) {
  console.log("Injecting totalGroundwater into updatedWaterSystemsMetrics...");
  const metricsStart = content.indexOf('export const updatedWaterSystemsMetrics = {');
  const insertionPoint = content.indexOf('  totalWaterEntities:', metricsStart);
  
  const before = content.substring(0, insertionPoint);
  const after = content.substring(insertionPoint);
  
  content = before + '  totalGroundwater: groundwaterData.length,\n' + after;
  
  // Also add it to the sum in totalWaterEntities
  content = content.replace(
    '+ glaciersData.length,',
    '+ glaciersData.length + groundwaterData.length,'
  );
}

fs.writeFileSync(WATER_SYSTEMS_PATH, content, 'utf8');
console.log('=== GROUNDWATER DATA MERGE COMPLETED SUCCESSFULLY ===');
