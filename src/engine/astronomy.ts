import * as Astronomy from 'astronomy-engine';
import { PlanetKey, PlanetPosition, ZodiacSignName, SanskritSignName, ElementType, DirectionType } from '../types/astrology';

export const ZODIAC_SIGNS: {
  index: number;
  name: ZodiacSignName;
  sanskrit: SanskritSignName;
  lord: PlanetKey;
  element: ElementType;
  bnnDirection: DirectionType;
}[] = [
  { index: 1, name: 'Aries', sanskrit: 'Mesha', lord: 'Mars', element: 'Fire', bnnDirection: 'East' },
  { index: 2, name: 'Taurus', sanskrit: 'Vrishabha', lord: 'Venus', element: 'Earth', bnnDirection: 'South' },
  { index: 3, name: 'Gemini', sanskrit: 'Mithuna', lord: 'Mercury', element: 'Air', bnnDirection: 'West' },
  { index: 4, name: 'Cancer', sanskrit: 'Karka', lord: 'Moon', element: 'Water', bnnDirection: 'North' },
  { index: 5, name: 'Leo', sanskrit: 'Simha', lord: 'Sun', element: 'Fire', bnnDirection: 'East' },
  { index: 6, name: 'Virgo', sanskrit: 'Kanya', lord: 'Mercury', element: 'Earth', bnnDirection: 'South' },
  { index: 7, name: 'Libra', sanskrit: 'Tula', lord: 'Venus', element: 'Air', bnnDirection: 'West' },
  { index: 8, name: 'Scorpio', sanskrit: 'Vrishchika', lord: 'Mars', element: 'Water', bnnDirection: 'North' },
  { index: 9, name: 'Sagittarius', sanskrit: 'Dhanu', lord: 'Jupiter', element: 'Fire', bnnDirection: 'East' },
  { index: 10, name: 'Capricorn', sanskrit: 'Makara', lord: 'Saturn', element: 'Earth', bnnDirection: 'South' },
  { index: 11, name: 'Aquarius', sanskrit: 'Kumbha', lord: 'Saturn', element: 'Air', bnnDirection: 'West' },
  { index: 12, name: 'Pisces', sanskrit: 'Meena', lord: 'Jupiter', element: 'Water', bnnDirection: 'North' },
];

export const PLANET_PRIMARY_VASTU_DIRECTIONS: Record<PlanetKey, DirectionType> = {
  Sun: 'East',
  Moon: 'North-West',
  Mars: 'South',
  Mercury: 'North',
  Jupiter: 'North-East',
  Venus: 'South-East',
  Saturn: 'West',
  Rahu: 'South-West',
  Ketu: 'Center',
  Ascendant: 'East',
};

export const SANSKRIT_PLANET_NAMES: Record<PlanetKey, string> = {
  Sun: 'Surya',
  Moon: 'Chandra',
  Mars: 'Mangala',
  Mercury: 'Budha',
  Jupiter: 'Guru',
  Venus: 'Shukra',
  Saturn: 'Shani',
  Rahu: 'Rahu',
  Ketu: 'Ketu',
  Ascendant: 'Lagna',
};

/**
 * Calculates Julian Day from UTC Date
 */
export function getJulianDay(date: Date): number {
  return date.getTime() / 86400000.0 + 2440587.5;
}

/**
 * Calculates accurate Lahiri (Chitrapaksha) Ayanamsha in degrees
 * J2000.0 (JD 2451545.0) = 23.85709167°
 */
export function getLahiriAyanamsha(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  // Standard Chitrapaksha/Lahiri precession model
  const ayanamsha = 23.85709167 + 1.396971 * T - 0.000308 * T * T;
  return ayanamsha;
}

/**
 * Formats decimal degree into Deg° Min' Sec"
 */
export function formatDMS(deg: number): string {
  const d = Math.floor(deg);
  const minFloat = (deg - d) * 60;
  const m = Math.floor(minFloat);
  const s = Math.round((minFloat - m) * 60);
  return `${d}° ${m.toString().padStart(2, '0')}' ${s.toString().padStart(2, '0')}"`;
}

/**
 * Calculate Local Sidereal Lagna (Ascendant)
 */
export function calculateAscendant(
  utcDate: Date,
  lat: number,
  lon: number,
  ayanamsha: number
): { siderealLon: number; tropicalLon: number } {
  const jd = getJulianDay(utcDate);
  const T = (jd - 2451545.0) / 36525.0;

  // Greenwich Mean Sidereal Time in degrees
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T;
  gmst = ((gmst % 360) + 360) % 360;

  // Local Sidereal Time (RAMC)
  const ramc = ((gmst + lon) % 360 + 360) % 360;
  const ramcRad = (ramc * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;

  // Obliquity of Ecliptic
  const eps = (23.439291 - 0.0130042 * T) * (Math.PI / 180);

  // Tropical Ascendant via classical formula
  const y = Math.cos(ramcRad);
  const x = -(Math.sin(ramcRad) * Math.cos(eps) + Math.tan(latRad) * Math.sin(eps));

  let tropicalAsc = (Math.atan2(y, x) * 180) / Math.PI;
  tropicalAsc = ((tropicalAsc % 360) + 360) % 360;

  // Sidereal Ascendant
  let siderealAsc = ((tropicalAsc - ayanamsha) % 360 + 360) % 360;

  return {
    tropicalLon: tropicalAsc,
    siderealLon: siderealAsc,
  };
}

/**
 * Calculates Mean Lunar Ascending Node (Rahu) & Descending Node (Ketu)
 */
export function calculateNodes(jd: number, ayanamsha: number): {
  rahuTropical: number;
  rahuSidereal: number;
  ketuTropical: number;
  ketuSidereal: number;
} {
  const T = (jd - 2451545.0) / 36525.0;
  // Mean longitude of ascending node of the Moon
  let omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000;
  omega = ((omega % 360) + 360) % 360;

  const rahuTropical = omega;
  const rahuSidereal = ((rahuTropical - ayanamsha) % 360 + 360) % 360;

  const ketuTropical = (rahuTropical + 180) % 360;
  const ketuSidereal = (rahuSidereal + 180) % 360;

  return {
    rahuTropical,
    rahuSidereal,
    ketuTropical,
    ketuSidereal,
  };
}
