import * as Astronomy from 'astronomy-engine';
import {
  BirthChartData,
  ChartHouse,
  PlanetKey,
  PlanetPosition,
  ZodiacSignName,
  SanskritSignName,
} from '../types/astrology';
import {
  calculateAscendant,
  calculateNodes,
  formatDMS,
  getJulianDay,
  getLahiriAyanamsha,
  PLANET_PRIMARY_VASTU_DIRECTIONS,
  SANSKRIT_PLANET_NAMES,
  ZODIAC_SIGNS,
} from './astronomy';
import { getNakshatraInfo } from './nakshatras';
import { calculateNavataraForNakshatra, generateNavataraGrid } from './navatara';
import { analyzeBNNTrines } from './bnn';
import { analyzeJaimini, assignCharaKarakas } from './jaimini';
import { calculateVimshottari } from './vimshottari';

export interface BirthInput {
  fullName: string;
  dob: string; // YYYY-MM-DD
  tob: string; // HH:MM:SS or HH:MM
  place: string;
  latitude: number;
  longitude: number;
  timezoneOffsetHours: number; // e.g. +5.5 for IST
}

const BODY_MAP: { key: PlanetKey; body: Astronomy.Body }[] = [
  { key: 'Sun', body: Astronomy.Body.Sun },
  { key: 'Moon', body: Astronomy.Body.Moon },
  { key: 'Mercury', body: Astronomy.Body.Mercury },
  { key: 'Venus', body: Astronomy.Body.Venus },
  { key: 'Mars', body: Astronomy.Body.Mars },
  { key: 'Jupiter', body: Astronomy.Body.Jupiter },
  { key: 'Saturn', body: Astronomy.Body.Saturn },
];

/**
 * Computes complete Vedic Natal Birth Chart with Lahiri Ayanamsha,
 * Parashari D1, Vimshottari Dasha, Navatara Chakra, BNN, and Jaimini Systems.
 */
export function calculateVedicBirthChart(input: BirthInput): BirthChartData {
  // Parse date and time in the provided timezone
  const [yearStr, monthStr, dayStr] = input.dob.split('-');
  const timeParts = input.tob.split(':');
  const hour = parseInt(timeParts[0] || '12', 10);
  const min = parseInt(timeParts[1] || '0', 10);
  const sec = parseInt(timeParts[2] || '0', 10);

  // Convert to UTC
  // Local Time = UTC + timezoneOffsetHours => UTC = Local Time - timezoneOffsetHours
  const localDate = new Date(
    Date.UTC(
      parseInt(yearStr, 10),
      parseInt(monthStr, 10) - 1,
      parseInt(dayStr, 10),
      hour,
      min,
      sec
    )
  );

  const utcTimeMs = localDate.getTime() - input.timezoneOffsetHours * 3600000;
  const utcDate = new Date(utcTimeMs);

  const jd = getJulianDay(utcDate);
  const ayanamshaDeg = getLahiriAyanamsha(jd);

  // 1. Calculate Lagna (Ascendant)
  const ascData = calculateAscendant(utcDate, input.latitude, input.longitude, ayanamshaDeg);
  const lagnaSignIndex = Math.floor(ascData.siderealLon / 30) + 1;
  const lagnaSignDef = ZODIAC_SIGNS[lagnaSignIndex - 1];
  const lagnaDegInSign = ascData.siderealLon % 30;
  const lagnaNakshatra = getNakshatraInfo(ascData.siderealLon);

  const lagnaPosition: PlanetPosition = {
    name: 'Ascendant',
    sanskritName: 'Lagna',
    tropicalLongitude: ascData.tropicalLon,
    siderealLongitude: ascData.siderealLon,
    signIndex: lagnaSignIndex,
    signName: lagnaSignDef.name,
    sanskritSignName: lagnaSignDef.sanskrit,
    degreeInSign: lagnaDegInSign,
    formattedDegree: formatDMS(lagnaDegInSign),
    isRetrograde: false,
    speed: 360 / 24, // approx 1 sign per 2 hours
    house: 1,
    nakshatra: lagnaNakshatra,
    karaka: '-',
    element: lagnaSignDef.element,
    bnnDirection: lagnaSignDef.bnnDirection,
    primaryVastuDirection: PLANET_PRIMARY_VASTU_DIRECTIONS.Ascendant,
  };

  // 2. Calculate 7 Classical Planets using Astronomy Engine
  const astroTime = Astronomy.MakeTime(utcDate);
  // Time 1 hour later for speed/retrograde check
  const astroTimeNext = Astronomy.MakeTime(new Date(utcTimeMs + 3600000));

  const planetPositions: PlanetPosition[] = [];

  for (const item of BODY_MAP) {
    const vec1 = Astronomy.GeoVector(item.body, astroTime, true);
    const ecl1 = Astronomy.Ecliptic(vec1);

    const vec2 = Astronomy.GeoVector(item.body, astroTimeNext, true);
    const ecl2 = Astronomy.Ecliptic(vec2);

    const tropicalLon = ecl1.elon;
    const siderealLon = ((tropicalLon - ayanamshaDeg) % 360 + 360) % 360;

    let deltaLon = ecl2.elon - ecl1.elon;
    if (deltaLon > 180) deltaLon -= 360;
    if (deltaLon < -180) deltaLon += 360;
    const isRetrograde = item.key === 'Sun' || item.key === 'Moon' ? false : deltaLon < 0;
    const speedPerDay = deltaLon * 24;

    const signIndex = Math.floor(siderealLon / 30) + 1;
    const signDef = ZODIAC_SIGNS[signIndex - 1];
    const degreeInSign = siderealLon % 30;
    const nakshatra = getNakshatraInfo(siderealLon);

    // House from Lagna (Equal sign system / Whole sign house as standard in Vedic)
    const house = ((signIndex - lagnaSignIndex + 12) % 12) + 1;

    planetPositions.push({
      name: item.key,
      sanskritName: SANSKRIT_PLANET_NAMES[item.key],
      tropicalLongitude: tropicalLon,
      siderealLongitude: siderealLon,
      signIndex,
      signName: signDef.name,
      sanskritSignName: signDef.sanskrit,
      degreeInSign,
      formattedDegree: formatDMS(degreeInSign),
      isRetrograde,
      speed: speedPerDay,
      house,
      nakshatra,
      element: signDef.element,
      bnnDirection: signDef.bnnDirection,
      primaryVastuDirection: PLANET_PRIMARY_VASTU_DIRECTIONS[item.key],
    });
  }

  // 3. Calculate Lunar Nodes (Rahu and Ketu)
  const nodeData = calculateNodes(jd, ayanamshaDeg);

  // Rahu
  const rahuSignIndex = Math.floor(nodeData.rahuSidereal / 30) + 1;
  const rahuSignDef = ZODIAC_SIGNS[rahuSignIndex - 1];
  const rahuDegInSign = nodeData.rahuSidereal % 30;
  const rahuNakshatra = getNakshatraInfo(nodeData.rahuSidereal);
  const rahuHouse = ((rahuSignIndex - lagnaSignIndex + 12) % 12) + 1;

  planetPositions.push({
    name: 'Rahu',
    sanskritName: SANSKRIT_PLANET_NAMES.Rahu,
    tropicalLongitude: nodeData.rahuTropical,
    siderealLongitude: nodeData.rahuSidereal,
    signIndex: rahuSignIndex,
    signName: rahuSignDef.name,
    sanskritSignName: rahuSignDef.sanskrit,
    degreeInSign: rahuDegInSign,
    formattedDegree: formatDMS(rahuDegInSign),
    isRetrograde: true,
    speed: -0.05295,
    house: rahuHouse,
    nakshatra: rahuNakshatra,
    element: rahuSignDef.element,
    bnnDirection: rahuSignDef.bnnDirection,
    primaryVastuDirection: PLANET_PRIMARY_VASTU_DIRECTIONS.Rahu,
  });

  // Ketu
  const ketuSignIndex = Math.floor(nodeData.ketuSidereal / 30) + 1;
  const ketuSignDef = ZODIAC_SIGNS[ketuSignIndex - 1];
  const ketuDegInSign = nodeData.ketuSidereal % 30;
  const ketuNakshatra = getNakshatraInfo(nodeData.ketuSidereal);
  const ketuHouse = ((ketuSignIndex - lagnaSignIndex + 12) % 12) + 1;

  planetPositions.push({
    name: 'Ketu',
    sanskritName: SANSKRIT_PLANET_NAMES.Ketu,
    tropicalLongitude: nodeData.ketuTropical,
    siderealLongitude: nodeData.ketuSidereal,
    signIndex: ketuSignIndex,
    signName: ketuSignDef.name,
    sanskritSignName: ketuSignDef.sanskrit,
    degreeInSign: ketuDegInSign,
    formattedDegree: formatDMS(ketuDegInSign),
    isRetrograde: true,
    speed: -0.05295,
    house: ketuHouse,
    nakshatra: ketuNakshatra,
    element: ketuSignDef.element,
    bnnDirection: ketuSignDef.bnnDirection,
    primaryVastuDirection: PLANET_PRIMARY_VASTU_DIRECTIONS.Ketu,
  });

  // 4. Jaimini Karaka assignments
  assignCharaKarakas(planetPositions);

  // 5. Find Moon's Nakshatra for Navatara and Vimshottari
  const moonPos = planetPositions.find((p) => p.name === 'Moon')!;
  const moonNakshatraIndex = moonPos.nakshatra.index;

  // Enrich each planet with Navatara info
  planetPositions.forEach((p) => {
    const navatara = calculateNavataraForNakshatra(p.nakshatra.index, moonNakshatraIndex);
    p.nakshatra.taraName = navatara.taraName;
    p.nakshatra.taraCycle = navatara.taraCycle;
    p.nakshatra.isMaleficTara = navatara.isMalefic;
  });

  // 6. Generate Navatara Grid
  const navataraGrid = generateNavataraGrid(
    moonNakshatraIndex,
    planetPositions.map((p) => ({ planet: p.name, nakshatraIndex: p.nakshatra.index }))
  );

  // 7. Calculate Vimshottari Dasha
  const vimshottari = calculateVimshottari(moonPos.siderealLongitude, localDate, new Date());

  // 8. BNN 1-5-9 Directional Trines
  const bnnTrines = analyzeBNNTrines(planetPositions);

  // 9. Jaimini Analysis (including A4 Matri Pada)
  const jaimini = analyzeJaimini(lagnaSignIndex, planetPositions);

  // 10. Construct 12 Houses
  const houses: ChartHouse[] = [];
  for (let h = 1; h <= 12; h++) {
    const signIdx = ((lagnaSignIndex - 1 + (h - 1)) % 12) + 1;
    const signDef = ZODIAC_SIGNS[signIdx - 1];
    const planetsInHouse = planetPositions.filter((p) => p.house === h);

    const arudhas: string[] = [];
    if (h === 1) arudhas.push('Lagna');
    if (signIdx === jaimini.a4SignIndex) arudhas.push('A4 (Matri)');

    houses.push({
      houseNumber: h,
      signIndex: signIdx,
      signName: signDef.name,
      sanskritSignName: signDef.sanskrit,
      lord: signDef.lord,
      element: signDef.element,
      direction: signDef.bnnDirection,
      planets: planetsInHouse,
      arudhas,
    });
  }

  return {
    user: {
      fullName: input.fullName,
      dob: input.dob,
      tob: input.tob,
      place: input.place,
      latitude: input.latitude,
      longitude: input.longitude,
      timezone: input.timezoneOffsetHours,
      formattedDateTime: `${input.dob} at ${input.tob} (${input.place})`,
    },
    ayanamsha: {
      name: 'Lahiri (Chitrapaksha)',
      degrees: ayanamshaDeg,
      formatted: formatDMS(ayanamshaDeg),
    },
    lagna: lagnaPosition,
    planets: planetPositions,
    houses,
    vimshottari,
    navataraGrid,
    bnnTrines,
    jaimini,
  };
}
