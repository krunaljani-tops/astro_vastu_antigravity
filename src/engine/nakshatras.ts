import { NakshatraInfo, PlanetKey, TaraName } from '../types/astrology';

export interface NakshatraDefinition {
  index: number;
  name: string;
  ruler: PlanetKey;
  deity: string;
  symbol: string;
}

export const NAKSHATRAS: NakshatraDefinition[] = [
  { index: 0, name: 'Ashwini', ruler: 'Ketu', deity: 'Ashwini Kumaras', symbol: 'Horse Head' },
  { index: 1, name: 'Bharani', ruler: 'Venus', deity: 'Yama', symbol: 'Yoni / Triangle' },
  { index: 2, name: 'Krittika', ruler: 'Sun', deity: 'Agni', symbol: 'Razor / Flame' },
  { index: 3, name: 'Rohini', ruler: 'Moon', deity: 'Brahma / Prajapati', symbol: 'Cart / Chariot' },
  { index: 4, name: 'Mrigashira', ruler: 'Mars', deity: 'Soma', symbol: 'Deer Head' },
  { index: 5, name: 'Ardra', ruler: 'Rahu', deity: 'Rudra', symbol: 'Teardrop / Jewel' },
  { index: 6, name: 'Punarvasu', ruler: 'Jupiter', deity: 'Aditi', symbol: 'Bow and Quiver' },
  { index: 7, name: 'Pushya', ruler: 'Saturn', deity: 'Brihaspati', symbol: 'Cow Udder / Lotus' },
  { index: 8, name: 'Ashlesha', ruler: 'Mercury', deity: 'Sarpas / Nagas', symbol: 'Coiled Serpent' },
  { index: 9, name: 'Magha', ruler: 'Ketu', deity: 'Pitris', symbol: 'Royal Throne' },
  { index: 10, name: 'Purva Phalguni', ruler: 'Venus', deity: 'Bhaga', symbol: 'Front Legs of Bed' },
  { index: 11, name: 'Uttara Phalguni', ruler: 'Sun', deity: 'Aryaman', symbol: 'Back Legs of Bed' },
  { index: 12, name: 'Hasta', ruler: 'Moon', deity: 'Savitr', symbol: 'Hand / Fist' },
  { index: 13, name: 'Chitra', ruler: 'Mars', deity: 'Vishwakarma', symbol: 'Bright Pearl / Gem' },
  { index: 14, name: 'Swati', ruler: 'Rahu', deity: 'Vayu', symbol: 'Young Shoot / Coral' },
  { index: 15, name: 'Vishakha', ruler: 'Jupiter', deity: 'Indragni', symbol: 'Triumphal Arch' },
  { index: 16, name: 'Anuradha', ruler: 'Saturn', deity: 'Mitra', symbol: 'Staff / Lotus Flower' },
  { index: 17, name: 'Jyeshtha', ruler: 'Mercury', deity: 'Indra', symbol: 'Earring / Umbrella' },
  { index: 18, name: 'Mula', ruler: 'Ketu', deity: 'Nirriti', symbol: 'Tied Roots / Lion Tail' },
  { index: 19, name: 'Purva Ashadha', ruler: 'Venus', deity: 'Apas', symbol: 'Elephant Tusk / Winnowing Basket' },
  { index: 20, name: 'Uttara Ashadha', ruler: 'Sun', deity: 'Vishvadevas', symbol: 'Elephant Tusk / Small Bed' },
  { index: 21, name: 'Shravana', ruler: 'Moon', deity: 'Vishnu', symbol: 'Ear / Three Footprints' },
  { index: 22, name: 'Dhanishta', ruler: 'Mars', deity: 'Ashta Vasus', symbol: 'Drum / Flute' },
  { index: 23, name: 'Shatabhisha', ruler: 'Rahu', deity: 'Varuna', symbol: 'Empty Circle / 100 Physicians' },
  { index: 24, name: 'Purva Bhadrapada', ruler: 'Jupiter', deity: 'Aja Ekapada', symbol: 'Front of Funeral Cot / Two Faced Man' },
  { index: 25, name: 'Uttara Bhadrapada', ruler: 'Saturn', deity: 'Ahirbudhnya', symbol: 'Back of Funeral Cot / Snake in Water' },
  { index: 26, name: 'Revati', ruler: 'Mercury', deity: 'Pushan', symbol: 'Fish / Drum' },
];

export const TARA_NAMES: TaraName[] = [
  'Janma',     // 1
  'Sampat',    // 2
  'Vipat',     // 3 - Danger/Defect trigger
  'Kshema',    // 4
  'Pratyak',   // 5 - Obstacles/Defect trigger
  'Sadhana',   // 6
  'Naidhana',  // 7 - Severe loss/Defect trigger
  'Mitra',     // 8
  'Ati-Mitra', // 9
];

// Pada lords repeat across signs in Navamsha order
const NAVAMSHA_LORDS_ORDER: PlanetKey[] = [
  'Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'
];

/**
 * Given a sidereal longitude (0 - 360°), determines Nakshatra and Pada
 */
export function getNakshatraInfo(siderealLon: number): NakshatraInfo {
  const normLon = ((siderealLon % 360) + 360) % 360;
  const nakshatraSpan = 360 / 27; // 13.3333333333°
  const padaSpan = nakshatraSpan / 4; // 3.3333333333°

  const index = Math.floor(normLon / nakshatraSpan);
  const remDeg = normLon - index * nakshatraSpan;
  const pada = Math.floor(remDeg / padaSpan) + 1;

  const def = NAKSHATRAS[index] || NAKSHATRAS[0];

  // Navamsha Pada Lord
  const totalPadasElapsed = Math.floor(normLon / padaSpan);
  const padaLord = NAVAMSHA_LORDS_ORDER[totalPadasElapsed % 12];

  return {
    index,
    name: def.name,
    ruler: def.ruler,
    deity: def.deity,
    symbol: def.symbol,
    pada,
    padaLord,
  };
}
