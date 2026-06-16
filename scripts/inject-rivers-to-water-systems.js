const fs = require('fs');
const path = require('path');

const EXPANDED_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/hydrology/rivers-streams-expanded.ts';
const WATER_SYSTEMS_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/water-systems.ts';

console.log('Reading expanded rivers database...');
const expandedContent = fs.readFileSync(EXPANDED_PATH, 'utf8');

const match = expandedContent.match(/export const riversStreamsExpandedRecords: RiverStreamRecord\[\] = (\[[\s\S]+?\]);/);
if (!match) {
  console.error('Could not find riversStreamsExpandedRecords.');
  process.exit(1);
}

const records = new Function(`return ${match[1]}`)();
console.log(`Successfully parsed ${records.length} records.`);

// Map each record to the WaterEntity structure
const mappedEntities = records.map(r => {
  const isLatNum = typeof r.Source_Latitude === 'number';
  const isLngNum = typeof r.Source_Longitude === 'number';
  const isElevNum = typeof r.Elevation_Max_m === 'number';
  const isLenNum = typeof r.Length_km === 'number';

  // Construct threats dynamically
  const threats = [];
  if (['High', 'Critical'].includes(r.Pollution_Risk)) threats.push('pollution');
  if (['High', 'Critical'].includes(r.Encroachment_Risk)) threats.push('encroachment');
  if (['High', 'Critical'].includes(r.Sand_Mining_Risk)) threats.push('sand-mining');
  if (['High', 'Critical'].includes(r.Erosion_Risk)) threats.push('bank-erosion');
  if (r.Glacierfed_Status === true) threats.push('climate-change');
  if (threats.length === 0) threats.push('climate-change');

  // Construct biodiversity
  const biodiversity = ['riverine-birds', 'aquatic-plants'];
  if (r.Aquatic_Biodiversity_Value === 'High' || r.Aquatic_Biodiversity_Value === 'Critical') {
    biodiversity.unshift('snow-trout', 'schizothorax');
  }

  // Verification status mapping
  let verStatus = 'under-review';
  if (r.Verification_Status === 'Verified') verStatus = 'verified';
  else if (r.Verification_Status === 'Source Linked') verStatus = 'reviewed';

  // Water quality status mapping
  const wqStatus = r.Water_Quality_Status.toLowerCase();
  const validWq = ['excellent', 'good', 'moderate', 'poor', 'critical'].includes(wqStatus) ? wqStatus : 'moderate';

  return {
    id: r.River_ID,
    slug: r.River_Name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    name: r.River_Name,
    type: r.River_or_Stream_Type.toLowerCase() === 'river' ? 'river' : 'stream',
    category: r.River_or_Stream_Type,
    description: r.Notes || `A ${r.River_or_Stream_Type.toLowerCase()} flowing through ${r.Districts_Crossed.join(', ')} in the ${r.Region} region.`,
    district: r.Districts_Crossed.length > 1 ? 'Multiple' : r.Districts_Crossed[0],
    watershed: r.Watershed,
    length: isLenNum ? r.Length_km : undefined,
    elevation: isElevNum ? r.Elevation_Max_m : 0,
    coordinates: (isLatNum && isLngNum) ? { lat: r.Source_Latitude, lng: r.Source_Longitude } : undefined,
    waterQuality: {
      pH: 7.4,
      dissolvedOxygen: 8.0,
      turbidity: 10,
      conductivity: 180,
      temperature: 12,
      nitrates: 0.8,
      phosphates: 0.06,
      biologicalOxygenDemand: 2.2,
      totalDissolvedSolids: 130,
      fecalColiform: 150,
      lastTested: '2026-03-15',
      status: validWq,
      trends: { pH: 'stable', dissolvedOxygen: 'stable', turbidity: 'stable' }
    },
    biodiversity,
    threats,
    hydrologicalData: {
      seasonalVariation: r.Perennial_or_Seasonal.toLowerCase() === 'perennial' ? 'perennial' : 'seasonal',
      source: r.Glacierfed_Status ? 'glacial' : (r.Springfed_Status ? 'groundwater' : 'mixed'),
      floodRisk: ['low', 'moderate', 'high', 'critical'].includes(r.Flood_Risk.toLowerCase()) ? r.Flood_Risk.toLowerCase() : 'moderate'
    },
    verificationStatus: verStatus,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-06-16T00:00:00Z'
  };
});

console.log('Reading water-systems.ts...');
const waterSystemsContent = fs.readFileSync(WATER_SYSTEMS_PATH, 'utf8');

// Find start and end of riversData
const startTag = 'export const riversData: WaterEntity[] = [';
const endTag = 'export const springsData: WaterEntity[] = [';

const startIdx = waterSystemsContent.indexOf(startTag);
if (startIdx === -1) {
  console.error('Could not find start index of riversData.');
  process.exit(1);
}

// Find the springsData array start, then find the last ]; before it
const nextArrayIdx = waterSystemsContent.indexOf(endTag);
if (nextArrayIdx === -1) {
  console.error('Could not find start of springsData.');
  process.exit(1);
}

const lastBracketIdx = waterSystemsContent.lastIndexOf('];', nextArrayIdx);
if (lastBracketIdx === -1 || lastBracketIdx < startIdx) {
  console.error('Could not find closing bracket of riversData.');
  process.exit(1);
}

const beforeRivers = waterSystemsContent.substring(0, startIdx + startTag.length);
const afterRivers = waterSystemsContent.substring(lastBracketIdx);

console.log('Replacing riversData with new mapped entities...');
const riversJson = JSON.stringify(mappedEntities, null, 2);
// Remove outer brackets from JSON string since we include them in the template
const innerJson = riversJson.substring(1, riversJson.length - 1);

const updatedContent = beforeRivers + innerJson + '\n' + afterRivers;

fs.writeFileSync(WATER_SYSTEMS_PATH, updatedContent, 'utf8');
console.log('Successfully updated water-systems.ts!');
