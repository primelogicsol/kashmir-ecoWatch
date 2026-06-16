const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:/Users/Fayaz/.gemini/antigravity-cli/brain/2f702963-7bcc-47d5-9cf9-4db320a60d31/.system_generated/logs';
const filePath = path.join(LOGS_DIR, 'transcript_full.jsonl');

if (!fs.existsSync(filePath)) {
  console.error('transcript_full.jsonl does not exist.');
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let chunkIndex = 1;
for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    // Find view_file tool output containing line numbers around the riversData section
    if (obj.content && obj.content.includes('Showing lines') && obj.content.includes('water-systems.ts')) {
      console.log(`Found file view chunk ${chunkIndex}:`);
      console.log(`Lines: ${obj.content.substring(obj.content.indexOf('Showing lines'), obj.content.indexOf('Showing lines') + 40)}`);
      
      // Extract original lines
      const outputLines = obj.content.split('\n');
      const originalLines = [];
      for (const ol of outputLines) {
        const match = ol.match(/^\d+:\s*(.*)$/);
        if (match) {
          originalLines.push(match[1]);
        }
      }
      
      const chunkText = originalLines.join('\n');
      fs.writeFileSync(`scripts/recovered-chunk-${chunkIndex}.txt`, chunkText, 'utf8');
      console.log(`  Wrote to scripts/recovered-chunk-${chunkIndex}.txt (length: ${chunkText.length})`);
      chunkIndex++;
    }
  } catch (e) {
    // ignore
  }
}
