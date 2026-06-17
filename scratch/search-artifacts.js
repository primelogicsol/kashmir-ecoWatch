const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Fayaz\\.gemini\\antigravity-cli\\brain\\2f702963-7bcc-47d5-9cf9-4db320a60d31';
if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir);
  console.log('Total files in artifact dir:', files.length);
  const birdFiles = files.filter(f => f.toLowerCase().includes('bird') || f.toLowerCase().includes('avibase'));
  console.log('Bird-related files:', birdFiles);
  
  // Also scan inside subdirectories if any, e.g., scratch/
  const scratchDir = path.join(dir, 'scratch');
  if (fs.existsSync(scratchDir)) {
    const scratchFiles = fs.readdirSync(scratchDir);
    const sBirdFiles = scratchFiles.filter(f => f.toLowerCase().includes('bird') || f.toLowerCase().includes('avibase'));
    console.log('Scratch bird-related files:', sBirdFiles);
  }
} else {
  console.log('Artifact dir does not exist');
}
