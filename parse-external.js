const fs = require('fs');
const content = fs.readFileSync('C:/Users/Fayaz/.gemini/antigravity-cli/brain/385400a8-57ab-44ee-922b-745a38902f28/.system_generated/steps/2473/content.md', 'utf8');

// Find all string literals that contain spaces and are reasonably long
const strings = content.match(/"([^"]{15,100})"/g);
if (strings) {
  const unique = [...new Set(strings.map(s => s.replace(/"/g, '')))];
  
  const contentStrings = unique.filter(s => {
    // Filter out obvious code/React/URL strings
    if (s.includes('http') || s.includes('www.') || s.includes('.js') || s.includes('.css')) return false;
    if (s.includes('px') || s.includes('rem') || s.includes('rgb') || s.includes('#')) return false;
    if (s.includes('function') || s.includes('return') || s.includes('const ')) return false;
    if (s.includes('$$typeof') || s.includes('React') || s.includes('className')) return false;
    // Keep strings that look like titles or descriptions (have spaces, start with uppercase)
    return /^[A-Z][A-Za-z\s,.-]{14,}$/.test(s);
  });
  
  console.log("Found Content Strings:\n" + contentStrings.slice(0, 100).join('\n'));
}
