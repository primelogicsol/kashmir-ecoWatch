const fs = require('fs');
const content = fs.readFileSync('C:/Users/Fayaz/.gemini/antigravity-cli/brain/385400a8-57ab-44ee-922b-745a38902f28/.system_generated/steps/2473/content.md', 'utf8');

const keywords = ['About', 'Mission', 'Governance', 'Founder', 'Contributor', 'Support', 'Sponsor', 'Contact'];

const strings = content.match(/"([^"]{5,200})"/g);
if (strings) {
  const unique = [...new Set(strings.map(s => s.replace(/"/g, '')))];
  
  const contentStrings = unique.filter(s => {
    if (s.includes('http') || s.includes('www.') || s.includes('.js') || s.includes('.css')) return false;
    if (s.includes('px') || s.includes('rem') || s.includes('rgb') || s.includes('#')) return false;
    if (s.includes('function') || s.includes('return') || s.includes('const ')) return false;
    
    // Check if it contains any of the keywords
    return keywords.some(kw => s.toLowerCase().includes(kw.toLowerCase()));
  });
  
  console.log("Found Footer/About Related Strings:\n" + contentStrings.join('\n'));
}
