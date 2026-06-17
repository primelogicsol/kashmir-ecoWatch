const fs = require('fs');
const path = require('path');

const EXPANDED_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/hydrology/glaciers.ts';
const WATER_SYSTEMS_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/water-systems.ts';

console.log('=== STARTING GLACIERS DATA MERGE ===');

// 1. Read and parse glaciers records
console.log('Reading expanded glaciers database...');
const expandedContent = fs.readFileSync(EXPANDED_PATH, 'utf8');
const match = expandedContent.match(/export const glaciersRecords: MigratedWaterRecord\[\] = (\[[\s\S]+?\]);/);
if (!match) {
  console.error('Could not find glaciersRecords in expanded file.');
  process.exit(1);
}

const expandedRecords = new Function(`return ${match[1]}`)();
console.log(`Successfully parsed ${expandedRecords.length} glacier records.`);

// 2. Map expanded records to WaterEntity structure
const mappedEntities = expandedRecords.map(gl => {
  const isLatNum = gl.coordinates && typeof gl.coordinates.lat === 'number';
  const isLngNum = gl.coordinates && typeof gl.coordinates.lng === 'number';
  const isElevNum = typeof gl.elevation === 'number';
  const isAreaNum = typeof gl.area === 'number';

  // Extract threats from description/notes or set defaults
  const threats = ['climate-change', 'glacial-retreat'];
  if (gl.description.toLowerCase().includes('touris') || gl.description.toLowerCase().includes('pilgrim')) {
    threats.push('tourism-pressure');
  }
  if (gl.description.toLowerCase().includes('carbon')) {
    threats.push('black-carbon-deposition');
  }
  if (gl.description.toLowerCase().includes('strategic') || gl.description.toLowerCase().includes('development')) {
    threats.push('strategic-development');
  }

  let verStatus = 'under-review';
  if (gl.Verification_Status === 'Verified') verStatus = 'verified';
  else if (gl.Verification_Status === 'Source Linked') verStatus = 'reviewed';

  return {
    id: gl.id,
    slug: gl.slug,
    name: gl.name,
    type: 'glacier',
    category: gl.category,
    description: gl.description,
    district: gl.district,
    watershed: gl.watershed !== 'Pending' ? gl.watershed : undefined,
    area: isAreaNum ? gl.area : undefined,
    elevation: isElevNum ? gl.elevation : 0,
    coordinates: (isLatNum && isLngNum) ? { lat: gl.coordinates.lat, lng: gl.coordinates.lng } : undefined,
    hydrologicalData: {
      seasonalVariation: 'seasonal',
      source: 'glacial',
      floodRisk: gl.area > 50 ? 'high' : 'low'
    },
    threats,
    verificationStatus: verStatus,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-06-16T00:00:00Z'
  };
});

// 3. Read water-systems.ts and replace glaciersData array
let content = fs.readFileSync(WATER_SYSTEMS_PATH, 'utf8');

const startTag = 'export const glaciersData: WaterEntity[] = [';
const endTag = '// ============================================================================'; // Separator for water quality sites

const startIdx = content.indexOf(startTag);
if (startIdx === -1) {
  console.error('Could not find export const glaciersData in water-systems.ts');
  process.exit(1);
}

const endIdx = content.indexOf(endTag, startIdx);
if (endIdx === -1) {
  console.error('Could not find end of glaciers section in water-systems.ts');
  process.exit(1);
}

const closingBracketIdx = content.lastIndexOf('];', endIdx);

const before = content.substring(0, startIdx + startTag.length);
const after = content.substring(closingBracketIdx);

const newJson = JSON.stringify(mappedEntities, null, 2);
const innerJson = newJson.substring(1, newJson.length - 1); // remove outer brackets

content = before + innerJson + '\n' + after;

// 4. Update updatedWaterSystemsMetrics totalGlaciers and totalWaterEntities
console.log('Updating updatedWaterSystemsMetrics counts...');
const totalGlaciersMatch = content.match(/totalGlaciers:\s*(\d+)/);
if (totalGlaciersMatch) {
  content = content.replace(/totalGlaciers:\s*\d+/, `totalGlaciers: ${mappedEntities.length}`);
}

fs.writeFileSync(WATER_SYSTEMS_PATH, content, 'utf8');
console.log('=== GLACIERS DATA MERGE COMPLETED SUCCESSFULLY ===');
