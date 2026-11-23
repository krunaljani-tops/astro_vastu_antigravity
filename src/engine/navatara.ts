import { NakshatraInfo, PlanetKey, TaraName } from '../types/astrology';
import { NAKSHATRAS, TARA_NAMES } from './nakshatras';

export interface NavataraGridRow {
  taraName: TaraName;
  taraNumber: number; // 1 to 9
  significance: string;
  isMalefic: boolean;
  nakshatras: {
    cycle: number; // 1 (Prathama), 2 (Dvitiya), 3 (Tritiya)
    name: string;
    index: number;
    planetsPresent: PlanetKey[];
  }[];
}

export const TARA_METADATA: Record<
  TaraName,
  {
    number: number;
    significance: string;
    isMalefic: boolean;
    vastuDefectDescription: string;
  }
> = {
  Janma: {
    number: 1,
    significance: 'Birth, Self, Core Vitality',
    isMalefic: false,
    vastuDefectDescription: 'Direct impact on body and identity. Keep ruling direction pristine and clutter-free.',
  },
  Sampat: {
    number: 2,
    significance: 'Wealth, Liquid Cash, Material Gains',
    isMalefic: false,
    vastuDefectDescription: 'Direction brings immense wealth and luxury when kept clean and well-lit.',
  },
  Vipat: {
    number: 3,
    significance: 'Danger, Losses, Accidents, Sudden Setbacks',
    isMalefic: true,
    vastuDefectDescription: 'ACUTE VASTU DEFECT TRIGGER: Direction contains rusted iron, sharp scrap, or broken electricals causing financial leakages.',
  },
  Kshema: {
    number: 4,
    significance: 'Well-being, Protection, Comfort, Family Joy',
    isMalefic: false,
    vastuDefectDescription: 'Direction of natural sanctuary. Ideal for rest, recovery, and quiet activities.',
  },
  Pratyak: {
    number: 5,
    significance: 'Obstacles, Hostility, Legal friction, Enmity',
    isMalefic: true,
    vastuDefectDescription: 'ACUTE VASTU DEFECT TRIGGER: Direction contains dark clutter, unused footwear, damp walls, or heavy blockages sparking litigation/quarrels.',
  },
  Sadhana: {
    number: 6,
    significance: 'Accomplishment, Penance, Discipline, Goals',
    isMalefic: false,
    vastuDefectDescription: 'Direction ideal for focused work, spiritual study, meditation, and skill mastery.',
  },
  Naidhana: {
    number: 7,
    significance: 'Destruction, Chronic Illness, Severe Affliction (Vadha)',
    isMalefic: true,
    vastuDefectDescription: 'SEVERE MALIFIC TRIGGER: Direction houses contaminated drainage, rotting materials, structural cracks, or hazardous mess draining vitality.',
  },
  Mitra: {
    number: 8,
    significance: 'Friend, Cordial Allies, Harmonious Support',
    isMalefic: false,
    vastuDefectDescription: 'Direction fosters social harmony, networking, and helpful neighborhood relations.',
  },
  'Ati-Mitra': {
    number: 9,
    significance: 'Supreme Friend, Lifelong Benefactors, Grace',
    isMalefic: false,
    vastuDefectDescription: 'Direction is a vortex of divine blessings; ideal for sacred symbols, gifts, and mentors.',
  },
};

/**
 * Calculates Navatara for any Nakshatra relative to Moon's Janma Nakshatra index
 */
export function calculateNavataraForNakshatra(
  targetNakshatraIndex: number,
  moonNakshatraIndex: number
): {
  taraName: TaraName;
  taraNumber: number;
  taraCycle: number;
  isMalefic: boolean;
} {
  const diff = (targetNakshatraIndex - moonNakshatraIndex + 27) % 27;
  const taraIndex = diff % 9; // 0 to 8
  const taraCycle = Math.floor(diff / 9) + 1; // 1, 2, or 3
  const taraName = TARA_NAMES[taraIndex];
  const meta = TARA_METADATA[taraName];

  return {
    taraName,
    taraNumber: meta.number,
    taraCycle,
    isMalefic: meta.isMalefic,
  };
}

/**
 * Generates the full 9-Tara Navatara Grid with planets placed inside each
 */
export function generateNavataraGrid(
  moonNakshatraIndex: number,
  planetNakshatras: { planet: PlanetKey; nakshatraIndex: number }[]
): NavataraGridRow[] {
  const grid: NavataraGridRow[] = TARA_NAMES.map((taraName, idx) => {
    const meta = TARA_METADATA[taraName];
    const nakshatrasInThisTara: {
      cycle: number;
      name: string;
      index: number;
      planetsPresent: PlanetKey[];
    }[] = [];

    for (let cycle = 1; cycle <= 3; cycle++) {
      const offset = (cycle - 1) * 9 + idx;
      const nakIndex = (moonNakshatraIndex + offset) % 27;
      const nakDef = NAKSHATRAS[nakIndex];

      const planetsHere = planetNakshatras
        .filter((p) => p.nakshatraIndex === nakIndex)
        .map((p) => p.planet);

      nakshatrasInThisTara.push({
        cycle,
        name: nakDef.name,
        index: nakIndex,
        planetsPresent: planetsHere,
      });
    }

    return {
      taraName,
      taraNumber: meta.number,
      significance: meta.significance,
      isMalefic: meta.isMalefic,
      nakshatras: nakshatrasInThisTara,
    };
  });

  return grid;
}
