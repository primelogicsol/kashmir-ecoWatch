const fs = require('fs');

// 1. Load local species
let content = fs.readFileSync('C:\\Users\\Fayaz\\Sufipulseupdate2026\\KEW 2026\\kashmir-ecoWatch\\src/data/species/birds.ts', 'utf8');
content = content.replace(/import\s+[\s\S]*?;/g, '');
content = content.replace(/:\s*BiodiversitySpecies\[\]/g, '');
const sandbox = {};
const jsContent = content.replace(/export\s+const/g, 'sandbox.');
eval(jsContent);
const localSpecies = sandbox.birdsPhase1;

// 2. Load Avibase species
const avibaseHtmlPath = 'C:\\Users\\Fayaz\\.gemini\\antigravity-cli\\brain\\2f702963-7bcc-47d5-9cf9-4db320a60d31\\avibase_checklist.html';
const html = fs.readFileSync(avibaseHtmlPath, 'utf8');
const trs = html.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];

let currentOrder = '';
let currentFamily = '';
const avibaseSpecies = [];

for (const tr of trs) {
  const headingMatch = tr.match(/<b>([A-Z\s]+):\s*([A-Za-z\s]+)<\/b>/i);
  if (headingMatch) {
    currentOrder = headingMatch[1].trim();
    currentFamily = headingMatch[2].trim();
    continue;
  }
  const tds = tr.match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
  if (tds && tds.length >= 2) {
    const td0 = tds[0].replace(/<[^>]+>/g, '').trim();
    const td1 = tds[1].replace(/<[^>]+>/g, '').trim();
    const td2 = tds.length > 2 ? tds[2].replace(/<[^>]+>/g, '').trim() : '';

    if (td0 && td1 && !td0.includes('&nbsp;') && !td0.startsWith('Change display options')) {
      avibaseSpecies.push({
        commonName: td0,
        scientificName: td1,
        notes: td2,
        order: currentOrder,
        family: currentFamily
      });
    }
  }
}

console.log('Local species count:', localSpecies.length);
console.log('Avibase species count:', avibaseSpecies.length);

// Helper to normalize names for comparison
function normalize(name) {
  if (!name) return '';
  return name.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/gray/g, 'grey');
}

// 3. Match
let exactMatches = 0;
let normalizedMatches = 0;
const matchedLocalIds = new Set();
const matchedAvibaseIndices = new Set();

const matches = [];

// Exact match first
for (const local of localSpecies) {
  const avibaseMatch = avibaseSpecies.find((av, idx) => {
    if (matchedAvibaseIndices.has(idx)) return false;
    return local.commonName.toLowerCase() === av.commonName.toLowerCase();
  });

  if (avibaseMatch) {
    exactMatches++;
    const idx = avibaseSpecies.indexOf(avibaseMatch);
    matchedAvibaseIndices.add(idx);
    matchedLocalIds.add(local.id);
    matches.push({ local, avibase: avibaseMatch, type: 'exact' });
  }
}

// Normalized match second
for (const local of localSpecies) {
  if (matchedLocalIds.has(local.id)) continue;

  const localNorm = normalize(local.commonName);
  const avibaseMatch = avibaseSpecies.find((av, idx) => {
    if (matchedAvibaseIndices.has(idx)) return false;
    return normalize(av.commonName) === localNorm;
  });

  if (avibaseMatch) {
    normalizedMatches++;
    const idx = avibaseSpecies.indexOf(avibaseMatch);
    matchedAvibaseIndices.add(idx);
    matchedLocalIds.add(local.id);
    matches.push({ local, avibase: avibaseMatch, type: 'normalized' });
  }
}

console.log('Exact Matches:', exactMatches);
console.log('Normalized Matches:', normalizedMatches);
console.log('Total Matches:', exactMatches + normalizedMatches);
console.log('Unmatched Local Species:', localSpecies.length - (exactMatches + normalizedMatches));
console.log('Unmatched Avibase Species:', avibaseSpecies.length - (exactMatches + normalizedMatches));

// Print a few unmatched local species to see what they look like
const unmatchedLocal = localSpecies.filter(l => !matchedLocalIds.has(l.id));
console.log('Sample unmatched local species (first 20):');
console.log(unmatchedLocal.slice(0, 20).map(l => ({ id: l.id, commonName: l.commonName })));
