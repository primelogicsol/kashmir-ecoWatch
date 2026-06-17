const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Fayaz\\.gemini\\antigravity-cli\\brain\\2f702963-7bcc-47d5-9cf9-4db320a60d31\\.system_generated\\steps\\10768\\content.md';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log('Total lines:', lines.length);
// Print some lines with text that isn't just a link to see if there is common names or other text
let printed = 0;
for (let i = 150; i < 300; i++) {
  if (lines[i] && lines[i].trim() && !lines[i].includes('https://avibase.bsc-eoc.org/species.jsp')) {
    console.log(`${i}: ${lines[i]}`);
    printed++;
  }
}
