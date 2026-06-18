const fs = require('fs');

const content = fs.readFileSync('C:/Users/Fayaz/.gemini/antigravity-cli/brain/385400a8-57ab-44ee-922b-745a38902f28/.system_generated/steps/2473/content.md', 'utf8');

function extractRouteData(identifier, hintText) {
  let report = `\n========================================\nPAGE/SECTION: ${identifier}\n========================================\n`;
  
  const index = content.indexOf(hintText);
  if (index === -1) {
    return report + "NOT FOUND in bundle using hint: " + hintText + "\n";
  }
  
  // Extract a 10,000 character window around the hint to capture the whole component
  const start = Math.max(0, index - 5000);
  const end = Math.min(content.length, index + 5000);
  const window = content.substring(start, end);
  
  // Extract CSS classes
  const classes = [...new Set(window.match(/className:"([^"]+)"/g) || [])]
    .map(c => c.replace('className:"', '').replace('"', ''));
    
  // Extract Text Strings (more than 10 chars, has spaces)
  const strings = [...new Set(window.match(/"([^"]{10,300})"/g) || [])]
    .map(s => s.replace(/"/g, ''))
    .filter(s => s.includes(' ') && !s.includes('http') && !s.includes('function') && !s.includes('return') && !s.includes('className'));

  report += "\n--- LAYOUT & STYLE (Tailwind Classes Used) ---\n";
  report += classes.slice(0, 30).join(' | ') + (classes.length > 30 ? ' ...' : '') + "\n";
  
  report += "\n--- FULL CONTENT STRINGS ---\n";
  report += strings.join('\n') + "\n";
  
  return report;
}

console.log(extractRouteData('ABOUT', 'About Kashmir Environmental'));
console.log(extractRouteData('MISSION', 'Strategic Goals'));
console.log(extractRouteData('GOVERNANCE', 'Governance structure'));
console.log(extractRouteData('FOUNDER', 'Dr. Kumar Foundation USA') || extractRouteData('FOUNDER (Alt)', 'Founder'));
console.log(extractRouteData('CONTRIBUTORS', 'Contributor & Licensing'));
console.log(extractRouteData('SUPPORT & SPONSORSHIP', 'Principal Sponsor'));
console.log(extractRouteData('CONTACT', 'contact_name'));

