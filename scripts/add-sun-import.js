const fs = require('fs');
let c = fs.readFileSync('src/app/seasonal-ecology/page.tsx', 'utf8');
if (!c.includes('Sun,') && !c.includes(' Sun ')) {
  c = c.replace(/import\s+\{([^}]+)\}\s+from\s+'lucide-react';/, "import { Sun, $1 } from 'lucide-react';");
  fs.writeFileSync('src/app/seasonal-ecology/page.tsx', c);
  console.log('Added Sun import');
}
