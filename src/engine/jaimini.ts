import {
  CharaKaraka,
  DirectionType,
  JaiminiAnalysis,
  PlanetKey,
  PlanetPosition,
  ZodiacSignName,
  SanskritSignName,
} from '../types/astrology';
import { ZODIAC_SIGNS } from './astronomy';

export const CHARA_KARAKA_TITLES: { karaka: CharaKaraka; title: string; significance: string }[] = [
  { karaka: 'AK', title: 'Atmakaraka', significance: 'Soul planet, innermost purpose and self-realization' },
  { karaka: 'AmK', title: 'Amatyakaraka', significance: 'Career, minister to the soul, status and profession' },
  { karaka: 'BK', title: 'Bhratrikaraka', significance: 'Siblings, guru, courage, advisors' },
  { karaka: 'MK', title: 'Matrukaraka', significance: 'Mother, land, property, residence, emotional shelter' },
  { karaka: 'PK', title: 'Putrakaraka', significance: 'Children, creative intelligence, disciples, merits' },
  { karaka: 'GK', title: 'Gnatikaraka', significance: 'Obstacles, rivals, disease, disputes, endurance' },
  { karaka: 'DK', title: 'Darakaraka', significance: 'Spouse, life partner, business alliances' },
];

/**
 * Assign 7 Chara Karakas based on decreasing degree in sign
 * Classical 7-Karaka scheme: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn
 */
export function assignCharaKarakas(planets: PlanetPosition[]): void {
  const sevenPlanets: PlanetKey[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

  const sorted = planets
    .filter((p) => sevenPlanets.includes(p.name))
    .sort((a, b) => b.degreeInSign - a.degreeInSign);

  const karakaOrder: CharaKaraka[] = ['AK', 'AmK', 'BK', 'MK', 'PK', 'GK', 'DK'];

  sorted.forEach((p, index) => {
    p.karaka = karakaOrder[index] || '-';
  });

  // Assign '-' to Rahu, Ketu, and Ascendant
  planets.forEach((p) => {
    if (!sevenPlanets.includes(p.name)) {
      p.karaka = '-';
    }
  });
}

/**
 * Checks if Sign A casts Rashi Drishti on Sign B according to Jaimini Sutras:
 * - Chara (Movable: 1, 4, 7, 10) aspects Sthira (Fixed: 2, 5, 8, 11) EXCEPT adjacent
 * - Sthira (Fixed: 2, 5, 8, 11) aspects Chara (Movable: 1, 4, 7, 10) EXCEPT adjacent
 * - Dwiswabhava (Dual: 3, 6, 9, 12) aspects all other Dual signs
 */
export function hasRashiDrishti(sourceSign: number, targetSign: number): boolean {
  if (sourceSign === targetSign) return false;

  const movable = [1, 4, 7, 10];
  const fixed = [2, 5, 8, 11];
  const dual = [3, 6, 9, 12];

  // Dual signs aspect all other dual signs
  if (dual.includes(sourceSign) && dual.includes(targetSign)) {
    return true;
  }

  // Movable aspects Fixed except adjacent
  if (movable.includes(sourceSign) && fixed.includes(targetSign)) {
    const isAdjacent = Math.abs(sourceSign - targetSign) === 1 || (sourceSign === 1 && targetSign === 12);
    return !isAdjacent;
  }

  // Fixed aspects Movable except adjacent
  if (fixed.includes(sourceSign) && movable.includes(targetSign)) {
    const isAdjacent = Math.abs(sourceSign - targetSign) === 1 || (sourceSign === 12 && targetSign === 1);
    return !isAdjacent;
  }

  return false;
}

/**
 * Calculates A4 (Matri Pada / Arudha of the 4th House) and external surroundings signatures
 */
export function analyzeJaimini(lagnaSignIndex: number, planets: PlanetPosition[]): JaiminiAnalysis {
  // Find 4th House sign
  const h4SignIndex = ((lagnaSignIndex - 1 + 3) % 12) + 1;
  const h4Def = ZODIAC_SIGNS[h4SignIndex - 1];
  const h4Lord = h4Def.lord;

  // Find position of 4th Lord
  const lordPos = planets.find((p) => p.name === h4Lord);
  const lordSignIndex = lordPos ? lordPos.signIndex : h4SignIndex;

  // Distance from H4 to 4th Lord (1-based count)
  const dist = ((lordSignIndex - h4SignIndex + 12) % 12) + 1;

  // Raw Arudha position = Lord sign + (dist - 1)
  let rawArudhaSign = ((lordSignIndex - 1 + (dist - 1)) % 12) + 1;

  // Classical Jaimini exception:
  // If Arudha falls in the same house (dist === 1) or in the 7th from it (dist === 7),
  // jump 10 houses forward from the calculated point.
  if (rawArudhaSign === h4SignIndex) {
    rawArudhaSign = ((rawArudhaSign - 1 + 9) % 12) + 1; // 10th from it
  } else {
    const seventhFromH4 = ((h4SignIndex - 1 + 6) % 12) + 1;
    if (rawArudhaSign === seventhFromH4) {
      rawArudhaSign = ((rawArudhaSign - 1 + 9) % 12) + 1; // 10th from it
    }
  }

  const a4SignIndex = rawArudhaSign;
  const a4SignDef = ZODIAC_SIGNS[a4SignIndex - 1];
  const a4HouseFromLagna = ((a4SignIndex - lagnaSignIndex + 12) % 12) + 1;

  // Planets physically located in A4 sign
  const planetsInA4 = planets.filter((p) => p.signIndex === a4SignIndex).map((p) => p.name);

  // Planets casting Rashi Drishti on A4 sign
  const aspectingPlanetsRashiDrishti = planets
    .filter((p) => p.signIndex !== a4SignIndex && hasRashiDrishti(p.signIndex, a4SignIndex))
    .map((p) => p.name);

  // Karakas
  const akPlanet = planets.find((p) => p.karaka === 'AK')?.name || 'Sun';
  const amkPlanet = planets.find((p) => p.karaka === 'AmK')?.name || 'Jupiter';
  const mkPlanet = planets.find((p) => p.karaka === 'MK')?.name || 'Moon';

  // Surroundings signatures
  const externalSurroundingsSignatures: string[] = [];

  const allInfluencingPlanets = Array.from(new Set([...planetsInA4, ...aspectingPlanetsRashiDrishti, a4SignDef.lord]));

  if (allInfluencingPlanets.includes('Sun')) {
    externalSurroundingsSignatures.push(
      'Near Government administrative building, royal palace, wide illuminated avenue, or prominent Shiva temple.'
    );
  }
  if (allInfluencingPlanets.includes('Moon')) {
    externalSurroundingsSignatures.push(
      'Near flowing water body, canal, overhead water reservoir, public fountain, dairy, or dairy/nursery market.'
    );
  }
  if (allInfluencingPlanets.includes('Mars')) {
    externalSurroundingsSignatures.push(
      'Near police station, fire brigade, high-voltage transformer, red brick boundary, sports complex, or metal fabrication shop.'
    );
  }
  if (allInfluencingPlanets.includes('Mercury')) {
    externalSurroundingsSignatures.push(
      'Near primary school, lively shopping plaza, botanical park, communications tower, publishing house, or bookstore.'
    );
  }
  if (allInfluencingPlanets.includes('Jupiter')) {
    externalSurroundingsSignatures.push(
      'Near grand religious temple, educational university, court of law, spiritual sanctuary, or heritage bank.'
    );
  }
  if (allInfluencingPlanets.includes('Venus')) {
    externalSurroundingsSignatures.push(
      'Near luxury residential enclave, floral garden, designer boutique, banquet hall, beauty studio, or scenic avenue.'
    );
  }
  if (allInfluencingPlanets.includes('Saturn')) {
    externalSurroundingsSignatures.push(
      'Near aged heritage structures, iron hardware stockyards, heavy mechanical workshops, railway track, or quiet secluded grounds.'
    );
  }
  if (allInfluencingPlanets.includes('Rahu')) {
    externalSurroundingsSignatures.push(
      'Near busy multilane flyover / crossroads, telecommunications antenna, foreign goods bazaar, or electronic arcade.'
    );
  }
  if (allInfluencingPlanets.includes('Ketu')) {
    externalSurroundingsSignatures.push(
      'Near narrow cul-de-sac lane, flagstaff, small monastery, subterranean water passage, or ancient spiritual hermitage.'
    );
  }

  return {
    atmakaraka: akPlanet,
    amatyakaraka: amkPlanet,
    matrukaraka: mkPlanet,
    a4SignIndex,
    a4SignName: a4SignDef.name,
    a4SanskritSignName: a4SignDef.sanskrit,
    a4HouseFromLagna,
    a4Lord: a4SignDef.lord,
    planetsInA4,
    aspectingPlanetsRashiDrishti,
    externalSurroundingsSignatures,
  };
}
