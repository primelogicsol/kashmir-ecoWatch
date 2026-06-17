const fs = require('fs');
const filePath = 'C:\\Users\\Fayaz\\.gemini\\antigravity-cli\\brain\\2f702963-7bcc-47d5-9cf9-4db320a60d31\\.system_generated\\steps\\10768\\content.md';
const content = fs.readFileSync(filePath, 'utf8');

console.log('Includes "goose":', content.toLowerCase().includes('goose'));
console.log('Includes "mallard":', content.toLowerCase().includes('mallard'));
console.log('Includes "duck":', content.toLowerCase().includes('duck'));
