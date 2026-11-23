// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — WESTERN HIMALAYAN GEOGRAPHIC & MULTILINGUAL GAZETTEER
// Canonical Subregion Resolution, Historical Toponyms & Verified Script Lexicon
// Supports English, Urdu (اردو), Kashmiri (کٲشُر), Devanagari & Roman Transliteration
// ─────────────────────────────────────────────────────────────────────────────

import { KewSubregion, MultilingualTerms } from './types';

export interface CanonicalSubregionRecord {
  id: string;
  subregion: Exclude<KewSubregion, 'Multi-Regional'>;
  canonicalName: string;
  historicalAndAltNames: string[];
  jurisdictionContext: string;
  geographicScope: 'Kashmir Core' | 'Trans-Divisional' | 'Transboundary / Extended';
  districts: string[];
  watersheds: string[];
  centroid: { lat: number; lng: number };
  description: string;
  multilingual: MultilingualTerms;
}

export const SIX_KEW_SUBREGIONS: CanonicalSubregionRecord[] = [
  {
    id: 'subregion:kashmir',
    subregion: 'Kashmir',
    canonicalName: 'Kashmir Valley (Kashmir Division)',
    historicalAndAltNames: ['Kashmir', 'Kashmir Valley', 'Kashmir Core', 'Vale of Kashmir', 'Kasheer', 'Koshur'],
    jurisdictionContext: 'Administered within Jammu & Kashmir (Kashmir Division) · 10 Districts',
    geographicScope: 'Kashmir Core',
    districts: ['Srinagar', 'Anantnag', 'Baramulla', 'Budgam', 'Pulwama', 'Kupwara', 'Ganderbal', 'Bandipora', 'Kulgam', 'Shopian'],
    watersheds: ['Jhelum Basin', 'Sindh Catchment', 'Lidder Watershed', 'Pohru Basin', 'Vishav Catchment', 'Doodhganga Watershed'],
    centroid: { lat: 34.0837, lng: 74.7973 },
    description: 'Intermontane tectonic valley bounded by the Pir Panjal and Greater Himalayan ranges, drained by the Jhelum (Vyeth/Vitasta) river system, Ramsar floodplain wetlands (Wular, Hokersar, Shallabugh, Hygam), Karewa plateaus, and temperate conifer-broadleaf ecosystems.',
    multilingual: {
      ur: ['وادی کشمیر', 'کشمیر'],
      ks: ['کٔشیٖر', 'وادی کٔشیٖر'],
      hi: ['कश्मीर घाटी', 'कश्मीर'],
      translit: ['Kasheer', 'Kashir', 'Wadi-e-Kashmir'],
    },
  },
  {
    id: 'subregion:jammu',
    subregion: 'Jammu',
    canonicalName: 'Jammu Region (Jammu Division)',
    historicalAndAltNames: ['Jammu', 'Jammu Division', 'Pir Panjal South & Chenab Valley', 'Duggar'],
    jurisdictionContext: 'Administered within Jammu & Kashmir (Jammu Division) · 10 Districts',
    geographicScope: 'Trans-Divisional',
    districts: ['Jammu', 'Kathua', 'Samba', 'Udhampur', 'Reasi', 'Doda', 'Kishtwar', 'Ramban', 'Rajouri', 'Poonch'],
    watersheds: ['Chenab Basin', 'Tawi Basin', 'Ravi Catchment', 'Poonch River Watershed', 'Marusudar Sub-basin'],
    centroid: { lat: 32.95, lng: 75.15 },
    description: 'Spans subtropical Shivalik foothills (Surinsar-Mansar, Gharana), middle Himalayan Pir Panjal slopes, and deep Chenab Gorge alpine sanctuaries including Kishtwar High Altitude National Park.',
    multilingual: {
      ur: ['جموں', 'خطہ جموں'],
      ks: ['جۆم'],
      hi: ['जम्मू', 'जम्मू संभाग'],
      translit: ['Jammu', 'Duggar', 'Chenab Valley'],
    },
  },
  {
    id: 'subregion:ladakh',
    subregion: 'Ladakh',
    canonicalName: 'Ladakh (Trans-Himalayan Cold Desert)',
    historicalAndAltNames: ['Ladakh', 'Leh-Ladakh', 'Zanskar', 'Changthang', 'Maryul'],
    jurisdictionContext: 'Administered as Union Territory of Ladakh · Leh & Kargil Districts',
    geographicScope: 'Trans-Divisional',
    districts: ['Leh', 'Kargil'],
    watersheds: ['Upper Indus Basin', 'Shyok-Nubra Basin', 'Zanskar Catchment', 'Suru-Drass Basin', 'Pangong-Tso Moriri Endorheic Basins'],
    centroid: { lat: 34.1526, lng: 77.577 },
    description: 'High-altitude Trans-Himalayan cryosphere and cold desert bioregion encompassing the Karakoram, Ladakh, and Zanskar ranges, Hemis National Park, Changthang Ramsar wetlands (Tso Moriri, Tso Kar, Pangong Tso), and Siachen-Drang Drung glaciers.',
    multilingual: {
      ur: ['لداخ', 'لیہہ کارگل'],
      ks: ['لَداخ'],
      hi: ['लद्दाख', 'लेह कारगिल'],
      translit: ['Ladakh', 'La-dwags', 'Changthang', 'Zanskar'],
    },
  },
  {
    id: 'subregion:azad-kashmir',
    subregion: 'Azad Kashmir',
    canonicalName: 'Azad Jammu & Kashmir (AJ&K)',
    historicalAndAltNames: ['Azad Kashmir', 'Azad Jammu and Kashmir', 'AJ&K', 'AJK', 'Muzaffarabad-Neelum-Mirpur'],
    jurisdictionContext: 'Administered as Azad Jammu & Kashmir · 10 Districts across Muzaffarabad, Poonch & Mirpur Divisions',
    geographicScope: 'Transboundary / Extended',
    districts: ['Muzaffarabad', 'Neelum', 'Hattian Bala', 'Bagh', 'Haveli', 'Poonch (AJK)', 'Sudhnoti', 'Kotli', 'Mirpur', 'Bhimber'],
    watersheds: ['Neelum-Kishanganga Basin', 'Middle Jhelum Basin', 'Poonch River Basin', 'Mangla Reservoir Catchment'],
    centroid: { lat: 34.37, lng: 73.47 },
    description: 'Western Himalayan river-valley and montane forest ecosystems spanning alpine Neelum (Kishanganga) sanctuaries (Machiara, Musk Deer/Gurez-Neelum corridor) down to subtropical Mangla Ramsar reservoir.',
    multilingual: {
      ur: ['آزاد کشمیر', 'آزاد جموں و کشمیر', 'نیلم', 'مظفرآباد'],
      ks: ['آزاد کٔشیٖر'],
      hi: ['आजाद कश्मीर', 'नीलम घाटी', 'मुजफ्फराबाद'],
      translit: ['Azad Kashmir', 'AJK', 'Neelum Valley', 'Muzaffarabad', 'Mangla'],
    },
  },
  {
    id: 'subregion:gilgit',
    subregion: 'Gilgit',
    canonicalName: 'Gilgit Region (Western Karakoram & Hindu Kush)',
    historicalAndAltNames: ['Gilgit', 'Gilgit Agency', 'Hunza-Nagar', 'Diamer-Astore', 'Northern Areas (Historical)', 'Gilgit-Baltistan'],
    jurisdictionContext: 'Administered within Gilgit-Baltistan (Gilgit & Diamer Divisions) · 9 Districts',
    geographicScope: 'Transboundary / Extended',
    districts: ['Gilgit', 'Hunza', 'Nagar', 'Ghizer', 'Diamer', 'Astore', 'Darel', 'Tangir', 'Gupis-Yasin'],
    watersheds: ['Gilgit River Basin', 'Hunza River Basin', 'Astore Basin', 'Middle Indus Gorge (Nanga Parbat)'],
    centroid: { lat: 35.9208, lng: 74.308 },
    description: 'High-mountain cryosphere and glacial-outburst (GLOF) corridor at the junction of the Western Himalaya (Nanga Parbat), Karakoram (Khunjerab, Batura, Hispar, Passu, Shisper glaciers), and Hindu Kush ranges.',
    multilingual: {
      ur: ['گلگت', 'ہنزہ', 'دیامر', 'استور', 'گلگت بلتستان'],
      ks: ['گِلگِت'],
      hi: ['गिलगित', 'हुंजा', 'दियामेर', 'गिलगित-बाल्टिस्तान'],
      translit: ['Gilgit', 'Sargin', 'Hunza', 'Nagar', 'Ghizer', 'Diamer', 'Astore'],
    },
  },
  {
    id: 'subregion:baltistan',
    subregion: 'Baltistan',
    canonicalName: 'Baltistan Region (Central Karakoram & Deosai)',
    historicalAndAltNames: ['Baltistan', 'Skardu-Baltistan', 'Little Tibet (Historical)', 'Northern Areas (Historical)', 'Gilgit-Baltistan'],
    jurisdictionContext: 'Administered within Gilgit-Baltistan (Baltistan Division) · 5 Districts',
    geographicScope: 'Transboundary / Extended',
    districts: ['Skardu', 'Shigar', 'Kharmang', 'Ghanche', 'Roundu'],
    watersheds: ['Upper Indus (Skardu-Roundu)', 'Shigar Basin', 'Shyok-Hushe Basin', 'Deosai Plateau Headwaters'],
    centroid: { lat: 35.2971, lng: 75.6333 },
    description: 'Encompasses the Central Karakoram National Park glacier complex (Baltoro, Biafo, Chogo Lungma, Siachen margins), K2-Concordia cryosphere, Upper Indus gorges, and the alpine Deosai National Park brown-bear plateau.',
    multilingual: {
      ur: ['بلتستان', 'سکردو', 'شگر', 'دیوسائی', 'گلگت بلتستان'],
      ks: ['بَلتِستان'],
      hi: ['बाल्टिस्तान', 'स्कर्दू', 'देवसाई', 'गिलगित-बाल्टिस्तान'],
      translit: ['Baltistan', 'Baltiyul', 'Skardu', 'Shigar', 'Ghanche', 'Kharmang', 'Roundu', 'Deosai'],
    },
  },
];

const DISTRICT_TO_SUBREGION = new Map<string, KewSubregion>();
for (const sr of SIX_KEW_SUBREGIONS) {
  for (const d of sr.districts) {
    DISTRICT_TO_SUBREGION.set(d.toLowerCase(), sr.subregion);
  }
}
DISTRICT_TO_SUBREGION.set('poonch (ajk)', 'Azad Kashmir');
DISTRICT_TO_SUBREGION.set('hattian', 'Azad Kashmir');
DISTRICT_TO_SUBREGION.set('neelum valley', 'Azad Kashmir');

export function resolveSubregion(district?: string, rawRegionOrScope?: string): KewSubregion {
  if (district) {
    const parts = district.split(/[,/&•]+/).map((s) => s.trim().toLowerCase()).filter(Boolean);
    const matched = new Set<KewSubregion>();
    for (const p of parts) {
      for (const [dKey, sr] of DISTRICT_TO_SUBREGION.entries()) {
        if (p === dKey || p.includes(dKey)) {
          matched.add(sr);
        }
      }
    }
    if (matched.size === 1) return Array.from(matched)[0];
    if (matched.size > 1) return 'Multi-Regional';
  }

  const r = (rawRegionOrScope || '').toLowerCase();
  if (r.includes('baltistan') && !r.includes('gilgit')) return 'Baltistan';
  if (r.includes('skardu') || r.includes('shigar') || r.includes('ghanche') || r.includes('kharmang')) return 'Baltistan';
  if (r.includes('gilgit') && !r.includes('baltistan')) return 'Gilgit';
  if (r.includes('hunza') || r.includes('diamer') || r.includes('astore') || r.includes('ghizer')) return 'Gilgit';
  if (r.includes('gilgit-baltistan') || r.includes('gilgit baltistan') || r === 'gb') return 'Gilgit';
  if (r.includes('azad') || r.includes('ajk') || r.includes('aj&k') || r.includes('muzaffarabad') || r.includes('mirpur')) return 'Azad Kashmir';
  if (r.includes('ladakh') || r.includes('leh') || r.includes('kargil')) return 'Ladakh';
  if (r.includes('jammu')) return 'Jammu';
  if (r.includes('kashmir core') || r.includes('kashmir valley') || r === 'kashmir') return 'Kashmir';
  if (r.includes('trans-divisional') || r.includes('transboundary') || r.includes('western himalaya') || r.includes('all')) {
    return 'Multi-Regional';
  }
  return 'Kashmir';
}

/**
 * Verified multilingual & historical toponym/vernacular dictionary.
 * Strictly curated scientific/toponymic equivalents — never machine-translated.
 */
interface VerifiedLexiconEntry {
  matchPatterns: RegExp[];
  synonyms: string[];
  multilingual: MultilingualTerms;
}

export const VERIFIED_MULTILINGUAL_LEXICON: VerifiedLexiconEntry[] = [
  {
    matchPatterns: [/\bhangul\b/i, /\bkashmir stag\b/i, /\bcervus hanglu\b/i],
    synonyms: ['Hangul', 'Kashmir Stag', 'Cervus hanglu hanglu', 'Cervus elaphus hanglu', 'Red Deer of Kashmir'],
    multilingual: {
      ur: ['ہنگول', 'کشمیری بارہ سنگھا'],
      ks: ['ہانگل', 'ہٲنگُل'],
      hi: ['हंगुल', 'कश्मीरी बारहसिंगा'],
      translit: ['Hangul', 'Haangul', 'Kashmir Barasingha'],
    },
  },
  {
    matchPatterns: [/\bsnow leopard\b/i, /\bpanthera uncia\b/i],
    synonyms: ['Snow Leopard', 'Panthera uncia', 'Uncia uncia', 'Ounce'],
    multilingual: {
      ur: ['برفانی چیتا', 'برفانی تیندوا'],
      ks: ['شِنہٕ سُہہ'],
      hi: ['हिम तेंदुआ', 'बर्फानी तेंदुआ'],
      translit: ['Shan', 'Barfani Tendua', 'Barfani Cheetah', 'Shina Suh'],
    },
  },
  {
    matchPatterns: [/\bmarkhor\b/i, /\bcapra falconeri\b/i],
    synonyms: ['Markhor', 'Pir Panjal Markhor', 'Astor Markhor', 'Capra falconeri', 'Flare-horned Markhor'],
    multilingual: {
      ur: ['مارخور'],
      ks: ['مارخور'],
      hi: ['मारखोर'],
      translit: ['Markhor', 'Kajinar Markhor'],
    },
  },
  {
    matchPatterns: [/\bwular\b/i],
    synonyms: ['Wular Lake', 'Wullar Lake', 'Mahapadmasaras (Historical)', 'Ullola'],
    multilingual: {
      ur: ['ولر جھیل', 'جھیل ولر'],
      ks: ['وُلَر سَر', 'وُلَر'],
      hi: ['वुलर झील', 'महापद्मसर'],
      translit: ['Wular', 'Wullar', 'Wular Sar', 'Mahapadmasaras'],
    },
  },
  {
    matchPatterns: [/\bdal lake\b/i, /^dal$/i],
    synonyms: ['Dal Lake', 'Srinagar Dal Basin', 'Urban Wetland Dal'],
    multilingual: {
      ur: ['ڈل جھیل', 'جھیل ڈل'],
      ks: ['ڈَل سَر', 'ڈَل'],
      hi: ['डल झील'],
      translit: ['Dal Sar', 'Dal Jheel'],
    },
  },
  {
    matchPatterns: [/\bsheshnag\b/i],
    synonyms: ['Sheshnag Lake', 'Sheshnaag', 'Shishram Nag', 'Lidder Glacial Tarn'],
    multilingual: {
      ur: ['شیش ناگ جھیل', 'شیش ناگ'],
      ks: ['شیش ناگ', 'شِشرام ناگ'],
      hi: ['शेषनाग झील', 'शेषनाग'],
      translit: ['Sheshnag', 'Sheshnaag', 'Shishram Nag'],
    },
  },
  {
    matchPatterns: [/\bhokersar\b/i, /\bhokera\b/i],
    synonyms: ['Hokersar Wetland', 'Hokera Ramsar Site', 'Hokersar Reserve'],
    multilingual: {
      ur: ['ہوکرسر', 'ہوکرہ ویٹ لینڈ'],
      ks: ['ہۆکَر سَر'],
      hi: ['होकरसर आर्द्रभूमि', 'होकरसर'],
      translit: ['Hokersar', 'Hokera', 'Hokarsar'],
    },
  },
  {
    matchPatterns: [/\bjhelum\b/i],
    synonyms: ['Jhelum River', 'Vyeth', 'Vitasta (Historical Sanskrit)', 'Hydaspes (Historical Classical)'],
    multilingual: {
      ur: ['دریائے جہلم', 'جہلم'],
      ks: ['ویَتھ'],
      hi: ['झेलम नदी', 'वितस्ता'],
      translit: ['Vyeth', 'Veth', 'Vitasta', 'Darya-e-Jhelum'],
    },
  },
  {
    matchPatterns: [/\bneelum\b/i, /\bkishanganga\b/i],
    synonyms: ['Neelum River', 'Kishanganga River', 'Neelum-Kishanganga Basin'],
    multilingual: {
      ur: ['دریائے نیلم', 'نیلم', 'کشن گنگا'],
      ks: ['کِشَن گَنگا', 'نیٖلَم'],
      hi: ['नीलम नदी', 'किशनगंगा'],
      translit: ['Neelum', 'Neelam', 'Kishanganga'],
    },
  },
  {
    matchPatterns: [/\bchenab\b/i],
    synonyms: ['Chenab River', 'Chandrabhaga (Historical)', 'Asikni'],
    multilingual: {
      ur: ['دریائے چناب', 'چناب'],
      ks: ['چِناب'],
      hi: ['चिनाब नदी', 'चंद्रभागा'],
      translit: ['Chenab', 'Chinab', 'Chandrabhaga'],
    },
  },
  {
    matchPatterns: [/\bindus\b/i],
    synonyms: ['Indus River', 'Sindhu (Historical)', 'Sengge Zangbo'],
    multilingual: {
      ur: ['دریائے سندھ', 'سندھ'],
      ks: ['سِندھ'],
      hi: ['सिंधु नदी', 'इंडस'],
      translit: ['Sindhu', 'Darya-e-Sindh', 'Sengge Khabab'],
    },
  },
  {
    matchPatterns: [/\bchinar\b/i, /\bplatanus orientalis\b/i],
    synonyms: ['Chinar', 'Oriental Plane', 'Platanus orientalis', 'Booune', 'Buen'],
    multilingual: {
      ur: ['چنار'],
      ks: ['بۆوُن', 'بوٗنہِ'],
      hi: ['चिनार'],
      translit: ['Chinar', 'Booune', 'Buen', 'Booni'],
    },
  },
  {
    matchPatterns: [/\bdachigam\b/i],
    synonyms: ['Dachigam National Park', 'Dachigham', 'Ten Villages Sanctuary'],
    multilingual: {
      ur: ['داچھی گام نیشنل پارک', 'داچھی گام'],
      ks: ['داچھِ گام'],
      hi: ['दाचीगाम राष्ट्रीय उद्यान', 'दाचीगाम'],
      translit: ['Dachigam', 'Dachigham', 'Dachi Gam'],
    },
  },
  {
    matchPatterns: [/\bkolahoi\b/i, /\bkolhai\b/i],
    synonyms: ['Kolahoi Glacier', 'Kolhai Glacier', 'Gashbror'],
    multilingual: {
      ur: ['کولہوئی گلیشیئر'],
      ks: ['کۄلہٕ ہٲے', 'گاش برٲر'],
      hi: ['कोलाहोई ग्लेशियर'],
      translit: ['Kolahoi', 'Kolhai', 'Gashbror'],
    },
  },
  {
    matchPatterns: [/\bglacier\b/i, /\bcryosphere\b/i],
    synonyms: ['Glacier', 'Cryosphere', 'Glacial Recession', 'Ice Mass'],
    multilingual: {
      ur: ['گلیشیئر', 'برفانی تودہ'],
      ks: ['شینہٕ پہاڑ', 'گلیشیئر'],
      hi: ['ग्लेशियर', 'हिमनद'],
      translit: ['Glacier', 'Himnad', 'Barfani Toda'],
    },
  },
  {
    matchPatterns: [/\bwestern disturbance/i],
    synonyms: ['Western Disturbances', 'WD Synoptic Trough', 'Mediterranean Westerly Wave', 'Winter Westerlies'],
    multilingual: {
      ur: ['مغربی ہوائیں', 'مغربی سلسلہ'],
      hi: ['पश्चिमी विक्षोभ'],
      translit: ['Maghribi Hawayein', 'Paschimi Vikshobh', 'WD'],
    },
  },
  {
    matchPatterns: [/\bcloudburst\b/i, /\bextreme rainfall\b/i],
    synonyms: ['Cloudburst', 'Extreme Rainfall', 'Orographic Downpour', 'Flash Rainfall'],
    multilingual: {
      ur: ['بادل پھٹنا', 'شدید بارش'],
      ks: ['نَب پھَٹُن', 'روٗد'],
      hi: ['बादल फटना', 'अतिवृष्टि'],
      translit: ['Badal Phatna', 'Nab Phatun', 'Ativrishti'],
    },
  },
  {
    matchPatterns: [/\bforest fire/i, /\bwildfire/i],
    synonyms: ['Forest Fires', 'Wildfire', 'MODIS VIIRS Fire', 'Conifer Burn'],
    multilingual: {
      ur: ['جنگلاتی آگ', 'جنگل کی آگ'],
      ks: ['وَن نار'],
      hi: ['वनाग्नि', 'जंगल की आग'],
      translit: ['Jangal ki Aag', 'Wan Naar', 'Vanagni'],
    },
  },
  {
    matchPatterns: [/\benvironmental pil\b/i, /\bpublic interest litigation/i],
    synonyms: ['Environmental PIL', 'Public Interest Litigation', 'Judicial Compliance', 'Writ Petition', 'NGT', 'Suo Motu'],
    multilingual: {
      ur: ['ماحولیاتی مفاد عامہ کی درخواست', 'عدالتی احکامات'],
      hi: ['पर्यावरण जनहित याचिका', 'पीआईएल'],
      translit: ['PIL', 'Mufad-e-Aama', 'Janhit Yachika'],
    },
  },
  {
    matchPatterns: [/\bspring\b/i, /\bnag\b/i, /\bspringshed\b/i],
    synonyms: ['Karst Spring', 'Springshed', 'Nag', 'Chashma', 'Groundwater Discharge'],
    multilingual: {
      ur: ['چشمہ', 'ناگ'],
      ks: ['ناگ', 'چَشمہٕ'],
      hi: ['झरना', 'चश्मा', 'नाग'],
      translit: ['Nag', 'Naag', 'Chashma'],
    },
  },
  {
    matchPatterns: [/\bwetland/i, /\bramsar\b/i],
    synonyms: ['Wetland', 'Ramsar Site', 'Nambal', 'Marshland', 'Floodplain Wetland'],
    multilingual: {
      ur: ['آبگاہ', 'ویٹ لینڈ'],
      ks: ['نَمبَل', 'سَر'],
      hi: ['आर्द्रभूमि', 'रामसर स्थल'],
      translit: ['Nambal', 'Aabgah', 'Ardrabhumi'],
    },
  },
  {
    matchPatterns: [/\bkarewa/i],
    synonyms: ['Karewa', 'Wudur', 'Plio-Pleistocene Lacustrine Plateau', 'Saffron Tableland'],
    multilingual: {
      ur: ['کریوہ', 'وڈر'],
      ks: ['وُڈَر'],
      hi: ['करेवा'],
      translit: ['Karewa', 'Wudur', 'Wudar'],
    },
  },
  {
    matchPatterns: [/\bgilgit[\s-]*baltistan\b/i],
    synonyms: ['Gilgit-Baltistan', 'Gilgit', 'Baltistan', 'GB', 'Northern Areas (Historical)', 'Karakoram-Deosai'],
    multilingual: {
      ur: ['گلگت بلتستان', 'گلگت', 'بلتستان'],
      ks: ['گِلگِت بَلتِستان'],
      hi: ['गिलगित-बाल्टिस्तान'],
      translit: ['Gilgit-Baltistan', 'Gilgit', 'Baltistan', 'Shumali Ilaqajat'],
    },
  },
];

export function enrichWithMultilingualLexicon(
  textBlob: string,
  existingSynonyms: string[] = [],
  existingMultilingual?: MultilingualTerms
): { synonyms: string[]; multilingual?: MultilingualTerms } {
  const synSet = new Set<string>(existingSynonyms.filter(Boolean));
  const ur = new Set<string>(existingMultilingual?.ur || []);
  const ks = new Set<string>(existingMultilingual?.ks || []);
  const hi = new Set<string>(existingMultilingual?.hi || []);
  const translit = new Set<string>(existingMultilingual?.translit || []);

  for (const entry of VERIFIED_MULTILINGUAL_LEXICON) {
    if (entry.matchPatterns.some((rx) => rx.test(textBlob))) {
      entry.synonyms.forEach((s) => synSet.add(s));
      entry.multilingual.ur?.forEach((s) => ur.add(s));
      entry.multilingual.ks?.forEach((s) => ks.add(s));
      entry.multilingual.hi?.forEach((s) => hi.add(s));
      entry.multilingual.translit?.forEach((s) => translit.add(s));
    }
  }

  const hasMulti = ur.size > 0 || ks.size > 0 || hi.size > 0 || translit.size > 0;
  return {
    synonyms: Array.from(synSet),
    multilingual: hasMulti
      ? {
          ...(ur.size ? { ur: Array.from(ur) } : {}),
          ...(ks.size ? { ks: Array.from(ks) } : {}),
          ...(hi.size ? { hi: Array.from(hi) } : {}),
          ...(translit.size ? { translit: Array.from(translit) } : {}),
        }
      : undefined,
  };
}
