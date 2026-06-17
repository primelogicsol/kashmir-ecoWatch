const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modifiedCount = 0;

walkDir('./src/app', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
      .replace(/ Across Greater Kashmir/g, ' Greater Kashmir')
      .replace(/Across Greater Kashmir/g, 'Greater Kashmir')
      .replace(/ Across<\/span>/g, '</span>')
      .replace(/"Across /g, '"')
      .replace(/ Across"/g, '"');
    
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      modifiedCount++;
      console.log(`Updated: ${filePath}`);
    }
  }
});

console.log(`Finished. Modified ${modifiedCount} files.`);
