export type ZodiacSignName =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export type SanskritSignName =
  | 'Mesha'
  | 'Vrishabha'
  | 'Mithuna'
  | 'Karka'
  | 'Simha'
  | 'Kanya'
  | 'Tula'
  | 'Vrishchika'
  | 'Dhanu'
  | 'Makara'
  | 'Kumbha'
  | 'Meena';

export type ElementType = 'Fire' | 'Earth' | 'Air' | 'Water';
export type DirectionType = 'East' | 'South' | 'West' | 'North' | 'North-East' | 'South-East' | 'South-West' | 'North-West' | 'Center';

export type PlanetKey =
  | 'Sun'
  | 'Moon'
  | 'Mars'
  | 'Mercury'
  | 'Jupiter'
  | 'Venus'
  | 'Saturn'
  | 'Rahu'
  | 'Ketu'
  | 'Ascendant';

export type TaraName =
  | 'Janma'
  | 'Sampat'
  | 'Vipat'
  | 'Kshema'
  | 'Pratyak'
  | 'Sadhana'
  | 'Naidhana'
  | 'Mitra'
  | 'Ati-Mitra';

export type CharaKaraka =
  | 'AK'   // Atmakaraka
  | 'AmK'  // Amatyakaraka
  | 'BK'   // Bhratrikaraka
  | 'MK'   // Matrukaraka
  | 'PK'   // Putrakaraka
  | 'GK'   // Gnatikaraka
  | 'DK'   // Darakaraka
  | '-';

export interface NakshatraInfo {
  index: number; // 0 to 26
  name: string;
  ruler: PlanetKey;
  deity: string;
  symbol: string;
  pada: number; // 1 to 4
  padaLord: PlanetKey;
  taraName?: TaraName;
  taraCycle?: number; // 1, 2, or 3
  isMaleficTara?: boolean; // 3, 5, 7
}

export interface PlanetPosition {
  name: PlanetKey;
  sanskritName: string;
  tropicalLongitude: number;
  siderealLongitude: number;
  signIndex: number; // 1 to 12
  signName: ZodiacSignName;
  sanskritSignName: SanskritSignName;
  degreeInSign: number;
  formattedDegree: string; // e.g. "14°28'32\""
  isRetrograde: boolean;
  speed: number;
  house: number; // 1 to 12 from Lagna
  nakshatra: NakshatraInfo;
  karaka?: CharaKaraka;
  element: ElementType;
  bnnDirection: DirectionType;
  primaryVastuDirection: DirectionType;
}

export interface ChartHouse {
  houseNumber: number; // 1 to 12
  signIndex: number;   // 1 to 12
  signName: ZodiacSignName;
  sanskritSignName: SanskritSignName;
  lord: PlanetKey;
  element: ElementType;
  direction: DirectionType;
  planets: PlanetPosition[];
  arudhas: string[]; // e.g., ["AL", "A4", "A7"]
}

export interface DashaPeriod {
  planet: PlanetKey;
  startDate: string; // ISO
  endDate: string;   // ISO
  isCurrent: boolean;
  antardashas?: DashaPeriod[];
}

export interface VimshottariDashaState {
  currentMahadasha: PlanetKey;
  currentAntardasha: PlanetKey;
  currentPratyantardasha?: PlanetKey;
  mdStartDate: string;
  mdEndDate: string;
  adStartDate: string;
  adEndDate: string;
  fullPeriods: DashaPeriod[];
}

export interface BNNAspectGroup {
  direction: DirectionType;
  element: ElementType;
  signs: number[]; // e.g. [1, 5, 9] for East/Fire
  planets: PlanetKey[];
  conjunctionDescription: string;
  vastuSignificance: string;
}

export interface JaiminiAnalysis {
  atmakaraka: PlanetKey;
  amatyakaraka: PlanetKey;
  matrukaraka: PlanetKey;
  a4SignIndex: number;
  a4SignName: ZodiacSignName;
  a4SanskritSignName: SanskritSignName;
  a4HouseFromLagna: number;
  a4Lord: PlanetKey;
  planetsInA4: PlanetKey[];
  aspectingPlanetsRashiDrishti: PlanetKey[];
  externalSurroundingsSignatures: string[];
}

export interface BirthChartData {
  user: {
    fullName: string;
    dob: string;
    tob: string;
    place: string;
    latitude: number;
    longitude: number;
    timezone: number;
    formattedDateTime: string;
  };
  ayanamsha: {
    name: string;
    degrees: number;
    formatted: string;
  };
  lagna: PlanetPosition;
  planets: PlanetPosition[];
  houses: ChartHouse[];
  vimshottari: VimshottariDashaState;
  navataraGrid: {
    taraName: TaraName;
    taraNumber: number;
    significance: string;
    isMalefic: boolean;
    nakshatras: {
      cycle: number;
      name: string;
      planetsPresent: PlanetKey[];
    }[];
  }[];
  bnnTrines: BNNAspectGroup[];
  jaimini: JaiminiAnalysis;
}
