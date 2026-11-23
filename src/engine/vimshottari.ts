import { DashaPeriod, PlanetKey, VimshottariDashaState } from '../types/astrology';

export const DASHA_ORDER: { lord: PlanetKey; years: number }[] = [
  { lord: 'Ketu', years: 7 },
  { lord: 'Venus', years: 20 },
  { lord: 'Sun', years: 6 },
  { lord: 'Moon', years: 10 },
  { lord: 'Mars', years: 7 },
  { lord: 'Rahu', years: 18 },
  { lord: 'Jupiter', years: 16 },
  { lord: 'Saturn', years: 19 },
  { lord: 'Mercury', years: 17 },
];

export const TOTAL_VIMSHOTTARI_YEARS = 120;

/**
 * Calculates Vimshottari Dasha and Antardasha periods and pinpoints the current operating lords
 */
export function calculateVimshottari(
  moonSiderealLon: number,
  birthDate: Date,
  currentDate: Date = new Date()
): VimshottariDashaState {
  const nakshatraSpan = 360 / 27; // 13.3333333333°
  const normLon = ((moonSiderealLon % 360) + 360) % 360;

  const nakIndex = Math.floor(normLon / nakshatraSpan);
  const nakDegreeElapsed = normLon - nakIndex * nakshatraSpan;
  const fractionRemaining = 1 - nakDegreeElapsed / nakshatraSpan;

  // Starting Dasha Lord is the ruler of Moon's Nakshatra
  // 0: Ashwini (Ketu), 1: Bharani (Venus), 2: Krittika (Sun)...
  const dashaIndexAtBirth = nakIndex % 9;
  const startingLordDef = DASHA_ORDER[dashaIndexAtBirth];

  // Balance of dasha at birth in days
  const balanceYears = startingLordDef.years * fractionRemaining;
  const balanceDays = balanceYears * 365.2425;

  let currentPointerTime = birthDate.getTime();
  const dashaPeriods: DashaPeriod[] = [];

  let currentMahadasha: PlanetKey = startingLordDef.lord;
  let currentAntardasha: PlanetKey = startingLordDef.lord;
  let mdStartDate = new Date(currentPointerTime).toISOString();
  let mdEndDate = new Date(currentPointerTime + balanceDays * 86400000).toISOString();
  let adStartDate = mdStartDate;
  let adEndDate = mdEndDate;

  const nowMs = currentDate.getTime();

  for (let i = 0; i < 9; i++) {
    const lordIdx = (dashaIndexAtBirth + i) % 9;
    const lordDef = DASHA_ORDER[lordIdx];
    const durationYears = i === 0 ? balanceYears : lordDef.years;
    const durationMs = durationYears * 365.2425 * 86400000;

    const startMs = currentPointerTime;
    const endMs = startMs + durationMs;
    currentPointerTime = endMs;

    const isThisMDCurrent = nowMs >= startMs && nowMs < endMs;

    // Generate Antardashas within this Mahadasha
    const antardashas: DashaPeriod[] = [];
    let adPointer = startMs;

    for (let j = 0; j < 9; j++) {
      const adLordIdx = (lordIdx + j) % 9;
      const adLordDef = DASHA_ORDER[adLordIdx];

      // Standard Antardasha formula: (MD_years * AD_years) / 120
      // Pro-rated for the initial balance if i === 0
      const adShareFraction = adLordDef.years / TOTAL_VIMSHOTTARI_YEARS;
      const adDurationMs = durationMs * (i === 0 ? adLordDef.years / lordDef.years : adShareFraction);

      const adStart = adPointer;
      const adEnd = adStart + adDurationMs;
      adPointer = adEnd;

      const isThisADCurrent = nowMs >= adStart && nowMs < adEnd;

      if (isThisADCurrent) {
        currentMahadasha = lordDef.lord;
        currentAntardasha = adLordDef.lord;
        mdStartDate = new Date(startMs).toISOString();
        mdEndDate = new Date(endMs).toISOString();
        adStartDate = new Date(adStart).toISOString();
        adEndDate = new Date(adEnd).toISOString();
      }

      antardashas.push({
        planet: adLordDef.lord,
        startDate: new Date(adStart).toISOString(),
        endDate: new Date(adEnd).toISOString(),
        isCurrent: isThisADCurrent,
      });
    }

    dashaPeriods.push({
      planet: lordDef.lord,
      startDate: new Date(startMs).toISOString(),
      endDate: new Date(endMs).toISOString(),
      isCurrent: isThisMDCurrent,
      antardashas,
    });
  }

  return {
    currentMahadasha,
    currentAntardasha,
    mdStartDate,
    mdEndDate,
    adStartDate,
    adEndDate,
    fullPeriods: dashaPeriods,
  };
}
