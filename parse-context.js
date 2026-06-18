const fs = require('fs');

const content = fs.readFileSync('C:/Users/Fayaz/.gemini/antigravity-cli/brain/385400a8-57ab-44ee-922b-745a38902f28/.system_generated/steps/2473/content.md', 'utf8');

// Function to find strings around a specific keyword to guess layout and content
function extractContext(keyword, padding = 1000) {
  const index = content.toLowerCase().indexOf(keyword.toLowerCase());
  if (index !== -1) {
    const start = Math.max(0, index - padding);
    const end = Math.min(content.length, index + padding);
    const snippet = content.substring(start, end);
    // Find classNames
    const classes = [...new Set(snippet.match(/className:"([^"]+)"/g))].join('\n');
    // Find text strings
    const texts = [...new Set(snippet.match(/"([^"]{10,200})"/g))].join('\n');
    return `\n--- Context for: ${keyword} ---\nClasses used:\n${classes.substring(0, 500)}\n\nText content:\n${texts.substring(0, 1000)}`;
  }
  return `\n--- Context for: ${keyword} --- NOT FOUND`;
}

console.log(extractContext('Principal Sponsor'));
console.log(extractContext('Dr. Kumar Foundation USA'));
console.log(extractContext('ICIMOD'));
console.log(extractContext('Contributor & Licensing'));
console.log(extractContext('contributor_name'));
console.log(extractContext('contact_name'));

