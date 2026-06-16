const fs = require('fs');
const glob = require('fast-glob');

async function run() {
  const files = await glob('src/app/{water-systems,environmental-monitoring,field-reports,contribute-data,risk-monitoring,protected-areas}/**/page.tsx', { cwd: process.cwd() });
  files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const match = content.match(/<section[^>]*>[\s\S]*?<div className="grid grid-cols-[^>]+>\s*\{\s*\[([\s\S]*?)\]\.map/);
    if (match) {
      console.log(f, 'matched');
    } else if (content.match(/<div[^>]*>[\s\S]*?<div className="grid grid-cols-[^>]+>\s*\{\s*\[([\s\S]*?)\]\.map/)) {
      console.log(f, 'matched generic div');
    } else if (content.includes('metrics = [')) {
      console.log(f, 'has metrics array');
    } else if (content.includes('metrics={')) {
      console.log(f, 'has metrics prop');
    } else if (content.includes('.map(')) {
      console.log(f, 'has map but no section match');
    } else {
      console.log(f, 'no match');
    }
  });
}
run();
