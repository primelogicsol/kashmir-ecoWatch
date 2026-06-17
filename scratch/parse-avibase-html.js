const fs = require('fs');
const path = require('path');

const htmlPath = 'C:\\Users\\Fayaz\\.gemini\\antigravity-cli\\brain\\2f702963-7bcc-47d5-9cf9-4db320a60d31\\avibase_checklist.html';
const html = fs.readFileSync(htmlPath, 'utf8');

// Regex for headings: <tr valign=bottom><td colspan=3><P>&nbsp;<br><b>([A-Z]+): ([A-Za-z]+)</b></P></td></tr>
// Wait, the heading format might vary slightly. Let's match <b>([A-Z]+: [A-Za-z]+)</b> or similar
// Let's do a line-by-line or tag-by-tag sweep.
const trs = html.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
console.log('Total <tr> elements found:', trs.length);

let currentOrder = '';
let currentFamily = '';
const parsedSpecies = [];

for (const tr of trs) {
  // Check if it's a heading
  const headingMatch = tr.match(/<b>([A-Z\s]+):\s*([A-Za-z\s]+)<\/b>/i);
  if (headingMatch) {
    currentOrder = headingMatch[1].trim();
    currentFamily = headingMatch[2].trim();
    continue;
  }

  // Check if it's a species row
  // <tr class='...'><td>Common Name</td><td><a href="..."><i>Scientific Name</i></a></td><td>Notes</td>
  // Let's use a regex to match the td elements
  const tds = tr.match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
  if (tds && tds.length >= 2) {
    const td0 = tds[0].replace(/<[^>]+>/g, '').trim();
    const td1 = tds[1].replace(/<[^>]+>/g, '').trim();
    const td2 = tds.length > 2 ? tds[2].replace(/<[^>]+>/g, '').trim() : '';

    if (td0 && td1 && !td0.includes('&nbsp;') && !td0.startsWith('Change display options')) {
      parsedSpecies.push({
        commonName: td0,
        scientificName: td1,
        notes: td2,
        order: currentOrder,
        family: currentFamily
      });
    }
  }
}

console.log('Total parsed species:', parsedSpecies.length);
console.log('Sample parsed species (first 10):');
console.log(parsedSpecies.slice(0, 10));
console.log('Sample parsed species (last 10):');
console.log(parsedSpecies.slice(-10));
