// Complete Kashmiri & Western Himalayan Ethnobotanical Database Generator for 127 Species
const fs = require('fs');
const path = require('path');

const speciesMetadata = {
  "medicinal-1": {
    localName: "Kuth / Postkhai",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Amchi / Sowa-Rigpa", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Rhizome / Root",
    activeConstituents: "Costunolide, dehydrocostus lactone, saussurine, costic acid",
    traditionalPreparation: "Joshanda (decoction) for chronic asthma; powdered root with honey for dyspepsia and spasmodic cough; root oil for arthritic massage.",
    harvestingStatus: "Strictly Banned (CITES Appendix I / WPA Schedule VI) — Commercial wild collection prohibited; cultivation under transit permit only.",
    clinicalPharmacology: "Potent bronchodilator, anti-inflammatory, gastroprotective, and anthelmintic. Active sesquiterpene lactones inhibit NF-kappaB signaling.",
    description: "Saussurea costus (Kuth) is Kashmir's most legendary medicinal herb, historically protected under Maharaja-era monopolies. Found across subalpine birch forests and moist ravines, its aromatic roots are prized in Unani and Tibetan medicine for treating chronic bronchial asthma, cough, and rheumatism."
  },
  "medicinal-2": {
    localName: "Patis / Atis",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Amchi / Sowa-Rigpa"],
    therapeuticCategory: "Antipyretic & Febrifuge",
    partUsed: "Tuberous Root",
    activeConstituents: "Atisine, heteratisine, atidine, non-toxic diterpene alkaloids",
    traditionalPreparation: "Finely ground tuber powder administered in small doses (125-250 mg) with honey as an infant febrifuge and antidiarrheal.",
    harvestingStatus: "High Conservation Priority — Endangered in J&K; wild harvest strictly restricted; monitored by NMPB.",
    clinicalPharmacology: "Unlike toxic aconites, Atisine is non-poisonous and exhibits pronounced antipyretic, anti-malarial, analgesic, and immunostimulant activity without cardiotoxicity.",
    description: "Aconitum heterophyllum (Patis / Atis) is an alpine jewel flowering in subalpine meadows between 2,500m and 4,000m. Highly celebrated as 'the child’s physician' (Shishu Bhaishajya) in traditional medicine, its non-toxic bitter tubers are the foremost remedy for malarial and intermittent fevers."
  },
  "medicinal-3": {
    localName: "Mohra / Mitha Zahar",
    traditionalSystems: ["Unani Tibb (Shodhana purified)", "Ayurveda (Visha Chikitsa)", "Amchi"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Tuberous Rootstock",
    activeConstituents: "Aconitine, chasmaconitine, mesaconitine, hypaconitine",
    traditionalPreparation: "Strictly purified through Gomutra / milk boiling (Shodhana detoxification process) before formulation into high-potency neuralgia and joint liniments.",
    harvestingStatus: "Critically Endangered — Illegal trafficking target across Pir Panjal; wild extraction banned.",
    clinicalPharmacology: "Extreme neurotoxin in raw form; when properly processed, aconitine blocks sodium channels, delivering potent analgesia for intractable sciatica and severe rheumatoid arthritis.",
    description: "Aconitum chasmanthum (Mohra) is Kashmir’s virulent aconite growing in subalpine moraines. While deadly in raw state, when ritually detoxified by traditional Unani Hakims and Ayurvedic Vaidyas, it serves as a supreme therapeutic agent against agonizing neuralgia and rheumatic fever."
  },
  "medicinal-4": {
    localName: "Tilia Kachu / Dudia Mohra",
    traditionalSystems: ["Amchi / Sowa-Rigpa", "Folk Ethnobotany"],
    therapeuticCategory: "Antipyretic & Febrifuge",
    partUsed: "Root Tuber",
    activeConstituents: "Indaconitine, vilmorrianine, aconitine-type alkaloids",
    traditionalPreparation: "Administered in micro-doses in Tibetan Sowa-Rigpa pills for mountain sickness, renal colic, and contagious high-altitude fevers.",
    harvestingStatus: "Vulnerable — Threatened by unmanaged high-altitude livestock grazing and root gathering.",
    clinicalPharmacology: "Exhibits marked antipyretic, anti-inflammatory, and local anesthetic actions; modulates cardiac rhythm and peripheral pain thresholds.",
    description: "Aconitum violaceum is a striking violet-flowered alpine buttercup family herb inhabiting glacial moraines and high passes above 3,000m. Prized in Ladakh and Gurez mountain communities as an essential high-altitude fever remedy and joint pain healer."
  },
  "medicinal-5": {
    localName: "Salam Panja / Hatha",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Folk Ethnobotany"],
    therapeuticCategory: "Immuno-tonic & Vitality",
    partUsed: "Palmately Lobed Tuber",
    activeConstituents: "Dactylorhin, glucoside, mucilage, starch, albumin, stigmasterol",
    traditionalPreparation: "Tuber boiled in milk with saffron and almonds as an elite rejuvenative convalescence tonic (Salep) and restorative demulcent.",
    harvestingStatus: "CITES Appendix II / Threatened — Destructive harvesting of root tuber before seed set has caused precipitous population crashes across Sonamarg and Gulmarg alpines.",
    clinicalPharmacology: "Nutritive demulcent, aphrodisiac, adaptogen, and promoter of tissue repair; enhances endurance and cellular regeneration.",
    description: "Dactylorhiza hatagirea (Salam Panja) is a sacred high-altitude marsh orchid with hand-shaped tubers. Revered across the Indian subcontinent as the premier revitalizing tonic for debility, fractures, and sexual dysfunction, its intense commercial value has made it a top conservation priority."
  },
  "medicinal-6": {
    localName: "Bankakri / Wan-vangun",
    traditionalSystems: ["Modern Oncology", "Ayurveda", "Amchi", "Folk Ethnobotany"],
    therapeuticCategory: "Antimicrobial & Anti-infective",
    partUsed: "Rhizome & Roots",
    activeConstituents: "Podophyllotoxin, 4'-demethylpodophyllotoxin, podophyllin resin",
    traditionalPreparation: "Crushed root applied topically for genital warts; pharmaceutical precursor for etoposide and teniposide chemotherapy drugs.",
    harvestingStatus: "Endangered / CITES Appendix II — Uncontrolled uprooting for international cancer chemotherapy synthesis heavily decimated populations.",
    clinicalPharmacology: "Topoisomerase-II inhibitor and microtubule destabilizer; powerful antineoplastic activity against lung cancer, testicular tumors, and lymphomas.",
    description: "Podophyllum hexandrum (Bankakri) bears distinctive umbrella leaves and crimson berry fruits in shady Himalayan birch understories. It is world-renowned as the primary natural source of Podophyllotoxin, the backbone molecule for modern anti-cancer therapeutics."
  },
  "medicinal-7": {
    localName: "Kour / Kutki",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Amchi / Sowa-Rigpa"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Creeping Rhizome",
    activeConstituents: "Picroside I, Picroside II, kutkoside, apocynin, d-mannitol",
    traditionalPreparation: "Bitter decoction or churna with honey for infective hepatitis, chronic jaundice, sluggish gallbladder, and autoimmune liver disorders.",
    harvestingStatus: "Endangered — Extensive alpine digging on steep cliff faces has reduced natural stocks by over 60%.",
    clinicalPharmacology: "World-class hepatoprotective; accelerates liver parenchymal regeneration, stabilizes hepatic cell membranes, restores glutathione, and exerts immunomodulatory actions.",
    description: "Picrorhiza kurrooa (Kour) is a low, creeping herb thriving on rocky alpine cliffs and glacial screes. Its intensely bitter rhizomes represent the gold standard in Indian and Tibetan medicine for combating cirrhosis, jaundice, and chronic fevers."
  },
  "medicinal-8": {
    localName: "Bhut-kesh / Jatamansi",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Amchi / Sowa-Rigpa"],
    therapeuticCategory: "Nervine & Neurological",
    partUsed: "Aromatic Hairy Rhizomes",
    activeConstituents: "Jatamansone, nardostachone, sesquiterpenes, valeranal, actinidine",
    traditionalPreparation: "Aromatic rhizome decoction or infused oil used to calm hyperactive nerve conditions, combat intractable insomnia, and stimulate hair follicles.",
    harvestingStatus: "Critically Endangered / CITES Appendix II — Severely depleted due to persistent international perfumery and neuro-tonic demand.",
    clinicalPharmacology: "Enhances central GABA levels, exerts anxiolytic, sedative, neuroprotective, and anti-convulsant actions without depressive side effects.",
    description: "Nardostachys jatamansi (Bhut-kesh) grows on steep rocky precipices. Emitting a musky scent from its shaggy rootstocks, it is the premier Himalayan herbal sedative for treating nervous breakdowns, heart palpitations, chronic anxiety, and epilepsy."
  },
  "medicinal-9": {
    localName: "Posthal / Himalayan Yew",
    traditionalSystems: ["Modern Oncology", "Unani Tibb", "Folk Ethnobotany"],
    therapeuticCategory: "Antimicrobial & Anti-infective",
    partUsed: "Needles (Leaves) & Bark",
    activeConstituents: "Paclitaxel (Taxol), 10-deacetylbaccatin III (10-DAB), taxinine",
    traditionalPreparation: "Needles dried and processed for semi-synthetic Paclitaxel extraction; historically taken as a local tea for asthma and cold in remote valleys.",
    harvestingStatus: "Endangered / CITES Appendix II — Immense bark stripping in the 1990s caused massive tree mortality across Pir Panjal and Gulmarg slopes.",
    clinicalPharmacology: "Microtubule stabilizer preventing mitotic spindle depolymerization; frontline chemotherapy agent for ovarian, breast, and non-small cell lung carcinomas.",
    description: "Taxus wallichiana (Posthal) is an ancient evergreen conifer growing in dense subalpine forests. Once recklessly felled for the global extraction of Taxol, it is now strictly guarded in Kashmir's protected biospheres."
  },
  "medicinal-10": {
    localName: "Nag Chhatri / Tripatri",
    traditionalSystems: ["Amchi / Sowa-Rigpa", "Folk Ethnobotany"],
    therapeuticCategory: "Immuno-tonic & Vitality",
    partUsed: "Underground Rhizome",
    activeConstituents: "Govanoside A, trillarin, steroidal saponins, diosgenin",
    traditionalPreparation: "Root paste applied for accelerated wound healing and boils; ingested in micro-doses as an anti-aging and vitality enhancer.",
    harvestingStatus: "Endangered — Massive illicit smuggling epidemic in the 2010s stripped thousands of high-altitude forest tracts.",
    clinicalPharmacology: "High concentration of steroidal saponins gives it strong anti-inflammatory, anticancer, analgesic, and free radical scavenging capabilities.",
    description: "Trillium govanianum (Nag Chhatri) features a characteristic three-leaved whorl with a single star-like flower on moist Himalayan forest floors. In recent decades, illegal biopiracy and subterranean extraction dramatically threatened its wild populations."
  },
  "medicinal-11": {
    localName: "Gul-e-Nilam / Blue Poppy",
    traditionalSystems: ["Amchi / Sowa-Rigpa", "Folk Ethnobotany"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Whole Plant & Root",
    activeConstituents: "Isoquinoline alkaloids, papaverine-like bases, protoberberines",
    traditionalPreparation: "Whole plant decoction used in high Himalayan passes to soothe acute bone fractures, back spasms, and severe mountain sickness headaches.",
    harvestingStatus: "Endangered — Narrow alpine niche on scree slopes between 3,500m and 4,500m.",
    clinicalPharmacology: "Peripheral and central analgesic, sedative, and anti-inflammatory properties without typical opiate respiratory depression.",
    description: "Meconopsis aculeata (Gul-e-Nilam), the Queen of Himalayan Wildflowers, unfurls sky-blue petals with bristly golden spines among high-altitude moraines. Revering highlanders employ it as a potent remedy for fractures and intense pain."
  },
  "medicinal-12": {
    localName: "Chora / Gandrayan",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Folk Ethnobotany"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Root & Rhizome",
    activeConstituents: "Angelicide, valeric acid, ligustilide, osthole, angelicone",
    traditionalPreparation: "Aromatic dried root powdered as a digestive carminative, seasoned into winter foods for warmth, and brewed for stomach colic.",
    harvestingStatus: "Endangered — Extensively gathered from high subalpine valleys for commercial spice and herbal mixtures.",
    clinicalPharmacology: "Spasmolytic, carminative, peripheral vasodilator, and mild cardiotonic; relaxes smooth muscles of the digestive and bronchial tracts.",
    description: "Angelica glauca (Chora) is an umbrella-flowered aromatic giant inhabiting wet subalpine forests. Highly cherished for its culinary and therapeutic fragrance, it dispels flatulence, stimulates appetite, and alleviates cardiovascular tightness."
  },
  "medicinal-13": {
    localName: "Kahzaban / Gaozaban",
    traditionalSystems: ["Unani Tibb", "Amchi", "Folk Ethnobotany"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Spindle Root & Flowering Spike",
    activeConstituents: "Shikonin, alkannin, arnebin-1, pyrrolizidine alkaloids",
    traditionalPreparation: "Bright crimson root used in Kahwa and herbal teas for throat inflammation, feverish cough, and topical wounds.",
    harvestingStatus: "Endangered — Over-exploited for traditional herbal teabags and natural red dye across Jammu and Kashmir.",
    clinicalPharmacology: "Potent wound-healing, antimicrobial, anti-inflammatory, and cardioprotective effects; accelerates collagen synthesis in burns and skin lesions.",
    description: "Arnebia benthamii (Kahzaban) sends up massive furry flowering spires on rocky subalpine slopes. Its thick purple-red root is one of Kashmir's most trusted home remedies for seasonal influenza, chest congestion, and high fevers."
  },
  "medicinal-14": {
    localName: "Kinis / Kins",
    traditionalSystems: ["Modern Steroid Industry", "Folk Ethnobotany"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Tuberous Rhizome",
    activeConstituents: "Diosgenin (up to 4.8%), dioscin, steroidal sapogenins",
    traditionalPreparation: "Industrial extraction for the semi-synthesis of progesterone, cortisone, and oral contraceptives; folk poultice for swollen joints.",
    harvestingStatus: "Endangered / CITES Appendix II — Subject to heavy historical industrial exploitation; wild extraction tightly controlled.",
    clinicalPharmacology: "Diosgenin serves as the primary starting material for synthesis of corticosteroid anti-inflammatory and reproductive hormone medications.",
    description: "Dioscorea deltoidea (Kinis) is a climbing vine with heart-shaped leaves winding through mixed temperate forests. Its twisted tuberous rhizome holds exceptionally high yields of Diosgenin, revolutionizing global pharmaceutical steroid synthesis."
  },
  "medicinal-15": {
    localName: "Nilkanth / Indian Gentian",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Folk Ethnobotany"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Root & Rhizome",
    activeConstituents: "Gentipicroside, swertiamarin, amarogentin, gentianine",
    traditionalPreparation: "Extremely bitter water infusion administered before meals to invigorate bile secretion, revive appetite, and cleanse stubborn fevers.",
    harvestingStatus: "Critically Endangered — Driven to near extinction in Kashmir by rampant commercial root digging and livestock trampling.",
    clinicalPharmacology: "Gastric acid and secretagogue stimulation via bitter taste receptors; strong hepatoprotective, febrifugal, and anti-inflammatory properties.",
    description: "Gentiana kurroo (Nilkanth) is a magnificent sapphire-blue flowering herb endemic to northwestern Himalayan meadows. Its bitter root is revered as an unmatched stomachic and blood cleanser for treating sluggish liver and recurring fevers."
  },
  "medicinal-16": {
    localName: "Veir Tethwan / Kashmir Sage",
    traditionalSystems: ["Kashmiri Ethnobotany", "Unani Tibb"],
    therapeuticCategory: "Antimicrobial & Anti-infective",
    partUsed: "Aerial Shoots & Leaves",
    activeConstituents: "Amygdalin, eucalyptol, vulgarin, borneol, essential oils",
    traditionalPreparation: "Fresh leaves crushed into poultices for boils and cuts; bitter leaf decoction used as an anthelmintic intestinal flush.",
    harvestingStatus: "Critically Endangered — Extremely narrow endemic restricted to a few isolated micro-habitats in the Kashmir Valley.",
    clinicalPharmacology: "Antibacterial against multidrug-resistant pathogens, vermifugal, analgesic, and free-radical scavenging.",
    description: "Artemisia amygdalina (Veir Tethwan) is a critically rare medicinal wormwood restricted almost exclusively to damp riparian corners of the Kashmir Valley. Deeply rooted in rural Kashmiri folklore, it serves as a powerful natural antibiotic and wound disinfectant."
  },
  "medicinal-17": {
    localName: "Sheethal / Pe-mu",
    traditionalSystems: ["Amchi / Sowa-Rigpa", "Traditional Chinese Medicine", "Ayurveda (Kakoli substitute)"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Subterranean Bulbs",
    activeConstituents: "Peimisine, imperialine, verticine, kashmirine, steroidal alkaloids",
    traditionalPreparation: "Bulbs dried, powdered, and steamed with pear or honey for deep pulmonary dry cough, bloody sputum, and bronchial inflammation.",
    harvestingStatus: "Vulnerable — Highly valued commercially; rampant alpine digging across subalpine meadows of Pir Panjal.",
    clinicalPharmacology: "Potent antitussive, expectorant, and tracheal muscle relaxant; imperialine inhibits muscarinic acetylcholine receptors to suppress chronic bronchial spasms.",
    description: "Fritillaria roylei (Sheethal) displays nodding yellow-green checkered bells in subalpine birch woodlands. Its white twin bulbs are deeply valued across the Himalayas and East Asia as an unrivaled cure for persistent chest illnesses and respiratory fatigue."
  },
  "medicinal-18": {
    localName: "Pambchalan / Himalayan Rhubarb",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Amchi", "Folk Ethnobotany"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Rootstock & Rhizome",
    activeConstituents: "Emodin, chrysophanol, rhein, aloe-emodin, tannins",
    traditionalPreparation: "Root powder taken as an astringent tonic in small doses or as a purgative laxative in higher doses; applied as a paste to sprains and bone fractures.",
    harvestingStatus: "Vulnerable — Heavy extraction of wild rootstocks across subalpine crags; harvest quotas enforced.",
    clinicalPharmacology: "Anthraquinones stimulate colonic peristalsis while tannins provide astringency; strong antibacterial against gut pathogens and anti-inflammatory on joints.",
    description: "Rheum australe (Pambchalan) features massive wrinkled basal leaves and stout reddish flower panicles on rocky subalpine slopes. Its thick yellow-orange root is one of Kashmir's most staple remedies for gastrointestinal sluggishness, muscular contusions, and broken bones."
  },
  "medicinal-19": {
    localName: "Pamb-hakh / Webb's Rhubarb",
    traditionalSystems: ["Amchi / Sowa-Rigpa", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Rhizome & Succulent Petioles",
    activeConstituents: "Anthraquinones, rhein, calcium oxalate, stilbenes",
    traditionalPreparation: "Petioles cooked into tart digestive stews; powdered root applied topically to swollen boils, contusions, and toothaches.",
    harvestingStatus: "Vulnerable — Threatened by unchecked pasture digging in Ladakh, Gurez, and Kishtwar.",
    clinicalPharmacology: "Digestive stimulant, mild laxative, antioxidant, and anti-hyperlipidemic activity.",
    description: "Rheum webbianum (Pamb-hakh) flourishes on high alpine cliffs between 3,000m and 4,300m. Pastoral Gujjars and Bakerwals depend on its wild roots to treat sprains and digestive upsets during summer migration cycles."
  },
  "medicinal-20": {
    localName: "Lachhi-chalan / Spike Rhubarb",
    traditionalSystems: ["Amchi / Sowa-Rigpa", "Folk Ethnobotany"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Rootstock",
    activeConstituents: "Tannins, emodin, gallic acid, stilbene glycosides",
    traditionalPreparation: "Root ground with oil into a thick warm poultice to bind dislocated joints, deep tissue bruises, and frostbite wounds.",
    harvestingStatus: "Vulnerable — Alpine scree habitat prone to scree erosion and over-grazing.",
    clinicalPharmacology: "Astringent, capillary-strengthening, anti-inflammatory, and antimicrobial on cutaneous lesions.",
    description: "Rheum spiciforme is a tough, prostrate alpine rhubarb forming dense rosettes on wind-swept ridges and glacial screes. It is renowned among mountain nomads for setting fractures and soothing joint trauma."
  },
  "medicinal-21": {
    localName: "Shahi Zeera / Zeera Siah",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Aromatic Seeds (Mericarps)",
    activeConstituents: "Cuminaldehyde, p-cymene, gamma-terpinene, thymol, caraway oil",
    traditionalPreparation: "Infused in water or chewed post-meal for gas, infant colic, and digestive rejuvenation; essential aromatic component in Wazwan.",
    harvestingStatus: "Vulnerable — Extreme wild harvest before seed fall has depleted natural forests in Gurez, Kishtwar, and Karewa slopes.",
    clinicalPharmacology: "Carminative, antispasmodic, anti-ulcer, galactagogue, and antimicrobial against enteropathogenic bacteria.",
    description: "Bunium persicum (Shahi Zeera / Kala Zeera) is the crown jewel of Kashmiri spices and carminative herbs. Thriving on dry sunny slopes and pine understories, its dark, slender seeds relieve abdominal bloating, colic, and digestive distress."
  },
  "medicinal-22": {
    localName: "Suranjan-e-Talkh / Yellow Autumn Crocus",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Modern Pharmacopeia"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Corm (Bulb) & Seeds",
    activeConstituents: "Colchicine (up to 0.6%), colchicoresine, demecolcine",
    traditionalPreparation: "Corm purified in Unani formulations (Majun Suranjan) for acute gout attacks, sciatica, and severe rheumatoid polyarthritis.",
    harvestingStatus: "Vulnerable — Highly specific habitat in open coniferous woods; overharvested for alkaloid extraction.",
    clinicalPharmacology: "Colchicine binds tubulin to halt leukocyte migration and phagocytosis in inflamed synovial joints, halting acute gout flare-ups.",
    description: "Colchicum luteum (Suranjan-e-Talkh) sprouts cheerful golden star-like blooms immediately following snowmelt in early spring. Its bitter underground corms are world-famous in Unani medicine as the specific antidote for crippling gout and arthritic inflammation."
  },
  "medicinal-23": {
    localName: "Asmani / Somlata",
    traditionalSystems: ["Ayurveda (Soma)", "Amchi / Sowa-Rigpa", "Folk Ethnobotany"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Jointed Green Twigs",
    activeConstituents: "Ephedrine, pseudoephedrine, norephedrine, tannins",
    traditionalPreparation: "Twigs brewed into a stimulating medicinal tea to relieve severe bronchial spasms, acute hay fever, and altitude hypotension.",
    harvestingStatus: "Near Threatened — Cold desert rocky slopes of Ladakh, Kargil, and upper Kashmir valleys.",
    clinicalPharmacology: "Direct and indirect sympathomimetic amine; stimulates alpha and beta-adrenergic receptors, causing powerful bronchodilation and vasoconstriction.",
    description: "Ephedra gerardiana (Somlata / Asmani) is a low, jointed green subshrub clinging to arid rocky screes of the trans-Himalayan rain shadow. It has been used for centuries as an emergency respiratory opener for mountain travelers battling thin air and asthma."
  },
  "medicinal-24": {
    localName: "Chirayita / Kiratatikta",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Amchi"],
    therapeuticCategory: "Antipyretic & Febrifuge",
    partUsed: "Whole Dried Plant",
    activeConstituents: "Chiratin, amarogentin, swertiamarin, mangiferin",
    traditionalPreparation: "Overnight cold infusion taken first thing in the morning to break stubborn intermittent fevers, purify blood, and stimulate sluggish digestion.",
    harvestingStatus: "Vulnerable — Heavy commercial harvesting in temperate moist slopes.",
    clinicalPharmacology: "Amarogentin is one of the bitterest compounds known, triggering profound digestive bile flow, glucose homeostasis, and anti-inflammatory cascade.",
    description: "Swertia chirayita (Chirayita) is an erect annual herb known throughout the subcontinent for its potent, pure bitterness. It cleanses systemic heat, protects against malarial flare-ups, and lowers elevated blood sugar."
  },
  "medicinal-25": {
    localName: "Satva / Ban-tamatr",
    traditionalSystems: ["Traditional Chinese Medicine (Chonglou)", "Amchi", "Folk Ethnobotany"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Underground Rhizome",
    activeConstituents: "Polyphyllin I, II, VII, dioscin, pennogenin steroidal saponins",
    traditionalPreparation: "Crushed root applied directly to staunch bleeding wounds, snake and insect bites, and malignant boils.",
    harvestingStatus: "Vulnerable — Huge trans-Himalayan illegal market demand; strictly monitored.",
    clinicalPharmacology: "Rapid hemostatic mechanism, cytotoxic induction of apoptosis in tumor cell lines, and potent broad-spectrum antifungal properties.",
    description: "Paris polyphylla (Satva) displays a solitary whorled collar of leaves topped by a strange spider-like flower and scarlet seed capsule. Its knobby subterranean rhizome is coveted as a hemostatic marvel for treating traumatic bleeding and viper bites."
  },
  "medicinal-26": {
    localName: "Pushkarmool / Poshekar",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Cardiovascular & Metabolic",
    partUsed: "Aromatic Root",
    activeConstituents: "Alantolactone, isoalantolactone, inunolide, essential oil (up to 4%)",
    traditionalPreparation: "Root powder blended with guggulu for ischemic chest pain, breathlessness on exertion, and chronic spastic bronchitis.",
    harvestingStatus: "Vulnerable — Extensively cultivated in Kashmir farms but wild stands in subalpine valleys are depleted.",
    clinicalPharmacology: "Demonstrated anti-anginal, anti-ischemic, bronchodilatory, and mast cell stabilizing actions; improves coronary blood supply.",
    description: "Inula racemosa (Pushkarmool) is a majestic herb with stout stems and massive yellow sunflower-like heads. Its camphor-scented roots are Ayurveda's foremost cardioprotective herb, relieving ischemic cardiac tightness and bronchial congestion."
  },
  "medicinal-27": {
    localName: "Dhup / Himalayan Incense Root",
    traditionalSystems: ["Kashmiri Ethnobotany", "Amchi", "Ayurveda"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Fleshy Root",
    activeConstituents: "Aromatic essential oils, inulin, sesquiterpenoids, jurinol",
    traditionalPreparation: "Root burned as a sacred temple and household fumigant; powdered root applied with ghee as a healing balm on indolent ulcers.",
    harvestingStatus: "Protected Forest Minor Produce — Subject to seasonal extraction quotas to protect high-altitude turf.",
    clinicalPharmacology: "Antimicrobial smoke reduces airborne pathogens; topical resin accelerates granulation tissue formation in wounds.",
    description: "Jurinea macrocephala (Dhup) forms broad rosettes on high-altitude meadows between 2,800m and 4,000m. Its thick, aromatic root is the traditional source of sacred Himalayan dhoop incense, purifying homes and soothing chronic skin ulcers."
  },
  "medicinal-28": {
    localName: "Mushkbala / Sugandhabala",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Modern Phytotherapy"],
    therapeuticCategory: "Nervine & Neurological",
    partUsed: "Aromatic Root & Rhizome",
    activeConstituents: "Valepotriates (valtrate, isovaltrate), valerenic acid, bornyl isovalerate",
    traditionalPreparation: "Root decoction or herbal tea taken at bedtime for nervous insomnia, hysteria, panic attacks, and cardiac nervousness.",
    harvestingStatus: "High Forest Collection Pressure — Monitored by the J&K State Medicinal Plants Board.",
    clinicalPharmacology: "Inhibits GABA reuptake and catabolism, inducing natural sleep architecture and relaxing smooth muscle spasms without morning grogginess.",
    description: "Valeriana jatamansi (Mushkbala) carpets damp forest floors in oak and deodar belts. Emitting a warm, earthy fragrance, its roots are celebrated as an herbal sedative for soothing fretful nerves, sleeplessness, and heart flutter."
  },
  "medicinal-29": {
    localName: "Chhoti Mushkbala / Hardwick's Valerian",
    traditionalSystems: ["Ayurveda", "Folk Ethnobotany"],
    therapeuticCategory: "Nervine & Neurological",
    partUsed: "Rhizome & Rootlets",
    activeConstituents: "Valerenic acid, volatile oils, iridoid glucosides",
    traditionalPreparation: "Powdered root consumed with warm water for abdominal cramping, nervous dyspepsia, and mild epilepsy.",
    harvestingStatus: "Commonly Tracked — Shady temperate ravine slopes.",
    clinicalPharmacology: "Spasmolytic and neuro-sedative, relaxing visceral gastrointestinal contractions and dampening central hyper-excitability.",
    description: "Valeriana hardwickii is a tall valerian relative growing in moist forest hollows. Used alongside Mushkbala, it provides gentle sedation for gastrointestinal nervous spasms and emotional stress."
  },
  "medicinal-30": {
    localName: "Pashanbhed / Zakhm-e-hayat",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Stout Rhizome & Fleshy Leaves",
    activeConstituents: "Bergenin, gallic acid, (+)-catechin, arbutin, condensed tannins",
    traditionalPreparation: "Rhizome decoction drank for dissolving renal calculi and soothing burning micturition; warm leaf paste applied to heal open cuts instantly.",
    harvestingStatus: "Common / Regulated — High commercial demand for kidney stone proprietary herbal formulations.",
    clinicalPharmacology: "Anti-urolithiatic activity prevents calcium oxalate nucleation and crystal growth; bergenin exerts profound wound-healing and anti-inflammatory properties.",
    description: "Bergenia ciliata (Zakhm-e-hayat / Pashanbhed) grows wedged directly into steep rock crevices with large hairy oval leaves. True to its Kashmiri name 'Zakhm-e-hayat' (wound-reviver), it staunches bleeding from cuts and crushes kidney stones into passable sand."
  },
  "medicinal-31": {
    localName: "Bat-pippal / Strachey's Bergenia",
    traditionalSystems: ["Amchi / Sowa-Rigpa", "Folk Ethnobotany"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Rhizome & Leaves",
    activeConstituents: "Bergenin, tannins, polyphenols, flavonoids",
    traditionalPreparation: "Root decoction used for ophthalmia, chronic diarrhea, and as a plaster for broken bones in alpine livestock.",
    harvestingStatus: "Abundant on Subalpine Rocks — Sensitive to road construction along passes.",
    clinicalPharmacology: "Astringent, diuretic, nephroprotective, and free-radical scavenger.",
    description: "Bergenia stracheyi is an alpine sister of Zakhm-e-hayat thriving at higher elevations up to 4,200m. It is relied upon by mountain herdsmen for ophthalmic washes and setting livestock fractures."
  },
  "medicinal-32": {
    localName: "Hing-patra / Jaeschke's Ferula",
    traditionalSystems: ["Folk Ethnobotany", "Unani Tibb"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Gum-Resin & Thick Root",
    activeConstituents: "Ferulic acid, umbelliferone derivatives, jaeschkenodiol, sesquiterpenes",
    traditionalPreparation: "Gum exudate rolled into tiny pills for chronic indigestion, intestinal flatulence, and applied to painful dental cavities.",
    harvestingStatus: "Localized in Dry Valleys — Karewas and dry scrub slopes of J&K.",
    clinicalPharmacology: "Antispasmodic, anti-fertility (abortifacient in high doses), carminative, and antimicrobial.",
    description: "Ferula jaeschkeana (Hing-patra) is a gigantic umbellifer with finely dissected leaves and towering yellow flower heads. Yielding an aromatic gum-resin akin to asafoetida, it drives away intestinal gas and toothache pain."
  },
  "medicinal-33": {
    localName: "Meda / Mahameda / Salam-kand",
    traditionalSystems: ["Ayurveda (Astavarga)", "Unani Tibb", "Amchi"],
    therapeuticCategory: "Immuno-tonic & Vitality",
    partUsed: "Creeping Rhizome",
    activeConstituents: "Diosgenin, polygonatosides, steroidal saponins, mucilage",
    traditionalPreparation: "Rhizomes boiled in cow's milk and ghee as an Astavarga longevity rasayana to rejuvenate vitality, nourish deep tissues, and clear dry cough.",
    harvestingStatus: "Vulnerable in Wild — Key component of endangered Ayurvedic Astavarga complex.",
    clinicalPharmacology: "Adaptogenic, anabolic, immunostimulant, and demulcent; enhances protein synthesis and restores emaciated tissues.",
    description: "Polygonatum verticillatum (Meda) bears graceful whorls of narrow leaves and pendulous bell flowers in mixed pine and birch forests. It is one of the revered Astavarga tonic herbs, celebrated for bolstering cellular longevity and sexual vigor."
  },
  "medicinal-34": {
    localName: "Mitha Dudh / Tendril Solomon's Seal",
    traditionalSystems: ["Ayurveda", "Folk Ethnobotany"],
    therapeuticCategory: "Immuno-tonic & Vitality",
    partUsed: "Rhizome",
    activeConstituents: "Polysaccharides, saponins, amino acids, vitamins",
    traditionalPreparation: "Decoction taken for general debility, chronic dry bronchitis, and postpartum exhaustion.",
    harvestingStatus: "Tracked Forest Species — Subalpine forest edges.",
    clinicalPharmacology: "Demulcent, nourishing tonic, antioxidant, and immunomodulator.",
    description: "Polygonatum cirrhifolium climbs with curling leaf tendrils in mountain ravines. Its sweet rhizomes are harvested as a nutritive rejuvenative to rebuild strength after debilitating fevers."
  },
  "medicinal-35": {
    localName: "Banafsha / Sweet Violet",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Delicate Purple Flowers & Leaves",
    activeConstituents: "Methyl salicylate, violatoside, rutin, saponins, cyanin",
    traditionalPreparation: "Steeped in boiling water as the centerpiece of Kashmiri Joshanda herbal tea for winter influenza, pleurisy, and sore throat.",
    harvestingStatus: "Wild Gathered — Heavily collected in spring by rural villagers; seasonal harvest quotas.",
    clinicalPharmacology: "Natural salicylate provides analgesic, antipyretic, and soothing anti-inflammatory effects on upper respiratory mucosa.",
    description: "Viola odorata (Banafsha) is Kashmir’s most famous spring wildflower, carpeting orchard floors and woodland margins. Essential to Unani medicine and Kashmiri family healthcare, its fragrant purple blooms break stubborn fevers and soothe bronchial congestion."
  },
  "medicinal-36": {
    localName: "Ban-banafsha / Yellow Wood Violet",
    traditionalSystems: ["Kashmiri Ethnobotany", "Amchi"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Whole Flowering Herb",
    activeConstituents: "Saponins, flavonoids, salicylic acid esters",
    traditionalPreparation: "Fresh leaves crushed into cooling eye washes; whole herb brewed as an expectorant syrup for children.",
    harvestingStatus: "Subalpine Woodland Native — Abundant in shaded ravines.",
    clinicalPharmacology: "Expectorant, mild laxative, and cutaneous anti-inflammatory.",
    description: "Viola biflora (Ban-banafsha) brightens shady subalpine streamsides with cheerful twin-petaled yellow flowers. It serves as an alpine substitute for Banafsha in remote mountain hamlets."
  },
  "medicinal-37": {
    localName: "Kaur Banafsha / Hairy Violet",
    traditionalSystems: ["Folk Ethnobotany", "Unani Tibb"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Flowers & Roots",
    activeConstituents: "Violin alkaloid, glycosides, mucilage",
    traditionalPreparation: "Decoction taken to induce sweating (diaphoresis) during violent chills and headaches.",
    harvestingStatus: "Temperate Forest Flora — Protected under sustainable forest produce guidelines.",
    clinicalPharmacology: "Diaphoretic, mild antipyretic, and expectorant.",
    description: "Viola pilosa grows in lower temperate pine forests with heart-shaped hairy foliage. It is routinely gathered alongside other violets for commercial Unani cough syrups."
  },
  "medicinal-38": {
    localName: "Bazarbhang / Ajwain-e-Khurasani / Henbane",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Modern Pharmacopeia"],
    therapeuticCategory: "Nervine & Neurological",
    partUsed: "Leaves & Seeds",
    activeConstituents: "Hyoscyamine, scopolamine (hyoscine), tropane alkaloids",
    traditionalPreparation: "Carefully calibrated Unani pills (Hab-e-Shifa) for violent intestinal colic, asthma spasms, and severe trigeminal neuralgia.",
    harvestingStatus: "Regulated Narcotic / Poison — Strict control under pharmacy regulations.",
    clinicalPharmacology: "Anticholinergic muscarinic receptor antagonist; suppresses visceral smooth muscle spasms, salivation, and tremors in parkinsonism.",
    description: "Hyoscyamus niger (Bazarbhang) carries eerie veined yellow-brown flowers with a purple throat along roadsides and stony wastelands. A legendary alkaloid-rich herb, it is tapped by experienced physicians to quench agonizing pain and spastic tremors."
  },
  "medicinal-39": {
    localName: "Mait-brand / Indian Belladonna",
    traditionalSystems: ["Modern Pharmacopeia", "Unani Tibb"],
    therapeuticCategory: "Nervine & Neurological",
    partUsed: "Leaves & Taproot",
    activeConstituents: "Atropine, 1-hyoscyamine, belladonnine, apoatropine",
    traditionalPreparation: "Industrial extraction for ophthalmic mydriatic drops and systemic atropine sulfate injections for bradycardia.",
    harvestingStatus: "Endangered in Wild / State Forest Monopoly — Historically farmed in Baramulla and Dachigam under government lease.",
    clinicalPharmacology: "Blocks parasympathetic nervous system transmission, dilates bronchioles, accelerates heart rate, and arrests glandular secretions.",
    description: "Atropa acuminata (Mait-brand) is the Himalayan counterpart to deadly nightshade, thriving in damp subalpine forest clearings. Highly regulated, its potent tropane alkaloids are foundational to modern emergency medicine and ophthalmology."
  },
  "medicinal-40": {
    localName: "Dhatura / Jimsonweed",
    traditionalSystems: ["Ayurveda (Upavisha)", "Unani Tibb", "Folk Ethnobotany"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Seeds & Dried Leaves",
    activeConstituents: "Scopolamine, hyoscyamine, atropine, withanolides",
    traditionalPreparation: "Leaves smoked in small quantities as an emergency folk remedy for acute spasmodic asthma attacks; seed oil applied topically for earache.",
    harvestingStatus: "Common Weed — Toxic plant requiring careful handling.",
    clinicalPharmacology: "Bronchodilator and powerful anticholinergic; induces hallucinations, tachycardia, and central nervous depression if ingested.",
    description: "Datura stramonium (Dhatura) is a robust wasteland plant with trumpet-shaped white flowers and spiny seed pods. Although dangerously toxic when swallowed, its bronchodilating smoke has historically rescued victims of suffocating asthma."
  },
  "medicinal-41": {
    localName: "Bhang / Charas / Indian Hemp",
    traditionalSystems: ["Ayurveda (Vijaya)", "Unani Tibb (Qinnab)", "Folk Ethnobotany"],
    therapeuticCategory: "Nervine & Neurological",
    partUsed: "Flowering Tops, Leaves & Resin",
    activeConstituents: "Cannabidiol (CBD), Tetrahydrocannabinol (THC), Cannabinol, Caryophyllene",
    traditionalPreparation: "Leaves crushed with almonds and spices for festive cooling drinks; topical oil for neuropathic joint agony and eczema.",
    harvestingStatus: "NDPS Regulated / Wild Weedy Growth across Kashmir riverbeds and roadsides.",
    clinicalPharmacology: "Interacts with endocannabinoid CB1 and CB2 receptors; powerful analgesic, anti-emetic, appetite stimulant, and anticonvulsant.",
    description: "Cannabis sativa (Bhang) grows profusely across Kashmir's floodplains and ditches. Revered since antiquity in Ayurveda as a profound painkiller and digestive fire igniter, its therapeutic use is managed under statutory narcotics regulations."
  },
  "medicinal-42": {
    localName: "Poudin / Field Mint",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Leaves & Flowering Tops",
    activeConstituents: "Menthol (up to 80%), menthone, isomenthone, limonene",
    traditionalPreparation: "Fresh leaves pounded with walnuts and green chilies into cooling digestant chutney; steam inhalation for nasal congestion.",
    harvestingStatus: "Cultivated & Naturalized across irrigation canals and kitchen gardens.",
    clinicalPharmacology: "Carminative, antispasmodic, anti-emetic, and local counter-irritant stimulating TRPM8 cold-sensing nerve channels.",
    description: "Mentha arvensis (Poudin) thrives along wet ditches and irrigation channels. A staple in every Kashmiri household, it combats dyspepsia, halts nausea, and clears stuffy sinuses."
  },
  "medicinal-43": {
    localName: "Wan-pudina / Wild Horse Mint",
    traditionalSystems: ["Kashmiri Ethnobotany", "Unani Tibb"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Whole Aromatic Herb",
    activeConstituents: "Piperitenone oxide, pulegone, thymol, menthone",
    traditionalPreparation: "Brewed into tea for intestinal cramps, flatulence, and applied as a leaf poultice to forehead for tension headaches.",
    harvestingStatus: "Common Streamside Native — Abundant in Lidder and Sindh river valleys.",
    clinicalPharmacology: "Broad-spectrum antimicrobial, carminative, and smooth muscle relaxant.",
    description: "Mentha longifolia (Wan-pudina) lines the pristine rushing mountain streams of Kashmir with silver-haired leaves and lilac flower spikes. Villagers harvest it wild to settle stomach aches and invigorate digestion."
  },
  "medicinal-44": {
    localName: "Vilayti Pudina / Peppermint",
    traditionalSystems: ["Modern Phytotherapy", "Unani Tibb"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Leaves & Essential Oil",
    activeConstituents: "Menthol, menthyl acetate, cineole, flavonoids",
    traditionalPreparation: "Peppermint oil enteric capsules for irritable bowel syndrome; aromatic water for infantile colic.",
    harvestingStatus: "Commercial Crop in Valley Farms.",
    clinicalPharmacology: "Calcium channel blocking effect on colonic smooth muscle, reducing spasms and visceral hypersensitivity.",
    description: "Mentha piperita (Peppermint) is grown in Kashmir's fertile alluvium. Its cool, penetrating oil is a globally validated therapy for irritable bowel syndrome and spastic digestive complaints."
  },
  "medicinal-45": {
    localName: "Wan-babur / Wild Oregano",
    traditionalSystems: ["Unani Tibb", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Antimicrobial & Anti-infective",
    partUsed: "Aerial Flowering Shoots",
    activeConstituents: "Carvacrol, thymol, rosmarinic acid, terpinen-4-ol",
    traditionalPreparation: "Steeped into tea for acute respiratory infections, toothache oil, and digestive revival.",
    harvestingStatus: "Common on Sunny Mountain Slopes.",
    clinicalPharmacology: "Unusually potent broad-spectrum antibacterial and antifungal agent; disrupts bacterial membrane integrity.",
    description: "Origanum vulgare (Wan-babur) carpets dry sunny hillsides with fragrant purple-pink blossoms. Mountain inhabitants brew it to fend off chest colds and disinfect gastrointestinal infections."
  },
  "medicinal-46": {
    localName: "Banajwain / Chhaj-mula / Wild Thyme",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Amchi", "Folk Ethnobotany"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Aerial Flowering Herb",
    activeConstituents: "Thymol (up to 60%), p-cymene, gamma-terpinene, linalool",
    traditionalPreparation: "Dried herb steeped into aromatic morning tea for whooping cough, asthma, stomach parasites, and throat gargles.",
    harvestingStatus: "Abundant Alpine Scree & Pasture Carpet.",
    clinicalPharmacology: "Antiseptic, bronchodilatory, secretomotor, and anthelmintic; thymol liquefies stubborn bronchial mucus.",
    description: "Thymus linearis (Banajwain) creeps across high alpine meadows, emitting an intoxicating spicy scent underfoot. High-altitude herders rely on it as a soothing hot tea for nagging bronchitis and stomach chills."
  },
  "medicinal-47": {
    localName: "Banajwain / Creeping Thyme",
    traditionalSystems: ["Folk Ethnobotany", "Unani Tibb"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Flowering Herb",
    activeConstituents: "Thymol, carvacrol, rosmarinic acid, caffeic acid",
    traditionalPreparation: "Infusion for spasmodic cough, catarrh, and as an antiseptic mouthwash for bleeding gums.",
    harvestingStatus: "Common in High Altitude Scrub.",
    clinicalPharmacology: "Expectorant, antispasmodic, and antimicrobial.",
    description: "Thymus serpyllum spreads low mats across alpine rocks. It is gathered throughout Kashmir’s highlands to treat childhood coughs and freshen the breath."
  },
  "medicinal-48": {
    localName: "Sholar / Khal-hal / Moorcroft's Sage",
    traditionalSystems: ["Unani Tibb", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Broad Leaves, Seeds & Root",
    activeConstituents: "Diterpenes, salviol, sclareol, essential oil",
    traditionalPreparation: "Large velvety leaves heated with mustard oil and applied as a drawing poultice to boils, carbuncles, and abscesses; seeds used for dysentery.",
    harvestingStatus: "Common on Open Slopes and Karewas.",
    clinicalPharmacology: "Anti-inflammatory, drawing agent for cutaneous purulent infections, and emollient.",
    description: "Salvia moorcroftiana (Sholar) bears enormous woolly basal leaves and pale lilac flower spikes on open hillsides. It is Kashmir’s traditional drawing plaster for pulling out infection from stubborn boils and skin carbuncles."
  },
  "medicinal-49": {
    localName: "Sclarea / Clary Sage",
    traditionalSystems: ["Aromatherapy", "Unani Tibb"],
    therapeuticCategory: "Nervine & Neurological",
    partUsed: "Flowering Tops & Essential Oil",
    activeConstituents: "Sclareol, linalyl acetate, linalool, germacrene D",
    traditionalPreparation: "Inhaled or used in massage oil for nervous tension, menstrual cramping, and mental fatigue.",
    harvestingStatus: "Cultivated in Kashmir Botanical Gardens and Farms.",
    clinicalPharmacology: "Estrogenic modulation, antidepressant, anxiolytic, and smooth muscle relaxant.",
    description: "Salvia sclarea produces tall, aromatic bracts with blue-violet flowers. Introduced to Kashmir's fragrant agricultural farms, it relieves emotional exhaustion and hormonal imbalances."
  },
  "medicinal-50": {
    localName: "Chopandig / Yarrow",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Folk Ethnobotany"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Aerial Flowering Herb",
    activeConstituents: "Achilleine, chamazulene, azulene, camphor, luteolin",
    traditionalPreparation: "Fresh leaves packed into bleeding cuts to stop hemorrhage; tea taken to break childhood fevers through sweating.",
    harvestingStatus: "Common Forest Margin and Meadow Weed.",
    clinicalPharmacology: "Hemostatic, diaphoretic, anti-inflammatory, and spasmolytic; chamazulene dampens leukotriene production.",
    description: "Achillea millefolium (Chopandig) displays delicate feathery leaves and flat-topped clusters of white blossoms. Kashmiri shepherds ('Chopan') carry it as an immediate field dressing to halt blood loss from lacerations and heal wounds."
  },
  "medicinal-51": {
    localName: "Tethwan / Wormwood",
    traditionalSystems: ["Unani Tibb", "Kashmiri Ethnobotany", "Ayurveda"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Whole Aerial Silver Herb",
    activeConstituents: "Absinthin, anabsinthin, thujone, chamazulene, artemetin",
    traditionalPreparation: "Bitter leaf tea taken for intestinal roundworms, chronic liver sluggishness, and loss of appetite; smoke used to deter insects.",
    harvestingStatus: "Abundant across Kashmir Valley Roadsides and Wastelands.",
    clinicalPharmacology: "Intense bitter principles stimulate gastro-hepatic secretions; demonstrated anthelmintic, anti-parasitic, and hepatoprotective properties.",
    description: "Artemisia absinthium (Tethwan) is iconic in the cultural fabric of Kashmir, famous for its intense, cleansing bitterness. Used by every generation to purge intestinal worms and invigorate sluggish livers, its silver foliage scents the rural countryside."
  },
  "medicinal-52": {
    localName: "Murin / Short-leaved Wormwood",
    traditionalSystems: ["Unani Tibb", "Folk Ethnobotany"],
    therapeuticCategory: "Antimicrobial & Anti-infective",
    partUsed: "Leaves & Flower Heads",
    activeConstituents: "Santonin, essential oils, artemisin",
    traditionalPreparation: "Powdered flower heads given in milk as a specific dewormer for children suffering from roundworm infestations.",
    harvestingStatus: "Dry Alpine Steppe Native — Ladakh and upper valleys.",
    clinicalPharmacology: "Paralyzes intestinal roundworms (Ascaris lumbricoides), allowing expulsion via natural peristalsis.",
    description: "Artemisia brevifolia thrives in the arid cold desert tracts of Ladakh and northern Kashmir. It is a prized source of Santonin, the historic vermifuge for eradicating intestinal parasites."
  },
  "medicinal-53": {
    localName: "Chahar / Sea Wormwood",
    traditionalSystems: ["Unani Tibb", "Ayurveda"],
    therapeuticCategory: "Antimicrobial & Anti-infective",
    partUsed: "Unexpanded Flower Heads",
    activeConstituents: "Santonin, beta-thujone, cineole",
    traditionalPreparation: "Infusion for parasitic worms and stomach cramps.",
    harvestingStatus: "Tracked in Arid Trans-Himalayan Pockets.",
    clinicalPharmacology: "Potent vermifuge, antiseptic, and stomachic bitter.",
    description: "Artemisia maritima is a perennial aromatic herb yielding high concentrations of Santonin, traditionally utilized to cleanse the digestive tract of parasitic infections."
  },
  "medicinal-54": {
    localName: "Tethwan-khul / Mugwort",
    traditionalSystems: ["Kashmiri Ethnobotany", "Amchi", "Unani Tibb"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Leaves & Flowering Tops",
    activeConstituents: "Cineole, thujone, vulgarenol, sesquiterpenoids",
    traditionalPreparation: "Leaves dried into moxa punk for thermal moxibustion over aching joints; hot leaf baths for rheumatic stiffness.",
    harvestingStatus: "Common Field Margin Herb.",
    clinicalPharmacology: "Emmenagogue, mild sedative, carminative, and local rubefacient.",
    description: "Artemisia vulgaris (Tethwan-khul) grows tall in hedgerows and fallow fields. Folk healers prepare steaming herbal compresses from its leaves to alleviate cold, damp rheumatic joints during harsh Kashmiri winters."
  },
  "medicinal-55": {
    localName: "Kasni / Hand / Wild Chicory",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Taproot & Fresh Leaves",
    activeConstituents: "Inulin (up to 50%), lactucin, lactucopicrin, cichoriin, esculetin",
    traditionalPreparation: "Roots roasted or brewed in Unani Arq Kasni to detoxify liver, treat jaundice, relieve bilious headaches, and soothe inflamed kidneys.",
    harvestingStatus: "Abundant across Kashmir Orchards and Meadows.",
    clinicalPharmacology: "Outstanding prebiotic fiber (inulin); hepatoprotective, increases bile output, lowers blood urea, and guards against hepatic steatosis.",
    description: "Cichorium intybus (Kasni) blooms with sky-blue flowers along meadow edges. In Unani Tibb, 'Arq Kasni' is the celebrated universal protector of the liver and kidneys, cooling metabolic heat and reversing sluggish bile stagnation."
  },
  "medicinal-56": {
    localName: "Haand / Dandelion",
    traditionalSystems: ["Kashmiri Ethnobotany", "Unani Tibb", "Ayurveda"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Taproot & Spring Rosette Leaves",
    activeConstituents: "Taraxacin, taraxasterol, inulin, luteolin, potassium (rich)",
    traditionalPreparation: "Fresh leaves cooked with spices into a revered nourishing postnatal dish for nursing Kashmiri mothers; root tea taken for sluggish liver.",
    harvestingStatus: "Abundant Wild Spring Herb throughout the Valley.",
    clinicalPharmacology: "Potassium-sparing diuretic, choleretic, anti-inflammatory, and gut microbiome enhancer.",
    description: "Taraxacum officinale (Haand) is woven deeply into Kashmiri culinary and postpartum culture. Steamed greens are fed to new mothers to restore blood, replenish vital minerals, and stimulate breast milk flow, while roots purify the liver."
  },
  "medicinal-57": {
    localName: "Bartang / Isabghol-e-bostani / Broadleaf Plantain",
    traditionalSystems: ["Unani Tibb", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Mucilaginous Seeds & Fresh Leaves",
    activeConstituents: "Aucubin, plantamajoside, mucilage, tannins, silicic acid",
    traditionalPreparation: "Seeds soaked in water to form a soothing mucilage for bloody dysentery and colitis; fresh leaves crushed onto insect stings and burns.",
    harvestingStatus: "Abundant Moist Meadow Flora.",
    clinicalPharmacology: "Demulcent, astringent, promotes mucosal re-epithelialization, and inhibits gut bacterial toxins.",
    description: "Plantago major (Bartang) thrives along pathway edges and moist ditches. Its tiny mucilaginous seeds are a household staple in Kashmir for arresting stubborn intestinal inflammation, diarrhea, and stomach ulcers."
  },
  "medicinal-58": {
    localName: "Bartang / Ribwort Plantain",
    traditionalSystems: ["Unani Tibb", "Folk Ethnobotany"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Leaves & Seeds",
    activeConstituents: "Aucubin, catalpol, tannins, mucilage",
    traditionalPreparation: "Leaf tea used for persistent dry coughs and bronchial catarrh; crushed leaves staunch minor bleeding.",
    harvestingStatus: "Common Grassland Native.",
    clinicalPharmacology: "Antibacterial, anti-inflammatory, and mucosal protective.",
    description: "Plantago lanceolata bears narrow ribbed leaves and brownish flower spikes. It is widely collected to soothe irritable throat catarrh and skin scrapes."
  },
  "medicinal-59": {
    localName: "Abuj / Halon / Nepal Dock",
    traditionalSystems: ["Kashmiri Ethnobotany", "Unani Tibb"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Stout Yellow Root & Leaves",
    activeConstituents: "Nepalin, nepodin, chrysophanic acid, anthraquinone glycosides",
    traditionalPreparation: "Crushed root blended with vinegar into a topical paste for ringworm, scabies, and fungal eczema; leaves rubbed to neutralize stinging nettle rash.",
    harvestingStatus: "Common Weed in Pastures and Farmyards.",
    clinicalPharmacology: "Powerful antifungal, antibacterial, and mild purgative; anthraquinones halt dermatophyte fungal spread.",
    description: "Rumex nepalensis (Abuj) grows broad, lush leaves around villages and alpine pastures. Nature's immediate antidote to stinging nettles, rubbing its cooling juicy leaves instantly neutralizes the fiery formic acid burn."
  },
  "medicinal-60": {
    localName: "Aabj / Garden Sorrel",
    traditionalSystems: ["Kashmiri Ethnobotany", "Folk Medicine"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Fresh Tart Leaves",
    activeConstituents: "Potassium binoxalate, oxalic acid, Vitamin C, flavonoids",
    traditionalPreparation: "Fresh leaves eaten as a thirst-quenching antiscorbutic spring salad or cooling summer beverage.",
    harvestingStatus: "Common along Grassy Slopes.",
    clinicalPharmacology: "Refrigerant, antiscorbutic, and mild diuretic.",
    description: "Rumex acetosa (Aabj) produces arrow-shaped leaves with an agreeable sour tang. Rural folk chew the leaves to relieve burning thirst and supply vital Vitamin C after long winters."
  },
  "medicinal-61": {
    localName: "Soi / Stinging Nettle",
    traditionalSystems: ["Kashmiri Ethnobotany", "Ayurveda", "Modern Phytotherapy"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Aerial Shoots & Roots",
    activeConstituents: "Histamine, acetylcholine, serotonin, formic acid (stings); scopoletin, beta-sitosterol (root)",
    traditionalPreparation: "Fresh stems applied directly (urtication) to arthritic knees and back spasms; root decoction taken for benign prostatic hyperplasia (BPH); young greens boiled as a mineral tonic.",
    harvestingStatus: "Abundant Wild Plant in Shady Moist Corners.",
    clinicalPharmacology: "Urtication stimulates counter-irritant blood flow and endorphin release; root extracts inhibit 5-alpha reductase and aromatase in prostatic tissue.",
    description: "Urtica dioica (Soi) is notorious for its fierce hypodermic stinging hairs, yet holds immense medicinal value. Traditional Kashmiri elders intentionally brush painful arthritic joints with fresh nettles to drive away chronic rheumatic agony."
  },
  "medicinal-62": {
    localName: "Bassant / St. John's Wort",
    traditionalSystems: ["Modern Phytotherapy", "Unani Tibb", "Folk Ethnobotany"],
    therapeuticCategory: "Nervine & Neurological",
    partUsed: "Golden Flowering Tops",
    activeConstituents: "Hypericin, pseudohypericin, hyperforin, flavonoids (rutin, hyperoside)",
    traditionalPreparation: "Flowers macerated in olive oil into a crimson 'Red Oil' for nerve trauma, sciatica, and burns; tea brewed for melancholia and depressive states.",
    harvestingStatus: "Common in Sunny Forest Clearings and Bank Edges.",
    clinicalPharmacology: "Reuptake inhibition of serotonin, dopamine, and norepinephrine; hyperforin provides natural antidepressant and neuroprotective efficacy.",
    description: "Hypericum perforatum (Bassant) blooms with radiant star-like yellow flowers bearing tiny perforated leaf glands. Its oil turns blood-red, healing traumatized nerve endings, sciatica, and mild-to-moderate emotional depression."
  },
  "medicinal-63": {
    localName: "Gur-kand / Wallich's Spurge",
    traditionalSystems: ["Folk Ethnobotany", "Veterinary Medicine"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Latex & Rootstock",
    activeConstituents: "Euphorbol, diterpene ingenane esters, triterpenoids",
    traditionalPreparation: "Milky latex carefully dotted onto stubborn warts and corns to dissolve them; veterinary vermifuge.",
    harvestingStatus: "Subalpine Pasture Native — Highly unpalatable to livestock.",
    clinicalPharmacology: "Caustic keratolytic, vesicant, and violent purgative; must be handled with protective gloves.",
    description: "Euphorbia wallichii (Gur-kand) dots high subalpine pastures with bright chartreuse floral bracts. Its corrosive white milky latex is applied with pinpoint precision by villagers to dissolve painful warts and corns."
  },
  "medicinal-64": {
    localName: "Hiri-dhar / Thomson's Spurge",
    traditionalSystems: ["Folk Medicine"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Rootstock & Latex",
    activeConstituents: "Diterpenoids, triterpenes, resins",
    traditionalPreparation: "Root paste used in sheep skin ailments and stubborn fungal sores.",
    harvestingStatus: "Alpine Meadow Native.",
    clinicalPharmacology: "Dermatological rubefacient and anti-parasitic.",
    description: "Euphorbia thomsoniana is a low perennial spurge growing in stony alpine turf. High pastoralists tap its pungent roots to treat skin eruptions in livestock."
  },
  "medicinal-65": {
    localName: "Surk-kand / Sang-e-sar / Cobra Lily",
    traditionalSystems: ["Folk Ethnobotany", "Amchi"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Underground Corm (Tuber)",
    activeConstituents: "Lectins, calcium oxalate raphides, saponins, triterpenoids",
    traditionalPreparation: "Tuber thoroughly roasted to destroy oxalate needles, then powdered into ointments for deep ringworm, eczema, and maggot-infested wounds in cattle.",
    harvestingStatus: "Common in Shady Coniferous Forests.",
    clinicalPharmacology: "Acaricidal, antifungal, and local counter-irritant.",
    description: "Arisaema jacquemontii (Surk-kand) rises from the forest floor with a hooded green-and-white cobra spathe. Its toxic tubers, when roasted by knowledgeable elders, make an infallible ointment against stubborn fungal ringworm."
  },
  "medicinal-66": {
    localName: "Machh-kand / Yellow Cobra Lily",
    traditionalSystems: ["Folk Ethnobotany"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Corm",
    activeConstituents: "Oxalate crystals, alkaloids, sterols",
    traditionalPreparation: "Tuber paste applied externally to draw out insect venom and soothe swollen contusions.",
    harvestingStatus: "Temperate Rocky Forest native.",
    clinicalPharmacology: "Rubefacient and anti-venomous folklore agent.",
    description: "Arisaema flavum features petite yellow spathes along forest rocky margins. It is utilized in remote valleys as a counter-irritant paste."
  },
  "medicinal-67": {
    localName: "Wai / Bach / Sweet Flag",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Amchi", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Nervine & Neurological",
    partUsed: "Aromatic Creeping Rhizome",
    activeConstituents: "alpha-Asarone, beta-asarone, acorin, calamene, eugenol",
    traditionalPreparation: "Peeled rhizome chewed or ground with honey to sharpen speech, improve vocal clarity in singers, clear mental fog, and soothe stomach colic.",
    harvestingStatus: "Wetland Native — Heavily gathered around Dal and Wular lakes.",
    clinicalPharmacology: "Nootropic (medhya rasayana), acetylcholinesterase inhibitor, bronchodilator, and speech stimulant.",
    description: "Acorus calamus (Wai) fringes Kashmir’s lakes, marshes, and waterways with reed-like leaves and sweet-scented rootstocks. Traditionally given to children to overcome speech delays, it sharpens memory and clears vocal cords."
  },
  "medicinal-68": {
    localName: "Kalveuth / Self-heal / Heal-all",
    traditionalSystems: ["Unani Tibb", "Kashmiri Ethnobotany", "Amchi"],
    therapeuticCategory: "Antimicrobial & Anti-infective",
    partUsed: "Whole Herb & Flower Spikes",
    activeConstituents: "Rosmarinic acid, ursolic acid, oleanolic acid, betulinic acid",
    traditionalPreparation: "Decoction used as a gargle for sore throats, aphthous mouth ulcers, and as a wash for inflamed conjunctivitis.",
    harvestingStatus: "Abundant along Orchard Paths and Forest Clearings.",
    clinicalPharmacology: "Broad antiviral (HSV inhibition), antioxidant, anti-inflammatory, and thyroid-modulating actions.",
    description: "Prunella vulgaris (Kalveuth) carpets paths with purple-blue spiked blooms. Known worldwide as Heal-all, Kashmiri Hakims prescribe it as an outstanding antimicrobial mouth gargle for throat infections and swollen lymph glands."
  },
  "medicinal-69": {
    localName: "Gul-e-kalam / Marsh Marigold",
    traditionalSystems: ["Folk Ethnobotany"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Leaves & Flowers (Boiled/Cooked only)",
    activeConstituents: "Anemonin, protoanemonin, helleborin-like saponins",
    traditionalPreparation: "Carefully boiled leaves applied as a hot compress over painful rheumatic joints; never consumed raw due to blistering toxins.",
    harvestingStatus: "Streamside Wet Meadow Flora.",
    clinicalPharmacology: "Rubefacient counter-irritant stimulating localized capillary perfusion; protoanemonin has antibacterial properties.",
    description: "Caltha palustris (Gul-e-kalam) illuminates snowmelt streams with brilliant golden buttercup-like blossoms. Highlanders boil its leaves to fashion warm compresses that alleviate deep winter joint pain."
  },
  "medicinal-70": {
    localName: "Chambel / Corn Buttercup",
    traditionalSystems: ["Folk Medicine"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Fresh Plant",
    activeConstituents: "Ranunculin, protoanemonin",
    traditionalPreparation: "Crushed fresh plant applied briefly as a blistering counter-irritant for stubborn sciatica and gout.",
    harvestingStatus: "Agricultural Weed in Wheat & Mustard fields.",
    clinicalPharmacology: "Vesicant, severe irritant; induces therapeutic counter-irritation.",
    description: "Ranunculus arvensis produces spiny-fruited yellow buttercup blossoms. In rural folk medicine, it is employed with extreme caution as a blistering agent for persistent sciatic pain."
  },
  "medicinal-71": {
    localName: "Pamposh / Nadru / Sacred Lotus",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Kashmiri Cuisine & Medicine"],
    therapeuticCategory: "Cardiovascular & Metabolic",
    partUsed: "Flowers (Pamposh), Seeds, & Rhizome (Nadru)",
    activeConstituents: "Nuciferine, neferine, liensinine, quercetin, lotusine",
    traditionalPreparation: "Flower syrup (Sharbat-e-Nilofar substitute) taken for heart palpitations, burning sensations, and insomnia; stems (Nadru) eaten as a fibrous anti-diabetic food.",
    harvestingStatus: "Dal Lake & Wular Lake Staple — Heavily cultivated and commercially managed.",
    clinicalPharmacology: "Anti-arrhythmic, sedative, anti-hyperglycemic, and powerful vascular antioxidant; neferine blocks transmembrane calcium influx.",
    description: "Nelumbo nucifera (Pamposh) is the soul of Kashmir's aquatic flora, crowning Dal and Wular lakes with magnificent pink blossoms. Its stems (Nadru) form Kashmir's iconic vegetable, while its flowers cool racing pulses and pacify mental agitation."
  },
  "medicinal-72": {
    localName: "Bum-posh / White Water Lily",
    traditionalSystems: ["Unani Tibb", "Ayurveda"],
    therapeuticCategory: "Nervine & Neurological",
    partUsed: "Showy White Flowers & Rhizome",
    activeConstituents: "Nymphaeine, nymphaline, gallic acid, tannins",
    traditionalPreparation: "Flower syrup (Sharbat-e-Bumposh) consumed for chronic insomnia, emotional heartbreak, nervous heart flutter, and sexual excitability.",
    harvestingStatus: "Common in Quiet Lake Bays and Canals.",
    clinicalPharmacology: "Mild sedative, anaphrodisiac, febrifuge, and astringent.",
    description: "Nymphaea alba (Bum-posh) floats pristine white chalices on the tranquil waters of Manasbal and Anchar lakes. Its cooling syrup soothes restless minds, calms palpitations, and brings peaceful rest."
  },
  "medicinal-73": {
    localName: "Juwar / Makhana / Foxnut",
    traditionalSystems: ["Ayurveda", "Unani Tibb"],
    therapeuticCategory: "Immuno-tonic & Vitality",
    partUsed: "Seeds (Puffed Foxnuts)",
    activeConstituents: "Resistant starch, kaempferol, amino acids, phosphorus, magnesium",
    traditionalPreparation: "Popped seeds roasted in ghee as an easily digestible restorative snack for pregnant and lactating mothers, elderly invalids, and renal debility.",
    harvestingStatus: "Wetland Native — Threatened in Kashmir by wetland filling.",
    clinicalPharmacology: "Kidney protective, anti-aging flavonoid content, cardioprotective, and low glycemic index energy source.",
    description: "Euryale ferox (Juwar / Makhana) is a giant prickly aquatic lily whose popped seeds are prized as a nutritional superfood. It rebuilds vitality, halts chronic diarrhea, and strengthens kidney function."
  },
  "medicinal-74": {
    localName: "Gaer / Singara / Water Chestnut",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Immuno-tonic & Vitality",
    partUsed: "Nut Kernel",
    activeConstituents: "Carbohydrates, potassium, citric acid, tannins, proteins",
    traditionalPreparation: "Dried kernels ground into flour for religious fasting foods and porridge; consumed to soothe gastric acidity and postpartum debility.",
    harvestingStatus: "Wular Lake Heritage Harvest — Hundreds of metric tons harvested annually.",
    clinicalPharmacology: "Refrigerant, anti-ulcerogenic, restorative nutrient, and thyroid-supporting mineral source.",
    description: "Trapa natans (Gaer / Singara) covers massive expanses of Wular Lake with floating rosette leaves. Harvested by thousands of fishermen, its starchy nuts provide economic sustenance and a soothing dietary therapy for gastric ulcers."
  },
  "medicinal-75": {
    localName: "Doon / Dandasa / Persian Walnut",
    traditionalSystems: ["Unani Tibb", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Antimicrobial & Anti-infective",
    partUsed: "Bark (Dandasa), Green Husks, Kernel Nut",
    activeConstituents: "Juglone, ellagitannins, alpha-linolenic acid (omega-3), polyphenols",
    traditionalPreparation: "Bark (Dandasa) rubbed over teeth and gums to stain them copper-gold, strengthen receding gums, and kill oral bacteria; kernel eaten for brain power.",
    harvestingStatus: "Commercial Agroforestry across Kashmir — J&K produces 90% of India's walnuts.",
    clinicalPharmacology: "Potent antimicrobial (juglone kills dental caries bacteria), astringent, neuroprotective, and lipid-lowering.",
    description: "Juglans regia (Doon) is majestic across Kashmiri villages. While its nuts nourish intellect and heart, its inner bark (Dandasa) is famously used by Kashmiri women to whiten teeth, impart a golden lip stain, and cure bleeding gums."
  },
  "medicinal-76": {
    localName: "Tsir / Chuli / Wild Apricot",
    traditionalSystems: ["Kashmiri & Ladakhi Ethnobotany", "Amchi"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Kernel Oil (Chuli Oil) & Fruit",
    activeConstituents: "Amygdalin (vitamin B17), oleic acid, linoleic acid, carotenoids",
    traditionalPreparation: "Cold-pressed kernel oil massaged into aching joints, rubbed into dry scalp to prevent dandruff, and dropped into ears for earache.",
    harvestingStatus: "Staple Tree in Ladakh and Northern J&K.",
    clinicalPharmacology: "Deep transdermal emollient, anti-inflammatory, free radical scavenger, and hair follicle stimulant.",
    description: "Prunus armeniaca (Tsir / Chuli) thrives in Ladakh and upper Kashmiri terraces. The golden oil extracted from its stone kernels (Chuli oil) is highlanders' universal salve for cold-chapped skin, joint stiffness, and shiny hair."
  },
  "medicinal-77": {
    localName: "Tsermang / Leh Berry / Sea Buckthorn",
    traditionalSystems: ["Amchi / Sowa-Rigpa", "Modern Nutraceuticals"],
    therapeuticCategory: "Immuno-tonic & Vitality",
    partUsed: "Berries & Seed Oil",
    activeConstituents: "Vitamin C (up to 30x oranges), palmitoleic acid (Omega-7), carotenoids, tocopherols",
    traditionalPreparation: "Berries juiced into revitalizing immune elixirs; seed oil applied topically to repair severe radiation burns, gastric ulcers, and frostbite.",
    harvestingStatus: "Riverine Shrub in Ladakh and Cold Riverbanks.",
    clinicalPharmacology: "Accelerates mucosal and skin epithelial regeneration, protects against ionizing radiation, reduces blood lipids, and boosts stamina.",
    description: "Hippophae rhamnoides (Tsermang) lines glacial riverbeds with thorny silver-green thickets and vibrant orange berries. A miracle superfood of the trans-Himalayas, it provides extreme vitamin density and cellular rejuvenation."
  },
  "medicinal-78": {
    localName: "Salic-tsermang / Willow-leaved Sea Buckthorn",
    traditionalSystems: ["Amchi / Sowa-Rigpa"],
    therapeuticCategory: "Cardiovascular & Metabolic",
    partUsed: "Berries & Bark",
    activeConstituents: "Flavonoids, Vitamin E, palmitoleic acid, organic acids",
    traditionalPreparation: "Decoction taken for pulmonary ailments, cough, and to stimulate arterial circulation in extreme cold.",
    harvestingStatus: "Riverine Slopes in Subalpine Valleys.",
    clinicalPharmacology: "Cardioprotective, microvascular strengthener, and cellular antioxidant.",
    description: "Hippophae salicifolia grows as a larger tree-like sea buckthorn along mountain torrents. High-altitude communities use its sour berries to defend against cardiovascular stress and frostbite."
  },
  "medicinal-79": {
    localName: "Kawas / Darhald / Rasaunt / Indian Barberry",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Amchi", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Antimicrobial & Anti-infective",
    partUsed: "Root Bark & Purified Extract (Rasaunt)",
    activeConstituents: "Berberine, palmatine, berbamine, oxyacanthine",
    traditionalPreparation: "Roots boiled into a solid amber extract (Rasaunt) applied into eyes for purulent conjunctivitis, smeared over infected ulcers, and taken for jaundice.",
    harvestingStatus: "Common Shrub on Hillsides — Heavily harvested for commercial berberine extraction.",
    clinicalPharmacology: "Broad-spectrum antimicrobial, insulin sensitizer, AMPK activator, and potent hepatic bile stimulant.",
    description: "Berberis lycium (Kawas) arms sunny mountain slopes with sharp triple-spines and golden blossom clusters. Its concentrated root extract (Rasaunt) is one of Kashmir's oldest cures for eye infections, stubborn jaundice, and septic sores."
  },
  "medicinal-80": {
    localName: "Rasaunt-khul / Tree Turmeric",
    traditionalSystems: ["Ayurveda", "Unani Tibb"],
    therapeuticCategory: "Antimicrobial & Anti-infective",
    partUsed: "Stem Wood & Root",
    activeConstituents: "Berberine, karachine, taxilamine",
    traditionalPreparation: "Decoction taken for chronic intermittent fevers, heavy menorrhagia, and metabolic disorders.",
    harvestingStatus: "Threatened in Wild by Commercial Stripping.",
    clinicalPharmacology: "Antimicrobial, anti-diabetic, anti-inflammatory, and hepatoprotective.",
    description: "Berberis aristata (Tree Turmeric) is renowned across the Himalayas for its bright yellow heartwood rich in Berberine, used to subdue fevers, bleeding disorders, and skin infections."
  },
  "medicinal-81": {
    localName: "Tsari Kawas / Thick-spined Barberry",
    traditionalSystems: ["Folk Ethnobotany", "Amchi"],
    therapeuticCategory: "Antimicrobial & Anti-infective",
    partUsed: "Root & Bark",
    activeConstituents: "Berberine alkaloids",
    traditionalPreparation: "Gargle for painful throat ulcerations and eyewash for livestock.",
    harvestingStatus: "Subalpine Scrub Native.",
    clinicalPharmacology: "Antiseptic and astringent.",
    description: "Berberis pachyacantha flourishes at higher altitudes with stout woody spines. Shepherds rely on its yellow root bark to cleanse cuts and sore eyes."
  },
  "medicinal-82": {
    localName: "Gul-e-surkh / Wan-gulab / Webb's Rose",
    traditionalSystems: ["Unani Tibb", "Amchi", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Immuno-tonic & Vitality",
    partUsed: "Rose Hips (Fruits) & Fragrant Petals",
    activeConstituents: "Ascorbic acid (Vitamin C), lycopene, carotenoids, polyphenols",
    traditionalPreparation: "Petals candied with sugar into cooling Gulkand for summer heat-stroke; hips dried and brewed into rich Vitamin C winter tea.",
    harvestingStatus: "Common Wild Rose on Mountain Terraces.",
    clinicalPharmacology: "Refrigerant, antiscorbutic, mild laxative, and capillary protective.",
    description: "Rosa webbiana (Wan-gulab) adorns dry mountain slopes with fragrant pink-and-white wild roses followed by brilliant red hips. Rural families harvest the hips to brew comforting winter teas packed with natural Vitamin C."
  },
  "medicinal-83": {
    localName: "Kanta-gulab / Large-leaved Rose",
    traditionalSystems: ["Amchi / Sowa-Rigpa", "Folk Medicine"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Large Hips & Flowers",
    activeConstituents: "Vitamin C, pectin, tannins, flavonoids",
    traditionalPreparation: "Hip decoction taken for chronic summer diarrhea and general debility by mountain climbers.",
    harvestingStatus: "High Forest Margins.",
    clinicalPharmacology: "Astringent, tonic, and free-radical scavenger.",
    description: "Rosa macrophylla produces exceptionally large urn-shaped scarlet hips. Sowa-Rigpa physicians incorporate them into vitality pills for digestive weakness."
  },
  "medicinal-84": {
    localName: "Zang-tsunt / Golden Evergreen Raspberry",
    traditionalSystems: ["Kashmiri Ethnobotany", "Ayurveda"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Root Bark & Golden Berries",
    activeConstituents: "Ellagic acid, anthocyanins, tannins, triterpenes",
    traditionalPreparation: "Root bark decoction drank for violent bacillary dysentery, gastric ulcers, and feverish thirst.",
    harvestingStatus: "Common in Sunny Ravines and Scrub.",
    clinicalPharmacology: "Potent astringent, intestinal secretagogue inhibitor, and mucosal healer.",
    description: "Rubus ellipticus bears bristly stems and clusters of delicious golden berries. In traditional Kashmiri medicine, its astringent root is an unfailing natural remedy for acute dysentery and stomach spasms."
  },
  "medicinal-85": {
    localName: "Chhan-mula / Blackberry / Bramble",
    traditionalSystems: ["Unani Tibb", "Folk Ethnobotany"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Leaves & Root Bark",
    activeConstituents: "Hydrolyzable tannins, flavonols, gallic acid",
    traditionalPreparation: "Leaf tea used as a mouthwash for bleeding spongy gums, canker sores, and gargle for laryngitis.",
    harvestingStatus: "Abundant Thicket Forming Shrub.",
    clinicalPharmacology: "Astringent, antimicrobial, and collagen cross-linking facilitator.",
    description: "Rubus fruticosus (Chhan-mula) forms dense protective hedgerows. Its tannin-packed leaves are picked to brew soothing astringent washes for bleeding gums and sore throats."
  },
  "medicinal-86": {
    localName: "Ghiwain / Autumn Olive",
    traditionalSystems: ["Modern Nutraceuticals", "Folk Medicine"],
    therapeuticCategory: "Cardiovascular & Metabolic",
    partUsed: "Berries & Seeds",
    activeConstituents: "Lycopene (up to 17x that of tomatoes), phytosterols, fatty acids",
    traditionalPreparation: "Fresh berries juiced or made into jams to promote prostate health, lower cholesterol, and guard coronary vessels.",
    harvestingStatus: "Common in Oak-Pine Woodlands.",
    clinicalPharmacology: "Exceptionally high lycopene antioxidant payload; inhibits LDL oxidation and suppresses prostate hyperplastic signaling.",
    description: "Elaeagnus umbellata (Ghiwain) produces silvery-dusted foliage and clusters of speckled crimson berries. Containing extraordinary levels of lycopene, it serves as a powerful cardiovascular and prostate protector."
  },
  "medicinal-87": {
    localName: "Kul-mish / Himalayan Viburnum",
    traditionalSystems: ["Folk Ethnobotany", "Ayurveda"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Stem Bark & Berries",
    activeConstituents: "Scopoletin, viopudial, viburnin, triterpenes",
    traditionalPreparation: "Bark decoction administered to relieve painful menstrual cramps (dysmenorrhea) and uterine contractions.",
    harvestingStatus: "Common Understory Shrub in Deodar and Fir Forests.",
    clinicalPharmacology: "Direct uterine and vascular smooth muscle relaxant via scopoletin; antispasmodic and sedative.",
    description: "Viburnum grandiflorum (Kul-mish) heralds early spring with fragrant pink-white pom-pom flowers on bare branches. Forest dwellers utilize its bark as an effective antispasmodic for painful uterine cramps and muscular spasms."
  },
  "medicinal-88": {
    localName: "Ringo-posh / Songar Hawthorn",
    traditionalSystems: ["Modern Phytotherapy", "Unani Tibb"],
    therapeuticCategory: "Cardiovascular & Metabolic",
    partUsed: "Berries & Flowering Leaves",
    activeConstituents: "Hyperoside, vitexin, procyanidins, crataegolic acid",
    traditionalPreparation: "Berry extract or tea consumed long-term for congestive heart weakness, mild hypertension, and coronary arteriosclerosis.",
    harvestingStatus: "Temperate Forest Margins in Kashmir.",
    clinicalPharmacology: "Inotropic, dilates coronary microvasculature, stabilizes cardiac rhythm, and prevents endothelial lipid peroxidation.",
    description: "Crataegus songarica (Ringo-posh) is a thorny tree bearing white spring flowers and ruby-red apple-like berries. It is a premier cardiotonic herb, bolstering failing heart muscle and smoothing coronary circulation."
  },
  "medicinal-89": {
    localName: "Veer / White Willow",
    traditionalSystems: ["Modern Pharmacology", "Unani Tibb", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Inner Bark",
    activeConstituents: "Salicin, salicortin, tremulacin, polyphenols, tannins",
    traditionalPreparation: "Bark decoction drank for inflammatory osteoarthritic joint pain, lower back agony, and feverish headaches.",
    harvestingStatus: "Ubiquitous along Kashmir Canals and Willow Plantations.",
    clinicalPharmacology: "Salicin is converted in vivo to salicylic acid (natural plant precursor of Aspirin); inhibits COX-2 without causing severe gastric ulceration.",
    description: "Salix alba (Veir) defines Kashmir's aquatic and rural landscape, famous for cricket bats and wicker baskets. Its inner bark is the original botanical cradle of Aspirin, quelling raging joint inflammation and fevers."
  },
  "medicinal-90": {
    localName: "Ban-veer / Toothed Willow",
    traditionalSystems: ["Folk Medicine"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Bark & Twigs",
    activeConstituents: "Salicylate derivatives, tannins",
    traditionalPreparation: "Bark boiled into a hot foot bath for chilblains, sprains, and swollen rheumatic ankles.",
    harvestingStatus: "Streamside Subalpine Shrub.",
    clinicalPharmacology: "Antipyretic, anti-inflammatory, and local astringent.",
    description: "Salix denticulata hugs rushing mountain torrents. High-altitude herders brew its bark into soothing footbaths to revive frostbitten, aching limbs."
  },
  "medicinal-91": {
    localName: "Safeda / Falsh / Himalayan Poplar",
    traditionalSystems: ["Unani Tibb", "Folk Ethnobotany"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Inner Bark & Resinous Leaf Buds",
    activeConstituents: "Populin, salicin, resinous balsam, caffeic acid derivatives",
    traditionalPreparation: "Resinous buds infused in oil as 'Balm of Gilead' ointment for burns, hemorrhoids, and muscular rheumatism.",
    harvestingStatus: "Common Valley Tree.",
    clinicalPharmacology: "Analgesic, anti-inflammatory, antimicrobial, and vulnerary.",
    description: "Populus ciliata towers along riverbeds and valleys. Its fragrant, resinous spring buds yield a soothing topical balm for relieving muscular rheumatism and healing cracked skin."
  },
  "medicinal-92": {
    localName: "Kayur / Blue Pine",
    traditionalSystems: ["Unani Tibb", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Resin (Ganda-biroza), Needles & Cones",
    activeConstituents: "alpha-Pinene, beta-pinene, bornyl acetate, turpentine oil",
    traditionalPreparation: "Resin steam inhalation for severe bronchial catarrh and cough; purified resin applied as an antiseptic plaster to draw out splinters and boils.",
    harvestingStatus: "Dominant Forest Tree — Resin tapping regulated by Forest Department.",
    clinicalPharmacology: "Antiseptic, secretolytic expectorant, rubefacient, and antimicrobial.",
    description: "Pinus wallichiana (Kayur) carpets the mid-slopes of Kashmir with graceful drooping needles. Its aromatic oleoresin is prized as a natural drawing plaster that draws out infection and opens congested lungs."
  },
  "medicinal-93": {
    localName: "Deodar / Himalayan Cedar",
    traditionalSystems: ["Ayurveda (Devadaru)", "Unani Tibb", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Heartwood & Distilled Wood Oil (Dewas Oil)",
    activeConstituents: "Himachalol, allohimachalol, atlantone, cedrene",
    traditionalPreparation: "Wood oil applied externally for veterinary scabies, chronic psoriasis, ringworm, and rubbed on joints for arthritis; wood chips brewed as a carminative.",
    harvestingStatus: "Protected Forest Timber — Distillation of fallen roots monitored.",
    clinicalPharmacology: "Potent spasmolytic, antifungal, anti-inflammatory, and insect repellent; himachalol produces marked smooth muscle relaxation.",
    description: "Cedrus deodara (Deodar), the Timber of the Gods, forms majestic cathedral groves across Kashmir. Its aromatic cedarwood oil ('Dewas oil') is an indispensable cure for skin fungal diseases, mange in livestock, and joint arthritis."
  },
  "medicinal-94": {
    localName: "Budal / Rayul / Himalayan Silver Fir",
    traditionalSystems: ["Ayurveda (Talispatra)", "Unani Tibb"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Needles (Leaves / Talispatra)",
    activeConstituents: "Abiesin, bioflavonoids, alpha-pinene, limonene, essential oil",
    traditionalPreparation: "Dried aromatic needles ground into Ayurvedic Talisadi Churna with spices for chronic asthma, tuberculosis cough, anorexia, and bronchitis.",
    harvestingStatus: "High Forest Conifer — Sustainable needle gathering from fallen branches.",
    clinicalPharmacology: "Bronchodilator, expectorant, carminative, and mast cell degranulation inhibitor.",
    description: "Abies pindrow (Budal) dominates high subalpine ridges. Its fragrant needles represent the classical Ayurvedic 'Talispatra', formulating the famous Talisadi Churna to vanquish respiratory cough and restore appetite."
  },
  "medicinal-95": {
    localName: "Bethur / Wan-yeth / Common Juniper",
    traditionalSystems: ["Unani Tibb", "Amchi", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Purple Ripe Berries (Cones) & Wood",
    activeConstituents: "alpha-Pinene, terpinen-4-ol, sabinene, juniperin, flavonoids",
    traditionalPreparation: "Berries chewed or decocted for cystitis, kidney gravel, digestive colic, and arthritis; twigs burned to disinfect sickrooms from contagion.",
    harvestingStatus: "Subalpine Scrub Native — Burning wood regulated.",
    clinicalPharmacology: "Aquaretic (potassium-sparing diuretic via terpinen-4-ol), broad antimicrobial, carminative, and anti-rheumatic.",
    description: "Juniperus communis (Bethur) hugs rocky mountain slopes with prickly aromatic foliage and deep purple berry-cones. Its berries cleanse the urinary bladder and flush out kidney gravel, while burning smoke sanitizes sickrooms."
  },
  "medicinal-96": {
    localName: "Padam / Flaky Juniper",
    traditionalSystems: ["Amchi / Sowa-Rigpa", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Needles & Twigs",
    activeConstituents: "Volatile terpenes, juniperic acid, cedrol",
    traditionalPreparation: "Twigs burned as a fragrant fumigant in high Himalayan passes to dispel mountain nausea and clear chest heaviness.",
    harvestingStatus: "Alpine Dwarf Shrub — Sensitive to trampling.",
    clinicalPharmacology: "Airborne antiseptic, soothing aroma-inhalant.",
    description: "Juniperus squamata forms prostrate cushions across alpine screes up to 4,500m. Pastoral highlanders burn its resinous branches as a sacred purifying incense."
  },
  "medicinal-97": {
    localName: "Chandi-padam / Pashtun Juniper",
    traditionalSystems: ["Folk Medicine", "Unani Tibb"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Wood Oil & Cones",
    activeConstituents: "Cedrol, thujopsene, cuparene, pinene",
    traditionalPreparation: "Oil applied to painful gout nodules, indolent sores, and toothaches.",
    harvestingStatus: "Protected Dry Valley Conifer.",
    clinicalPharmacology: "Counter-irritant, antimicrobial, and diuretic.",
    description: "Juniperus macropoda is an ancient long-lived tree of the dry inner valleys. Its wood and berries provide deep-heating liniments for gout and sciatica."
  },
  "medicinal-98": {
    localName: "Ner / Skimmia",
    traditionalSystems: ["Kashmiri Ethnobotany", "Folk Medicine"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Aromatic Glossy Leaves",
    activeConstituents: "Skimmianine, linalyl acetate, linalool, dictamnine",
    traditionalPreparation: "Leaves crushed and applied as a soothing paste for violent headaches; burned as a sacred insect-repellent fumigant.",
    harvestingStatus: "Common Evergreen Forest Understory.",
    clinicalPharmacology: "Analgesic, sedative, sedative-hypnotic in high doses, and strong insect deterrent.",
    description: "Skimmia laureola (Ner) perfumes deep Himalayan fir forests with its leathery, aromatic evergreen leaves. Highlanders burn the foliage to clear evil spirits and insect pests, and press leaf poultices to soothe throbbing headaches."
  },
  "medicinal-99": {
    localName: "Timur / Toothache Tree",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Folk Ethnobotany"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Peppery Fruits, Seeds & Bark Twigs",
    activeConstituents: "Hydroxy-alpha-sanshool, linalool, limonene, armatamide",
    traditionalPreparation: "Peppery husks chewed to produce tingling oral numbness that instantly eliminates agonizing toothache; twigs used as antibacterial datun toothbrushes.",
    harvestingStatus: "Subtropical to Temperate Ravines in Jammu & Foothills.",
    clinicalPharmacology: "Sanshool activates mechanoreceptors and pain-sensing TRPA1/TRPV1 channels, producing profound localized oral anesthesia and antimicrobial action.",
    description: "Zanthoxylum armatum (Timur) is armed with sharp spines and aromatic crimson seed capsules. Chewing its peppery seeds creates an astonishing electric numbing sensation that immediately halts toothache pain and stimulates digestion."
  },
  "medicinal-100": {
    localName: "Batangi / Himalayan Wild Pear",
    traditionalSystems: ["Folk Ethnobotany"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Fruit & Bark",
    activeConstituents: "Arbutin, ursolic acid, pectin, tannins",
    traditionalPreparation: "Fermented fruit or bark decoction used to arrest acute summer diarrhea and stomach upset.",
    harvestingStatus: "Common Woodland Tree.",
    clinicalPharmacology: "Astringent, antimicrobial, and gastro-protective.",
    description: "Pyrus pashia (Batangi) bears white spring blossoms and brown speckled wild pears across hillside terraces. Country folk consume its astringent fruit to settle acute gastrointestinal diarrhea."
  },
  "medicinal-101": {
    localName: "Tazak-tsun / Dwarf Incense Rhododendron",
    traditionalSystems: ["Amchi / Sowa-Rigpa", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Aromatic Leaves & Flowers",
    activeConstituents: "Diterpenoids, essential oil (spathulenol, germacrone), flavonoids",
    traditionalPreparation: "Leaves brewed into fragrant high-altitude herbal tea to relieve lung tightness, cough, and indigestion; sacred Sowa-Rigpa incense.",
    harvestingStatus: "High Alpine Turf Native (3,500m - 4,800m).",
    clinicalPharmacology: "Bronchodilator, anti-inflammatory, digestive stimulant, and mental calming agent.",
    description: "Rhododendron anthopogon (Tazak-tsun) forms aromatic dwarf carpets on high alpine ridges. Its sweet, resinous leaves are brewed into comforting mountain tea that revives weary travelers and opens oxygen pathways."
  },
  "medicinal-102": {
    localName: "Gaggar-katz / Bell Rhododendron",
    traditionalSystems: ["Amchi", "Folk Medicine (with caution)"],
    therapeuticCategory: "Respiratory & Pulmonary",
    partUsed: "Leaves (Carefully dosed)",
    activeConstituents: "Campanulin, ericolin, andromedotoxin, toxic diterpenes",
    traditionalPreparation: "Leaves powdered into snuff for stubborn headaches and chronic colds; taken in strict micro-doses for syphilis and rheumatism.",
    harvestingStatus: "Subalpine Krummholz Zone Native.",
    clinicalPharmacology: "Strong central stimulant in micro-doses; toxic cardiac glycoside-like effect in overdose.",
    description: "Rhododendron campanulatum (Gaggar-katz) paints subalpine slopes with bell-shaped mauve and white blooms below the treeline. Used with caution due to potent alkaloids, its leaves are prepared into specialized remedies for chronic rheumatism."
  },
  "medicinal-103": {
    localName: "Burza / Bhojpatra / Himalayan Birch",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Ancient Manuscript Lore"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Silvery Peeling Papery Bark",
    activeConstituents: "Betulin (up to 30%), betulinic acid, lupeol, tannins",
    traditionalPreparation: "Bark decoction used as an antiseptic wash for infected wounds and burns; historical parchment for sacred Sanskrit manuscripts due to rot resistance.",
    harvestingStatus: "Subalpine Treeline Sentinel — Bark stripping banned to prevent fungal decay of ancient trees.",
    clinicalPharmacology: "Potent anti-melanoma, anti-cancer (betulinic acid induces apoptosis in cancer cells), antibacterial, and wound-healing properties.",
    description: "Betula utilis (Burza) stands as the heroic guardian of the Himalayan treeline. Its papery silvery-pink bark, used for centuries to record sacred scriptures, contains high yields of Betulinic acid, a powerful modern anticancer and wound-healing compound."
  },
  "medicinal-104": {
    localName: "Hum / European Ash",
    traditionalSystems: ["Unani Tibb", "Folk Ethnobotany"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Bark & Leaves",
    activeConstituents: "Fraxin, fraxetin, mannitol, rutin, tannins",
    traditionalPreparation: "Leaf tea drank to clear uric acid in gouty rheumatism and lower dropsical fluid retention; bark used for intermittent fevers.",
    harvestingStatus: "Temperate Village and Forest Tree.",
    clinicalPharmacology: "Uricosuric (promotes uric acid excretion), diuretic, anti-inflammatory, and febrifuge.",
    description: "Fraxinus excelsior (Hum) graces mountain villages with clean compound leaves and tough timber. Unani physicians brew its foliage to drive uric acid crystals out of gouty joints and relieve dropsy."
  },
  "medicinal-105": {
    localName: "Brimji / European Nettle Tree",
    traditionalSystems: ["Kashmiri Ethnobotany", "Unani Tibb"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Leaves, Bark & Small Drupes",
    activeConstituents: "Flavonoids, tannins, mucilage",
    traditionalPreparation: "Decoction taken for excessive menstrual bleeding (menorrhagia) and colic; sacred graveyard and shrine tree in Kashmir.",
    harvestingStatus: "Planted around Shrines and Villages.",
    clinicalPharmacology: "Astringent, hemostatic, and soothing demulcent.",
    description: "Celtis australis (Brimji) is the venerable shade tree planted beside Sufi shrines and historic graveyards across the Valley. Its leaves and bark yield a gentle astringent to check heavy menstrual bleeding and intestinal colic."
  },
  "medicinal-106": {
    localName: "Bhut-kesh substitute / Govan's Corydalis",
    traditionalSystems: ["Folk Ethnobotany", "Unani Tibb"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Rootstock",
    activeConstituents: "Govanine, corydaline, protopine, isoquinoline alkaloids",
    traditionalPreparation: "Root powder given for chronic muscular aches, jaundice, and as an ophthalmic wash.",
    harvestingStatus: "Subalpine Screes and Meadows.",
    clinicalPharmacology: "Hepatoprotective, analgesic, and smooth muscle relaxant.",
    description: "Corydalis govaniana displays dense spikes of bright yellow tubular flowers on subalpine rocks. Its thick root serves as an effective analgesic for muscular aches and a liver tonic."
  },
  "medicinal-107": {
    localName: "Gul-e-kawa / Two-leaved Corydalis",
    traditionalSystems: ["Folk Medicine"],
    therapeuticCategory: "Nervine & Neurological",
    partUsed: "Subterranean Tubers",
    activeConstituents: "Bulbocapnine, corydaline alkaloids",
    traditionalPreparation: "Tuber paste used for cooling inflamed eyes and calming nervous agitation.",
    harvestingStatus: "Forest Shade Native.",
    clinicalPharmacology: "Sedative, neuro-calmative, and ocular anti-inflammatory.",
    description: "Corydalis diphylla blooms in spring forest shade with delicate bi-colored blossoms. Its tubers are prized in local medicine to ease neuralgic headaches and eye inflammation."
  },
  "medicinal-108": {
    localName: "Jalkutra / Drumstick Primrose",
    traditionalSystems: ["Folk Ethnobotany", "Amchi"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Flowers & Roots",
    activeConstituents: "Primulic acid, triterpenoid saponins, flavonoids",
    traditionalPreparation: "Root paste applied to cutaneous eruptions, minor burns, and as an ophthalmic wash for conjunctivitis.",
    harvestingStatus: "Moist Subalpine Stream Banks.",
    clinicalPharmacology: "Antiseptic, secretolytic, and tissue-cleansing.",
    description: "Primula denticulata (Jalkutra) unfurls tight spherical globes of purple-blue flowers beside melting snowbanks. Mountain folk crush its roots to prepare cooling antiseptics for skin rashes and irritated eyes."
  },
  "medicinal-109": {
    localName: "Posh-kand / Large-leaved Primrose",
    traditionalSystems: ["Amchi / Sowa-Rigpa"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Flowers & Silvery Leaves",
    activeConstituents: "Flavone farina, saponins, triterpenes",
    traditionalPreparation: "Silvery leaf powder applied for ophthalmic disorders in high Ladakh valleys and to soothe intense headaches.",
    harvestingStatus: "Alpine Marsh and Scree Native.",
    clinicalPharmacology: "Ocular anti-inflammatory and cooling analgesic.",
    description: "Primula macrophylla displays deep purple-violet flowers with silvery powder-dusted foliage along high glacial streams. Sowa-Rigpa healers utilize its cool essence for eye inflammation."
  },
  "medicinal-110": {
    localName: "Gul-e-chaman / Round-leaved Rock Jasmine",
    traditionalSystems: ["Folk Medicine"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Whole Herb",
    activeConstituents: "Saponins, flavonoids",
    traditionalPreparation: "Decoction taken to regulate painful menstruation and soothe burning urination.",
    harvestingStatus: "Rocky Forest Banks.",
    clinicalPharmacology: "Mild diuretic and emmenagogue.",
    description: "Androsace rotundifolia forms charming rosettes of scalloped round leaves and pink-white flowers on mossy rocks. It is used as a gentle household diuretic and menstrual regulator."
  },
  "medicinal-111": {
    localName: "Gogji-mula / Alpine Avens",
    traditionalSystems: ["Amchi / Sowa-Rigpa", "Folk Ethnobotany"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Aromatic Rootstock & Herb",
    activeConstituents: "Gein, eugenol, tannins, gallic acid",
    traditionalPreparation: "Clove-scented root chewed for toothache and boiled for internal gastric bleeding, dysentery, and ulcers.",
    harvestingStatus: "High Alpine Pasture Native.",
    clinicalPharmacology: "Potent astringent, antiseptic (clove-like eugenol action), and hemostatic.",
    description: "Geum elatum (Gogji-mula) brightens high alpine meadows with golden saucer-shaped flowers. Emitting a pleasant clove fragrance from its roots, it provides instant relief for toothaches and arrests chronic intestinal diarrhea."
  },
  "medicinal-112": {
    localName: "Vajradanti / Himalayan Cinquefoil",
    traditionalSystems: ["Ayurveda", "Folk Ethnobotany"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Tough Root",
    activeConstituents: "Epicatechin, potentillin, condensed tannins, polyphenols",
    traditionalPreparation: "Root chewed directly to firm spongy bleeding gums, tighten loose teeth, and soothe painful mouth ulcers; decoction taken for diabetes.",
    harvestingStatus: "Common on Subalpine Slopes.",
    clinicalPharmacology: "Exceptional oral astringent, inhibits periodontal pathogens, and demonstrates anti-hyperglycemic properties.",
    description: "Potentilla fulgens (Vajradanti) bears silvery silky leaves and brilliant yellow flowers. True to its Sanskrit name 'Vajradanti' (Diamond Teeth), chewing its root strengthens gums, halts bleeding, and tightens loose teeth."
  },
  "medicinal-113": {
    localName: "Lal-vazradanti / Dark Blood Cinquefoil",
    traditionalSystems: ["Folk Medicine", "Amchi"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Rootstock",
    activeConstituents: "Proanthocyanidins, condensed tannins, anthocyanins",
    traditionalPreparation: "Red root paste applied to burns, bleeding cuts, and used as an astringent gargle.",
    harvestingStatus: "High Alpine Meadow Carpet.",
    clinicalPharmacology: "Styptic, astringent, and dermal wound healer.",
    description: "Potentilla atrosanguinea stuns high passes with velvet blood-red petals against silvery foliage. Its deep red rootstock is a trusted styptic for staunching bleeding wounds."
  },
  "medicinal-114": {
    localName: "Shilaras / Jacquemont's Saxifrage",
    traditionalSystems: ["Amchi / Sowa-Rigpa"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Cushion Plant",
    activeConstituents: "Gallic acid, saponins, flavonols",
    traditionalPreparation: "Herb boiled to relieve urinary retention and dissolve gravel in cold mountain climes.",
    harvestingStatus: "High Altitude Scree Native (>3,800m).",
    clinicalPharmacology: "Diuretic, litholytic, and anti-inflammatory.",
    description: "Saxifraga jacquemontiana forms dense yellow-green cushions hugging frost-shattered rocks above 4,000m. Mountain pastoralists drink its infusion to dissolve urinary gravel."
  },
  "medicinal-115": {
    localName: "Machh-ladur / Two-horned Lousewort",
    traditionalSystems: ["Amchi / Sowa-Rigpa"],
    therapeuticCategory: "Immuno-tonic & Vitality",
    partUsed: "Aerial Herb & Roots",
    activeConstituents: "Iridoid glycosides, verbascoside, phenylpropanoids",
    traditionalPreparation: "Decoction taken for physical exhaustion, aching joints, and as a rejuvenating vitality tonic in Sowa-Rigpa.",
    harvestingStatus: "Moist Alpine Meadow Native.",
    clinicalPharmacology: "Adaptogenic, anti-fatigue, and anti-inflammatory.",
    description: "Pedicularis bicornuta (Machh-ladur) blooms with strange twisted yellow beak-like flowers in damp alpine pastures. Sowa-Rigpa physicians prescribe it to overcome profound physical fatigue and aching bones."
  },
  "medicinal-116": {
    localName: "Louse-phool / Comb-leaved Lousewort",
    traditionalSystems: ["Amchi / Sowa-Rigpa", "Folk Medicine"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Whole Flowering Herb",
    activeConstituents: "Phenylpropanoids, iridoids, flavonoids",
    traditionalPreparation: "Tea taken to arrest post-delivery bleeding and clear intestinal heat.",
    harvestingStatus: "High Alpine Bogs and Stream Margins.",
    clinicalPharmacology: "Hemostatic and anti-inflammatory.",
    description: "Pedicularis pectinata bears elegant pink-rose spiked blossoms and fern-like foliage. It is utilized in high-altitude medicine to check postpartum hemorrhage."
  },
  "medicinal-117": {
    localName: "Ratanjot / Rough-stemmed Arnebia",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Root Bark (Crimson Dye-Root)",
    activeConstituents: "Shikonin, onosmin, alkannin esters, pyrrolizidine alkaloids",
    traditionalPreparation: "Root steeped in mustard oil to yield an intense ruby-red hair oil for preventing baldness; applied warm to heal deep scalds and burns.",
    harvestingStatus: "Vulnerable — Extensively dug on dry sunny slopes for natural cosmetics.",
    clinicalPharmacology: "Exceptional wound granulation stimulator, broad antimicrobial, and hair follicle nutrient.",
    description: "Onosma hispida (Ratanjot) thrives on stony slopes with bristly leaves and drooping white-to-pink blossoms. Its root yields Kashmir's famous crimson 'Ratanjot' oil, celebrated for healing severe burns without scars and stimulating hair growth."
  },
  "medicinal-118": {
    localName: "Lilawat / Ratanjot substitute / Wallich's Cranesbill",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Thick Rhizome & Root",
    activeConstituents: "Geraniin, tannins (up to 30%), gallic acid, quercetin",
    traditionalPreparation: "Root powder boiled into a powerful astringent for chronic diarrhea, eye infections, and used as a dye substitute for Ratanjot.",
    harvestingStatus: "Abundant in Shaded Coniferous Woods.",
    clinicalPharmacology: "Strong astringent, antibacterial, and cutaneous vulnerary.",
    description: "Geranium wallichianum (Lilawat) adorns forest floors with saucer-shaped purple-blue flowers. Its stout rootstock is packed with astringent tannins, halting chronic diarrhea and soothing inflamed eyes."
  },
  "medicinal-119": {
    localName: "Neel-lilawat / Meadow Crane's-bill",
    traditionalSystems: ["Folk Medicine"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Flowering Herb",
    activeConstituents: "Tannins, quercetin, phenolic acids",
    traditionalPreparation: "Infusion used as an astringent gargle for bleeding gums and taken for nosebleeds.",
    harvestingStatus: "Open Subalpine Meadows.",
    clinicalPharmacology: "Hemostatic and astringent.",
    description: "Geranium pratense carpets open subalpine grasslands with rich violet blooms. It is collected to make astringent gargles for bleeding gums and oral stomatitis."
  },
  "medicinal-120": {
    localName: "Jadwar / Nirbishi",
    traditionalSystems: ["Unani Tibb", "Ayurveda"],
    therapeuticCategory: "Nervine & Neurological",
    partUsed: "Tuberous Root",
    activeConstituents: "Denudatine, condelphine, delphocurarine, aconitine antidote bases",
    traditionalPreparation: "Celebrated in Unani Tibb as the supreme universal antidote ('Tiryaq') against aconite and viper venom poisoning; cardiotonic and anticonvulsant.",
    harvestingStatus: "Endangered in Wild / Highly Valued Commercial Root.",
    clinicalPharmacology: "Competitively counteracts aconitine-induced ventricular arrhythmias, exerts potent anticonvulsant and central nervous reviving actions.",
    description: "Delphinium denudatum (Jadwar) bears delicate pale blue spurred flowers on dry grassy slopes. In Unani medicine, Jadwar is crowned the supreme antidote against deadly poisons and an unrivaled tonic for reviving fainting hearts."
  },
  "medicinal-121": {
    localName: "Neel-posh / Kashmir Larkspur",
    traditionalSystems: ["Folk Ethnobotany", "Amchi"],
    therapeuticCategory: "Antimicrobial & Anti-infective",
    partUsed: "Dark Violet Flowers & Seeds",
    activeConstituents: "Diterpenoid alkaloids, cashmiradelphine, lycoctonine",
    traditionalPreparation: "Crushed seeds and flowers used externally to eradicate hair lice and applied into aching joints as an embrocation.",
    harvestingStatus: "Subalpine Rocky Slopes.",
    clinicalPharmacology: "Parasiticide, local rubefacient; toxic if swallowed.",
    description: "Delphinium cashmerianum (Neel-posh) displays stunning dusky violet helmet-like blossoms on subalpine screes. Its seeds have been relied upon for centuries to eradicate head parasites and soothe rheumatic joints."
  },
  "medicinal-122": {
    localName: "Safed Mohra / Smooth Aconite",
    traditionalSystems: ["Folk Medicine", "Amchi"],
    therapeuticCategory: "Rheumatism & Analgesic",
    partUsed: "Rootstock",
    activeConstituents: "Lappaconitine, ranaconitine",
    traditionalPreparation: "Processed root liniment for intractable neuralgic pain and severe sciatica.",
    harvestingStatus: "Subalpine Forest Margins.",
    clinicalPharmacology: "Lappaconitine is a potent non-narcotic analgesic blocking voltage-gated sodium channels.",
    description: "Aconitum laeve (Safed Mohra) produces yellowish-white hooded flowers in damp subalpine forest margins. It yields Lappaconitine, a non-addictive yet intensely potent natural analgesic for nerve pain."
  },
  "medicinal-123": {
    localName: "Mathosal / Bhutkeshi / Vaginate Selinum",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Folk Ethnobotany"],
    therapeuticCategory: "Nervine & Neurological",
    partUsed: "Aromatic Root & Crown",
    activeConstituents: "Selinidin, coumarins, angelicin, vaginatin",
    traditionalPreparation: "Fragrant root powder burned or taken in small doses for hysterical fits, nervous insomnia, and anxiety.",
    harvestingStatus: "High Forest Clearing Native.",
    clinicalPharmacology: "Nervine sedative, antispasmodic, and anticonvulsant.",
    description: "Selinum vaginatum (Mathosal) forms lush lacy umbrellas with aromatic shaggy root crowns in subalpine woods. Its soothing aroma pacifies nervous hysteria, seizures, and chronic insomnia."
  },
  "medicinal-124": {
    localName: "Raswal / Kaindal / White Cow Parsnip",
    traditionalSystems: ["Modern Photochemotherapy", "Folk Medicine"],
    therapeuticCategory: "Wound Care & Dermatological",
    partUsed: "Roots & Mature Seeds",
    activeConstituents: "Xanthotoxin (8-MOP), bergapten, imperatorin, psoralens",
    traditionalPreparation: "Industrial extraction of Xanthotoxin for PUVA photochemotherapy in vitiligo (leucoderma) and severe psoriasis.",
    harvestingStatus: "Vulnerable — Massive collection in the 1980s for pharmaceutical vitiligo drugs.",
    clinicalPharmacology: "Furanocoumarins cross-link epidermal DNA upon UVA radiation, stimulating melanocyte migration and repigmentation in vitiligo.",
    description: "Heracleum candicans (Raswal) is a giant robust umbellifer with huge white flower heads. It gained worldwide pharmaceutical prominence as the primary Himalayan source of 8-MOP for repigmenting skin in vitiligo and leucoderma."
  },
  "medicinal-125": {
    localName: "Shah-zeera / Zira / Wild Caraway",
    traditionalSystems: ["Unani Tibb", "Ayurveda", "Kashmiri Ethnobotany"],
    therapeuticCategory: "Gastrointestinal & Hepatic",
    partUsed: "Dried Mericarp Fruits (Seeds)",
    activeConstituents: "Carvone (up to 60%), limonene, carveol",
    traditionalPreparation: "Crushed seeds brewed into caraway tea for infant colic, flatulence, and to stimulate breast milk in nursing mothers.",
    harvestingStatus: "Subalpine Pasture Native across Gurez and Pir Panjal.",
    clinicalPharmacology: "Carminative, relaxes gastrointestinal smooth muscle, prevents fermentation in bowel, and stimulates digestion.",
    description: "Carum carvi (Shah-zeera) blooms with delicate white umbels in high mountain grasslands. Its intensely aromatic seeds soothe crying colicky babies, dispel flatulence, and enhance Kashmiri ceremonial cooking."
  },
  "medicinal-126": {
    localName: "Gokhru / Mitserkand / Puncture Vine",
    traditionalSystems: ["Ayurveda", "Unani Tibb", "Modern Sports Nutrition"],
    therapeuticCategory: "Cardiovascular & Metabolic",
    partUsed: "Spiny Prickly Fruits & Roots",
    activeConstituents: "Protodioscin, tribuloside, steroidal saponins, potassium",
    traditionalPreparation: "Fruit decoction consumed for painful urinary calculi, burning micturition, male sexual debility, and physical endurance.",
    harvestingStatus: "Common in Dry Sandy Soils and Karewas.",
    clinicalPharmacology: "Potent diuretic flushing urinary stones, elevates luteinizing hormone and endogenous testosterone precursor signaling, cardioprotective.",
    description: "Tribulus terrestris (Gokhru) trails across dry sunny wastelands with spiny fruits. Revered in Ayurveda as a premier Rasayana, it dissolves painful kidney stones and revitalizes physical stamina and male vigor."
  },
  "medicinal-127": {
    localName: "Isband / Wild Rue / Syrian Rue",
    traditionalSystems: ["Kashmiri Ethnobotany & Spiritual Lore", "Unani Tibb", "Ayurveda"],
    therapeuticCategory: "Nervine & Neurological",
    partUsed: "Aromatic Seeds",
    activeConstituents: "Harmine, harmaline, harmalol, peganine, vasicine",
    traditionalPreparation: "Seeds burned on glowing charcoal embers ('Isband-soz') at every Kashmiri wedding, birth, and celebration to ward off 'Nazar' (evil eye) and purify air; smoke inhaled for chronic asthma.",
    harvestingStatus: "Abundant in Dry Arid Tracts and Sunny Hillsides.",
    clinicalPharmacology: "Reversible monoamine oxidase inhibitor (MAO-A), broad antimicrobial against airborne pathogens, bronchodilatory (vasicine), and central nervous stimulant.",
    description: "Peganum harmala (Isband) is the most culturally sacred plant in Kashmir. Burned in ornate silver braziers ('Isband-soz') to ward off the evil eye and consecrate weddings, its aromatic smoke purifies the atmosphere and alleviates respiratory tightness."
  }
};

// Now read the current medicinal.ts file
const medicinalFilePath = path.join(__dirname, '../src/data/species/medicinal.ts');
const rawContent = fs.readFileSync(medicinalFilePath, 'utf8');

const jsonMatch = rawContent.match(/export const medicinalPhase1: BiodiversitySpecies\[\] = (\[[\s\S]*\]);/);
if (!jsonMatch) {
  console.error("Could not parse medicinalPhase1 array from file.");
  process.exit(1);
}

const existingSpecies = JSON.parse(jsonMatch[1]);
console.log(`Successfully parsed ${existingSpecies.length} existing species.`);

const kashmirEndemics = new Set([
  'medicinal-1', 'medicinal-3', 'medicinal-15', 'medicinal-16', 'medicinal-32',
  'medicinal-63', 'medicinal-64', 'medicinal-106', 'medicinal-121', 'medicinal-122',
  'medicinal-123', 'medicinal-124'
]);

const nwHimalayan = new Set([
  'medicinal-2', 'medicinal-4', 'medicinal-7', 'medicinal-10', 'medicinal-11',
  'medicinal-12', 'medicinal-13', 'medicinal-17', 'medicinal-19', 'medicinal-20',
  'medicinal-21', 'medicinal-22', 'medicinal-24', 'medicinal-26', 'medicinal-27',
  'medicinal-28', 'medicinal-29', 'medicinal-30', 'medicinal-31', 'medicinal-33',
  'medicinal-34', 'medicinal-37', 'medicinal-39', 'medicinal-48', 'medicinal-52',
  'medicinal-65', 'medicinal-66', 'medicinal-81', 'medicinal-82', 'medicinal-87',
  'medicinal-88', 'medicinal-90', 'medicinal-97', 'medicinal-98', 'medicinal-101',
  'medicinal-102', 'medicinal-111', 'medicinal-114', 'medicinal-115', 'medicinal-117',
  'medicinal-118', 'medicinal-120'
]);

const widelyDistributed = new Set([
  'medicinal-35', 'medicinal-38', 'medicinal-40', 'medicinal-41', 'medicinal-42',
  'medicinal-43', 'medicinal-44', 'medicinal-45', 'medicinal-46', 'medicinal-47',
  'medicinal-49', 'medicinal-50', 'medicinal-51', 'medicinal-53', 'medicinal-54',
  'medicinal-55', 'medicinal-56', 'medicinal-57', 'medicinal-58', 'medicinal-59',
  'medicinal-60', 'medicinal-61', 'medicinal-62', 'medicinal-67', 'medicinal-68',
  'medicinal-69', 'medicinal-70', 'medicinal-71', 'medicinal-72', 'medicinal-73',
  'medicinal-74', 'medicinal-75', 'medicinal-76', 'medicinal-85', 'medicinal-86',
  'medicinal-89', 'medicinal-95', 'medicinal-104', 'medicinal-105', 'medicinal-126',
  'medicinal-127'
]);

const enrichedSpecies = existingSpecies.map((sp) => {
  const meta = speciesMetadata[sp.id];
  if (!meta) {
    console.warn(`Missing metadata for ${sp.id} (${sp.commonName})`);
    return sp;
  }

  let endemism = 'himalayan-endemic';
  if (kashmirEndemics.has(sp.id)) {
    endemism = 'kashmir-endemic';
  } else if (nwHimalayan.has(sp.id)) {
    endemism = 'northwest-himalayan';
  } else if (widelyDistributed.has(sp.id)) {
    endemism = 'widely-distributed';
  }

  return {
    ...sp,
    localName: meta.localName,
    description: meta.description,
    endemismStatus: endemism,
    conservationMeasures: [
      `Harvesting & Legal Status: ${meta.harvestingStatus}`,
      `Traditional Medical Systems: ${meta.traditionalSystems.join(', ')}`,
      `Primary Pharmacopeial Part Used: ${meta.partUsed}`,
      `Key Active Phytochemicals: ${meta.activeConstituents}`,
      `Clinical Actions: ${meta.clinicalPharmacology}`
    ]
  };
});

// Create companion ethnobotanical lookup dictionary
const codeOutput = `// Auto-generated 127-species Medicinal Flora Intelligence Database
import { type BiodiversitySpecies } from '../../types/biodiversity';

export interface MedicinalEthnoDetail {
  id: string;
  localName: string;
  traditionalSystems: string[];
  therapeuticCategory: string;
  partUsed: string;
  activeConstituents: string;
  traditionalPreparation: string;
  harvestingStatus: string;
  clinicalPharmacology: string;
  description: string;
}

export const medicinalEthnoDetails: Record<string, MedicinalEthnoDetail> = ${JSON.stringify(speciesMetadata, null, 2)};

export const medicinalPhase1: BiodiversitySpecies[] = ${JSON.stringify(enrichedSpecies, null, 2)};
`;

fs.writeFileSync(medicinalFilePath, codeOutput, 'utf8');
console.log(`Successfully generated updated ${medicinalFilePath} with 127 enriched medicinal species!`);
