import {
  AstroVastuDefectTrigger,
  AstroVastuFullDiagnosticReport,
  AstroVastuSurroundingsPrediction,
  AstroVastuVerificationItem,
  VastuZoneRule,
} from '../types/vastu';
import { BirthChartData, DirectionType, PlanetKey } from '../types/astrology';

export const DIRECTION_HINDI_MAP: Record<DirectionType, string> = {
  East: 'पूर्व दिशा (East)',
  'North-East': 'उत्तर-पूर्व (ईशान कोण / North-East)',
  North: 'उत्तर दिशा (North)',
  'North-West': 'उत्तर-पश्चिम (वायव्य कोण / North-West)',
  West: 'पश्चिम दिशा (West)',
  'South-West': 'दक्षिण-पश्चिम (नैऋत्य कोण / South-West)',
  South: 'दक्षिण दिशा (South)',
  'South-East': 'दक्षिण-पूर्व (आग्नेय कोण / South-East)',
  Center: 'ब्रह्मस्थान (घर का केंद्र / Center)',
};

export const PLANET_HINDI_MAP: Record<PlanetKey, string> = {
  Sun: 'सूर्य (Sun)',
  Moon: 'चंद्र (Moon)',
  Mars: 'मंगल (Mars)',
  Mercury: 'बुध (Mercury)',
  Jupiter: 'गुरु / बृहस्पति (Jupiter)',
  Venus: 'शुक्र (Venus)',
  Saturn: 'शनि (Saturn)',
  Rahu: 'राहु (Rahu)',
  Ketu: 'केतु (Ketu)',
  Ascendant: 'लग्न (Lagna)',
};

export const VASTU_ZONES_16: VastuZoneRule[] = [
  {
    zone: 'North (N / Kubera)',
    zoneHi: 'उत्तर दिशा (कुबेर स्थान / धन का आगमन)',
    direction: 'North',
    directionHi: 'उत्तर',
    degreeSpan: '348.75° - 11.25°',
    element: 'Water',
    elementHi: 'जल (Water)',
    rulingPlanet: 'Mercury',
    rulingPlanetHi: 'बुध ग्रह',
    deity: 'Lord Kubera',
    idealRooms: ['Entrance', 'Living Area', 'Cash Safe', 'Greenery / Indoor Garden'],
    idealRoomsHi: ['मुख्य द्वार', 'बैठक कक्ष', 'तिजोरी / धन रखने की जगह', 'हरे-भरे पौधे'],
    tabooItems: ['Toilet', 'Kitchen / Fire', 'Heavy Junk', 'Red / Pink Decor', 'Clutter'],
    tabooItemsHi: ['शौचालय', 'रसोई / अग्नि', 'भारी कबाड़ व लोहे का सामान', 'लाल या गहरा गुलाबी रंग'],
    symptomsWhenDefective: ['Stagnant new customer inquiries', 'Blocked business opportunities', 'Communication breakdown'],
    symptomsWhenDefectiveHi: ['नए काम और अवसरों में रुकावट', 'आया हुआ पैसा अटकना', 'ग्राहकों की कमी'],
    standardRemedies: ['Place vibrant green plants', 'Install a crystal water fountain', 'Remove red tones and replace with light green or blue'],
    standardRemediesHi: ['उत्तर में सुंदर हरे पौधे (मनी प्लांट) रखें', 'पानी का छोटा फव्वारा या साफ पानी का कटोरा रखें', 'लाल रंग हटाएं, हल्का हरा या नीला रंग करें'],
  },
  {
    zone: 'North-East (NE / Ishanya)',
    zoneHi: 'उत्तर-पूर्व (ईशान कोण / ईश्वर व मानसिक शांति का स्थान)',
    direction: 'North-East',
    directionHi: 'उत्तर-पूर्व (ईशान)',
    degreeSpan: '33.75° - 56.25°',
    element: 'Water',
    elementHi: 'जल व आकाश (Water / Space)',
    rulingPlanet: 'Jupiter',
    rulingPlanetHi: 'बृहस्पति / गुरु ग्रह',
    deity: 'Lord Shiva / Ishana',
    idealRooms: ['Puja Room / Meditation Altar', 'Study Room', 'Underground Water Tank', 'Open Porch'],
    idealRoomsHi: ['पूजा घर / मंदिर', 'ध्यान व योग कक्ष', 'पढ़ाई का कमरा', 'खुला व हवादार स्थान'],
    tabooItems: ['Toilet', 'Kitchen', 'Septic Tank', 'Heavy Overhead Load', 'Dustbin / Broom'],
    tabooItemsHi: ['शौचालय (सबसे बड़ा दोष)', 'रसोईघर', 'भारी कबाड़ या अलमारी', 'झाड़ू या कूड़ेदान'],
    symptomsWhenDefective: ['Severe mental anxiety', 'Paralysis of decision-making', 'Stalled spiritual growth', 'Neurological ailments'],
    symptomsWhenDefectiveHi: ['सिर में भारीपन और चिंता', 'सही निर्णय न ले पाना', 'परिवार में अशांति व तनाव'],
    standardRemedies: ['Keep 100% spotless and decluttered', 'Place pure Ganga water in brass vessel', 'Install energized Guru Yantra or crystal pyramid'],
    standardRemediesHi: ['इस कोने को बिल्कुल साफ और खाली रखें', 'पीतल के लोटे में गंगाजल या शुद्ध जल रखें', 'हल्का पीला, सफेद या आसमानी रंग प्रयोग करें'],
  },
  {
    zone: 'East (E / Purva)',
    zoneHi: 'पूर्व दिशा (सूर्य व मान-सम्मान का स्थान)',
    direction: 'East',
    directionHi: 'पूर्व',
    degreeSpan: '78.75° - 101.25°',
    element: 'Air',
    elementHi: 'वायु / अग्नि (Air / Fire)',
    rulingPlanet: 'Sun',
    rulingPlanetHi: 'सूर्य देव',
    deity: 'Indra / Surya Dev',
    idealRooms: ['Main Door', 'Living Hall', 'Veranda', 'Family Lounge'],
    idealRoomsHi: ['मुख्य द्वार', 'बालकनी / बरामदा', 'बैठक कक्ष'],
    tabooItems: ['Dark enclosed storage', 'Toilet', 'Heavy iron bars', 'Overgrown murky hedges'],
    tabooItemsHi: ['अंधेरी कोठरी या कबाड़', 'शौचालय', 'भारी लोहे का सामान'],
    symptomsWhenDefective: ['Lack of social respect', 'Disputes with government or superiors', 'Eye/heart ailments', 'Fatherly discord'],
    symptomsWhenDefectiveHi: ['समाज में मान-सम्मान में कमी', 'सरकारी कामों में अड़चन', 'पिता या अधिकारियों से अनबन'],
    standardRemedies: ['Copper Sun emblem on wall', 'Open curtains at sunrise to let natural light flood in', 'Remove heavy junk and paint light cream/gold'],
    standardRemediesHi: ['दीवार पर तांबे का सूर्य लगाएं', 'सुबह की धूप घर में आने दें', 'हल्का क्रीम या सफेद रंग रखें'],
  },
  {
    zone: 'South-East (SE / Agneya)',
    zoneHi: 'दक्षिण-पूर्व (आग्नेय कोण / रसोई व नकद धन का स्थान)',
    direction: 'South-East',
    directionHi: 'दक्षिण-पूर्व (आग्नेय)',
    degreeSpan: '123.75° - 146.25°',
    element: 'Fire',
    elementHi: 'अग्नि (Fire)',
    rulingPlanet: 'Venus',
    rulingPlanetHi: 'शुक्र ग्रह',
    deity: 'Agni Dev',
    idealRooms: ['Main Kitchen (Cooktop facing East)', 'Electrical Inverter / Panel', 'Dressing Room'],
    idealRoomsHi: ['रसोईघर (गैस चूल्हा पूर्व मुखी)', 'बिजली का मीटर / इन्वर्टर', 'श्रृंगार कक्ष'],
    tabooItems: ['Water Tank / Sump', 'Toilet', 'Blue / Black paint', 'Dampness / Seepage'],
    tabooItemsHi: ['पानी की टंकी या बोरवेल', 'नीला या काला रंग', 'सीलन या पानी का रिसाव'],
    symptomsWhenDefective: ['Cash flow blockages', 'Delayed payments', 'Hormonal issues for females in house', 'Accidents during cooking'],
    symptomsWhenDefectiveHi: ['नकद पैसे की तंगी या अचानक खर्च', 'घर की महिलाओं का स्वास्थ्य खराब रहना', 'भुगतान अटकना'],
    standardRemedies: ['Light an oil lamp or 0-watt red/pink night bulb', 'Place green marble under gas stove if counter is black', 'Venus Shukra Yantra in silver/copper'],
    standardRemediesHi: ['रसोई में काला पत्थर हो तो चूल्हे के नीचे हरा मार्बल रखें', 'शाम को लाल/गुलाबी 0-वाट का बल्ब जलाएं', 'पानी और चूल्हे को अलग रखें'],
  },
  {
    zone: 'South (S / Dakshina)',
    zoneHi: 'दक्षिण दिशा (मंगल व यश, स्थिरता का स्थान)',
    direction: 'South',
    directionHi: 'दक्षिण',
    degreeSpan: '168.75° - 191.25°',
    element: 'Fire',
    elementHi: 'अग्नि / पृथ्वी',
    rulingPlanet: 'Mars',
    rulingPlanetHi: 'मंगल ग्रह',
    deity: 'Lord Yama',
    idealRooms: ['Bedroom', 'Office Room', 'Heavy Furniture'],
    idealRoomsHi: ['शयनकक्ष (बेडरूम)', 'भारी अलमारी', 'आराम करने का कमरा'],
    tabooItems: ['Main Water Sump', 'Large Mirrors', 'Low-level depression / Trench'],
    tabooItemsHi: ['भूमिगत पानी का गड्ढा', 'बड़े शीशे (आईने)', 'गहरा ढलान'],
    symptomsWhenDefective: ['Loss of public reputation', 'Restlessness and insomnia', 'Legal friction or property litigation'],
    symptomsWhenDefectiveHi: ['नींद न आना और बेचैनी', 'जमीन-जायदाद में विवाद या झगड़े', 'नाम व साख में गिरावट'],
    standardRemedies: ['Keep sector elevated and structurally heavy', 'Use warm terracotta or red accents', 'Red jasper stone or energized Mars Yantra'],
    standardRemediesHi: ['इस दिशा को भारी और ऊंचा रखें', 'हल्के लाल या बादामी रंग का प्रयोग करें', 'सोते समय सिर दक्षिण दिशा में रखें'],
  },
  {
    zone: 'South-West (SW / Nairruti)',
    zoneHi: 'दक्षिण-पश्चिम (नैऋत्य कोण / स्थिरता व मुखिया का स्थान)',
    direction: 'South-West',
    directionHi: 'दक्षिण-पश्चिम (नैऋत्य)',
    degreeSpan: '213.75° - 236.25°',
    element: 'Earth',
    elementHi: 'पृथ्वी (Earth)',
    rulingPlanet: 'Rahu',
    rulingPlanetHi: 'राहु / पितृ स्थान',
    deity: 'Nirriti / Pitris',
    idealRooms: ['Master Bedroom', 'Heavy Safe', 'Structural Pillar / Overhead Tank'],
    idealRoomsHi: ['घर के मुखिया का बेडरूम', 'भारी अलमारी व लॉकर', 'छत पर भारी पानी की टंकी'],
    tabooItems: ['Toilet', 'Underground Water Tank / Borewell', 'Main Entrance Cut', 'Balcony / Cut-out'],
    tabooItemsHi: ['शौचालय (गंभीर वास्तु दोष)', 'भूमिगत पानी की टंकी या बोरवेल', 'बड़ा खुला गड्ढा या बालकनी'],
    symptomsWhenDefective: ['Marital discord and divorce threat', 'Financial instability', 'Premature deaths or chronic hereditary illness'],
    symptomsWhenDefectiveHi: ['पति-पत्नी में कलह या वैवाहिक तनाव', 'पैसे का टिकना बंद होना', 'असुरक्षा व भारी कर्ज'],
    standardRemedies: ['Install Brass Helix or Lead strips around toilet if present', 'Place yellow jaisalmer stone or brass elephant', 'Keep highest and heaviest point of house'],
    standardRemediesHi: ['घर का यह कोना सबसे भारी और ऊंचा रखें', 'पीतल का भारी हाथी या पीला पत्थर रखें', 'यदि टॉयलेट है तो ब्रास की पट्टी से ऊर्जा सील करें'],
  },
  {
    zone: 'West (W / Paschima)',
    zoneHi: 'पश्चिम दिशा (शनि व लाभ, मुनाफे का स्थान)',
    direction: 'West',
    directionHi: 'पश्चिम',
    degreeSpan: '258.75° - 281.25°',
    element: 'Space',
    elementHi: 'आकाश / वायु (Space / Air)',
    rulingPlanet: 'Saturn',
    rulingPlanetHi: 'शनि देव',
    deity: 'Varuna Dev',
    idealRooms: ['Dining Room', 'Children Study', 'Storage of dry provisions', 'Overhead Tank'],
    idealRoomsHi: ['भोजन कक्ष (डाइनिंग रूम)', 'बच्चों के पढ़ने का कमरा', 'सूखा अनाज रखने की जगह'],
    tabooItems: ['Fire / Kitchen', 'Main Open Glass Facade without curtains', 'Water leakages'],
    tabooItemsHi: ['रसोईघर (अग्नि)', 'पानी का लगातार टपकना', 'बड़ा खुला शीशा'],
    symptomsWhenDefective: ['Hard labor with zero commercial gain', 'Bone, joint or rheumatic pains', 'Delayed returns on investments'],
    symptomsWhenDefectiveHi: ['दिन-रात मेहनत के बाद भी बचत न होना', 'घुटनों या जोड़ों में दर्द', 'निवेश से लाभ न मिलना'],
    standardRemedies: ['Place white/grey rounded decor', 'Iron or brass accessories', 'Shani Yantra on Saturday with sesame lamp'],
    standardRemediesHi: ['सफेद या हल्के भूरे रंग का प्रयोग करें', 'शनिवार को शाम को सरसों के तेल का दीपक पश्चिम मुखी जलाएं', 'कबाड़ न रखें'],
  },
  {
    zone: 'North-West (NW / Vayavya)',
    zoneHi: 'उत्तर-पश्चिम (वायव्य कोण / सहयोग व संबंध का स्थान)',
    direction: 'North-West',
    directionHi: 'उत्तर-पश्चिम (वायव्य)',
    degreeSpan: '303.75° - 326.25°',
    element: 'Air',
    elementHi: 'वायु (Air)',
    rulingPlanet: 'Moon',
    rulingPlanetHi: 'चंद्र ग्रह',
    deity: 'Vayu Dev',
    idealRooms: ['Guest Bedroom', 'Finished Goods Store', 'Garage / Parking', 'Washing Machine'],
    idealRoomsHi: ['अतिथि कक्ष (मेहमानों का कमरा)', 'वाशिंग मशीन / कपड़े धोने की जगह', 'गाड़ी पार्किंग'],
    tabooItems: ['Dark permanent junk storage', 'Underground fire pit', 'Locked unused rooms'],
    tabooItemsHi: ['सालों से बंद कमरा', 'अंधेरा कबाड़खाना', 'गंदा जमा हुआ पानी'],
    symptomsWhenDefective: ['Isolation and betrayal by friends/banks', 'Severe mood swings / mental instability', 'Legal trouble from neighbors'],
    symptomsWhenDefectiveHi: ['मित्रों या रिश्तेदारों से सहयोग न मिलना', 'मन में बार-बार अशांति व बेचैनी', 'बैंक लोन मिलने में अड़चन'],
    standardRemedies: ['Place a brass running horse or silver moon pendant', 'Hang a 5-rod metal wind chime', 'Keep white, pearl or cream color tones'],
    standardRemediesHi: ['सफेद या क्रीम रंग रखें', 'दौड़ते हुए सफेद घोड़ों की तस्वीर लगाएं', 'मेटल की विंड चाइम (घंटी) लगाएं'],
  },
  {
    zone: 'Brahmasthan (Center)',
    zoneHi: 'ब्रह्मस्थान (घर का केंद्रीय नाभि स्थान)',
    direction: 'Center',
    directionHi: 'घर का केंद्र (Center)',
    degreeSpan: 'Core Center',
    element: 'Space',
    elementHi: 'आकाश / शून्य (Space)',
    rulingPlanet: 'Ketu',
    rulingPlanetHi: 'केतु / ब्रह्मा जी',
    deity: 'Lord Brahma',
    idealRooms: ['Open Courtyard / Atrium', 'Unobstructed Central Lobby', 'Light Skylight'],
    idealRoomsHi: ['खुला आंगन / खुला हॉल', 'हवादार व प्रकाशयुक्त केंद्रीय स्थान'],
    tabooItems: ['Heavy Pillar', 'Staircase', 'Toilet', 'Kitchen', 'Beams pressing down'],
    tabooItemsHi: ['भारी खंभा (पिलर)', 'सीढ़ियां', 'शौचालय या सेप्टिक टैंक', 'गैस चूल्हा'],
    symptomsWhenDefective: ['Suffocation of family expansion', 'Chronic chest or back pain', 'General feeling of entrapment and stagnation'],
    symptomsWhenDefectiveHi: ['घर में घुटन और भारीपन महसूस होना', 'परिवार के सदस्यों में तालमेल की कमी', 'उन्नति रुक जाना'],
    standardRemedies: ['Remove any heavy central furniture or carpets immediately', 'Keep brightly lit with soft golden illumination', 'Install central brass flower bowl with floating petals'],
    standardRemediesHi: ['केंद्र को बिल्कुल खाली और खुला रखें', 'पीतल के बर्तन में पानी भरकर ताजे फूल तैराएं', 'उजाला और रोशनी अच्छी रखें'],
  },
];

export function generateAstroVastuDiagnosticReport(chart: BirthChartData): AstroVastuFullDiagnosticReport {
  const defectTriggers: AstroVastuDefectTrigger[] = [];
  const verificationItems: AstroVastuVerificationItem[] = [];

  const mdPlanet = chart.vimshottari.currentMahadasha;
  const adPlanet = chart.vimshottari.currentAntardasha;

  const mdPlanetPos = chart.planets.find((p) => p.name === mdPlanet) || chart.lagna;
  const adPlanetPos = chart.planets.find((p) => p.name === adPlanet) || chart.lagna;

  const mdDirection = mdPlanetPos.primaryVastuDirection;
  const adDirection = adPlanetPos.primaryVastuDirection;
  const mdDirHi = DIRECTION_HINDI_MAP[mdDirection];
  const adDirHi = DIRECTION_HINDI_MAP[adDirection];

  // 1. Dasha Trigger
  defectTriggers.push({
    direction: mdDirection,
    directionHi: mdDirHi,
    zoneName: `${mdDirection} Zone (Ruled by Current Mahadasha Lord ${mdPlanet})`,
    zoneNameHi: `${mdDirHi} (वर्तमान महादशा स्वामी ${PLANET_HINDI_MAP[mdPlanet]} से प्रभावित)`,
    triggeringSystem: 'Parashari',
    triggerPlanet: mdPlanet,
    severity: 'High',
    cause: `The user is currently running ${mdPlanet} Mahadasha. Any clutter or antipathetic elemental objects in the ${mdDirection} directly blocks prosperity.`,
    causeHi: `आपकी कुंडली में वर्तमान में ${PLANET_HINDI_MAP[mdPlanet]} की महादशा चल रही है। घर की ${mdDirHi} सीधे आपके जीवन से जुड़ी है। इस दिशा में कोई भी रुकावट या कबाड़ आपके जीवन में सीधे अवरोध लाता है।`,
    predictedSymptom: `Expect clutter, dust accumulation, unused gear, or burnt-out bulbs in the ${mdDirection} sector.`,
    predictedSymptomHi: `घर के ${mdDirHi} कोने में कबाड़, धूल, पुरानी अप्रयुक्त वस्तुएं या खराब बिजली के उपकरण होने की संभावना है।`,
    homeLocation: `${mdDirection} sector of the home`,
    homeLocationHi: `घर का ${mdDirHi} कोना या कमरा`,
    physicalDeclutterRemedy: `Examine the ${mdDirection} room thoroughly. Dispose of any accumulated junk, damaged papers, or non-functional articles.`,
    physicalDeclutterRemedyHi: `घर के ${mdDirHi} कोने की पूरी जांच करें। वहां रखे पुराने गत्ते के डिब्बे, टूटे सामान व धूल साफ करें।`,
    elementalColorRemedy: `Harmonize ${mdDirection} with soothing hues. Avoid clashing colors (e.g. keep black/dark blue away from Sun/Mars fire sectors).`,
    elementalColorRemedyHi: `${mdDirHi} में शांत और उपयुक्त रंग रखें। यदि यह अग्नि क्षेत्र है तो काला या नीला रंग तुरंत हटाएं।`,
    classicalRemedyCitation: `[Brihat Parashara Hora Shastra, Ch. 46 / Phaladeepika]`,
  });

  // 2. Navatara triggers
  const maleficTaras = chart.navataraGrid.filter((r) => r.isMalefic);
  maleficTaras.forEach((row) => {
    row.nakshatras.forEach((nak) => {
      nak.planetsPresent.forEach((planetName) => {
        const planetPos = chart.planets.find((p) => p.name === planetName);
        if (planetPos) {
          const dir = planetPos.primaryVastuDirection;
          const dirHi = DIRECTION_HINDI_MAP[dir];
          const severity = row.taraNumber === 7 ? 'Critical' : 'High';

          const taraNameHi =
            row.taraNumber === 3
              ? 'विपत् तारा (3rd Tara - अचानक हानि व खतरे)'
              : row.taraNumber === 5
              ? 'प्रत्यक तारा (5th Tara - रुकावटें व विरोध)'
              : 'निधन तारा (7th Tara - गहरा संकट व कष्ट)';

          defectTriggers.push({
            direction: dir,
            directionHi: dirHi,
            zoneName: `${dir} Zone (Afflicted by ${planetName} in ${row.taraName} Tara #${row.taraNumber})`,
            zoneNameHi: `${dirHi} (${PLANET_HINDI_MAP[planetName]} नवतारा चक्र में ${taraNameHi} में स्थित)`,
            triggeringSystem: 'Navatara',
            triggerPlanet: planetName,
            severity,
            cause: `${planetName} is placed in the classical ${row.taraName} (Tara #${row.taraNumber}) from Janma Nakshatra. In Navatara Astro-Vastu, this activates sudden environmental friction in the ${dir}.`,
            causeHi: `आपकी जन्म कुंडली में ${PLANET_HINDI_MAP[planetName]} आपकी जन्म नक्षत्र से ${taraNameHi} में बैठा है। नवतारा पद्धति के अनुसार, यह घर की ${dirHi} में नकारात्मक ऊर्जा पैदा करता है।`,
            predictedSymptom: `Dampness, cracked plaster, rusting iron, leaking taps, or heavy unorganized storage in the ${dir} sector.`,
            predictedSymptomHi: `घर के ${dirHi} में सीलन, दीवार पर दरार, टपकता नल, जंग लगा लोहा या अव्यवस्थित कबाड़ होने की पूरी संभावना है।`,
            homeLocation: `${dir} direction / room`,
            homeLocationHi: `घर की ${dirHi}`,
            physicalDeclutterRemedy: `Remove any sharp metal edges, non-working clocks, or broken glassware specifically located in the ${dir}.`,
            physicalDeclutterRemedyHi: `${dirHi} से टूटे कांच, बंद घड़ियां, जंग लगे औजार और नुकीले सामान तुरंत बाहर निकालें।`,
            elementalColorRemedy: `Apply balancing elemental colors. Cleanse with sea salt water and light brass incense.`,
            elementalColorRemedyHi: `इस दिशा में समुद्री नमक के पानी से पोछा लगाएं और शाम को धूपबत्ती जलाएं।`,
            classicalRemedyCitation: `[Navatara Paddhati / Vishwakarma Prakash, Ch. 6, Shloka 14-19]`,
          });
        }
      });
    });
  });

  // 3. BNN Trines
  chart.bnnTrines.forEach((trine) => {
    if (trine.planets.length >= 2) {
      const dirHi = DIRECTION_HINDI_MAP[trine.direction];
      if (trine.planets.includes('Saturn') && trine.planets.includes('Rahu')) {
        defectTriggers.push({
          direction: trine.direction,
          directionHi: dirHi,
          zoneName: `${trine.direction} (${trine.element} Element Trine - BNN Shani-Rahu Yoga)`,
          zoneNameHi: `${dirHi} (भृगु नंदी नाड़ी - शनि व राहु का युति प्रभाव)`,
          triggeringSystem: 'BNN',
          triggerPlanet: 'Rahu',
          severity: 'Critical',
          cause: `Bhrigu Nandi Nadi reveals Saturn and Rahu uniting their rays in the ${trine.direction} trine (${trine.element} signs).`,
          causeHi: `भृगु नंदी नाड़ी के अनुसार, शनि और राहु की ऊर्जा घर की ${dirHi} में मिल रही है। यह योग कबाड़ और पुरानी अप्रयुक्त चीजों को आकर्षित करता है।`,
          predictedSymptom: `Chronic accumulation of old electronics, tangled wires, unused footwear, or dark corners that attract dust in the ${trine.direction}.`,
          predictedSymptomHi: `${dirHi} में पुराने खराब चार्जर, उलझे तार, खराब इलेक्ट्रॉनिक्स, पुरानी चप्पलें या धूल भरे बक्से रखे होने की संभावना है।`,
          homeLocation: `${trine.direction} quadrant`,
          homeLocationHi: `घर की ${dirHi}`,
          physicalDeclutterRemedy: `Clear out old chargers, dead gadgets, dusty carton boxes, and worn footwear from this zone immediately.`,
          physicalDeclutterRemedyHi: `इस दिशा से सभी पुराने चार्जर, खराब फोन, बंद तार और फटे जूते-चप्पल तुरंत हटाएं।`,
          elementalColorRemedy: `Purify with camphor smoke and introduce bright, natural lighting.`,
          elementalColorRemedyHi: `इस कोने में रोज शाम को कपूर की आरती करें और पर्याप्त रोशनी का प्रबंध करें।`,
          classicalRemedyCitation: `[Bhrigu Nandi Nadi, R.G. Rao - Planetary Trinal Conjunctions & Vastu Sutras]`,
        });
      }
    }
  });

  // 4. Surroundings
  const surroundingsPredictions: AstroVastuSurroundingsPrediction[] = [];
  const a4SignDef = VASTU_ZONES_16.find((z) => z.rulingPlanet === chart.jaimini.a4Lord) || VASTU_ZONES_16[0];
  const a4DirHi = DIRECTION_HINDI_MAP[a4SignDef.direction];

  chart.jaimini.externalSurroundingsSignatures.forEach((signature, idx) => {
    let detailHi = signature;
    if (signature.includes('Government')) {
      detailHi = `घर के पास ${a4DirHi} में सरकारी कार्यालय, मुख्य चौड़ी सड़क, प्रशासनिक भवन या भव्य शिव मंदिर होने की प्रबल संभावना है।`;
    } else if (signature.includes('water')) {
      detailHi = `घर के पास ${a4DirHi} में पानी की टंकी, नहर, बहता पानी, डेयरी या जल से जुड़ा स्थान होने की संभावना है।`;
    } else if (signature.includes('police')) {
      detailHi = `घर के निकट ${a4DirHi} में पुलिस स्टेशन, बिजली का बड़ा ट्रांसफार्मर, खेल का मैदान या लाल ईंटों की संरचना होने की संभावना है।`;
    } else if (signature.includes('school')) {
      detailHi = `घर के पास ${a4DirHi} में स्कूल, कॉलेज, किताबों की दुकान, हरा-भरा पार्क या चहल-पहल वाला बाजार होने की संभावना है।`;
    } else if (signature.includes('temple')) {
      detailHi = `घर के पास ${a4DirHi} में प्राचीन बड़ा मंदिर, विश्वविद्यालय, कोर्ट-कचहरी या प्रतिष्ठित बैंक/धार्मिक संस्थान होने की संभावना है।`;
    } else if (signature.includes('garden')) {
      detailHi = `घर के आसपास ${a4DirHi} में सुंदर बगीचा, बुटीक, शादी का हॉल या सुंदर रिहायशी इलाका होने की संभावना है।`;
    } else if (signature.includes('hardware')) {
      detailHi = `घर के पास ${a4DirHi} में पुरानी ऐतिहासिक इमारत, लोहे की दुकान, रेलवे लाइन या सुनसान इलाका होने की संभावना है।`;
    }

    surroundingsPredictions.push({
      direction: a4SignDef.direction,
      directionHi: a4DirHi,
      confidence: idx < 2 ? 'High' : 'Medium',
      feature: signature.split(' ')[1] || 'Landmark',
      featureHi: 'आस-पड़ोस का मुख्य स्थल',
      detail: signature,
      detailHi,
      sourceRule: `Jaimini A4 in ${chart.jaimini.a4SignName} (${chart.jaimini.a4SanskritSignName})`,
    });
  });

  if (surroundingsPredictions.length === 0) {
    surroundingsPredictions.push({
      direction: a4SignDef.direction,
      directionHi: a4DirHi,
      confidence: 'High',
      feature: 'Approach Road / Surrounding',
      featureHi: 'घर का प्रवेश मार्ग व आस-पड़ोस',
      detail: `Prominent approach road from ${a4SignDef.direction} with active commercial or natural presence aligned with ${chart.jaimini.a4Lord}.`,
      detailHi: `घर का मुख्य पहुंच मार्ग ${a4DirHi} की तरफ है और वहां चहल-पहल या प्राकृतिक उपस्थिति है।`,
      sourceRule: `Jaimini Upadesha Sutras Ch. 1, Pada 3`,
    });
  }

  // 5. Verification Checklist in Friendly Hindi
  verificationItems.push({
    id: 'verify-1',
    direction: mdDirection,
    directionHi: mdDirHi,
    symptomStatement: `Do you have non-working electrical items, unused carton boxes, or piled clothing stored in the ${mdDirection} corner/room of your house?`,
    symptomStatementHi: `क्या आपके घर के ${mdDirHi} कोने या कमरे में कोई खराब बिजली का सामान, पुराने गत्ते के डिब्बे या अप्रयुक्त कपड़ों का ढेर रखा है?`,
    context: `Triggered by active Mahadasha Lord ${mdPlanet} ruling the ${mdDirection}.`,
    contextHi: `आपकी वर्तमान महादशा स्वामी ${PLANET_HINDI_MAP[mdPlanet]} से संबंधित दिशा।`,
  });

  const vipatOrNaidhana = defectTriggers.find((d) => d.triggeringSystem === 'Navatara');
  if (vipatOrNaidhana) {
    verificationItems.push({
      id: 'verify-2',
      direction: vipatOrNaidhana.direction,
      directionHi: vipatOrNaidhana.directionHi || vipatOrNaidhana.direction,
      symptomStatement: `Is there any water seepage, peeling paint, cracked tile, or damp odor in or around the ${vipatOrNaidhana.direction} sector?`,
      symptomStatementHi: `क्या आपके घर के ${vipatOrNaidhana.directionHi || vipatOrNaidhana.direction} में कोई सीलन, उखड़ता हुआ पेंट, टूटी हुई टाइल या टपकता नल है?`,
      context: `Triggered by Navatara malefic Tara affliction (${vipatOrNaidhana.triggerPlanet}).`,
      contextHi: `नवतारा चक्र के दोष से प्रभावित दिशा।`,
    });
  }

  const bnnTrigger = defectTriggers.find((d) => d.triggeringSystem === 'BNN');
  if (bnnTrigger) {
    verificationItems.push({
      id: 'verify-3',
      direction: bnnTrigger.direction,
      directionHi: bnnTrigger.directionHi || bnnTrigger.direction,
      symptomStatement: `In the ${bnnTrigger.direction} area of your residence, is there an accumulation of iron, old footwear, or tangled cords/chargers?`,
      symptomStatementHi: `क्या घर के ${bnnTrigger.directionHi || bnnTrigger.direction} क्षेत्र में पुराने जूते-चप्पल, उलझे हुए केबल या जंग लगा लोहा रखा है?`,
      context: `Triggered by BNN Trinal conjunction signature in ${bnnTrigger.direction}.`,
      contextHi: `भृगु नंदी नाड़ी के त्रिकोण योग से प्रभावित दिशा।`,
    });
  }

  verificationItems.push({
    id: 'verify-4',
    direction: a4SignDef.direction,
    directionHi: a4DirHi,
    symptomStatement: `Within 200–500 meters of your building towards the ${a4SignDef.direction}, is there a prominent landmark (temple, educational institute, water canal, or busy junction)?`,
    symptomStatementHi: `क्या आपके घर से 200 से 500 मीटर की दूरी पर ${a4DirHi} की तरफ कोई प्रसिद्ध स्थल (मंदिर, स्कूल, पानी की टंकी या व्यस्त चौराहा) है?`,
    context: `Triggered by Jaimini A4 (Matri Pada) in ${chart.jaimini.a4SignName}.`,
    contextHi: `जैमिनी मातृ पद (A4) से निर्धारित बाहरी वातावरण।`,
  });

  // 6. 3-Tier Remedies with Hindi
  const tier1PhysicalDeclutter = defectTriggers.slice(0, 3).map((d) => ({
    action: `Purge and organize ${d.direction} zone`,
    actionHi: `${d.directionHi || d.direction} की संपूर्ण सफाई व कबाड़ निकासी`,
    direction: d.direction,
    directionHi: d.directionHi || d.direction,
    itemsToRemove: [
      'Broken or unused electrical gadgets and rusted tools',
      'Old dust-covered carton boxes and expired receipts',
      'Damaged footwear or cracked glass mirrors',
    ],
    itemsToRemoveHi: [
      'खराब बिजली के उपकरण (तार, चार्जर, बल्ब) व जंग लगा लोहा',
      'धूल भरे पुराने गत्ते के डिब्बे, पुरानी रसीदें व फालतू कागजात',
      'टूटी चप्पलें, चटकी हुई क्रॉकरी या दरार वाले शीशे',
    ],
  }));

  const tier2ElementalColorVastu = [
    {
      direction: mdDirection,
      directionHi: mdDirHi,
      element: 'Vibrational Harmony',
      elementHi: 'दिशा व ग्रह का संतुलन',
      prescribedColor: mdPlanet === 'Sun' || mdPlanet === 'Mars' ? 'Warm Cream / Terracotta' : 'Soft Pearl White / Sage Green',
      prescribedColorHi: mdPlanet === 'Sun' || mdPlanet === 'Mars' ? 'हल्का क्रीम या बादामी रंग' : 'मोतिया सफेद या हल्का हरा रंग',
      avoidColor: 'Stark Pitch Black / Clashing Neon',
      avoidColorHi: 'गहरा काला या बहुत तीखा चटक रंग',
      correctiveObject: `Energized brass or copper element aligned with ${mdPlanet}.`,
      correctiveObjectHi: `${PLANET_HINDI_MAP[mdPlanet]} के अनुकूल पीतल या तांबे की सुंदर वस्तु।`,
    },
    {
      direction: 'North-East' as DirectionType,
      directionHi: 'उत्तर-पूर्व (ईशान कोण)',
      element: 'Water / Ether',
      elementHi: 'जल व आकाश तत्व',
      prescribedColor: 'Pure White / Light Sky Blue',
      prescribedColorHi: 'शुद्ध सफेद या हल्का आसमानी रंग',
      avoidColor: 'Deep Crimson Red / Harsh Yellow',
      avoidColorHi: 'गहरा लाल या चटक काला रंग',
      correctiveObject: 'Glass bowl with clean water and fresh white flowers or natural rock salt bowl.',
      correctiveObjectHi: 'कांच या पीतल के बर्तन में स्वच्छ जल और सफेद फूल रखें।',
    },
    {
      direction: 'South-West' as DirectionType,
      directionHi: 'दक्षिण-पश्चिम (नैऋत्य कोण)',
      element: 'Earth',
      elementHi: 'पृथ्वी तत्व',
      prescribedColor: 'Earthy Ochre / Muted Gold',
      prescribedColorHi: 'हल्का पीला, गेरुआ या मिट्टी का रंग',
      avoidColor: 'Water blues or transparent mirrors',
      avoidColorHi: 'नीला रंग या बड़े शीशे',
      correctiveObject: 'Solid brass idol or heavy earthen pot filled with yellow river sand.',
      correctiveObjectHi: 'ठोस पीतल का हाथी या भारी मिट्टी का गमला रखें।',
    },
  ];

  const tier3ClassicalRemedies = [
    {
      system: 'Parashari & Vimshottari (पाराशरी व दशा उपाय)',
      remedyText: `Activate the benevolent vibration of Mahadasha lord ${mdPlanet} by lighting a pure sesame or cow ghee lamp facing ${mdDirection} during twilight.`,
      remedyTextHi: `वर्तमान महादशा स्वामी ${PLANET_HINDI_MAP[mdPlanet]} की कृपा पाने के लिए शाम के समय घर की ${mdDirHi} की ओर मुख करके शुद्ध गाय के घी या तिल के तेल का दीपक जलाएं।`,
      citation: `[Brihat Parashara Hora Shastra, Remedial Measures]`,
      deityOrMantra: `Gayatri or Navagraha Stotram for ${mdPlanet}`,
    },
    {
      system: 'Bhrigu Nandi Nadi (भृगु नंदी नाड़ी उपाय)',
      remedyText: `To neutralize trinal conflicts, place a live green indoor plant (such as Money Plant or Bamboo) near the transition corridor between ${mdDirection} and ${adDirection}.`,
      remedyTextHi: `दिशा दोषों को शांत करने के लिए ${mdDirHi} में एक सुंदर हरा जीवित पौधा (जैसे मनी प्लांट या बैम्बू) रखें।`,
      citation: `[Bhrigu Nandi Nadi, Plant & Elemental Karakatwas]`,
    },
    {
      system: 'Jaimini & Vishwakarma Prakash (जैमिनी व विश्वकर्मा प्रकाश उपाय)',
      remedyText: `Energize the A4 Matri Pada sign (${chart.jaimini.a4SignName}) by keeping the entrance threshold washed and applying auspicious turmeric-kumkum marks on Friday mornings.`,
      remedyTextHi: `घर के मुख्य द्वार की चौखट को साफ रखें और शुक्रवार की सुबह हल्दी-कुमकुम का स्वास्तिक बनाएं। इससे गृहलक्ष्मी और सकारात्मक ऊर्जा का वास रहता है।`,
      citation: `[Vishwakarma Prakash, Ch. 2, Dwar Nirnaya / Jaimini Sutras]`,
      deityOrMantra: 'Sri Suktam or Vastu Purusha Mantra',
    },
  ];

  const quickFriendlyTakeaways = {
    en: [
      `Your natal chart has ${chart.lagna.sanskritSignName} (${chart.lagna.signName}) Ascendant, ruled by current ${chart.vimshottari.currentMahadasha} Mahadasha.`,
      `Primary Vastu attention is needed in your ${mdDirHi}—removing old non-functional items and dust will directly relieve stress.`,
      `Your external surroundings indicate a prominent approach or public institution in the ${a4DirHi}. Keeping your front entrance clean opens up prosperity.`,
    ],
    hi: [
      `आपकी कुंडली का लग्न ${chart.lagna.sanskritSignName} (${chart.lagna.signName}) है और वर्तमान में ${PLANET_HINDI_MAP[chart.vimshottari.currentMahadasha]} की महादशा चल रही है।`,
      `सबसे पहले घर के **${mdDirHi}** पर ध्यान दें—वहां से पुरानी खराब वस्तुएं, फालतू डिब्बे और धूल हटाने से तुरंत मानसिक शांति और बरकत मिलेगी।`,
      `घर के मुख्य दरवाजे को साफ-सुथरा रखें। छोटे-छोटे 3 सरल उपाय करके आप बिना किसी तोड़-फोड़ के घर का वास्तु संतुलित कर सकते हैं।`,
    ],
  };

  const executiveSynthesis = `Comprehensive 4-System Astro-Vastu Diagnostic for ${chart.user.fullName}: The natal chart establishes ${chart.lagna.sanskritSignName} (${chart.lagna.signName}) Lagna with Moon in ${chart.lagna.nakshatra.name}. Current life events and spatial resonances are strongly driven by the ${chart.vimshottari.currentMahadasha}-${chart.vimshottari.currentAntardasha} Dasha axis. Spatial afflictions in the ${mdDirection} and ${adDirection} directly mirror your physical life challenges. By executing the 3-Tier corrections—decluttering the identified zones, calibrating elemental colors, and maintaining the sanctified threshold—you unlock harmonious prana and wealth flow.`;

  const executiveSynthesisHi = `${chart.user.fullName} जी के लिए सरल व संपूर्ण एस्ट्रो-वास्तु विश्लेषण: आपकी कुंडली ${chart.lagna.sanskritSignName} (${chart.lagna.signName}) लग्न की है और वर्तमान में आपकी ${PLANET_HINDI_MAP[chart.vimshottari.currentMahadasha]} की महादशा चल रही है। एस्ट्रो-वास्तु के नियम के अनुसार, जो ग्रह वर्तमान में सक्रिय होता है, घर की वही दिशा आपके जीवन को सबसे ज्यादा प्रभावित करती है। इसलिए घर के **${mdDirHi}** को पूरी तरह साफ, कबाड़-मुक्त और सुव्यवस्थित रखें। नीचे दिए गए 3 सरल उपायों को अपनाकर आप घर में सकारात्मक ऊर्जा, सुख-शांति और आर्थिक समृद्धि ला सकते हैं।`;

  return {
    generatedAt: new Date().toISOString(),
    chartSummary: {
      ascendantSign: `${chart.lagna.signName} (${chart.lagna.sanskritSignName}) at ${chart.lagna.formattedDegree}`,
      moonSign: `${chart.planets.find((p) => p.name === 'Moon')?.signName || 'Aries'}`,
      moonNakshatra: `${chart.lagna.nakshatra.name} (Pada ${chart.lagna.nakshatra.pada})`,
      currentDasha: `${chart.vimshottari.currentMahadasha} MD / ${chart.vimshottari.currentAntardasha} AD`,
      a4Sign: `${chart.jaimini.a4SignName} (${chart.jaimini.a4SanskritSignName})`,
    },
    chartSummaryHi: {
      ascendantSign: `${chart.lagna.sanskritSignName} लग्न (${chart.lagna.formattedDegree})`,
      moonSign: `${chart.planets.find((p) => p.name === 'Moon')?.signName || 'मेष'} राशि`,
      moonNakshatra: `${chart.lagna.nakshatra.name} (चरण ${chart.lagna.nakshatra.pada})`,
      currentDasha: `${PLANET_HINDI_MAP[chart.vimshottari.currentMahadasha]} महादशा / ${PLANET_HINDI_MAP[chart.vimshottari.currentAntardasha]} अंतर्दशा`,
      a4Sign: `${chart.jaimini.a4SanskritSignName} (मातृ पद A4)`,
    },
    quickFriendlyTakeaways,
    nearHouseSurroundings: surroundingsPredictions,
    internalHomeMisalignments: defectTriggers,
    verificationChecklist: verificationItems,
    threeTierRemedies: {
      tier1PhysicalDeclutter,
      tier2ElementalColorVastu,
      tier3ClassicalRemedies,
    },
    executiveSynthesis,
    executiveSynthesisHi,
  };
}
