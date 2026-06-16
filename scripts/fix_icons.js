const fs = require('fs');

function fixIcon(file) {
  let code = fs.readFileSync(file, 'utf8');
  if (code.includes('<Heading') && !code.includes('icon={')) {
    code = code.replace(/<Heading/, '<Heading icon={<span className="hidden"/>}');
    fs.writeFileSync(file, code);
  }
}

['src/app/alert-archive/page.tsx', 'src/app/entity-explorer/page.tsx'].forEach(fixIcon);
