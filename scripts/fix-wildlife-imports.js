const fs = require('fs');

const path = 'src/app/biodiversity/wildlife-sightings/page.tsx';
let code = fs.readFileSync(path, 'utf8');

if (!code.includes(', Mountain')) {
  // Add Mountain to lucide-react import
  code = code.replace(
    /Eye, ArrowRight, MapPin, Calendar, Clock, Filter,/,
    'Eye, ArrowRight, MapPin, Calendar, Clock, Filter, Mountain,'
  );
  fs.writeFileSync(path, code, 'utf8');
  console.log('Added Mountain to imports in', path);
} else {
  console.log('Mountain already imported');
}
