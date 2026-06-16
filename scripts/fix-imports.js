const fs = require('fs');
let c = fs.readFileSync('src/components/common/WaterEntityListingPage.tsx', 'utf8');
c = c.replace('interface ListingPageProps {', `import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import * as Icons from 'lucide-react';
import {
  MapPin, Search, Filter, ArrowRight, Thermometer,
  Activity, AlertTriangle, Ruler, Eye, ChevronRight, Droplet, Shield,
  Waves, Wind, Mountain, Fish, Hammer, Layers, Map
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { WaterEntity } from '@/data/water-systems';

interface ListingPageProps {`);
fs.writeFileSync('src/components/common/WaterEntityListingPage.tsx', c);
